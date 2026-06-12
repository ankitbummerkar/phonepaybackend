import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PayPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
    }

    try {
      setLoading(true);

      await axios.post(
        "https://phonepaybackend-yapz.onrender.com/payment/send-money-upi",
        {
          receiverUpiId: id,
          amount,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Payment Successful 🎉");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className=" p-8  text-center">
          <h1 className="text-3xl text-black  font-bold">Send Money</h1>

          <p className="text-black  mt-2">Secure UPI Transfer</p>
        </div>

        <div className="p-8">
          {/* Receiver */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
            <div>
              <p className="font-bold text-slate-800">Paying To</p>

              <p className="text-sm text-slate-500 break-all">{id}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Enter Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500">
                ₹
              </span>

              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="
                w-full
                pl-12
                pr-4
                py-4
                text-3xl
                font-bold
                border-2
                border-slate-200
                rounded-2xl
                focus:border-indigo-500
                outline-none
              "
              />
            </div>
          </div>

          {/* Security */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-center text-green-600 text-sm font-medium">
              🔒 100% Secure Payment
            </p>
          </div>

          {/* Button */}
          <button
            onClick={pay}
            disabled={loading}
            className="
    w-full
    mt-8
    bg-indigo-600
    hover:bg-indigo-700
    disabled:bg-gray-400
    disabled:cursor-not-allowed
    text-white
    font-bold
    py-4
    rounded-2xl
    transition
    shadow-lg
  "
          >
            {loading ? "Processing..." : `Pay ₹${amount || 0}`}
          </button>
        </div>
      </div>
    </div>
  );
}
