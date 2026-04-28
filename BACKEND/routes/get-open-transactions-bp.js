const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { sessionId, server, bpCode, reconDate } = req.body;

  if (!sessionId || !server || !bpCode || !reconDate) {
    return res.status(400).json({
      message: "Session, bpCode, and reconDate are required",
    });
  }

  try {
    const body = {
      InternalReconciliationOpenTransParams: {
        CardOrAccount: "coaCard",
        InternalReconciliationBPs: [
          {
            BPCode: bpCode,
          },
        ],
        ReconDate: new Date(reconDate).toISOString(),
      },
    };

    const response = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/InternalReconciliationsService_GetOpenTransactions`,
      body,
      {
        headers: {
          Cookie: `B1SESSION=${sessionId}`,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );

    res.json(response.data);
  } catch (err) {
    console.error("Get open BP transactions failed:", err.message);
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
};
