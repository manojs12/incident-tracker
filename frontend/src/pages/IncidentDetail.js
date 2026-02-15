import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState({});
  const [editData, setEditData] = useState({});

  async function load() {
    const res = await api.get(`/incidents/${id}`);
    setIncident(res.data);
    setEditData(res.data);   // copy for editing
  }

  async function save() {
    await api.patch(`/incidents/${id}`, editData);
    alert("Incident Updated Successfully");
    navigate("/");
  }

  function cancel() {
    navigate("/");
  }

  useEffect(() => { load(); }, [id]);

  return (
    <div className="container mt-4">
      <h2>Edit Incident</h2>

      <div className="mb-2">
        <label>Title</label>
        <input className="form-control" value={incident.title || ""} disabled />
      </div>

      <div className="mb-2">
        <label>Service</label>
        <input className="form-control" value={incident.service || ""} disabled />
      </div>

      <div className="mb-2">
        <label>Severity</label>
        <select className="form-control"
          value={editData.severity || ""}
          onChange={e => setEditData({...editData, severity: e.target.value})}>
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Status</label>
        <select className="form-control"
          value={editData.status || ""}
          onChange={e => setEditData({...editData, status: e.target.value})}>
          <option>OPEN</option>
          <option>MITIGATED</option>
          <option>RESOLVED</option>
        </select>
      </div>

      <div className="mb-2">
        <label>Assigned To</label>
        <input className="form-control"
          value={editData.owner || ""}
          onChange={e => setEditData({...editData, owner: e.target.value})}/>
      </div>

      <div className="mb-2">
        <label>Occurred At</label>
        <input
          type="text"
          className="form-control"
          value={
            incident.createdAt
              ? new Date(incident.createdAt).toLocaleString()
              : ""
          }
          readOnly
        />
      </div>



      <div className="mb-2">
        <label>Summary</label>
        <textarea className="form-control"
          value={editData.summary || ""}
          onChange={e => setEditData({...editData, summary: e.target.value})}/>
      </div>

      <button className="btn btn-success me-2" onClick={save}>
        Save
      </button>

      <button className="btn btn-secondary" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
}
