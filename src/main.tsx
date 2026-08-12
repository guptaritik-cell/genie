import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PhoneFrame } from "./components/PhoneFrame";
import { PreferenceClarifyScreen } from "./screens/PreferenceClarifyScreen";
import { SwipeRefineScreen } from "./screens/SwipeRefineScreen";

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<"clarify" | "swipe">("clarify");

  return (
    <PhoneFrame>
      {currentScreen === "clarify" ? (
        <PreferenceClarifyScreen onProceed={() => setCurrentScreen("swipe")} />
      ) : (
        <SwipeRefineScreen onBack={() => setCurrentScreen("clarify")} />
      )}
    </PhoneFrame>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
);
