const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { session, accountNo, reconDate, rows } = req.body;

  if (!session || !accountNo || !reconDate || !rows || !Array.isArray(rows)) {
    return res.status(400).json({
      message: "Session, accountNo, reconDate, and rows are required",
    });
  }
  try {
    const body = {
      CardOrAccount: "coaAccount",
      ReconDate: new Date(reconDate).toISOString(),
      InternalReconciliationOpenTransRows: rows,
    };

    const response = await axios.post(
      "https://192.168.196.20:50000/b1s/v1/InternalReconciliations",
      body,
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Reconciliation successful", data: response.data });
  } catch (err) {
    console.error("Reconciliation failed:", err.message);
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
};
