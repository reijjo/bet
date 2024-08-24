import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Homepage, Layout, UserLayout } from "./components";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  const handleSidebar = () => {
    setOpen(!open);
  };

  console.log("APP side open", open);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
        <Route
          element={<UserLayout open={open} handleSidebar={handleSidebar} />}
        >
          <Route path="/dash" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
