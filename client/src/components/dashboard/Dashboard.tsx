import { Sidebar } from "../navbar-footer/Sidebar";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="wrapper" style={{ border: "1px solid red" }}>
      <Sidebar />
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard</p>
    </div>
  );
};
