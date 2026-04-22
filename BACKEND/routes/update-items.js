const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
module.exports = async (req, res) => {
  const { itemCode, budgetHeadCode, itemName, itemGroupCode, uom, session } =
    req.body;

  if (!itemCode || !session) {
    return res.status(400).json({
      message: "ItemCode and session are required",
    });
  }

  // Build payload only with fields that have values
  const payload = {};
  if (budgetHeadCode) payload.U_BUDHEAD = budgetHeadCode;
  if (itemName) payload.ItemName = itemName;
  if (itemGroupCode) payload.ItmsGrpCod = parseInt(itemGroupCode);
  if (uom) payload.InvntryUom = uom;

  try {
    await axios.patch(
      `https://192.168.196.20:50000/b1s/v1/Items('${itemCode}')`,
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
      message: "Item updated successfully",
      itemCode,
      updatedFields: Object.keys(payload),
    });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "SAP Service Layer error";

    res.status(400).json({
      message: "Failed to update item",
      sapMessage: sapErrorMessage,
    });
  }
};
