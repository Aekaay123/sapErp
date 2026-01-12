import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
    const [bpOpen, setBpOpen] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);
    const [salesOrdrOpen, setIsSalesOrdrOpen] = useState(false)
    const [deliveryOpen, setIsDeliveryOpen] = useState(false)
    const [arInvoiceOpen, setArInvoiceOpen] = useState(false);
    const [incomingPaymentOpen, setIncomingPaymentOpen] = useState(false);
    const [purchaseOpen, setPurchaseOpen] = useState(false)
    const [purchaseOrderOpen, setPurchaseOrderOpen] = useState(false)
    const [grpOpen, setGrpOpen] = useState(false)
    const [ApInvoiceOpen, setApInvoiceOpen] = useState(false)
    const [outgoingPaymentOpen, setOutgoingPaymentOpen] = useState(false)


    const location = useLocation(); // get current path

    const isIncomingPaymentActive = location.pathname.startsWith("/main/incoming-payment");
    const linkClass = ({ isActive }) =>
        `block px-3 py-2 rounded transition ${isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`;

    return (
        <aside className="w-64 bg-gray-100 p-4 border-r fixed h-full overflow-auto">

            {/* BUSINESS PARTNER DROPDOWN */}
            <div>
                <button
                    onClick={() => setBpOpen(!bpOpen)}
                    className={`w-full text-left font-bold mb-2 transition hover:text-blue-600`}
                >
                    Business Partner {bpOpen ? "-" : "+"}
                </button>
                {bpOpen && (
                    <ul className="ml-2 space-y-1">
                        <li><NavLink to="/main/bussiness-partner/add" className={linkClass}>Add</NavLink></li>
                        <li><NavLink to="/main/bussiness-partner/update" className={linkClass}>Update</NavLink></li>
                        <li><NavLink to="/main/bussiness-partner/delete" className={linkClass}>Delete</NavLink></li>
                    </ul>
                )}
            </div>

            {/* SALES DROPDOWN */}
            <div className="mt-6">
                <button
                    onClick={() => setSalesOpen(!salesOpen)}
                    className={`w-full text-left font-bold mb-2 transition hover:text-blue-600`}
                >
                    Sales {salesOpen ? "-" : "+"}
                </button>
                {salesOpen && (
                    <ul className="ml-2 space-y-1">
                        {/* sales order  */}
                        <li>
                            <button
                                onClick={() => setIsSalesOrdrOpen(!salesOrdrOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                Sales Order {salesOrdrOpen ? "-" : "+"}
                            </button>
                            {salesOrdrOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/sales-order/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/sales-order/cancel" className={linkClass}>Cancel</NavLink></li>
                                    <li><NavLink to="/main/sales-order/close" className={linkClass}>Close</NavLink></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setIsDeliveryOpen(!deliveryOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                Delivery {deliveryOpen ? "-" : "+"}
                            </button>
                            {deliveryOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/delivery/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/delivery/cancel" className={linkClass}>Cancel</NavLink></li>
                                    <li><NavLink to="/main/delivery/close" className={linkClass}>Close</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* A/R Invoice with nested dropdown */}
                        <li>
                            <button
                                onClick={() => setArInvoiceOpen(!arInvoiceOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                A/R Invoice {arInvoiceOpen ? "-" : "+"}
                            </button>
                            {arInvoiceOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/ar-invoice/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/ar-invoice/cancel" className={linkClass}>Cancel</NavLink></li>

                                </ul>
                            )}
                        </li>

                        {/* Incoming Payment nested */}
                        <li>
                            <button
                                onClick={() => setIncomingPaymentOpen(!incomingPaymentOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition ${isIncomingPaymentActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
                            >
                                Incoming Payment {incomingPaymentOpen ? "-" : "+"}
                            </button>
                            {incomingPaymentOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/incoming-payment/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/incoming-payment/cancel" className={linkClass}>Cancel</NavLink></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </div>
            {/* PURCHASE DROPDOWN */}
            <div className="mt-6">
                <button
                    onClick={() => setPurchaseOpen(!purchaseOpen)}
                    className={`w-full text-left font-bold mb-2 transition hover:text-blue-600`}
                >
                    Purchase {purchaseOpen ? "-" : "+"}
                </button>
                {purchaseOpen && (
                    <ul className="ml-2 space-y-1">

                        <li>
                            <button
                                onClick={() => setPurchaseOrderOpen(!purchaseOrderOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                Purchase order{purchaseOrderOpen ? "-" : "+"}
                            </button>
                            {purchaseOrderOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/purchase-order/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/purchase-order/cancel" className={linkClass}>Cancel</NavLink></li>
                                    <li><NavLink to="/main/purchase-order/close" className={linkClass}>Close</NavLink></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setGrpOpen(!grpOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                Goods Receipt {grpOpen ? "-" : "+"}
                            </button>
                            {grpOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/grpo/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/grpo/cancel" className={linkClass}>Cancel</NavLink></li>
                                    <li><NavLink to="/main/grpo/close" className={linkClass}>Close</NavLink></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setApInvoiceOpen(!ApInvoiceOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition`}
                            >
                                A/P Invoice {ApInvoiceOpen ? "-" : "+"}
                            </button>
                            {ApInvoiceOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/ap-invoice/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/ap-invoice/cancel" className={linkClass}>Cancel</NavLink></li>

                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setOutgoingPaymentOpen(!outgoingPaymentOpen)}
                                className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition ${isIncomingPaymentActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
                            >
                                Incoming Payment {outgoingPaymentOpen ? "-" : "+"}
                            </button>
                            {outgoingPaymentOpen && (
                                <ul className="ml-4 space-y-1">
                                    <li><NavLink to="/main/outgoing-payment/add" className={linkClass}>Add</NavLink></li>
                                    <li><NavLink to="/main/outgoing-payment/cancel" className={linkClass}>Cancel</NavLink></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </div>
        </aside>
    );
};

export default SideBar;
