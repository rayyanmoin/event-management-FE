/** @format */
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const EventRSVP = () => {
  const [eventRSVP, setEventRSVP] = useState([]);
  const defaultPageSize = 20;

  // Fetch EventRSVP data from API
  const fetchEventRSVP = async () => {
    try {
      const response = await axios.get("http://localhost:8080/eventrsvp/list");
      console.log("API Response:", response.data); // Debugging API response
      setEventRSVP(response.data);
    } catch (error) {
      console.error("Error fetching EventRSVP:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEventRSVP();
  }, []);

  // Define columns for the grid
  const columnDefs = [
    { headerName: "Id", field: "id", width: 115 },
    { headerName: "User", field: "user", width: 240 },
    { headerName: "Event", field: "event", width: 300 },
    { headerName: "Status", field: "status", width: 130 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "800px", margin: "0 auto" }}>
      {eventRSVP.length > 0 ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>EventRSVPs List</h1>
          <AgGridReact columnDefs={columnDefs} rowData={eventRSVP} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EventRSVP;
