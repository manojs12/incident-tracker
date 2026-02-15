import React from "react";

export default function IncidentTable({ incidents, onView }) {

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  }

  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Service</th>
          <th>Severity</th>
          <th>Status</th>
          <th>Owner</th>        {/* NEW */}
          <th>Created At</th>   {/* NEW */}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {incidents.length === 0 && (
          <tr>
            <td colSpan="7" className="text-center">
              No Incidents Found
            </td>
          </tr>
        )}

        {incidents.map(i => (
          <tr key={i.id}>
            <td>{i.title}</td>
            <td>{i.service}</td>
            <td>
              <span className={
                i.severity === "SEV1" ? "badge bg-danger" :
                i.severity === "SEV2" ? "badge bg-warning" :
                "badge bg-secondary"
              }>
                {i.severity}
              </span>
            </td>
            <td>{i.status}</td>

            {/* OWNER */}
            <td>{i.assignedTo || "-"}</td>

            {/* CREATED AT */}
            <td>{formatDate(i.createdAt)}</td>

            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onView(i.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
