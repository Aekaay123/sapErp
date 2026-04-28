const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { sessionId, server, reconDate, rows } = req.body;

  if (!sessionId || !server || !reconDate || !rows || !Array.isArray(rows)) {
    return res.status(400).json({
      message: "Session, server, reconDate, and rows are required",
    });
  }
  try {
    const body = {
      CardOrAccount: "coaCard",
      ReconDate: new Date(reconDate).toISOString(),
      InternalReconciliationOpenTransRows: rows,
    };

    const response = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/InternalReconciliations`,
      body,
      {
        headers: {
          Cookie: `B1SESSION=${sessionId}`,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    res.json({
      message: "Business Partner reconciliation successful",
      data: response.data,
    });
  } catch (err) {
    console.error("BP reconciliation failed:", err.message);
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
};
