const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { docEntry, session } = req.query;

  if (!docEntry || !session) {
    return res.status(400).json({ message: "DocEntry and session required" });
  }

  try {
    // Fetch recent invoices (limit to 100 for performance)
    const response = await axios.get(
      `https://192.168.196.20:50000/b1s/v1/Invoices?$select=DocNum,DocumentLines&$top=100&$orderby=DocDate desc`,
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const invoices = response.data.value;
    console.log("this is invoice", invoices);

    // Find the invoice where any line's BaseEntry equals the original DocEntry
    const cancelledInvoice = invoices.find((inv) =>
      inv.DocumentLines.some((line) => line.BaseEntry === Number(docEntry))
    );

    if (cancelledInvoice) {
      console.log("thisiss", cancelledInvoice.DocNum);
      res.json({ DocNum: cancelledInvoice.DocNum });
    } else {
      res.status(404).json({ message: "Cancelled invoice not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};
