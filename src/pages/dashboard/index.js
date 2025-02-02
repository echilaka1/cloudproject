import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import InputField from "../../components/inputField";
import { logout } from "../../utils/authUtils";
import makeAPICall from "../../utils/apiUtils";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState(user);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const email = window.localStorage.getItem("email");

  const handleEditClick = () => {
    setNewUser(user);
    setIsEditing(true);
  };

  const fetchUser = async () => {
    setLoading(true);
    return makeAPICall({
      path: `user/${email}`,
      method: "GET",
    })
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message, "profile error");
      });
  };

  const handleSaveClick = () => {
    setLoading(true);
    const data = {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      image: selectedFile,
    };
    return makeAPICall({
      path: `user/${newUser.email}`,
      payload: data,
      method: "PUT",
    })
      .then((res) => {
        fetchUser();
        setLoading(false);
        setIsEditing(false);
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

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {user?.imageUrl && (
              <img
                src={previewUrl ? previewUrl : user?.imageUrl}
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
                // value={newUser?.imageUrl}
                accept="image/*"
              />
            ) : null}
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="title-text">First name: {user?.firstname}</h2>
            {isEditing ? (
              <InputField
                type="text"
                name="firstname"
                value={newUser?.firstname}
                onChange={handleChange}
              />
            ) : null}
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="title-text">Last name: {user?.lastname}</h2>
            {isEditing ? (
              <InputField
                type="text"
                name="lastname"
                value={newUser?.lastname}
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
