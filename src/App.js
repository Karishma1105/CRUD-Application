import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPricingCrud from "./ViewPricingCrud";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        {/* Only one route is needed since modal handles both add/edit */}
        <Routes>
          <Route path="/" element={<ViewPricingCrud />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
