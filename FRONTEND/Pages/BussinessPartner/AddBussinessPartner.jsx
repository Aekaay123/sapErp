import * as XLSX from "xlsx";
import { useState } from "react";

export default function AddBusinessPartner() {
  const [rows, setRows] = useState([]);

  const cardTypeMapping = { Customer: "C", Supplier: "S", Employee: "E" };
  const seriesMapping = { "TRV-": 123, "CUS-": 124, "VEN-": 125 };
  const groupMapping = { Retail: 101, Wholesale: 102, VIP: 103 };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const mappedData = jsonData.map((row) => {
        const typeCode = cardTypeMapping[row.CardType] || "";
        const accountValue = typeCode === "C" ? 200000 : typeCode === "S" ? 40000 : 0;

        return {
          CardTypeName: row.CardType || "",
          CardTypeCode: typeCode,
          SeriesName: row.Series || "",
          SeriesCode: seriesMapping[row.Series] || "",
          CardName: row.CardName || "",
          GroupName: row.Group || "",
          GroupCode: groupMapping[row.Group] || "",
          AccountPayableReceivable: accountValue,
        };
      });

      setRows(mappedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    console.log("Importing rows:", rows);
    alert(`${rows.length} rows ready for import!`);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="border p-2 rounded w-full max-w-sm"
      />

      {rows.length > 0 && (
        <div className="border rounded max-h-[70vh] overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Series</th>
                <th className="border px-4 py-2">Card Name</th>
                <th className="border px-4 py-2">Group</th>
                <th className="border px-4 py-2">Account Payable/Receivable</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{row.CardTypeName}</td>
                  <td className="border px-4 py-2">{row.SeriesName}</td>
                  <td className="border px-4 py-2">{row.CardName}</td>
                  <td className="border px-4 py-2">{row.GroupName}</td>
                  <td className="border px-4 py-2">{row.AccountPayableReceivable}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Import button below table */}
          <div className="flex justify-end p-2 bg-gray-50 border-t">
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Import
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
