import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";
import { Upload, ScanLine, X } from "lucide-react";
function ScanReceiptModal({
  onClose,
  refreshTransactions,
}) {
  const token = localStorage.getItem("token");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setOcrText("");
  };
const scanReceipt = async () => {
  if (!selectedFile) {
    toast.error("Please select a receipt.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "receipt",
      selectedFile
    );

    const { data } = await axios.post(
      `${API_URL}/receipt/scan`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setOcrText(data.text);

    toast.success(
      `₹${data.amount} added successfully!`
    );

    refreshTransactions();

    setTimeout(() => {
      onClose();
    }, 800);

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Receipt scanning failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">
          Scan Receipt
        </h2>

        <p className="text-slate-400 mb-6">
          Upload a receipt and FinanceOS will extract its contents.
        </p>

        <label className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
          <Upload size={40} className="text-blue-400 mb-3" />

          <p className="text-white font-medium">
            Click to choose receipt
          </p>

          <p className="text-slate-500 text-sm mt-2">
            JPG, PNG or JPEG
          </p>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </label>

        {preview && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-white">
              Preview
            </h3>

            <img
              src={preview}
              alt="Receipt Preview"
              className="rounded-xl max-h-80 mx-auto border border-slate-700"
            />
          </div>
        )}

        <button
          onClick={scanReceipt}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition"
        >
          <ScanLine size={20} />

          {loading ? "Scanning Receipt..." : "Scan Receipt"}
        </button>

        {ocrText && (
  <div className="bg-slate-800 rounded-xl p-4 mb-4">

    <h3 className="text-lg font-semibold text-white mb-3">
      Extracted Information
    </h3>

    <div className="space-y-2 text-slate-300">

      <p>
        <span className="font-semibold">
          Merchant:
        </span>{" "}
        {ocrText.split("\n")[0]}
      </p>

    </div>

  </div>
)}
      </div>
    </div>
  );
}

export default ScanReceiptModal;