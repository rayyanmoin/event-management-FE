/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {}, []);

  const hasEmptyValues = (obj) => {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  };

  const notify = () => toast("User Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding User!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addUser = async () => {
    console.log(userData);

    if (hasEmptyValues(userData)) {
      notifyWarning();
      return;
    }

    try {
      await axios.post("http://localhost:8080/users/add", userData);
      // Reset the form fields
      setUserData({
        name: "",
        email: "",
        role: "",
      });
      notify();
    } catch (error) {
      notifyError();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="cardss">
        <h1>Add User</h1>

        <div className="form-group">
          <label htmlFor="name" className="required">
            Name
          </label>
          <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="required">
            Email
          </label>
          <input type="text" id="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="role" className="required">
            Role
          </label>
          <select id="role" name="role" value={userData.role} onChange={handleInputChange}>
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>

        <button className="submitBtn" type="button" onClick={addUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
