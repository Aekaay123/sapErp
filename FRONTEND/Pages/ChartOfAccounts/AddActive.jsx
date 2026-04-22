
import React, { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { SessionContext } from "../../Context/SessionContext";
import { useNavigate } from "react-router-dom";

const AddActive = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);

    useEffect(() => {
        if (!session) navigate("/");
    }, [session, navigate]);

    // Download template
    const handleDownloadTemplate = () => {
        const headers = [
            ["Account Code", "Account Name", "Father Account Key", "Account Level"]
        ];
        const ws = XLSX.utils.aoa_to_sheet(headers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "COA Template");
        XLSX.writeFile(wb, "ChartOfAccounts_Template.xlsx");
    };

    // Upload & parse file
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
                .filter(r => r[0] && r[1])
                .map(r => ({
                    code: r[0]?.toString().trim(),
                    name: r[1]?.toString().trim(),
                    fatherAccountKey: r[2]?.toString().trim() || "",
                    accountLevel: parseInt(r[3], 10),
                    status: "Pending",
                    progress: 0
                }));

            setRows(parsed);
            setOverallProgress(0);
        };

        reader.readAsArrayBuffer(file);
    };

    // Process rows
    const handleProcess = async () => {
        const total = rows.length;
        const temp = [...rows];

        for (let i = 0; i < total; i++) {
            temp[i].status = "Processing...";
            temp[i].progress = 50;
            setRows([...temp]);

            try {
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/add-coa-active`,
                    {
                        ...temp[i],
                        session
                    }
                );
                temp[i].status = "Success";
            } catch (err) {
                temp[i].status =
                    err.response?.data?.sapMessage ||
                    err.response?.data?.message ||
                    "Failed";
            }

            temp[i].progress = 100;
            setRows([...temp]);
            setOverallProgress(Math.round(((i + 1) / total) * 100));
        }
    };

    // Export results
    const handleExportToExcel = () => {
        const exportData = rows.map(r => ({
            "Account Code": r.code,
            "Account Name": r.name,
            "Father Account Key": r.fatherAccountKey,
            "Account Level": r.accountLevel,
            Status: r.status
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "COA Result");
        XLSX.writeFile(wb, "ChartOfAccounts_Result.xlsx");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Bulk Add Chart of Accounts
                </h2>

                <div className="flex justify-between gap-4 mb-6">
                    <button
                        onClick={handleDownloadTemplate}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Download Template
                    </button>

                    <div className="flex gap-2">
                        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
                        {rows.length > 0 && (
                            <button
                                onClick={handleProcess}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Process Records
                            </button>
                        )}
                    </div>
                </div>

                {overallProgress > 0 && (
                    <p className="text-center mb-4">
                        Overall Progress: {overallProgress}%
                    </p>
                )}

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2">Account Code</th>
                            <th className="border px-2">Account Name</th>
                            <th className="border px-2">Parent Key</th>
                            <th className="border px-2">Account Level</th>
                            <th className="border px-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td className="border px-2">{r.code}</td>
                                <td className="border px-2">{r.name}</td>
                                <td className="border px-2">{r.fatherAccountKey}</td>
                                <td className="border px-2">{r.accountLevel}</td>
                                <td className="border px-2">{r.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {rows.length > 0 && (
                    <button
                        onClick={handleExportToExcel}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Export Result
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddActive;
