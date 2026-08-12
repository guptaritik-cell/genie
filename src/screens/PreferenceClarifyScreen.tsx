import { useEffect, useState } from "react";
import popCoinIcon from "@/assets/pop-coin.png";
import chatBg from "@/assets/chat/chat-bgdd.png";
import sendIconStroke from "@/assets/chat/s4b-icon-stroke1.svg";

// ─── Adapted from Genie-shared-new_ui_for_later_merge/src/routes/chat.tsx ─────

const FIRST_NAME = "Mark";
const BALANCE = 2900;

const CLARIFY_TITLE_LINE1 = `Hey ${FIRST_NAME}, pick options that best suit`;
const CLARIFY_TITLE_LINE2 = "you so i can start suggesting you";
const CLARIFY_TITLE_LINE3 = "products. You can select multiple.";

const PRIOR_GENIE_TEXT =
  "Discover the perfect blend of comfort and style with our newest range of shirts, designed to elevate your wardrobe for any occasion. Whether you're dressing up for a formal event or keeping it casual for";

const ROW1 = ["Formal", "Casual", "Checked", "Printed", "Formal"];
const ROW2 = ["Formal", "Printed", "Casual", "Checked", "Printed"];

/* -------------------------------------------------------------------------- */
/*                              CHIP ANIMATION                                */
/* -------------------------------------------------------------------------- */

const CHIP_POP_STYLE = `
@keyframes chip-pop {
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.06);
  }

  100% {
    transform: scale(1);
  }
}
`;

/* -------------------------------------------------------------------------- */
/*                              TOP BAR                                       */
/* -------------------------------------------------------------------------- */

