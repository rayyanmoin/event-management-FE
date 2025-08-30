/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";

const AddRSVP = () => {
  const [formData, setFormData] = useState({
    user: "",
    event: "",
    status: "",
  });

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  // ✅ Helper functions
  const hasEmptyValues = (obj) => {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  };

  const notify = () => toast("EventRSVP Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding EventRSVP!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/droplist");
        setUsers(res.data); // expected format: [{id: 1, name: "John"}, ...]
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/events/droplist");
        setEvents(res.data); // expected format: [{id: 1, title: "Party"}, ...]
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" || name === "eventId" ? Number(value) : value, // convert ids to numbers
    }));
  };

  const handleSubmit = async () => {
    if (hasEmptyValues(formData)) {
      notifyWarning();
      return;
    }

    try {
      // 👉 Post to your backend
      await axios.post("http://localhost:8080/eventrsvp/add", formData);
      notify();
      setFormData({ user: "", event: "", status: "" }); // reset form
    } catch (error) {
      console.error("Error saving RSVP:", error);
      notifyError();
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="cardss">
        <h1>Add RSVP</h1>

        {/* User Dropdown */}
        <div className="form-group">
          <label htmlFor="user">User</label>
          <select id="user" name="user" value={formData.user} onChange={handleChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Event Dropdown */}
        <div className="form-group">
          <label htmlFor="event">Event</label>
          <select id="event" name="event" value={formData.event
        } onChange={handleChange}>
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="MAY BE">MAY BE</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>

        <button className="submitBtn" onClick={handleSubmit}>
          Add Rsvp
        </button>
      </div>
    </div>
  );
};

export default AddRSVP;
