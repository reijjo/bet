import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  AddBet,
  Bets,
  Dashboard,
  Homepage,
  Layout,
  UserLayout,
} from "./components";
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
          <Route path="*" element={<h1>404</h1>} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/add-bet" element={<AddBet />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
