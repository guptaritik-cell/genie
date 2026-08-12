import React, { useState, useRef } from "react";
import popCoinIcon from "@/assets/pop-coin.png";
import chatBg from "@/assets/chat/chat-b.png";
import swipeIcon from "@/assets/swipe.svg";

// Import your trend images from the assets folder
import trendCargo from "@/assets/trend-cargo.jpg";
import trendKnits from "@/assets/trend-knits.jpg";
import trendSandals from "@/assets/trend-sandals.jpg";
import trendSkincare from "@/assets/trend-skincare.jpg";

interface ProductCard {
  id: string;
  isInstruction?: boolean;
  brand?: string;
  title: string;
  price?: string;
  originalPrice?: string;
  discountCoins?: string;
  coinValue?: number;
  image?: string;
}

const INITIAL_CARDS: ProductCard[] = [
  {
    id: "orb-instruction",
    isInstruction: true,
    title: "Swipe to refine",
  },
  {
    id: "product-1",
    brand: "Trend",
    title: "Classic Cargo Pants",
    price: "₹1,856",
    originalPrice: "₹2,856",
    discountCoins: "₹1000 off",
    coinValue: 1000,
    image: trendCargo,
  },
  {
    id: "product-2",
    brand: "Trend",
    title: "Cozy Knitted Sweater",
    price: "₹1,849",
    originalPrice: "₹2,699",
    discountCoins: "₹500 off",
    coinValue: 500,
    image: trendKnits,
  },
  {
    id: "product-3",
    brand: "Trend",
    title: "Premium Summer Sandals",
    price: "₹1,250",
    originalPrice: "₹1,999",
    discountCoins: "₹750 off",
    coinValue: 750,
    image: trendSandals,
  },
  {
    id: "product-4",
    brand: "Trend",
    title: "Advanced Skincare Set",
    price: "₹2,199",
    originalPrice: "₹4,399",
    discountCoins: "₹800 off",
    coinValue: 800,
    image: trendSkincare,
  },
  {
    id: "product-5",
    brand: "Trend",
    title: "Utility Cargo Trousers",
    price: "₹3,120",
    originalPrice: "₹4,800",
    discountCoins: "₹1000 off",
    coinValue: 1000,
    image: trendCargo,
  },
  {
    id: "product-6",
    brand: "Trend",
    title: "Chunky Knit Cardigan",
    price: "₹1,499",
    originalPrice: "₹2,999",
    discountCoins: "₹400 off",
    coinValue: 400,
    image: trendKnits,
  },
  {
    id: "product-7",
    brand: "Trend",
    title: "Leather Strap Sandals",
    price: "₹2,750",
    originalPrice: "₹3,999",
    discountCoins: "₹900 off",
    coinValue: 900,
    image: trendSandals,
  },
  {
    id: "product-8",
    brand: "Trend",
    title: "Daily Hydration Skincare",
    price: "₹1,999",
    originalPrice: "₹3,999",
    discountCoins: "₹600 off",
    coinValue: 600,
    image: trendSkincare,
  },
  {
    id: "product-9",
    brand: "Trend",
    title: "Slim Fit Cargos",
    price: "₹1,650",
    originalPrice: "₹3,299",
    discountCoins: "₹500 off",
    coinValue: 500,
    image: trendCargo,
  },
  {
    id: "product-10",
    brand: "Trend",
    title: "Winter Knit Essentials",
    price: "₹1,200",
    originalPrice: "₹1,999",
    discountCoins: "₹300 off",
    coinValue: 300,
    image: trendKnits,
  },
];

