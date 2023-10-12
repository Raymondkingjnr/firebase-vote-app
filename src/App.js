import "./App.css";
import { Candidates } from "./pages/Candidates";
import { Route, Routes } from "react-router-dom";
import { PaymentPage } from "./pages/PaymentPage";
// import { ProccedPayment } from "./pages/ProccedPayment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Candidates />} />
      <Route path="/payment/:id" element={<PaymentPage />} />
      {/* <Route path="/procced/:id" element={<ProccedPayment />} /> */}
    </Routes>
  );
}

export default App;
