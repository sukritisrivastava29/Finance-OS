import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload, ScanLine, X } from "lucide-react";

import { API_URL } from "../config";

function ScanReceiptModal({
  onClose,
  refreshTransactions,
}) {
  const token = localStorage.getItem("token");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setReceiptData(null);
  };

  const scanReceipt = async () => {
    if (!selectedFile) {
      toast.error("Please select a receipt.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("receipt", selectedFile);

      const { data } = await axios.post(
        `${API_URL}/receipt/scan`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setReceiptData(data);

      toast.success(
        `${data.title} • ₹${data.amount} added successfully!`
      );

      refreshTransactions();

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      console.error(error);

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
      <div className="card-theme rounded-2xl w-full max-w-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-primary transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-bold mb-2">
          Scan Receipt
        </h2>

        <p className="text-muted mb-6">
          Upload a receipt and FinanceOS will automatically extract the transaction details.
        </p>

        <label className="upload-box rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer">
          <Upload
            size={40}
            className="text-primary mb-3"
          />

          <p className="font-medium">
            Click to choose receipt
          </p>

          <p className="text-muted text-sm mt-2">
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
            <h3 className="text-lg font-semibold mb-3">
              Preview
            </h3>

            <img
              src={preview}
              alt="Receipt Preview"
              className="rounded-xl max-h-80 mx-auto border border-theme"
            />
          </div>
        )}

        <button
          onClick={scanReceipt}
          disabled={loading}
          className="primary-btn w-full mt-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
        >
          <ScanLine size={20} />

          {loading
            ? "Scanning Receipt..."
            : "Scan Receipt"}
        </button>

        {receiptData && (
          <div className="card-theme rounded-xl p-5 mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Extracted Information
            </h3>

            <div className="space-y-2 text-muted">
              <p>
                <strong>Merchant:</strong>{" "}
                {receiptData.title}
              </p>

              <p>
                <strong>Amount:</strong> ₹
                {receiptData.amount}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {receiptData.category}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScanReceiptModal;