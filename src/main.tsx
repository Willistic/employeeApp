import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { EmployeeProvider } from "./features/employees/EmployeeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
