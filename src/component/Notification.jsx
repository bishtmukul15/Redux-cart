// src/components/UI/Notification.js
import React from "react";

const Notification = ({ status, title, message }) => {
  let bgColor = "#ccc";

  if (status === "error") bgColor = "#ff8080";
  if (status === "success") bgColor = "#80ff80";
  if (status === "pending") bgColor = "#ffff80";

  return (
    <section
      style={{
        backgroundColor: bgColor,
        padding: "1rem",
        margin: "1rem",
        borderRadius: "10px",
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
