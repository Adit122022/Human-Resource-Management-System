import  { useState } from "react";
import CreateAdmin from "./CreateAdmin";

const AdminProfilePanel = ({ admin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 bg-white/40  rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
      <p><strong>Name:</strong> {admin.name}</p>
      <p><strong>Email:</strong> {admin.email}</p>

      <button
        onClick={() => setOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        ➕ Create New User
      </button>

      {open && <CreateAdmin onClose={() => setOpen(false)} />}
    </div>
  );
};

export default AdminProfilePanel;
