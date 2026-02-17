import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// SPA redirect: pick up path stored by 404.html and navigate to it
const redirectPath = sessionStorage.getItem('spa-redirect');
if (redirectPath && redirectPath !== '/') {
  sessionStorage.removeItem('spa-redirect');
  history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);