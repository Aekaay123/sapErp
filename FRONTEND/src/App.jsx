import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/header";
import Home from "../Pages/Home";
import Main from "../Pages/Main";
import Login from "../Pages/Login";
import AddBussinessPartner from "../Pages/BussinessPartner/AddBussinessPartner"
import DownPaymentReqCancel from "../Pages/Sales/DownPaymentReq/Cancel";
import UpdateBussinessPartner from "../Pages/BussinessPartner/UpdateBussinessPartner"
import DeleteBussinessPartner from "../Pages/BussinessPartner/DeleteBussinessPartner"
import AddSalesOrder from "../Pages/Sales/SalesOrder/Add";
import CancelSalesOrder from "../Pages/Sales/SalesOrder/Cancel"
import CloseSalesOrder from "../Pages/Sales/SalesOrder/Close"
import AddDelivery from "../Pages/Sales/Delivery/Add"
import CancelDelivery from "../Pages/Sales/Delivery/Cancel";
import CloseDelivery from "../Pages/Sales/Delivery/Close";
import AddIncomingPayment from "../Pages/Sales/IncomingPayment/Add"
import CancelIncomingPayment from "../Pages/Sales/IncomingPayment/Cancel"
import AddArInvoice from "../Pages/Sales/ArInvoice/Add"
import ArCancel from "../Pages/Sales/ArInvoice/Cancel";
import AddPurchaseOrdr from "../Pages/Purchase/PurchaseOrder/Add"
import CancelPurchaseOrdr from "../Pages/Purchase/PurchaseOrder/Cancel"
import ClosePurchaseOrdr from "../Pages/Purchase/PurchaseOrder/Close"
import AddGRPO from "../Pages/Purchase/GoodsReceipt/Add";
import CancelGRPO from "../Pages/Purchase/GoodsReceipt/Cancel"
import CloseGRPO from "../Pages/Purchase/GoodsReceipt/Close"
import AddApInvoice from "../Pages/Purchase/ApInvoice/Add"
import CancelApInvoice from "../Pages/Purchase/ApInvoice/Cancel"
import AddOutgoingPayment from "../Pages/Purchase/OutgoingPayment/Add"
import CancelOutgoingPayment from "../Pages/Purchase/OutgoingPayment/Cancel";
import BussinessPartnerRecon from "../Pages/reconciliation/BussinessPartnerRecon";
import AccountsRecon from "../Pages/reconciliation/AccountsRecon";
import RemovePurchaseReq from "../Pages/Purchase/PurchaseRequest/Remove";
import UpdateItems from "../Pages/Items/Update";
import AddTitle from "../Pages/ChartOfAccounts/AddTitle";
import AddActive from "../Pages/ChartOfAccounts/AddActive";
import Dashboard from "../components/Dashboard";
import CopyToCreditMemo from "../Pages/Sales/ArDownPaymentInvoice/CopyTo";
import UpdateFixedAsset from "../Pages/FixedAsset/Update";

function App() {
  return (
    <>
      <div flex flex-col h-full>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />}>
            <Route index element={<Dashboard />} />
            <Route path="items/update" element={<UpdateItems />} />
            <Route path="bussiness-partner/add" element={<AddBussinessPartner />} />
            <Route path="bussiness-partner/update" element={<UpdateBussinessPartner />} />
            <Route path="bussiness-partner/delete" element={<DeleteBussinessPartner />} />
            <Route path="sales-order/add" element={<AddSalesOrder />} />
            <Route path="sales-order/cancel" element={<CancelSalesOrder />} />
            <Route path="sales-order/close" element={<CloseSalesOrder />} />
            <Route path="delivery/add" element={<AddDelivery />} />
            <Route path="delivery/cancel" element={<CancelDelivery />} />
            <Route path="copy-to-credit-memo" element={<CopyToCreditMemo />} />
            <Route path="delivery/close" element={<CloseDelivery />} />
            <Route path="ar-invoice/add" element={<AddArInvoice />} />
            <Route path="ar-invoice/cancel" element={<ArCancel />} />
            <Route path="incoming-payment/add" element={<AddIncomingPayment />} />
            <Route path="incoming-payment/cancel" element={<CancelIncomingPayment />} />
            <Route path="down-payment-req/cancel" element={<DownPaymentReqCancel />} />
            <Route path="purchase-request/remove" element={<RemovePurchaseReq />} />
            <Route path="purchase-order/add" element={<AddPurchaseOrdr />} />
            <Route path="purchase-order/cancel" element={<CancelPurchaseOrdr />} />
            <Route path="purchase-order/close" element={<ClosePurchaseOrdr />} />
            <Route path="grpo/add" element={<AddGRPO />} />
            <Route path="grpo/cancel" element={<CancelGRPO />} />
            <Route path="grpo/close" element={<CloseGRPO />} />
            <Route path="ap-invoice/add" element={<AddApInvoice />} />
            <Route path="ap-invoice/cancel" element={<CancelApInvoice />} />
            <Route path="outgoing-payment/add" element={<AddOutgoingPayment />} />
            <Route path="outgoing-payment/cancel" element={<CancelOutgoingPayment />} />
            <Route path="reconciliation/bussiness-partners" element={<BussinessPartnerRecon />} />
            <Route path="reconciliation/gl-accounts" element={<AccountsRecon />} />
            <Route path="chart-of-accounts/add-title-acc" element={<AddTitle />} />
            <Route path="chart-of-accounts/add-active-acc" element={<AddActive />} />
            <Route path="fixed-assets/update" element={<UpdateFixedAsset />} />
          </Route>
          <Route path="*" element={<div>Path not found....</div>}
          />
        </Routes>

      </div>

    </>
  );
}
export default App