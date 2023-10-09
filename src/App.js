import "./App.css";
import { Candidates } from "./Candidates";
import { Route, Routes } from "react-router-dom";
import { PaymentPage } from "./PaymentPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Candidates />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
