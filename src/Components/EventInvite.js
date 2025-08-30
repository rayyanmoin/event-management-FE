/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dropdown.css";

const EventInvite = () => {
  const [eventInvite, setEventInvite] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:8080/events/droplist")
      .then((res) => {
        let items = res.data;
        if (items.data) items = items.data; // unwrap if wrapped
        if (!Array.isArray(items)) items = []; // ensure array
        console.log("Normalized Data:", items);
        setEventInvite(items);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        alert("Failed to load event invites");
      })
      .finally(() => setLoading(false));
  }, []);

  // Send invite
  const sendInvite = () => {
    if (!selectedId) {
      alert("Please select an Event");
      return;
    }

    axios
      .get(`http://localhost:8080/api/event-invites/send/${selectedId}`)
      .then(() => alert("Invite sent successfully!"))
      .catch((err) => {
        console.error("Error sending invite:", err);
        alert("Failed to send invite");
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ paddingTop: "90px", color: "black" }}>Send Event Invite</h2>

      {loading ? (
        <p>Loading invites...</p>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <select className="dropdown" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">Select Event Invite</option>
            {eventInvite.map((invite, index) => (
              <option key={invite.id || index} value={invite.id}>
                {invite.title}
              </option>
            ))}
          </select>

          <button className="invite-btn" onClick={sendInvite}>
            Send Invite
          </button>
        </div>
      )}
    </div>
  );
};

export default EventInvite;
