const axios = require("axios");
const https = require("https");

module.exports = async (req, res) => {
  const { docEntry, sessionId, server } = req.body;

  if (!docEntry || !sessionId || !server) {
    return res
      .status(400)
      .json({ message: "DocEntry, sessionId, and server are required" });
  }

  const docEntryNum = Number(docEntry);

  try {
    const response = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/IncomingPayments(${docEntryNum})/Cancel`,
      {},
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    res.json({ message: "Cancelled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage = err.response?.data?.error?.message?.value;
    res.status(400).json({
      message: "Failed to cancel",
      sapMessage: sapErrorMessage,
    });
  }
};
