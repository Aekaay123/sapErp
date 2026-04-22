const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { code, name, fatherAccountKey, accountLevel, session } = req.body;

  if (!code || !name || !accountLevel || !session) {
    return res.status(400).json({
      message: "Code, Name, AccountLevel and session are required",
    });
  }

  const payload = {
    Code: code,
    Name: name,
    AccountLevel: accountLevel,
    ActiveAccount: "tYES",
  };

  if (fatherAccountKey) {
    payload.FatherAccountKey = fatherAccountKey;
  }

  try {
    await axios.post(
      "https://192.168.196.20:50000/b1s/v1/ChartOfAccounts",
      payload,
      {
        headers: {
          Cookie: `B1SESSION=${session}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
      },
    );

    res.json({
      message: "Account created successfully",
      code,
    });
  } catch (err) {
    const sapError =
      err.response?.data?.error?.message?.value || "SAP Service Layer error";

    res.status(400).json({
      message: "Failed to create account",
      sapMessage: sapError,
    });
  }
};
