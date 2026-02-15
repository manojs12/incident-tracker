import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function IncidentCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV2",
    status: "OPEN",
    owner: "",
    summary: ""
  });

  const services = [
    "Billing",
    "Payments",
    "Login",
    "Notifications",
    "Analytics"
  ];

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  async function create() {
    if (!form.title || !form.service || !form.status || !form.summary) {
      alert("Title, Service, Status, Summary are mandatory");
      return;
    }

    await api.post("/incidents", form);
    alert("Incident Created Successfully");
    navigate("/");
  }

  function cancel() {
    navigate("/");
  }

  return (
    <div className="container mt-4">
      <h2>Create Incident</h2>

      {/* Title */}
      <div className="mb-3">
        <label>Title *</label>
        <input
          className="form-control"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter incident title"
        />
      </div>

      {/* Service Dropdown */}
      <div className="mb-3">
        <label>Service *</label>
        <select
          className="form-control"
          value={form.service}
          onChange={(e) => updateField("service", e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Severity Radio */}
      <div className="mb-3">
        <label>Severity</label><br />
        {["SEV1", "SEV2", "SEV3", "SEV4"].map(sev => (
          <label key={sev} className="me-3">
            <input
              type="radio"
              value={sev}
              checked={form.severity === sev}
              onChange={(e) => updateField("severity", e.target.value)}
            /> {sev}
          </label>
        ))}
      </div>

        {/* Status Dropdown */}
        <div className="mb-3">
          <label>Status *</label>
          <select
            className="form-control"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="">Select status</option>
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>


      {/* Assigned To */}
      <div className="mb-3">
        <label>Assigned To </label>
        <input
          className="form-control"
          value={form.owner}
          onChange={(e) => updateField("owner", e.target.value)}
          placeholder="Optional"
        />
      </div>

      {/* Summary */}
      <div className="mb-3">
        <label>Summary *</label>
        <textarea
          className="form-control"
          rows="3"
          value={form.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Describe the issue..."
        />
      </div>

      {/* Buttons */}
      <button className="btn btn-success me-2" onClick={create}>
        Create Incident
      </button>

      <button className="btn btn-secondary" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
}
