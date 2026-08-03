const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const CLEARING_ACCOUNT = "222050003";

module.exports = async (req, res) => {
  const { sessionId, server, accountNo, reconDate } = req.body;

  if (!sessionId || !server || !accountNo || !reconDate) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  let jeCreated = false;

  try {
    // =========================
    // STEP 1: GET OPEN TRANSACTIONS
    // =========================
    const getBody = {
      InternalReconciliationOpenTransParams: {
        CardOrAccount: "coaAccount",
        AccountNo: accountNo,
        ReconDate: new Date(reconDate).toISOString(),
      },
    };

    let openRes = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/InternalReconciliationsService_GetOpenTransactions`,
      getBody,
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent,
      },
    );

    let rows = openRes.data.InternalReconciliationOpenTransRows || [];

    if (rows.length === 0) {
      return res.json({
        message: "No open transactions",
        jeCreated: false,
      });
    }

    // =========================
    // STEP 2: CALCULATE DIFFERENCE
    // =========================
    let total = rows.reduce((sum, r) => {
      const amt = r.ReconcileAmount || 0;

      if (r.CreditOrDebit === "codDebit") return sum + amt;
      if (r.CreditOrDebit === "codCredit") return sum - amt;

      return sum;
    }, 0);

    // =========================
    // STEP 3: CREATE JE (SAME AS BP)
    // =========================
    if (Math.abs(total) > 0.0001) {
      const amount = Math.abs(total);

      let journalBody;

      if (total < 0) {
        // More credit → Debit Account
        journalBody = {
          ReferenceDate: reconDate,
          Memo: `Auto clearing G/L ${accountNo}`,
          JournalEntryLines: [
            {
              AccountCode: accountNo,
              Debit: amount,
              Credit: 0,
            },
            {
              AccountCode: CLEARING_ACCOUNT,
              Debit: 0,
              Credit: amount,
            },
          ],
        };
      } else {
        // More debit → Credit Account
        journalBody = {
          ReferenceDate: reconDate,
          Memo: `Auto clearing G/L ${accountNo}`,
          JournalEntryLines: [
            {
              AccountCode: accountNo,
              Debit: 0,
              Credit: amount,
            },
            {
              AccountCode: CLEARING_ACCOUNT,
              Debit: amount,
              Credit: 0,
            },
          ],
        };
      }

      console.log("Posting JE:", journalBody);

      await axios.post(
        `https://192.168.196.${server}:50000/b1s/v1/JournalEntries`,
        journalBody,
        {
          headers: { Cookie: `B1SESSION=${sessionId}` },
          httpsAgent,
        },
      );

      jeCreated = true;
      console.log("Journal Entry Created");
    }

    // =========================
    // STEP 4: FETCH AGAIN (IMPORTANT)
    // =========================
    openRes = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/InternalReconciliationsService_GetOpenTransactions`,
      getBody,
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent,
      },
    );

    const finalRows =
      openRes.data.InternalReconciliationOpenTransRows.map((r) => ({
        Selected: "tYES",
        TransId: r.TransId,
        TransRowId: r.TransRowId,
        ReconcileAmount: r.ReconcileAmount,
      })) || [];

    if (finalRows.length === 0) {
      return res.json({
        message: "Nothing to reconcile",
        jeCreated,
      });
    }

    // =========================
    // STEP 5: RECONCILE (NO MANUAL BALANCING)
    // =========================
    const reconBody = {
      CardOrAccount: "coaAccount",
      ReconDate: new Date(reconDate).toISOString(),
      InternalReconciliationOpenTransRows: finalRows,
    };

    const reconRes = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/InternalReconciliations`,
      reconBody,
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent,
      },
    );

    return res.json({
      message: "Reconciliation completed",
      jeCreated,
      data: reconRes.data,
    });
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    return res.status(400).json({
      sapMessage:
        err.response?.data?.error?.message?.value || err.message || "Failed",
    });
  }
};
