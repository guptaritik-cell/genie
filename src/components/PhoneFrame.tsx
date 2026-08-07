import type { ReactNode } from "react";

// Dev-only mobile device mockup: centers the screen in a phone-shaped frame
// when viewed on a desktop-width viewport, instead of stretching it full-bleed.
const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 844;

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        padding: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          maxHeight: "calc(100dvh - 48px)",
          borderRadius: "48px",
          border: "10px solid #1a1a1a",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.6)",
          overflow: "hidden",
          background: "#0d0d0d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
