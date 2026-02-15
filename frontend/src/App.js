import { BrowserRouter, Routes, Route } from "react-router-dom";
import IncidentList from "./pages/IncidentList";
import IncidentCreate from "./pages/IncidentCreate";
import IncidentDetail from "./pages/IncidentDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<IncidentCreate />} />
        <Route path="/incident/:id" element={<IncidentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