/* -------------------------------------------------------------------------- */
/*                            ORGANIC MESH CLOUD                              */
/* -------------------------------------------------------------------------- */
const OrganicMeshCloud = React.memo(function OrganicMeshCloud() {
  return (
    <div className="relative w-[190px] h-[190px] flex items-center justify-center bg-black/40 rounded-[28px] overflow-hidden">
      <div 
        className="absolute inset-2 rounded-full bg-red-600/25 blur-xl animate-pulse" 
        style={{ animationDuration: "3.5s" }} 
      />
      <div className="absolute inset-8 rounded-full bg-orange-500/15 blur-lg" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 scale-[1.05]">
        <defs>
          <radialGradient id="meshRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF4114" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#9E1000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, r) => {
          const radius = 18 + r * 5.2;
          const pointsCount = Math.floor((2 * Math.PI * radius) / 5);
          const points = Array.from({ length: pointsCount }).map((_, i) => {
            const angle = (i / pointsCount) * 2 * Math.PI;
            const wave1 = Math.sin(angle * 5 + r * 0.4) * 4.5;
            const wave2 = Math.cos(angle * 3 - r * 0.7) * 2.5;
            const finalRadius = radius + wave1 + wave2;
            const x = 100 + Math.cos(angle) * finalRadius;
            const y = 100 + Math.sin(angle) * finalRadius;
            return { x, y };
          });

          let pathD = `M ${points[0].x} ${points[0].y}`;
          for (let i = 1; i < points.length; i++) {
            pathD += ` L ${points[i].x} ${points[i].y}`;
          }
          pathD += " Z";

          return (
            <g key={r}>
              <path d={pathD} fill="none" stroke="url(#meshRed)" strokeWidth={r % 2 === 0 ? "0.9" : "0.5"} opacity={0.8 - r * 0.045} />
              {r % 2 === 0 &&
                points.map((pt, pIdx) => {
                  if (pIdx % 3 !== 0) return null;
                  return <circle key={pIdx} cx={pt.x} cy={pt.y} r="1.2" fill="#FF7E45" opacity={0.85 - r * 0.05} />;
                })}
            </g>
          );
        })}
      </svg>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/*                              ANIMATED COUNTER                              */
/* -------------------------------------------------------------------------- */
interface AnimatedCounterProps {
  value: number;
  color?: string;
  fontWeight?: string | number;
  fontSize?: string;
}

