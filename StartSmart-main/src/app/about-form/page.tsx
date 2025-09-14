"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../style.css"; // Adjust path if your CSS is located elsewhere

const AboutPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    // Navigate to branch-form with name as query param
    router.push(`/branch-form?name=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div
      id="app"
      style={{
        padding: "120px 24px",
        textAlign: "center",
        minHeight: "100vh",
        color: "#1f2937",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "24px",
        }}
      >
        Welcome!! Let's get to know you for finding your project
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#6b7280",
          marginBottom: "40px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        This is where you can share your skills and interests to get personalized project matches.
      </p>

      <div style={{ marginBottom: "24px" }}>
        <label
          htmlFor="nameInput"
          style={{
            display: "block",
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
            textAlign: "left",
            maxWidth: "400px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          What should we call you?
        </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outlineColor: "#6366f1",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            boxSizing: "border-box",
          }}
        />
      </div>

      <button
        className="cta-button"
        style={{ fontSize: "18px", padding: "14px 28px" }}
        onClick={handleContinue}
      >
        lets start!!
      </button>
    </div>
  );
};

export default AboutPage;
