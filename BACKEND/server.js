const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true, // allow cookies and authorization headers
  })
);

app.use(express.json());
// Login route
app.post("/api/login", async (req, res) => {
  const { employeeCode, password, company } = req.body;

  try {
    // Call SAP Service Layer login
    const response = await axios.post(
      "https://192.168.196.20:50000/b1s/v1/Login",
      {
        UserName: employeeCode,
        Password: password,
        CompanyDB: company,
      },
      {
        httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
      }
    );
    res.json({
      message: "Login successful",
      session: response.data.SessionId,
      sessionTimeout: response.data.SessionTimeout,
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(401).json({ message: "Login failed" });
  }
});

// Logout route
app.post("/api/logout", async (req, res) => {
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
});

app.post("/api/cancel-invoice", async (req, res) => {
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
});

// app.get("/api/cancelled-invoice-docnum", async (req, res) => {
//   const { docEntry, session } = req.query;

//   if (!docEntry || !session) {
//     return res.status(400).json({ message: "DocEntry and session required" });
//   }

//   try {
//     // Fetch recent invoices (limit to 100 for performance)
//     const response = await axios.get(
//       `https://192.168.196.20:50000/b1s/v1/Invoices?$select=DocNum,DocumentLines&$top=100&$orderby=DocDate desc`,
//       {
//         headers: { Cookie: `B1SESSION=${session}` },
//         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//       }
//     );

//     const invoices = response.data.value;
//     console.log("this is invoice", invoices);

//     // Find the invoice where any line's BaseEntry equals the original DocEntry
//     const cancelledInvoice = invoices.find((inv) =>
//       inv.DocumentLines.some((line) => line.BaseEntry === Number(docEntry))
//     );

//     if (cancelledInvoice) {
//       console.log("thisiss", cancelledInvoice.DocNum);
//       res.json({ DocNum: cancelledInvoice.DocNum });
//     } else {
//       res.status(404).json({ message: "Cancelled invoice not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching invoices" });
//   }
// });

app.post("/api/close-delivery-note", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/DeliveryNotes(${docEntry})/Close`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Closed successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

app.post("/api/close-sales-order", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/Orders(${docEntry})/Close`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Closed successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

app.post("/api/cancel-ap-invoices", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/PurchaseInvoices(${docEntry})/Cancel`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Canceled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

app.post("/api/close-grpo", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/PurchaseDeliveryNotes(${docEntry})/Close`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Canceled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

app.post("/api/cancel-grpo", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/PurchaseDeliveryNotes(${docEntry})/Cancel`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Canceled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

app.post("/api/close-po", async (req, res) => {
  const { docEntry, session } = req.body;

  if (!docEntry || !session) {
    return res
      .status(400)
      .json({ message: "DocEntry and session are required" });
  }

  try {
    const response = await axios.post(
      `https://192.168.196.20:50000/b1s/v1/PurchaseOrders(${docEntry})/Close`,
      {},
      {
        headers: { Cookie: `B1SESSION=${session}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    res.json({ message: "Canceled successfully", data: response.data });
  } catch (err) {
    const sapErrorMessage =
      err.response?.data?.error?.message?.value || "Unknown error";
    res.status(400).json({ sapMessage: sapErrorMessage });
  }
});

https: app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