function AnimatedCounter({ 
  value, 
  color = "#8C8C8C", 
  fontWeight = 500, 
  fontSize = "12px" 
}: AnimatedCounterProps) {
  const displayValue = value > 0 ? value : 1;
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  const lineHeight = 18;

  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        height: `${lineHeight}px`,
        overflow: "hidden",
        position: "relative",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
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
              fontSize: fontSize,
              fontFamily: "Figtree",
              fontWeight: fontWeight,
              color: color,
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
/*                            CARD INNER CONTENT                              */
/* -------------------------------------------------------------------------- */
function renderCardInner(card: ProductCard) {
  if (card.isInstruction) {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center relative p-6 pointer-events-none" style={{ background: "radial-gradient(100% 100% at 50% 50%, #2a0f0d 0%, #100505 100%)" }}>
        <div className="w-[190px] h-[190px] flex items-center justify-center relative mt-12">
          <OrganicMeshCloud />
        </div>
        <div className="w-full text-center mt-auto mb-4">
          <div className="relative h-[3px] w-28 bg-[#2A2A2A] mx-auto mb-4 rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF9858] to-[#FF5200] w-1/2" />
          </div>
          <p className="font-['Figtree'] font-medium text-[13px] text-white/80 leading-relaxed">
            Swipe <strong className="text-[#FF5200]">right</strong> on items you love
          </p>
          <p className="font-['Figtree'] font-normal text-[12px] text-white/40 mt-0.5">
            Swipe left on the rest
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex flex-col justify-between pointer-events-none bg-[#121212]">
      <div className="w-full h-full absolute inset-0 z-0 bg-[#121212]">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
      </div>
      <div className="mt-auto p-6 relative z-10 w-full select-none">
        <span className="text-[11px] font-['Figtree'] uppercase font-bold tracking-widest text-[#FF5200]">
          {card.brand}
        </span>
        <h3 className="font-['Figtree'] text-[16px] text-[#FFFFFF] font-semibold leading-tight mt-1 mb-3">
          {card.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-['Figtree'] text-[15px] font-bold text-[#FFFFFF]">Price {card.price}</span>
          {card.originalPrice && <span className="font-['Figtree'] text-[12px] text-[#8C8C8C] line-through">{card.originalPrice}</span>}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[6px] bg-[#FF5200]/10 border border-[#FF5200]/25 rounded-[8px] px-2.5 py-1">
            <span className="font-['Figtree'] text-[12px] font-semibold text-[#FF5200]">{card.discountCoins}</span>
            <span className="text-[11px] text-white/50">using</span>
            <div className="flex items-center gap-[2px]">
              <img src={popCoinIcon} className="w-[12px] h-[12px]" alt="popcoin" />
              <span className="text-[11px] font-semibold text-[#FFFFFF]">{card.coinValue}</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExitingCard {
  card: ProductCard;
  direction: "left" | "right";
  id: string;
  startX: number;
  startY: number;
  startRot: number;
  startGrayscale: number;
  animating: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */
export function SwipeRefineScreen({ onBack }: { onBack?: () => void }) {
  const [cards, setCards] = useState<ProductCard[]>(INITIAL_CARDS);
  const [history, setHistory] = useState<{ card: ProductCard; direction: "left" | "right" }[]>([]);
  const [rightSwipeCount, setRightSwipeCount] = useState<number>(0);
  const [, setSwipedProductCount] = useState<number>(0);
  const [hasSwipedFirstCard, setHasSwipedFirstCard] = useState<boolean>(false);

  const [exitingCards, setExitingCards] = useState<ExitingCard[]>([]);
  const [undoing, setUndoing] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const dragX = useRef(0);
  const dragY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasTriggeredHaptic = useRef(false);

  // Original exact animation speed retained
  const SWIPE_ANIMATION_DURATION = 600; 
  const easing = "cubic-bezier(0.25, 1, 0.5, 1)";

  const executeSwipe = (direction: "left" | "right") => {
    if (cards.length === 0 || undoing) return;

    const topCard = cards[0];
    const startX = dragX.current;
    
    // Apply standard rubber-band limit matching the bounded dragging boundary
    const rawY = dragY.current * 0.4;
    const MAX_Y_LIMIT = 40;
    let startY = rawY;
    if (Math.abs(rawY) > MAX_Y_LIMIT) {
      const sign = rawY > 0 ? 1 : -1;
      const overflow = Math.abs(rawY) - MAX_Y_LIMIT;
      startY = sign * (MAX_Y_LIMIT + Math.log10(1 + overflow) * 8);
    }

    const startRot = Math.min(15, Math.max(-15, (dragX.current / 160) * 15));
    const startGrayscale = startX < 0 ? Math.min(100, (Math.abs(startX) / 80) * 100) : 0;

    const exitId = `${topCard.id}-${Date.now()}`;
    
    // Add item to exiting overlay starting directly at current touch/mouse coordinates
    const newExitingCard: ExitingCard = {
      card: topCard,
      direction,
      id: exitId,
      startX,
      startY,
      startRot,
      startGrayscale,
      animating: false,
    };

    setExitingCards((prev) => [...prev, newExitingCard]);

    setCards((prev) => prev.slice(1));
    setHistory((prev) => [{ card: topCard, direction }, ...prev]);

    if (topCard.isInstruction) {
      setHasSwipedFirstCard(true);
    } else {
      setSwipedProductCount((c) => c + 1);
      if (direction === "right") {
        setRightSwipeCount((c) => c + 1);
      }
    }

    dragX.current = 0;
    dragY.current = 0;

    // Trigger flight on next frame to ensure zero jerk from release position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExitingCards((prev) =>
          prev.map((item) => (item.id === exitId ? { ...item, animating: true } : item))
        );
      });
    });

    setTimeout(() => {
      setExitingCards((prev) => prev.filter((item) => item.id !== exitId));
    }, SWIPE_ANIMATION_DURATION);
  };

  const handleUndo = () => {
    if (history.length === 0 || !hasSwipedFirstCard || undoing) return;
    const lastAction = history[0];

    setHistory((prev) => prev.slice(1));
    setCards((prev) => [lastAction.card, ...prev]);
    
    if (!lastAction.card.isInstruction) {
      setSwipedProductCount((c) => Math.max(0, c - 1));
      if (lastAction.direction === "right") {
        setRightSwipeCount((c) => Math.max(0, c - 1));
      }
    }
    if (lastAction.card.isInstruction) {
      setHasSwipedFirstCard(false);
    }

    setUndoing(lastAction.direction);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setUndoing(null);
      });
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (undoing || cards.length === 0) return;
    setIsDragging(true);
    hasTriggeredHaptic.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    if (cardRef.current) {
      cardRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragX.current = e.clientX - startPos.current.x;
    dragY.current = e.clientY - startPos.current.y;

    const x = dragX.current;
    const rawY = dragY.current * 0.4;
    
    // Strict vertical drag limit before elastic resistance starts
    const MAX_Y_LIMIT = 40;
    let finalY = rawY;

    if (Math.abs(rawY) > MAX_Y_LIMIT) {
      const sign = rawY > 0 ? 1 : -1;
      const overflow = Math.abs(rawY) - MAX_Y_LIMIT;
      // High-end elastic rubber-banding resistance
      finalY = sign * (MAX_Y_LIMIT + Math.log10(1 + overflow) * 8);

      // Trigger standard physical haptic feedback when crossing the boundary
      if (!hasTriggeredHaptic.current) {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(15);
        }
        hasTriggeredHaptic.current = true;
      }
    } else {
      // Reset haptic state when returning within bounds to allow another buzz
      hasTriggeredHaptic.current = false;
    }

    const rotateAngle = Math.min(15, Math.max(-15, (x / 160) * 15));

    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${x}px, ${finalY}px, 0) rotate(${rotateAngle}deg)`;
      cardRef.current.style.transition = "none";
      
      const grayscaleValue = x < 0 ? Math.min(100, (Math.abs(x) / 80) * 100) : 0;
      cardRef.current.style.filter = `grayscale(${grayscaleValue}%)`;
      cardRef.current.style.opacity = "1";
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (cardRef.current) {
      cardRef.current.releasePointerCapture(e.pointerId);
    }

    const x = dragX.current;
    const threshold = 80;

    if (Math.abs(x) > threshold) {
      executeSwipe(x > 0 ? "right" : "left");
    } else {
      dragX.current = 0;
      dragY.current = 0;
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(0, 0, 0) rotate(0deg)`;
        cardRef.current.style.filter = "grayscale(0%)";
        cardRef.current.style.opacity = "1";
        cardRef.current.style.transition = `transform ${SWIPE_ANIMATION_DURATION}ms ${easing}, filter ${SWIPE_ANIMATION_DURATION}ms ${easing}`;
      }
    }
  };

  const progressRatio = Math.min(1, rightSwipeCount / 10);
  const radius = 33;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;
  
  const isProceedArrowReady = rightSwipeCount >= 3;
  const visibleCards = cards.slice(0, 4);

  return (
    <div 
      className="bg-[#0D0D0D] relative overflow-hidden flex flex-col justify-between" 
      style={{ 
        height: "100%", 
        width: "100%",
        userSelect: "none",
        WebkitUserSelect: "none"
      }}
    >
      <style>{`
        .shadow-2xl {
          --tw-shadow: 0 25px 80px 2px var(--tw-shadow-color, rgb(0 0 0 / 0.95)), var(--tw-shadow-glow, 0 0 #0000);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
        .shadow-top-left-right {
          --tw-shadow-glow: 0px -44.74px 126.3px -9.22px rgba(232, 11, 3, 0.5);
        }
      `}</style>

      <img
        decoding="async"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
        src={chatBg}
        style={{ opacity: 0.65 }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(65% 42% at 50% 50%, rgba(255,64,20,0.18) 0%, rgba(180,20,0,0.08) 45%, transparent 78%)",
          mixBlendMode: "screen",
        }}
      />

      {/* TOP HEADER */}
      <div 
        className="flex justify-between items-center px-4 pb-2 relative z-10 w-full"
        style={{
          paddingTop: "calc(16px + env(safe-area-inset-top, 0px))"
        }}
      >
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20" style={{ cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex gap-2 items-center">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 8H20M4 16H20" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex gap-[4px] items-center justify-center rounded-full px-3 py-1 border border-white/5" style={{ background: "radial-gradient(circle at 50% -28%, rgba(70,70,70,1) 17.5%, rgba(50,50,50,1) 55%, rgba(31,31,31,1) 93%)" }}>
            <img decoding="async" alt="" style={{ width: 14, height: 14, flexShrink: 0 }} src={popCoinIcon} />
            <span className="font-['Figtree'] font-semibold leading-[20px] text-[13px] text-[#e6e6e6]">2.9k</span>
          </div>
        </div>
      </div>

      <div className="text-center px-4 relative z-10 shrink-0 select-none">
        <h1 className="text-4xl text-[#FFFFFF] select-none" style={{ fontFamily: "'Awesome Serif Italic', serif", fontStyle: "italic", fontWeight: 700 }}>
          Swipe to refine
        </h1>
        <p className="font-['Figtree'] text-[13px] text-white mt-1 select-none">
          Every right swipe tells us what you love
        </p>
      </div>

      {/* CARD STACK AREA */}
      <div className="relative flex-1 flex items-center justify-center px-4 select-none mt-2 mb-2 z-10 overflow-visible">
        {cards.length === 0 && exitingCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-12 rounded-[16px] border border-white/10 bg-black/40 backdrop-blur-md w-[310px] h-[390px] z-10 shadow-2xl shadow-top-left-right">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF5200" strokeWidth="2" />
                <path d="M8 12L11 15L16 9" stroke="#FF5200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-['Figtree'] text-lg font-bold text-white mb-2">All Refined!</h3>
            <p className="font-['Figtree'] text-xs text-[#8C8C8C] max-w-[200px]">We have custom-tailored suggestions ready for you based on your swipes!</p>
          </div>
        ) : (
          <div className="relative w-[310px] h-[390px] card-stack-container select-none flex items-center justify-center overflow-visible">
            {visibleCards.map((card, idx) => {
              let stackIdx = idx;
              if (undoing) stackIdx = idx - 1;

              const isTop = idx === 0;
              
              const scale = isTop ? 1 : Math.max(0, 1 - stackIdx * 0.06);
              const translateY = isTop ? 0 : stackIdx * 20;
              const containerOpacity = stackIdx >= 3 ? 0 : 1;
              const depthDarkness = stackIdx === 0 ? 0 : Math.min(0.65, stackIdx * 0.25);
               const come_up = 350; 
              let filterStyle = "grayscale(0%)";
              let transformStyle = `translate3d(0px, ${translateY}px, 0) scale(${scale}) rotate(0deg)`;
              let transitionStyle = `transform ${come_up}ms ${easing}, opacity ${come_up}ms ${easing}, filter ${come_up}ms ${easing}`;

              if (isTop) {
                if (undoing === "left") {
                  transformStyle = `translate3d(-150%, 15%, 0) rotate(-15deg)`;
                  filterStyle = "grayscale(100%)";
                  transitionStyle = "none";
                } else if (undoing === "right") {
                  transformStyle = `translate3d(150%, 15%, 0) rotate(15deg)`;
                  transitionStyle = "none";
                }
              }

              if (undoing !== null || (isTop && isDragging)) {
                transitionStyle = "none";
              }

              return (
                <div
                  key={card.id}
                  ref={isTop ? cardRef : null}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  className="absolute rounded-[16px] overflow-hidden select-none shadow-2xl shadow-top-left-right bg-black"
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 15 - idx,
                    opacity: containerOpacity,
                    transform: transformStyle,
                    filter: filterStyle,
                    transition: transitionStyle,
                    cursor: isTop ? "grab" : "auto",
                    touchAction: "none",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div 
                    className="absolute inset-0 bg-black z-40 pointer-events-none rounded-[16px]"
                    style={{
                      opacity: depthDarkness,
                      transition: transitionStyle === "none" ? "none" : `opacity ${SWIPE_ANIMATION_DURATION}ms ${easing}`
                    }}
                  />

                  {renderCardInner(card)}
                </div>
              );
            })}

            {/* EXITING CARDS FLIGHT OVERLAY LAYER */}
            {exitingCards.map((exit) => {
              const targetX = exit.direction === "right" ? "150%" : "-150%";
              const targetRot = exit.direction === "right" ? 15 : -15;
              const targetGrayscale = exit.direction === "left" ? 100 : exit.startGrayscale;

              const currentTransform = exit.animating
                ? `translate3d(${targetX}, 15%, 0) rotate(${targetRot}deg)`
                : `translate3d(${exit.startX}px, ${exit.startY}px, 0) rotate(${exit.startRot}deg)`;

              const currentFilter = exit.animating
                ? `grayscale(${targetGrayscale}%)`
                : `grayscale(${exit.startGrayscale}%)`;

              return (
                <div
                  key={exit.id}
                  className="absolute rounded-[16px] overflow-hidden select-none shadow-2xl shadow-top-left-right bg-black pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 50,
                    opacity: 1, // Full opacity kept during flight
                    border: "1px solid rgba(255,255,255,0.1)",
                    transform: currentTransform,
                    filter: currentFilter,
                    transition: exit.animating
                      ? `transform ${SWIPE_ANIMATION_DURATION}ms ${easing}, filter ${SWIPE_ANIMATION_DURATION}ms ${easing}`
                      : "none",
                  }}
                >
                  {renderCardInner(exit.card)}
                </div>
              );
            })}
        
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS */}
      <div 
        className="flex flex-col items-center justify-center pt-2 relative z-10 shrink-0 select-none"
        style={{
          paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))"
        }}
      >
        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={() => {
              if (undoing) return;
              handleUndo();
            }}
            disabled={!hasSwipedFirstCard || history.length === 0}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all border"
            style={{
              background: "rgba(22, 22, 22, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              cursor: hasSwipedFirstCard && history.length > 0 ? "pointer" : "not-allowed",
              opacity: hasSwipedFirstCard && history.length > 0 ? 1 : 0.35,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 10H14C17.866 10 21 13.134 21 17C21 20.866 17.866 24 14 24" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 5L3 10L8 15" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative w-[76px] h-[76px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle cx="38" cy="38" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.13)" strokeWidth="1" />
              {hasSwipedFirstCard && (
                <circle
                  cx="38"
                  cy="38"
                  r={radius}
                  fill="transparent"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              )}
        
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F3522A" />
                  <stop offset="100%" stopColor="#8D1818" />
                </linearGradient>
              </defs>
            </svg>

            {isProceedArrowReady ? (
              <button
                onClick={() => alert("Proceeding to next step with your beautifully refined tastes!")}
                className="absolute w-[51px] h-[51px] rounded-full bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (undoing) return;
                  executeSwipe("left");
                }}
                disabled={!hasSwipedFirstCard}
                className="absolute w-[54px] h-[54px] rounded-full flex items-center justify-center transition-all"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  cursor: hasSwipedFirstCard ? "pointer" : "not-allowed",
                  opacity: hasSwipedFirstCard ? 1 : 0.35,
                }}
              >
                <img src={swipeIcon} className="w-5 h-5 object-contain" style={{ filter: "brightness(0.9) contrast(1.1)" }} alt="Swipe Icon" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              if (undoing) return;
              executeSwipe("right");
            }}
            disabled={!hasSwipedFirstCard}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all border"
            style={{
              background: "rgba(22, 22, 22, 0.4)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              cursor: hasSwipedFirstCard ? "pointer" : "not-allowed",
              opacity: hasSwipedFirstCard ? 1 : 0.35,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* DYNAMIC RIGHT-SWIPE TEXT */}
        <div className="h-6 flex items-center justify-center">
          {rightSwipeCount < 3 ? (
            <p className="font-['Figtree'] text-[14px] text-[#8C8C8C] flex items-center gap-0.5">
              <span>Min.</span>
              <AnimatedCounter value={3 - rightSwipeCount} color="#FFFFFF" fontWeight={500} fontSize="14px" />
              <span>right {3 - rightSwipeCount === 1 ? "swipe" : "swipes"} to refine</span>
            </p>
          ) : rightSwipeCount < 10 ? (
            <p className="font-['Figtree'] text-[14px] text-[#8C8C8C] flex items-center gap-1">
              <AnimatedCounter value={10 - rightSwipeCount} color="#FFFFFF" fontWeight={500} fontSize="14px" />
              <span className="text-white font-bold">more</span>
              <span>right {10 - rightSwipeCount === 1 ? "swipe" : "swipes"} for best results</span>
            </p>
          ) : (
            <p className="font-['Figtree'] text-[14px] font-semibold text-white tracking-wide">
              Refinement complete! <span className="text-[#FF5200]">Tap arrow to proceed</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}