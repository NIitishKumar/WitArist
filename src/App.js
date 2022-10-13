import logo from "./logo.svg";
import "./App.css";
import Vendor from "./Vendor/Vendor";
import Resource from "./Resourse/Resource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vendor />} />
          <Route path="/resourse" element={<Resource />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <Vendor />
      <Resource /> */}
    </div>
  );
}

export default App;
