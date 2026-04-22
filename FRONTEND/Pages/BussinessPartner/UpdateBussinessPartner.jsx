import React, { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { SessionContext } from "../../Context/SessionContext";
import { useNavigate } from "react-router-dom";

const UpdateBusinessPartner = () => {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!session) navigate("/");
  }, [session, navigate]);

  // Download template with headers
  const handleDownloadTemplate = () => {
    const headers = [["BP Code", "BP Name", "BP Group", "Control Account", "Advance Clearing Account"]];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BP Template");
    XLSX.writeFile(wb, "BP_Upload_Template.xlsx");
  };

  // Handle file upload and parse from second row
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
        .slice(1) // skip header
        .filter((r) => r[0]) // only rows with cardCode
        .map((r) => ({
          cardCode: r[0]?.toString().trim(),
          cardName: r[1]?.toString().trim() || "",
          groupCode: r[2]?.toString().trim() || "",
          controlAccount: r[3]?.toString().trim() || "",
          dpmClear: r[4]?.toString().trim() || "",
          status: "Pending",
          progress: 0,
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
          `${import.meta.env.VITE_BACKEND_URL}/api/update-business-partners`,
          {
            ...temp[i],
            session,
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

  // Export filled template with progress and status
  const handleExportToExcel = () => {
    if (rows.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData = rows.map((r) => ({
      "BP Code": r.cardCode,
      "BP Name": r.cardName,
      "BP Group": r.groupCode,
      "Control Account": r.controlAccount,
      "Advance Clearing Account": r.dpmClear,
      Status: r.status,
      "Progress (%)": r.progress,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BP Update");
    XLSX.writeFile(wb, "BP_Update.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Bulk Business Partner Update
        </h2>

        <div className="flex justify-between gap-4 mb-6">
          <button
            onClick={handleDownloadTemplate}
            className=" w-3xs px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download Template
          </button>
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="cursor-pointer flex items-center justify-center"
            />

            {rows.length > 0 && (
              <button
                onClick={handleProcess}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Process Records
              </button>
            )}
          </div>

        </div>

        {overallProgress > 0 && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-600 h-3 rounded transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-sm text-center mt-1 text-gray-600">
              Overall Progress: {overallProgress}%
            </p>
          </div>
        )}

        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">BP Code</th>
              <th className="px-4 py-2 border text-left">BP Name</th>
              <th className="px-4 py-2 border text-left">BP Group</th>
              <th className="px-4 py-2 border text-left">Control Account</th>
              <th className="px-4 py-2 border text-left">Advance Clearing Account</th>
              <th className="px-4 py-2 border text-left">Status</th>
              <th className="px-4 py-2 border text-center">Progress</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{r.cardCode}</td>
                  <td className="px-4 py-2 border">{r.cardName}</td>
                  <td className="px-4 py-2 border">{r.groupCode}</td>
                  <td className="px-4 py-2 border">{r.controlAccount}</td>
                  <td className="px-4 py-2 border">{r.dpmClear}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-2 text-gray-500">
                  No data yet. Upload a file to populate rows.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {rows.length > 0 && (
          <button
            onClick={handleExportToExcel}
            className="w-3xs mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Export to Excel
          </button>
        )}
      </div>
    </div>
  );
};
export default UpdateBusinessPartner;
