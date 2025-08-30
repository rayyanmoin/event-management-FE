/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

export const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    createdBy: "", // default empty string, will become a number
    eventTime: "",
  });

  const [users, setUsers] = useState([]); // store users for dropdown

  useEffect(() => {
    // Fetch users for dropdown
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/droplist");
        setUsers(response.data); // assuming API returns [{id: 1, name: "John"}, {id: 2, name: "Sara"}]
      } catch (error) {
        console.error("Error fetching users:", error);
        toast("Error fetching users", { type: "error" });
      }
    };

    fetchUsers();
  }, []);

  const hasEmptyValues = (obj) => {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  };

  const notify = () => toast("Event Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Event!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const AddEventHandler = async () => {
    console.log(eventData);

    if (hasEmptyValues(eventData)) {
      notifyWarning();
      return;
    }

    try {
      await axios.post("http://localhost:8080/events/add", eventData);
      // Reset the form fields
      setEventData({
        title: "",
        description: "",
        location: "",
        eventDate: "",
        createdBy: "",
        eventTime: "",
      });
      notify();
    } catch (error) {
      notifyError();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEventData((prevState) => {
      let newValue = value;

      // Ensure createdBy is a number
      if (name === "createdBy") {
        newValue = Number(value);
      }

      // Ensure eventTime is in HH:mm:ss format
      if (name === "eventTime" && value) {
        newValue = value.length === 5 ? `${value}:00` : value; // if "23:30" -> "23:30:00"
      }

      return {
        ...prevState,
        [name]: newValue,
      };
    });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="cardsss">
        <h1>Add Event</h1>

        <div className="form-group">
          <label htmlFor="title" className="required">
            Title
          </label>
          <input type="text" id="title" name="title" value={eventData.title} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="required">
            Description
          </label>
          <input type="text" id="description" name="description" value={eventData.description} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="required">
            Location
          </label>
          <input type="text" id="location" name="location" value={eventData.location} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate" className="required">
            Event Date
          </label>
          <input type="date" id="eventDate" name="eventDate" value={eventData.eventDate} onChange={handleInputChange} />
        </div>

        {/* Dropdown for Created By */}
        <div className="form-group">
          <label htmlFor="createdBy" className="required">
            Created By
          </label>
          <select id="createdBy" name="createdBy" value={eventData.createdBy} onChange={handleInputChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="eventTime" className="required">
            Event Time
          </label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={eventData.eventTime.replace(/:00$/, "")}
            // show only HH:mm in input, but keep HH:mm:ss in state
            onChange={handleInputChange}
          />
        </div>

        <button className="submitBtn" type="button" onClick={AddEventHandler}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
