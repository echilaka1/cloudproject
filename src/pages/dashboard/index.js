import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/inputField";
import { logout } from "../../utils/authUtils";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUser(newUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoading(true);
    setNewUser({ ...newUser, [name]: value });
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container mt-5" style={{ width: "60%" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="login-welcome">Profile Dashboard</h1>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="card mb-4">
          <div className="card-body text-center">
            <img
              src={user.profileImage}
              alt="Profile"
              className="mb-3"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            />
            {isEditing ? (
              <InputField
                type="text"
                name="profileImage"
                value={newUser.profileImage}
                onChange={handleChange}
              />
            ) : null}
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="title-text">{user.name}</h2>
            {isEditing ? (
              <InputField
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleChange}
              />
            ) : null}
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="title-text">{user.email}</h3>
            {isEditing ? (
              <InputField
                type="text"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            ) : null}
          </div>
        </div>
        {isEditing ? (
          <Button
            type="button"
            onClick={handleSaveClick}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleEditClick}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            {loading ? "Loading..." : "Edit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
