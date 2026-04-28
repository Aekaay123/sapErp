import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { SessionContext } from "../../Context/SessionContext";

const BussinessPartnerRecon = () => {
    const { session } = useContext(SessionContext);
    const [rows, setRows] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [reconDate, setReconDate] = useState("");

    const handleExportToExcel = () => {
        if (rows.length === 0) {
            alert("No data to export");
            return;
        }

        const exportData = rows.map((r) => ({
            "BP Code": r.bpCode,
            "Status": r.status,
            "Progress (%)": r.progress,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "BP Reconciliation");

        XLSX.writeFile(workbook, `BP_Reconciliation_${reconDate}.xlsx`);
    };


    // Handle file upload (BP Codes)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const parsed = sheetData
                .slice(1)
                .map((r) => r[0])
                .filter(Boolean)
                .map((bp) => ({
                    bpCode: bp,
                    status: "Pending",
                    progress: 0,
                }));

            setRows(parsed);
            setOverallProgress(0);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleDownloadTemplate = () => {
        const headers = [
            ["BP Code"]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(headers);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "BP Reconciliation Template");

        XLSX.writeFile(workbook, "BP_Reconciliation_Template.xlsx");
    };
    // Handle BP reconciliation
    const handleReconciliation = async () => {
        if (!reconDate) {
            alert("Please enter reconciliation date");
            return;
        }

        const total = rows.length;
        const temp = [...rows];

        for (let i = 0; i < total; i++) {
            temp[i].status = "Processing...";
            temp[i].progress = 50;
            setRows([...temp]);

            try {
                // 1️⃣ Get open BP transactions
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/get-open-bptransactions`,
                    {
                        sessionId: session.sessionId,
                        server: session.server,
                        reconDate,
                        CardOrAccount: "coaCard",
                        bpCode: temp[i].bpCode,
                    }
                );

                const openTransRows =
                    res.data.InternalReconciliationOpenTransRows.map((row) => ({
                        Selected: "tYES",
                        ShortName: row.ShortName,
                        TransId: row.TransId,
                        TransRowId: row.TransRowId,
                        ReconcileAmount: row.ReconcileAmount,
                    }));

                if (openTransRows.length === 0) {
                    temp[i].status = "No open transactions";
                } else {
                    // 2️⃣ Perform reconciliation
                    await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/reconcile-bp`,
                        {
                            sessionId: session.sessionId,
                            server: session.server,
                            CardOrAccount: "coaCard",
                            reconDate,
                            rows: openTransRows,
                        }
                    );

                    temp[i].status = "Reconciled";
                }
            } catch (err) {
                temp[i].status =
                    err.response?.data?.sapMessage || "Failed";
            }

            temp[i].progress = 100;
            setRows([...temp]);
            setOverallProgress(Math.round(((i + 1) / total) * 100));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Bulk Business Partner Reconciliation
                </h2>

                <div className="flex flex-col items-center gap-4 mb-6">
                    <button
                        onClick={handleDownloadTemplate}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Download Template
                    </button>
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="block text-sm hover:cursor-pointer"
                    />
                    <div className="flex gap-x-3 justify-center items-center">
                        <label htmlFor="recon">Reconciliation Date:</label>
                        <input
                            type="date"
                            value={reconDate}
                            onChange={(e) => setReconDate(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                    </div>


                    {rows.length > 0 && reconDate && (
                        <button
                            onClick={handleReconciliation}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Reconcile Business Partners
                        </button>
                    )}
                </div>

                {overallProgress > 0 && (
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 h-3 rounded">
                            <div
                                className="bg-green-500 h-3 rounded transition-all"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-center mt-1 text-gray-600">
                            Overall Progress: {overallProgress}%
                        </p>
                    </div>
                )}

                {rows.length > 0 && (
                    <div className="overflow-x-auto flex flex-col items-center">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border text-left">
                                        BP Code
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 border text-center">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-2 border">
                                            {r.bpCode}
                                        </td>
                                        <td
                                            className={`px-4 py-2 border font-medium ${r.status === "Reconciled"
                                                ? "text-green-600"
                                                : r.status ===
                                                    "Pending" ||
                                                    r.status ===
                                                    "Processing..."
                                                    ? "text-gray-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {r.status}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {r.progress}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {rows.length > 0 && (
                            <button
                                onClick={handleExportToExcel}
                                className="mt-4 px-4 py-2 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Export to Excel
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BussinessPartnerRecon;
