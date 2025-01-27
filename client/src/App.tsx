import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  AddBet,
  Bets,
  Dashboard,
  Homepage,
  Layout,
  Login,
  Register,
  UserLayout,
} from "./components";
import { UnderCons } from "./components/common/fallback/UnderCons";
import { useAppSelector } from "./store/hooks";
import { RootState } from "./store/store";

function App() {
  const reduxState = useAppSelector((state: RootState) => state);

  console.log("REDUX STATE", reduxState);

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bank" element={<UnderCons />} />
          <Route path="/analytics" element={<UnderCons />} />
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
