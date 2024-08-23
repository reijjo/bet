import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Homepage, Layout, UserLayout } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dash" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
