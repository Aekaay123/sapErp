const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = async (req, res) => {
  const {
    assetCode,
    description,
    itemGroup,
    depreciationType,
    sessionId,
    server,
  } = req.body;

  if (!assetCode || !sessionId) {
    return res.status(400).json({
      message: "assetCode and sessionId are required",
    });
  }

  // Build PATCH payload dynamically
  const payload = {};

  if (description) payload.ItemName = description;

  if (itemGroup) payload.ItemsGroupCode = Number(itemGroup); // must be numeric

  if (depreciationType) {
    payload.ItemDepreciationParameters = [
      {
        FiscalYear: "FY01",
        DepreciationArea: "Main Books",
        DepreciationType: depreciationType, // send "NDEP" or exact SAP code
      },
    ];
  }

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      message: "No fields provided for update",
    });
  }

  try {
    await axios.patch(
      `https://192.168.196.${server}:50000/b1s/v1/Items('${assetCode}')`,
      payload,
      {
        headers: {
          Cookie: `B1SESSION=${sessionId}`,
          "Content-Type": "application/json",
        },
        httpsAgent,
      },
    );

    res.json({
      message: "Fixed Asset updated successfully",
      assetCode,
      updatedFields: Object.keys(payload),
    });
  } catch (err) {
    const sapMessage =
      err.response?.data?.error?.message?.value || "SAP Service Layer error";

    res.status(400).json({
      message: "Failed to update Fixed Asset",
      sapMessage,
    });
  }
};
