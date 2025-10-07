"use client";

import React, { useState } from "react";
import { Search, TrendingUp, Star, LogOut } from "lucide-react";

type Filters = {
  timeWeeks: string[];
  timeMonths: string[];
  techStack: string[];
};

type FilterCategory = keyof Filters;

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>({
    timeWeeks: [],
    timeMonths: [],
    techStack: [],
  });

  const timeWeekOptions = ["1 Week", "2 Week", "3 Week"];
  const timeMonthOptions = ["1 Month", "2 Months", "3 Months"];
  const techStackOptions = [
    "FireBase",
    "MongoDB",
    "PostgresSQL",
    "React",
    "Angular",
    "Vue",
  ];

  const projects = Array(8)
    .fill(null)
    .map((_, index) => ({
      id: index,
      title: "IOT Robot Car",
      description: "ESP 32 Based , Wifi & Bluetooth Control",
      image: "/api/placeholder/208/128",
    }));

  const toggleFilter = (category: FilterCategory, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[category] || [];

      if (category === "techStack") {
        return {
          ...prev,
          [category]: currentArray.includes(value) ? [] : [value],
        };
      } else {
        return {
          ...prev,
          [category]: currentArray.includes(value)
            ? currentArray.filter((item) => item !== value)
            : [...currentArray, value],
        };
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "320px",
          backgroundColor: "white",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Bar */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Search
              style={{
                width: "16px",
                height: "16px",
                color: "#6b7280",
                marginRight: "12px",
              }}
            />
            <span
              style={{ color: "#9ca3af", fontSize: "14px", fontWeight: "500" }}
            >
              Search
            </span>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{ flex: "1" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "black",
              marginBottom: "24px",
            }}
          >
            Filters
          </h2>
          <div
            style={{ borderBottom: "1px solid #e5e7eb", marginBottom: "24px" }}
          ></div>

          {/* Time Filters */}
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Approx Required Time
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {timeWeekOptions.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={filters.timeWeeks.includes(option)}
                      onChange={() => toggleFilter("timeWeeks", option)}
                    />
                    <span
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {timeMonthOptions.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px" }}
                      checked={filters.timeMonths.includes(option)}
                      onChange={() => toggleFilter("timeMonths", option)}
                    />
                    <span
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Tech Stack
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {techStackOptions.map((tech) => (
                <label
                  key={tech}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="techStack"
                    style={{ width: "16px", height: "16px" }}
                    checked={filters.techStack.includes(tech)}
                    onChange={() => toggleFilter("techStack", tech)}
                  />
                  <span
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {tech}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ marginTop: "auto" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#374151",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <LogOut style={{ width: "16px", height: "16px" }} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", padding: "32px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <TrendingUp
              style={{ width: "24px", height: "24px", color: "black" }}
            />
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "black",
                margin: "0",
              }}
            >
              Trending
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "16px", color: "#6b7280" }}>Sign In</span>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "black",
                borderRadius: "4px",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{ borderBottom: "1px solid #e5e7eb", marginBottom: "32px" }}
        ></div>

        {/* Trending Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {projects.slice(0, 4).map((project) => (
            <div
              key={`trending-${project.id}`}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "24px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  borderRadius: "16px",
                  height: "160px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "8px 12px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "12px",
                      backgroundColor: "#9ca3af",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
              </div>
              <h3
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>

        {/* Best Suited Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <Star style={{ width: "24px", height: "24px", color: "black" }} />
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "black",
              margin: "0",
            }}
          >
            Best Suited For You
          </h2>
        </div>

        <div
          style={{ borderBottom: "1px solid #e5e7eb", marginBottom: "32px" }}
        ></div>

        {/* Best Suited Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {projects.slice(4, 8).map((project) => (
            <div
              key={`suited-${project.id}`}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "24px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  borderRadius: "16px",
                  height: "160px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "8px 12px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "12px",
                      backgroundColor: "#9ca3af",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
              </div>
              <h3
                style={{
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
