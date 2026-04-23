const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { sessionId, server } = req.body;

  if (!sessionId || !server) {
    return res.status(400).json({ message: "No active session" });
  }

  try {
    await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/Logout`,
      {},
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      },
    );
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("SAP logout failed:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
