const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { docEntry, sessionId, server } = req.body;

  if (!docEntry || !sessionId || !server) {
    return res.status(400).json({
      message: "DocEntry, sessionId and server are required",
    });
  }
  console.log("Received request to copy DocEntry:", docEntry);

  try {
    // 🔹 STEP 1: GET Down Payment
    const getResponse = await axios.get(
      `https://192.168.196.${server}:50000/b1s/v1/DownPayments(${docEntry})`,
      {
        headers: { Cookie: `B1SESSION=${sessionId}` },
        httpsAgent,
      },
    );

    const dp = getResponse.data;

    if (!dp?.CardCode || !dp?.DocDate || !dp?.DocumentLines) {
      throw new Error("Invalid Down Payment data");
    }

    const cardCode = dp.CardCode;
    const docDate = dp.DocDate.split("T")[0];

    // 🔥 BUILD EXACT STRUCTURE YOU WANT
    const documentLines = dp.DocumentLines.map((line) => ({
      BaseType: 203,
      BaseEntry: parseInt(docEntry),
      BaseLine: line.LineNum,
    }));

    const postBody = {
      CardCode: cardCode,
      DocDate: docDate,
      DocumentLines: documentLines,
    };

    console.log("FINAL REQUEST BODY:");
    console.log(JSON.stringify(postBody, null, 2));

    // 🔹 STEP 2: CREATE CREDIT NOTE
    const response = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/CreditNotes`,
      postBody,
      {
        headers: {
          Cookie: `B1SESSION=${sessionId}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
      },
    );

    res.json({
      message: "Credit Memo Created",
      docNum: response.data.DocNum,
    });
  } catch (err) {
    console.log("========== SAP ERROR ==========");
    console.log(err.response?.data || err.message);
    console.log("================================");

    res.status(400).json({
      sapMessage:
        err.response?.data?.error?.message?.value ||
        JSON.stringify(err.response?.data) ||
        err.message,
    });
  }
};
