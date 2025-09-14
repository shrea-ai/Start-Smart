"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EducationField() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const allBranches = ["SEM I", "SEM II", "SEM III", "SEM IV"];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBranches([]);
      setShowSuggestions(false);
    } else {
      const filtered = allBranches.filter((branch) =>
        branch.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBranches(filtered);
      setShowSuggestions(true);
    }
  }, [searchQuery]);

  const handleBranchClick = (branch: string) => {
    setSelectedBranch(branch);
  };

  const handleCircleClick = () => {
    router.push("/knownskills-form");
  };

  return (
    <div className="container">
      <div className="educationFieldTitle">Enter your current semester</div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter your semester"
        className="branchTitleInput"
      />

      <div className="inputLine"></div>
      <div className="circleIcon" onClick={handleCircleClick}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
        </svg>
      </div>

      {showSuggestions && (
        <div className="suggestionsContainer">
          {filteredBranches.map((branch, index) => (
            <div
              key={branch}
              className={`suggestionItem ${
                selectedBranch === branch ? "selected" : ""
              }`}
              onClick={() => {
                handleBranchClick(branch);
                setSearchQuery(branch);
                setShowSuggestions(false);
              }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {branch}
            </div>
          ))}
        </div>
      )}

      {selectedBranch && (
        <div className="selectedBranchDisplay">
          Selected Branch: {selectedBranch}
        </div>
      )}

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: white;
          overflow: hidden;
        }
        .educationFieldTitle,
        .branchTitle,
        .inputLine,
        .branchOption,
        .civilEngineering,
        .electricalEngineering,
        .computerScience,
        .mechanicalEngineering,
        .circleIcon {
          position: absolute;
          font-family: "Inter", sans-serif;
          word-wrap: break-word;
        }
        .educationFieldTitle {
          width: calc(777 / 1280 * 100vw);
          height: calc(75 / 832 * 100vh);
          left: calc(107 / 1280 * 100vw);
          top: calc(172 / 832 * 100vh);
          color: #444343;
          font-size: clamp(24px, 3.125vw, 40px);
          font-weight: 400;
        }
        .branchTitle {
          width: calc(599 / 1280 * 100vw);
          height: calc(88 / 832 * 100vh);
          left: calc(105 / 1280 * 100vw);
          top: calc(244 / 832 * 100vh);
          color: #e2e2e2;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 400;
        }
        .branchTitleInput {
          position: absolute;
          width: calc(1022 / 1280 * 100vw);
          height: calc(88 / 832 * 100vh);
          left: calc(105 / 1280 * 100vw);
          top: calc(244 / 832 * 100vh);
          color: #e2e2e2;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 400;
          font-family: "Inter", sans-serif;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          border-radius: 8px;
          outline: none;
          word-wrap: break-word;
          transition: border-color 0.3s ease, background-color 0.3s ease;
          cursor: text;
        }
        .branchTitleInput:focus {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }
        .branchTitleInput::placeholder {
          color: rgba(226, 226, 226, 0.7);
        }
        .inputLine {
          width: calc(1022 / 1280 * 100vw);
          height: 0;
          left: calc(111 / 1280 * 100vw);
          top: calc(327 / 832 * 100vh);
          border: 1px #dcdcdc solid;
        }
        .searchInput {
          position: absolute;
          width: calc(1022 / 1280 * 100vw);
          height: calc(50 / 832 * 100vh);
          left: calc(111 / 1280 * 100vw);
          top: calc(280 / 832 * 100vh);
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          padding: 0 15px;
          font-size: clamp(18px, 2.5vw, 32px);
          font-family: "Inter", sans-serif;
          color: #444343;
          background: white;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .searchInput:focus {
          border-color: #007bff;
        }
        .suggestionsContainer {
          position: absolute;
          width: calc(1022 / 1280 * 100vw);
          left: calc(111 / 1280 * 100vw);
          top: calc(375 / 832 * 100vh);
          background: white;
          max-height: calc(300 / 832 * 100vh);
          overflow-y: auto;
          z-index: 10;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .suggestionsContainer::-webkit-scrollbar {
          display: none;
        }
        .suggestionItem {
          padding: 12px 15px;
          font-size: clamp(18px, 2.5vw, 32px);
          font-family: "Inter", sans-serif;
          color: #7a7a7a;
          cursor: pointer;
          transition: background-color 0.3s ease, opacity 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.3s ease forwards;
          border-bottom: 1px solid #f0f0f0;
        }
        .suggestionItem:last-child {
          border-bottom: none;
        }
        .suggestionItem:hover {
          background-color: #f8f9fa;
        }
        .suggestionItem.selected {
          background-color: #e0e0e0;
        }
        .suggestionItem.highlighted {
          background-color: #f8f9fa;
          color: #333;
          text-decoration: underline;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .branchOption {
          color: #7a7a7a;
          font-size: clamp(20px, 2.8vw, 36px);
          font-weight: 400;
          cursor: pointer;
          transition: background-color 0.3s ease;
          padding: 5px 10px;
        }
        .branchOption:hover {
          background-color: #f0f0f0;
          border-radius: 5px;
        }
        .SEM I {
          width: calc(308 / 1280 * 100vw);
          height: calc(47 / 832 * 100vh);
          left: calc(109 / 1280 * 100vw);
          top: calc(375 / 832 * 100vh);
        }
        .SEM II {
          width: calc(419 / 1280 * 100vw);
          height: calc(96 / 832 * 100vh);
          left: calc(108 / 1280 * 100vw);
          top: calc(430 / 832 * 100vh);
        }
        .SEM III {
          width: calc(650 / 1280 * 100vw);
          height: calc(48 / 832 * 100vh);
          left: calc(109 / 1280 * 100vw);
          top: calc(485 / 832 * 100vh);
        }
        .SEM IV {
          width: calc(439 / 1280 * 100vw);
          height: calc(48 / 832 * 100vh);
          left: calc(108 / 1280 * 100vw);
          top: calc(540 / 832 * 100vh);
        }
        .circleIcon {
          left: calc(1070 / 1280 * 100vw);
          top: calc(268 / 832 * 100vh);
          width: calc(40 / 1280 * 100vw);
          height: calc(40 / 832 * 100vh);
        }
        .circleIcon svg {
          width: 100%;
          height: 100%;
        }
        .selected {
          background-color: #e0e0e0;
          border-radius: 5px;
        }
        .selectedBranchDisplay {
          position: absolute;
          top: calc(750 / 832 * 100vh);
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(20px, 3vw, 36px);
          color: #444343;
          font-family: "Inter", sans-serif;
          font-weight: 400;
          word-wrap: break-word;
          text-align: center;
          width: 80%;
          max-width: 600px;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .backArrow {
          position: absolute;
          left: calc(20 / 1280 * 100vw);
          top: calc(20 / 832 * 100vh);
          width: calc(40 / 1280 * 100vw);
          height: calc(40 / 832 * 100vh);
          cursor: pointer;
          color: #333;
          transition: opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
        }
        .backArrow.visible {
          opacity: 1;
          pointer-events: auto;
        }
        .backArrow:hover {
          color: #555;
        }
        .backArrow svg {
          width: 100%;
          height: 100%;
        }
        .projectSummaryText {
          position: absolute;
          width: 80%;
          max-width: 783px;
          height: auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #444343;
          font-size: clamp(36px, 5vw, 64px);
          font-family: "Inter", sans-serif;
          font-weight: 400;
          word-wrap: break-word;
          overflow: hidden;
          border-right: 0.01em solid #444343;
          letter-spacing: 0.05em;
          white-space: nowrap;
          display: inline-block;
          animation: typing 8s linear forwards,
            blink-caret 0.75s step-end infinite;
          animation-fill-mode: forwards;
        }
        @keyframes typing {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #444343;
          }
        }
        @media (max-width: 768px) {
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 5vh;
          }
          .educationFieldTitle,
          .branchTitle,
          .branchTitleInput,
          .inputLine,
          .searchInput,
          .suggestionsContainer,
          .civilEngineering,
          .electricalEngineering,
          .computerScience,
          .mechanicalEngineering,
          .circleIcon {
            position: relative;
            left: auto;
            top: auto;
            margin-left: auto;
            margin-right: auto;
            width: 90%;
            max-width: none;
            height: auto;
            text-align: center;
            font-size: clamp(20px, 4vw, 40px);
          }
          .educationFieldTitle {
            margin-top: 5vh;
          }
          .branchTitle {
            margin-top: 3vh;
          }
          .searchInput {
            margin-top: 2vh;
            height: 50px;
          }
          .inputLine {
            margin-top: 2vh;
          }
          .suggestionsContainer {
            margin-top: 1vh;
          }
          .branchOption {
            width: 100%;
            margin-bottom: 10px;
          }
          .civilEngineering,
          .electricalEngineering,
          .computerScience,
          .mechanicalEngineering {
            margin-top: 1vh;
          }
          .circleIcon {
            margin-top: 3vh;
            width: 40px;
            height: 40px;
          }
          .selectedBranchDisplay {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin-top: 3vh;
          }
        }
      `}</style>
    </div>
  );
}