function ChatTopBar({
  balance,
  onBack,
  onOpenHistory,
}: {
  balance: number;
  onBack?: () => void;
  onOpenHistory?: () => void;
}) {
  const chipBalance =
    balance >= 1000 ? `${(balance / 1000).toFixed(1)}k` : String(balance);

  return (
    <div 
      className="absolute content-stretch flex flex-col items-start left-0 right-0 overflow-clip z-20"
      style={{
        top: 0,
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="flex gap-[8px] h-[48px] items-center px-[12px] relative shrink-0 w-full">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center shrink-0"
          style={{
            padding: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Back"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2929 13.2929C19.6834 12.9024 20.3164 12.9024 20.707 13.2929C21.0975 13.6834 21.0975 14.3164 20.707 14.707L15.414 19.9999L20.707 25.2929C21.0975 25.6834 21.0975 26.3164 20.707 26.707C20.3164 27.0975 19.6834 27.0975 19.2929 26.707L13.2929 20.707C12.9024 20.3164 12.9024 19.6834 13.2929 19.2929L19.2929 13.2929Z"
              fill="#E6E6E6"
            />
          </svg>
        </button>

        <div className="flex-1 min-w-px" />

        <div className="flex gap-[8px] items-center shrink-0">

          {/* History icon button */}
          <button
            onClick={onOpenHistory}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "none",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
            aria-label="Recent chats"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 22C22.5523 22 23 22.4477 23 23C23 23.5523 22.5523 24 22 24H11C10.4477 24 10 23.5523 10 23C10 22.4477 10.4477 22 11 22H29C29.5523 24 30 23.5523 30 23C30 22.4477 29.5523 22 29 22H11ZM29 16C29.5523 16 30 16.4477 30 17C30 17.5523 29.5523 18 29 18H11C10.4477 18 10 17.5523 10 17C10 16.4477 10.4477 16 11 16H29Z"
                fill="#E6E6E6"
              />
            </svg>
          </button>

          {/* POPcoin badge */}
          <div
            className="flex gap-[2px] items-center justify-center shrink-0 rounded-[999px] px-[8px] py-[4px]"
            style={{
              background:
                "radial-gradient(circle at 50% -28%, rgba(70,70,70,1) 17.5%, rgba(50,50,50,1) 55%, rgba(31,31,31,1) 93%)",
            }}
          >
            <img
              decoding="async"
              alt=""
              style={{
                width: 16,
                height: 16,
                flexShrink: 0,
              }}
              src={popCoinIcon}
            />

            <p className="font-['Figtree'] font-medium leading-[20px] overflow-hidden text-[14px] text-[#e6e6e6] text-center text-ellipsis whitespace-nowrap">
              {chipBalance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              CHAT INPUT                                    */
/* -------------------------------------------------------------------------- */

function ChatInputCard() {
  return (
    <div
      className="absolute left-1/2"
      style={{
        bottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
        transform: "translateX(-50%)",
        width: "369px",
        maxWidth: "calc(100% - 24px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "28px",
          width: "369px",
          height: "104px",
          pointerEvents: "none",
          background:
            "radial-gradient(105.65% 187.5% at 50% -21.43%, rgba(255,152,88,0.25) 3.86%, rgba(255,82,0,0.15) 28.43%, rgba(205,52,1,0.05) 55.29%, transparent 100%)",
          filter: "blur(22px)",
        }}
      />

      <div
        className="revolving-border-input"
        style={{
          height: "104px",
          width: "369px",
          maxWidth: "100%",
        }}
      >
        <div className="revolving-border-inner">
          <p
            style={{
              position: "absolute",
              top: "20px",
              left: "24px",
              fontFamily: "Figtree",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Chat with POPgenie
          </p>

          <button
            disabled
            aria-label="Send"
            className="absolute flex items-center justify-center rounded-full transition-opacity"
            style={{
              bottom: "16px",
              right: "20px",
              width: "36px",
              height: "36px",
              background: "none",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              opacity: 0.4,
              cursor: "default",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11.5V2.5M7 2.5L2.5 7M7 2.5L11.5 7"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ANIMATED COUNTER                              */
/* -------------------------------------------------------------------------- */

function AnimatedCounter({ value }: { value: number }) {
  // Ensure minimum display value matches prior logic (shows 1 when 0 are selected)
  const displayValue = value > 0 ? value : 1;
  
  // Total maximum options possible based on ROW1 and ROW2 lengths is 10.
  // Rendering up to 15 to be safe and cover potential extra selections.
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const lineHeight = 20;

  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        height: `${lineHeight}px`,
        overflow: "hidden",
        position: "relative",
        // Adding the feather (fade) effect to the top and bottom bounds
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          // Fluid transition resembling a slot ticker
          transition: "transform 450ms cubic-bezier(0.5, 0, 0.5, 1)",
          transform: `translateY(-${(displayValue - 1) * lineHeight}px)`,
        }}
      >
        {numbers.map((num) => (
          <span
            key={num}
            style={{
              height: `${lineHeight}px`,
              lineHeight: `${lineHeight}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}


/* -------------------------------------------------------------------------- */
/*                              CHIP COMPONENT                                */
/* -------------------------------------------------------------------------- */

function PreferenceChip({
  id,
  label,
  selected,
  isAnimating,
  onClick,
}: {
  id: string;
  label: string;
  selected: boolean;
  isAnimating: boolean;
  onClick: () => void;
}) {
  return (
    <div
      key={id}
      onClick={onClick}
      className="clickable-chip"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: "pointer",
        padding: "6px",
        margin: "-6px 0",
        animation: isAnimating
          ? "chip-pop 450ms cubic-bezier(0.5, 0, 0.5, 1)"
          : "none",
        willChange: isAnimating ? "transform" : "auto",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: selected ? "8.5px 10.5px" : "9px 11px",
          height: "36px",
          background: "#1F1F1F",
          border: selected
            ? "0.5px solid #FFFFFF"
            : "0.5px solid transparent",
          boxSizing: "border-box",
          borderRadius: "10px",
          fontFamily: "Figtree",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#E6E6E6",
          whiteSpace: "nowrap",
          transition:
            "border-color 450ms cubic-bezier(0.5, 0, 0.5, 1), padding 450ms cubic-bezier(0.5, 0, 0.5, 1)",
          overflow: "visible",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN SCREEN                                   */
/* -------------------------------------------------------------------------- */

export function PreferenceClarifyScreen({ onProceed }: { onProceed?: () => void }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [animatingChipId, setAnimatingChipId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const hasSelection = selectedIds.size > 0;

  const SYMMETRIC_TIMING =
    "1000ms cubic-bezier(0.54, -0.12, 0.36, 1.12)";

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleChip = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    setAnimatingChipId(id);
    setTimeout(() => {
      setAnimatingChipId((current) =>
        current === id ? null : current
      );
    }, 450);
  };

  const handleProceed = () => {
    console.log("Proceed with", Array.from(selectedIds));
    onProceed?.();
  };

  // const handleSkip = () => {
  //   console.log("Skipped");
  // };

  return (
    <div
      className="bg-[#0d0d0d] relative overflow-hidden"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <style>{CHIP_POP_STYLE}</style>

      {/* Background */}
      <img
        decoding="async"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        src={chatBg}
        style={{
          opacity: 0.75,
        }}
      />

      {/* Background orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(65% 42% at 50% 63%, rgba(255,64,20,0.32) 0%, rgba(180,20,0,0.18) 45%, transparent 78%)",
          mixBlendMode: "screen",
          opacity: mounted ? 1 : 0.15,
          transition:
            "opacity 1253ms cubic-bezier(0.42,0,0.48,1) 0ms",
        }}
      />

      {/* Main scroll area */}
      <div
        className="absolute overflow-y-auto overflow-x-hidden scrollbar-hide"
        style={{
          top: "calc(92px + env(safe-area-inset-top, 0px))",
          left: "12px",
          width: "calc(100% - 24px)",
          bottom: "calc(144px + env(safe-area-inset-bottom, 0px))",
          display: "flex",
          flexDirection: "column",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0 4px",
            opacity: 0.4,
          }}
        >
          <div
            style={{
              border: "0.8px solid rgba(255,255,255,0.18)",
              borderRadius: "12px",
              padding: "10px 12px",
              maxWidth: "90%",
              marginLeft: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "Figtree",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {PRIOR_GENIE_TEXT}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            marginTop: "auto",
            paddingBottom: hasSelection ? "20px" : "12px",
            transition: `padding-bottom ${SYMMETRIC_TIMING}`,
          }}
        >
          <div
            style={{
              opacity: mounted ? 1 : 0,
              scale: mounted ? 1 : 0.98,
              transform: hasSelection
                ? "translateY(-81.01px)"
                : "translateY(0px)",
              transition: `opacity 803ms cubic-bezier(0.5,0,0.5,1) 450ms, scale 683ms cubic-bezier(0.5,0,0.5,1) 570ms, transform ${SYMMETRIC_TIMING}`,
            }}
          >
            <p
              style={{
                fontFamily: "Figtree",
                fontWeight: 450,
                fontSize: "20px",
                lineHeight: "27px",
                color: "#FFFFFF",
                textAlign: "center",
                margin: "80px 0 30px",
              }}
            >
              {CLARIFY_TITLE_LINE1}
              <br />
              {CLARIFY_TITLE_LINE2}
              <br />
              {CLARIFY_TITLE_LINE3}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  marginLeft: "-12px",
                  marginRight: "-12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "1px",
                  paddingBottom: "6px",
                }}
              >
                {ROW1.map((label, i) => {
                  const id = `${label}-r1-${i}`;
                  const selected = selectedIds.has(id);
                  const isAnimating = animatingChipId === id;

                  return (
                    <PreferenceChip
                      key={id}
                      id={id}
                      label={label}
                      selected={selected}
                      isAnimating={isAnimating}
                      onClick={() => toggleChip(id)}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0px",
                  alignItems: "center",
                  overflowX: "scroll",
                  overflowY: "hidden",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  marginLeft: "-12px",
                  marginRight: "-12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "0px",
                  paddingBottom: "6px",
                }}
              >
                {ROW2.map((label, i) => {
                  const id = `${label}-r2-${i}`;
                  const selected = selectedIds.has(id);
                  const isAnimating = animatingChipId === id;

                  return (
                    <PreferenceChip
                      key={id}
                      id={id}
                      label={label}
                      selected={selected}
                      isAnimating={isAnimating}
                      onClick={() => toggleChip(id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: 0,
              right: 0,
              pointerEvents: hasSelection ? "auto" : "none",
              transform: hasSelection
                ? "translateY(0px)"
                : "translateY(112px)",
              transition: hasSelection
                ? `opacity 433ms cubic-bezier(0.5, 0, 0.5, 1) 450ms, transform ${SYMMETRIC_TIMING}`
                : `opacity 800ms ease, transform ${SYMMETRIC_TIMING}`,
            }}
          >
            {/* Selected text with ticker animation */}
            <div
              style={{
                fontFamily: "Figtree",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#E6E6E6",
                margin: "16px 0 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                opacity: hasSelection ? 1 : 0,
                transform: hasSelection
                  ? "translateY(0px)"
                  : "translateY(40px)",
                transition: hasSelection
                  ? `transform ${SYMMETRIC_TIMING} 100ms, opacity 700ms ease 200ms`
                  : `transform 600ms cubic-bezier(0.54, -0.12, 0.36, 1.12), opacity 500ms ease`,
              }}
            >
              <AnimatedCounter value={selectedIds.size} />
              <span>Selected</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              <button
                onClick={handleProceed}
                disabled={selectedIds.size === 0}
                style={{
                  width: "200px",
                  height: "44px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px 12px",
                  background:
                    selectedIds.size > 0
                      ? "radial-gradient(105.65% 187.5% at 50.14% -21.43%, #FF9858 3.86%, #FF5200 28.43%, #CD3401 55.29%, #4B0000 100%)"
                      : "rgba(60,60,60,0.6)",
                  border: "0.5px solid rgba(230,230,230,0.2)",
                  boxShadow:
                    selectedIds.size > 0
                      ? "0px 0px 32px 2px rgba(217,65,0,0.3)"
                      : "none",
                  borderRadius: "999px",
                  cursor: selectedIds.size > 0 ? "pointer" : "default",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              >
                <span
                  style={{
                    fontFamily: "Figtree",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#E6E6E6",
                    padding: "0 8px",
                  }}
                >
                  Proceed
                </span>
              </button>

              {/* <button
                onClick={handleSkip}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "Figtree",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17px",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: 0,
                  opacity: hasSelection ? 1 : 0,
                  transform: hasSelection
                    ? "translateY(0px)"
                    : "translateY(-40px)",
                  transition: hasSelection
                    ? `transform ${SYMMETRIC_TIMING} 100ms, opacity 700ms ease 200ms`
                    : `transform 600ms cubic-bezier(0.54, -0.12, 0.36, 1.12), opacity 400ms ease`,
                }}
              >
                Skip
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <ChatTopBar balance={BALANCE} />
      <ChatInputCard />
    </div>
  );
}