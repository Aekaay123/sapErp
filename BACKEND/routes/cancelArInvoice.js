const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  const docEntryNum = Number(docEntry); // ensure number

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/Invoices(${docEntryNum})/Cancel`,
      { CancelReason: "Testing" },
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    res.json({ message: "Cancelled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({
      message: "Failed to cancel",
      sapMessage: sapErrorMessage,
    });
  }
};
