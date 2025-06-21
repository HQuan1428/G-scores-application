import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";



import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/dashboard";
import SearchScores from "./pages/SearchScores/SearchScores";
import TopTen from "./pages/Reports/Top/TopTen";
import Chart from "./pages/Reports/chart/Chart";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/score" element={<SearchScores />} />
            <Route path="/reports/top" element={<TopTen />} />
            <Route path="/reports/chart" element={<Chart />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
