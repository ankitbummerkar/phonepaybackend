import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { toast } from "react-toastify";
export default function AddMoney() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addMoney = async () => {
    if (!amount || amount <= 0) {
      return toast.error("Enter a valid amount");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/payment/add-money",
        {
          amount,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Money Added Successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className=" px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full text-2xl flex items-center justify-center ">
                <Wallet color="#000000" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-black ">Add Money</h1>

                <p className="text-black  text-sm">
                  Instantly add funds to your wallet
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amount
              </label>

              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500">
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-2xl
                    pl-12
                    pr-4
                    py-5
                    text-3xl
                    font-bold
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="text-sm text-slate-600">
                Money will be added instantly to your wallet balance.
              </p>
            </div>

            {/* Security */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-center text-green-600 text-sm font-medium">
                🔒 100% Secure Payment
              </p>
            </div>

            {/* Button */}
            <button
              onClick={addMoney}
              disabled={loading}
              className="
                w-full
                mt-8
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                py-4
                rounded-2xl
                font-semibold
                text-lg
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Processing..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
