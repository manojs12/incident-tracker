import React, { useEffect, useState } from "react";
import api from "../api/api";
import IncidentTable from "../components/IncidentTable";
import { useNavigate } from "react-router-dom";

export default function IncidentList() {

  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  async function load() {
    try {
      const res = await api.get(`/incidents`, {
        params: {
          page,
          size: 10,
          search: search || undefined,
          service: service || undefined,
          status: status || undefined,
          severity: severity || undefined
        }
      });

      setIncidents(res.data.content);
      setTotalPages(res.data.totalPages);

    } catch (e) {
      console.error("Load error:", e);
      alert("Failed to load incidents");
    }
  }

  useEffect(() => {
    load();
  }, [page]);

  function applyFilter() {
    setPage(0);
    load();
  }

  return (
    <div className="container mt-4">

      <h2>Incident Tracker</h2>

      {/* ===== FILTER SECTION ===== */}
      <div className="mb-3 d-flex gap-2 flex-wrap">

        {/* SEARCH */}
        <input
          className="form-control"
          style={{maxWidth:"200px"}}
          placeholder="Search title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SERVICE */}
        <select
          className="form-select"
          style={{maxWidth:"160px"}}
          value={service}
          onChange={(e)=>setService(e.target.value)}
        >
          <option value="">All Services</option>
          <option>Billing</option>
          <option>Network</option>
          <option>Database</option>
          <option>API</option>
        </select>

        {/* STATUS */}
        <select
          className="form-select"
          style={{maxWidth:"150px"}}
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option>OPEN</option>
          <option>ACK</option>
          <option>CLOSED</option>
        </select>

        {/* SEVERITY */}
        <select
          className="form-select"
          style={{maxWidth:"150px"}}
          value={severity}
          onChange={(e)=>setSeverity(e.target.value)}
        >
          <option value="">All Severity</option>
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>

        <button className="btn btn-primary" onClick={applyFilter}>
          Apply
        </button>

        <button
          className="btn btn-success ms-auto"
          onClick={() => navigate("/create")}
        >
          Create Incident
        </button>

      </div>

      {/* ===== TABLE ===== */}
      <IncidentTable
        incidents={incidents}
        onView={(id) => navigate(`/incident/${id}`)}
      />

      {/* ===== PAGINATION ===== */}
      <div className="mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap">

        <button
          className="btn btn-secondary"
          disabled={page===0}
          onClick={() => setPage(p => p-1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i)
          .filter(p => p >= Math.max(0, page-2) && p <= Math.min(totalPages-1, page+2))
          .map(p => (
            <button
              key={p}
              className={`btn ${p===page ? "btn-primary" : "btn-outline-primary"}`}
              onClick={()=>setPage(p)}
            >
              {p+1}
            </button>
          ))}

        <button
          className="btn btn-secondary"
          disabled={page===totalPages-1 || totalPages===0}
          onClick={() => setPage(p => p+1)}
        >
          Next
        </button>

        <span className="ms-3">
          Page <b>{totalPages===0 ? 0 : page+1}</b> of <b>{totalPages}</b>
        </span>

      </div>

    </div>
  );
}
