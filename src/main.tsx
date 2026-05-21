
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  // Keep Tailwind compiled utilities only. Removed other global styles so components use Tailwind classes.
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  