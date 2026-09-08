import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
function Profile() {
const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);
const handleAvatarUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/auth/avatar",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = {
      ...user,
      avatar: res.data.avatar,
    };

    setUser(updatedUser);
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  } catch (err) {
    console.error(err);
    alert("Failed to upload avatar");
  }
};
  return (
    <div className="app-theme min-h-screen flex">
      <Sidebar />

      <div className="flex-1 p-4 md:p-10 pt-20 md:pt-10">
        <h1 className="text-3xl font-bold mb-8">
          Profile
        </h1>

        <div className="card-theme rounded-2xl p-8 max-w-2xl shadow-xl">
          <div className="flex items-center gap-6 mb-8">
           <div className="relative">

  {user?.avatar ? (
    <img
      src={user.avatar}
      alt="Avatar"
      className="w-20 h-20 rounded-full object-cover"
    />
  ) : (
    <div className="w-20 h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-3xl font-bold">
      {user?.name?.charAt(0).toUpperCase()}
    </div>
  )}

  <label className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700">
    📷
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={handleAvatarUpload}
    />
  </label>

</div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-muted">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-muted mb-1">
                Full Name
              </p>

              <p className="text-lg font-medium">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-muted mb-1">
                Email Address
              </p>

              <p className="text-lg font-medium break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-muted mb-1">
                Account Status
              </p>

              <span className="inline-flex items-center rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-500">
                ● Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;