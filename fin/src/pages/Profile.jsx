import Sidebar from "../components/Sidebar";

function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">
          Profile
        </h1>

        <div className="max-w-2xl space-y-6">

          {/* User Card */}
          <div className="bg-slate-900 rounded-xl p-8">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold mb-6">
              S
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-slate-400">
                  Name
                </p>

                <h2 className="text-2xl font-semibold">
                  Sukriti Srivastava
                </h2>
              </div>

              <div>
                <p className="text-slate-400">
                  Email
                </p>

                <h2 className="text-xl">
                  sukriti@example.com
                </h2>
              </div>

            </div>
          </div>

          {/* Finance Settings */}
          <div className="bg-slate-900 rounded-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Financial Preferences
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-slate-400">
                  Monthly Budget
                </p>

                <p className="text-xl font-semibold">
                  ₹20,000
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Savings Goal
                </p>

                <p className="text-xl font-semibold">
                  ₹10,000
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Currency
                </p>

                <p className="text-xl font-semibold">
                  INR (₹)
                </p>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">

            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>

            <button className="bg-slate-800 px-6 py-3 rounded-lg hover:bg-slate-700">
              Change Password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;