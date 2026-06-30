import Sidebar from "../components/Sidebar";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-10 pt-20 md:pt-10">

        <h1 className="text-3xl font-bold mb-8">
          Profile
        </h1>

        <div className="bg-slate-900 rounded-xl p-8 max-w-2xl">

          <div className="flex items-center gap-6 mb-8">

            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-slate-400">
                {user?.email}
              </p>
            </div>

          </div>

          <div className="space-y-6">

            <div>
              <p className="text-slate-400">
                Full Name
              </p>

              <p className="text-lg">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Email Address
              </p>

              <p className="text-lg">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Account Status
              </p>

              <p className="text-green-400">
                Active
              </p>
            </div>
</div>
          </div>
      </div>
    </div>
  );
}

export default Profile;