import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PhoneFrame } from "./components/PhoneFrame";
import { PreferenceClarifyScreen } from "./screens/PreferenceClarifyScreen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhoneFrame>
      <PreferenceClarifyScreen />
    </PhoneFrame>
  </StrictMode>,
);
