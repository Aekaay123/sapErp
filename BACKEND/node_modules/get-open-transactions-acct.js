const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { session, accountNo, reconDate } = req.body;

  if (!session || !accountNo || !reconDate) {
    return res
      .status(400)
      .json({ message: "Session, accountNo, and reconDate are required" });
  }
  try {
    const body = {
      InternalReconciliationOpenTransParams: {
        CardOrAccount: "coaAccount",
        AccountNo: accountNo,
        ReconDate: new Date(reconDate).toISOString(),
      },
    };

    const response = await axios.post(
      "https://192.168.196.20:50000/b1s/v1/InternalReconciliationsService_GetOpenTransactions",
      body,
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Get open transactions failed:", err.message);
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
};
