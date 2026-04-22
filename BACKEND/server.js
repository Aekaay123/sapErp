require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const PORT = process.env.PORT;

const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const cancelArInvoiceRoute = require("./routes/cancelArInvoice");
const closeDeliveryRoute = require("./routes/closeDelivery");
const closeSalesOrderRoute = require("./routes/closeSalesOrder");
const cancelApInvoiceRoute = require("./routes/cancelApInvoice");
const closeGrpoRoute = require("./routes/closeGrpo");
const cancelGrpoRoute = require("./routes/cancel-grpo");
const closePoRoute = require("./routes/close-po");
const openTransactionsAcctRoute = require("./routes/get-open-transactions-acct");
const reconcileAccountRoute = require("./routes/reconciliation-accounts");
const openTransactionsBpRoute = require("./routes/get-open-transactions-bp");
const reconcileBpRoute = require("./routes/reconciliation-bp");
const removePurchaseReqRoute = require("./routes/remove-purchase-req");
const updateItemsRoute = require("./routes/update-items");
const updateBPRoute = require("./routes/update-bp");
const addCoaActiveRoute = require("./routes/add-coa-active");
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true, // allow cookies and authorization headers
  }),
);

app.use(express.json());

app.post("/api/login", loginRoute);
app.post("/api/logout", logoutRoute);
app.post("/api/cancel-invoice", cancelArInvoiceRoute);
app.post("/api/close-delivery-note", closeDeliveryRoute);
app.post("/api/close-sales-order", closeSalesOrderRoute);
app.post("/api/cancel-ap-invoices", cancelApInvoiceRoute);
app.post("/api/close-grpo", closeGrpoRoute);
app.post("/api/cancel-grpo", cancelGrpoRoute);
app.post("/api/close-po", closePoRoute);
app.post("/api/get-open-transactions", openTransactionsAcctRoute);
app.post("/api/reconcile-account", reconcileAccountRoute);
app.post("/api/get-open-bptransactions", openTransactionsBpRoute);
app.post("/api/reconcile-bp", reconcileBpRoute);
app.post("/api/remove-purchase-requests", removePurchaseReqRoute);
app.post("/api/update-items", updateItemsRoute);
app.post("/api/update-business-partners", updateBPRoute);
app.post("/api/add-coa-active", addCoaActiveRoute);
https: app.listen(PORT, () => console.log(`Backend running at ${PORT}`));
