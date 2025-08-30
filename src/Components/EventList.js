/** @format */
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./Styles.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Event = () => {
  const [event, setEvent] = useState([]);
  const defaultPageSize = 20;

  // Fetch Event data from API
  const fetchEvent = async () => {
    try {
      const response = await axios.get("http://localhost:8080/events/list");
      console.log("API Response:", response.data); // Debugging API response
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching Event:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEvent();
  }, []);

  // Define columns for the grid
  const columnDefs = [
    { headerName: "Id", field: "id", width: 70 },
    { headerName: "Title", field: "title", width: 180 },
    { headerName: "Description", field: "description", width: 320 },
    { headerName: "Location", field: "location", width: 150 },
    { headerName: "Date", field: "eventDate", width: 120 },
    { headerName: "CreatedBy", field: "createdBy", width: 120 },
    { headerName: "Time", field: "eventTime", width: 100 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "300px", width: "800px", margin: "0 auto" }}>
      {event.length > 0 ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>Events List</h1>
          <AgGridReact columnDefs={columnDefs} rowData={event} pagination={true} paginationPageSize={defaultPageSize} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Event;
