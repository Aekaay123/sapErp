import React from 'react'
import { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { SessionContext } from "../../../Context/SessionContext";
import { useNavigate } from "react-router-dom";

const CloseDelivery = () => {
    const { session } = useContext(SessionContext);
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);

    useEffect(() => {
        if (!session) {
            navigate("/");
        }
    }, [session]);

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
                .map((r) => r[0])
                .filter(Boolean)
                .map((docEntry) => ({
                    docEntry,
                    status: "Pending",
                    progress: 0,
                }));

            setRows(parsed);
            setOverallProgress(0);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleClose = async () => {
        const total = rows.length;
        const temp = [...rows];

        for (let i = 0; i < total; i++) {
            temp[i].status = "Processing...";
            temp[i].progress = 50;
            setRows([...temp]);

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/close-delivery-note`, {
                    docEntry: temp[i].docEntry,
                    session,
                });

                temp[i].status = "Success";
            } catch (err) {
                temp[i].status = err.response?.data?.sapMessage || "Close failed";
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
                    Bulk Close Delivery Notes
                </h2>

                <div className="flex items-center justify-center gap-4 mb-6">
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="block text-sm hover:cursor-pointer"
                    />

                    {rows.length > 0 && (
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-blue-500 text-white hover:cursor-pointer rounded-lg hover:bg-blue-700 transition"
                        >
                            Close Delivery Notes
                        </button>
                    )}
                </div>

                {overallProgress > 0 && (
                    <div className="mb-6">
                        <div className="w-full bg-gray-200 h-3 rounded">
                            <div
                                className="bg-blue-500 h-3 rounded transition-all"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-center mt-1 text-gray-600">
                            Overall Progress: {overallProgress}%
                        </p>
                    </div>
                )}

                {rows.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border text-left">DocEntry</th>
                                    <th className="px-4 py-2 border text-left">Status</th>
                                    <th className="px-4 py-2 border text-center">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{r.docEntry}</td>
                                        <td
                                            className={`px-4 py-2 border font-medium ${r.status === "Success"
                                                ? "text-green-600"
                                                : r.status === "Pending" || r.status === "Processing..."
                                                    ? "text-gray-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {r.status}
                                        </td>
                                        <td className="px-4 py-2 border text-center">{r.progress}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CloseDelivery