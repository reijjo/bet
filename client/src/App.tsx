import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bets, Dashboard, Homepage, Layout, UserLayout } from "./components";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

function App() {
  const reduxState = useAppSelector((state: RootState) => state);

  // const testDate = new Date();
  // console.log("TEST DATE", testDate);
  console.log("REDUX STATE", reduxState);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/bets" element={<Bets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
