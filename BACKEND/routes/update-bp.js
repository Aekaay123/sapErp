// const axios = require("axios");
// const https = require("https");

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });

// module.exports = async (req, res) => {
//   const { cardCode, cardName, groupCode, controlAccount, session } = req.body;

//   if (!cardCode || !session) {
//     return res.status(400).json({
//       message: "cardCode and session are required",
//     });
//   }

//   const payload = {};

//   if (cardName) {
//     payload.CardName = cardName;
//   }

//   if (groupCode) {
//     payload.GroupCode = parseInt(groupCode, 10);
//   }

//   if (controlAccount) {
//     payload.DebitorAccounts = controlAccount;
//   }

//   if (Object.keys(payload).length === 0) {
//     return res.status(400).json({
//       message: "No fields provided for update",
//     });
//   }

//   try {
//     await axios.patch(
//       `https://192.168.196.20:50000/b1s/v1/BusinessPartners('${cardCode}')`,
//       payload,
//       {
//         headers: {
//           Cookie: `B1SESSION=${session}`,
//           "Content-Type": "application/json",
//         },
//         httpsAgent,
//       },
//     );

//     res.json({
//       message: "Business Partner updated successfully",
//       cardCode,
//       updatedFields: Object.keys(payload),
//     });
//   } catch (err) {
//     const sapMessage =
//       err.response?.data?.error?.message?.value || "SAP Service Layer error";

//     res.status(400).json({
//       message: "Failed to update Business Partner",
//       sapMessage,
//     });
//   }
// };

const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = async (req, res) => {
  const { cardCode, cardName, groupCode, controlAccount, dpmClear, session } =
    req.body;

  if (!cardCode || !session) {
    return res.status(400).json({
      message: "cardCode and session are required",
    });
  }

  // Build PATCH payload dynamically
  const payload = {};

  if (cardName) {
    payload.CardName = cardName;
  }

  if (groupCode) {
    payload.GroupCode = parseInt(groupCode, 10);
  }

  if (controlAccount) {
    payload.DebitorAccount = controlAccount;
  }

  if (dpmClear !== undefined && dpmClear !== null && dpmClear !== "") {
    payload.DownPaymentClearAct = dpmClear;
  }

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      message: "No fields provided for update",
    });
  }

  try {
    await axios.patch(
      `https://192.168.196.20:50000/b1s/v1/BusinessPartners('${cardCode}')`,
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
      message: "Business Partner updated successfully",
      cardCode,
      updatedFields: Object.keys(payload),
    });
  } catch (err) {
    const sapMessage =
      err.response?.data?.error?.message?.value || "SAP Service Layer error";

    res.status(400).json({
      message: "Failed to update Business Partner",
      sapMessage,
    });
  }
};
