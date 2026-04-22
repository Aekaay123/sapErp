const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { session } = req.body;

  if (!session) {
    return res.status(400).json({ message: "No active session" });
  }

  try {
    await axios.post(
      "https://192.168.196.20:50000/b1s/v1/Logout",
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    sessionId = null; // clear session
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("SAP logout failed:", error.message);
    res.status(500).json({ message: "Logout failed" });
  }
};
