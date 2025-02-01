import React, { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/inputField";
import { logout } from "../../utils/authUtils";
import makeAPICall from "../../utils/apiUtils";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "https://placehold.co/100",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.profileImage);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setLoading(true);
    const data = {
      name: newUser.name,
      email: newUser.email,
      image: selectedFile,
    };
    return makeAPICall({
      path: "/profile",
      payload: data,
      method: "PUT",
    })
      .then((res) => {
        setUser(newUser);
        setLoading(false);
        setIsEditing(false);
        console.log(res, "profile updated successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message, "profile error");
      });
  };

  const handleChange = (e) => {
    setLoading(true);
    const { name, value } = e.target;
    if (name === "file") {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
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
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile"
                className="mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
            )}
            {isEditing ? (
              <InputField
                type="file"
                onChange={handleChange}
                className="file-input"
                name="file"
                accept="image/*"
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
