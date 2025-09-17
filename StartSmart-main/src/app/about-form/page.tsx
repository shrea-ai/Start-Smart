"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../style.css"; // Adjust path if your CSS is located elsewhere

// Import Realtime Database helpers and config
import { ref, set } from "firebase/database";
import { db } from "../firebaseconfig"; // Uses Realtime Database instance (getDatabase)

const AboutPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleContinue = async () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    try {
      // Create a safe key from the name (replace characters that Firebase doesn't allow in keys)
      const safeKey = name.trim().replace(/[.#$\/\[\]]/g, '_');
      
      // Create a reference to the "users" node with the safe key
      const userRef = ref(db, `users/${safeKey}`);
      
      // Save the user data with name as the node key
      await set(userRef, {
        name: name.trim(),
        createdAt: Date.now(),
      });

      console.log("Data saved with key:", safeKey);
      
      // Store both the original name and safe key for future use
      localStorage.setItem('username', name.trim());
      localStorage.setItem('userKey', safeKey);
      
      // Navigate to next page after successful save
      router.push(`/branch-form?username=${encodeURIComponent(name.trim())}&userKey=${encodeURIComponent(safeKey)}`);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error("Error saving data: ", e);
      alert("Something went wrong: " + errorMessage);
    }
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
        Welcome!! Let&apos;s get to know you for finding your project
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
        This is where you can share your skills and interests to get
        personalized project matches.
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
          onKeyDown={(e) => {
            // Optional: Allow Enter key to submit
            if (e.key === "Enter") {
              e.preventDefault();
              handleContinue();
            }
          }}
        />
      </div>

      <button
        className="cta-button"
        style={{ fontSize: "18px", padding: "14px 28px" }}
        onClick={handleContinue}
        type="button"
      >
        lets start!!
      </button>
    </div>
  );
};

export default AboutPage;