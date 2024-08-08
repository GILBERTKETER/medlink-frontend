"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Welcome from "./onboarding/welcome-to-medlink/index";
import "@arco-design/web-react/dist/css/arco.css";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <Welcome />
    </div>
  );
}
