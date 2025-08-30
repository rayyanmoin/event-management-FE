/** @format */
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";



const User = () => {
  const [user, setUser] = useState([]);
  const defaultPageSize = 20; 

  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/list");
      console.log("API Response:", response.data); // Debugging API response
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching User:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Define columns for the grid
  const columnDefs = [
    { headerName: "Id", field: "id", width: 110 },
    { headerName: "Name", field: "name", width: 220 },
    { headerName: "Email", field: "email", width: 360 },
    { headerName: "Role", field: "role", width: 200 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "800px", margin: "0 auto" }}>
      {user.length > 0 ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Users List</h1>
          <AgGridReact columnDefs={columnDefs} rowData={user} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default User;
