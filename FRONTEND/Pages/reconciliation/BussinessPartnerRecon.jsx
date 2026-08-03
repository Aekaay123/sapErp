import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { SessionContext } from "../../Context/SessionContext";

const BussinessPartnerRecon = () => {
    const { session } = useContext(SessionContext);

    const [rows, setRows] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [reconDate, setReconDate] = useState("");

    // =========================
    // DOWNLOAD TEMPLATE
    // =========================
    const handleDownloadTemplate = () => {
        const headers = [["BP Code"]];
        const ws = XLSX.utils.aoa_to_sheet(headers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "BP_Reconciliation_Template.xlsx");
    };

    // =========================
    // FILE UPLOAD
    // =========================
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
                    jeCreated: false // 🔥 NEW FIELD
                }));

            setRows(parsed);
            setOverallProgress(0);
        };

        reader.readAsArrayBuffer(file);
    };

    // =========================
    // MAIN RECONCILIATION (ONLY ONE API)
    // =========================
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
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/reconcile-bp`,
                    {
                        sessionId: session.sessionId,
                        server: session.server,
                        bpCode: temp[i].bpCode,
                        reconDate,
                    }
                );

                temp[i].status = "Reconciled";
                temp[i].jeCreated = res.data.jeCreated; // 🔥 IMPORTANT
            } catch (err) {
                temp[i].status =
                    err.response?.data?.sapMessage || "Failed";
                temp[i].jeCreated = false;
            }

            temp[i].progress = 100;
            setRows([...temp]);
            setOverallProgress(Math.round(((i + 1) / total) * 100));
        }
    };

    // =========================
    // EXPORT
    // =========================
    const handleExportToExcel = () => {
        if (rows.length === 0) {
            alert("No data to export");
            return;
        }

        const exportData = rows.map((r) => ({
            "BP Code": r.bpCode,
            "Status": r.status,
            "JE Created": r.jeCreated ? "YES" : "NO",
            "Progress (%)": r.progress,
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Result");
        XLSX.writeFile(wb, `BP_Reconciliation_${reconDate}.xlsx`);
    };

    // =========================
    // UI
    // =========================
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Bulk Business Partner Reconciliation
                </h2>

                <div className="flex flex-col items-center gap-4 mb-6">
                    <button
                        onClick={handleDownloadTemplate}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Download Template
                    </button>

                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                    />

                    <div className="flex gap-3 items-center">
                        <label>Reconciliation Date:</label>
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
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Reconcile Business Partners
                        </button>
                    )}
                </div>

                {overallProgress > 0 && (
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 h-3 rounded">
                            <div
                                className="bg-green-500 h-3"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                        <p className="text-center">
                            Overall Progress: {overallProgress}%
                        </p>
                    </div>
                )}

                {rows.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">BP Code</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">JE Created</th>
                                    <th className="border px-4 py-2">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={i}>
                                        <td className="border px-4 py-2">{r.bpCode}</td>
                                        <td className="border px-4 py-2">{r.status}</td>

                                        {/* 🔥 CHECKBOX COLUMN */}
                                        <td className="border px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={r.jeCreated}
                                                readOnly
                                            />
                                        </td>

                                        <td className="border px-4 py-2 text-center">
                                            {r.progress}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button
                            onClick={handleExportToExcel}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Export to Excel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BussinessPartnerRecon;