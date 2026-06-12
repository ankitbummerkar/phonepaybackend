import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = async () => {
    try {
      const res = await axios.post(
        "https://phonepaybackend-yapz.onrender.com/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        <div className="bg-white px-8 py-4 rounded-2xl shadow-sm font-medium text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex-1">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    Hi, {user.name}
                  </h1>
                </div>

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>

              {/* Balance */}
              <div className="mt-4 text-black font-bold rounded-3xl p-6 max-w-md">
                <p className="text-black font-bold text-sm">
                  Available Balance
                </p>

                <h2 className="text-5xl font-bold mt-2">₹ {user.balance}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/add-money"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
                >
                  Add Money
                </Link>
              </div>

              {/* UPI ID */}
              <div className="mt-6">
                <p className="text-sm text-slate-500">Your UPI ID</p>

                <p className="font-semibold text-slate-800 mt-1">
                  {user.upiId}
                </p>
              </div>
            </div>

            {/* QR Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center">
              <h3 className="font-semibold text-slate-800 mb-5">Scan & Pay</h3>

              <img
                src={user.qrCode}
                alt="QR Code"
                className="w-56 h-56 object-contain bg-white p-3 rounded-2xl"
              />

              <p className="text-xs text-slate-500 mt-4 text-center">
                Share this QR code to receive payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
