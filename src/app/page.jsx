"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import GalaxyScene from "../../components/GalaxyScene";
import { sampleLogo } from "../../utils/logoSampler";
import RegistrationForm from "../../components/RegistrationForm";
import PaymentModal from "../../components/PaymentModal";
import QueriesModal from "../../components/QueriesModal";

export default function Page() {
  const [logoData, setLogoData] = useState(null);
  const [phase, setPhase] = useState(0);
  const [regopen, setregopen] = useState(false);
  const [queriesOpen, setQueriesOpen] = useState(false);
  const [payopen, setpayopen] = useState(false);

  useEffect(() => {
    sampleLogo("/logo.png", 250000).then((data) => {
      setLogoData(data);
    });
  }, []);

  useEffect(() => {
    if (!logoData) return;

    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => setPhase(3), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [logoData]);

  const showUI = phase === 3;
  const handleClick = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  // Moved inside the component to access setregopen, and added preventDefault
  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setregopen(true);
  };
  const handlePayClick = (e) => {
    if (e) e.preventDefault();
    setpayopen(true);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-[#00000c] font-cinzel">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div className="absolute inset-0">
        <Canvas
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <GalaxyScene phase={phase} logoData={logoData} />
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[5] bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.75)_100%)]" />

      <div className="fixed bottom-0 left-0 right-0 h-[22vh] pointer-events-none z-[6] bg-gradient-to-t from-[#00000a] to-transparent opacity-90" />

      <div
        className={`
        fixed inset-0 z-20 flex flex-col items-center justify-end
        pb-[clamp(2rem,6vh,4rem)]
        ${showUI && !regopen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      >
        <div className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-[460px] px-6">
          <div
            className={`
      text-center transition-all duration-700 ease-out
      ${showUI ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
    `}
            style={{ transitionDelay: "100ms" }}
          >
            <p className="text-[clamp(0.65rem,2vw,0.85rem)] tracking-[0.3em] text-white uppercase">
              April 3rd – 5th, 2026
            </p>
            <div className="h-px w-16 mx-auto mt-2 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
          </div>
          <div className="grid gap-3 md:gap-4 w-full">
            <BannerButton
              label="RULEBOOK"
              delay={200}
              visible={showUI}
              onClick={() =>
                handleClick(
                  "https://firebasestorage.googleapis.com/v0/b/spree-26-flutter.firebasestorage.app/o/Rulebook%2FSPREE'26%20RULEBOOK_compressed.pdf?alt=media&token=d64e2b1f-6f6c-46d3-8cd5-f2f032d0f8b4",
                )
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
            <BannerButton
              label="PAY HERE"
              delay={300}
              visible={showUI}
              onClick={handlePayClick}
            />
            <BannerButton
              label="QUERIES"
              delay={400}
              visible={showUI}
              onClick={() => setQueriesOpen(true)}
            />
          </div>

          <div className="w-full mt-1 md:mt-2">
            {/* Wired up the onClick handler */}
            <BannerButton
              label="REGISTER"
              delay={520}
              visible={showUI}
              primary
              onClick={handleRegisterClick}
            />
          </div>
        </div>
      </div>

      {/* Added the RegistrationForm rendering logic */}
      {regopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <RegistrationForm onClose={() => setregopen(false)} />
        </div>
      )}
      {payopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <PaymentModal handlePayClick={() => setpayopen(false)} />
        </div>
      )}
      {queriesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          <QueriesModal isOpen={queriesOpen} setIsOpen={setQueriesOpen} />
        </div>
      )}
      <div className="sr-only">
        <h1>BITS Spree Registration 2026</h1>
        <p>
          Register for BITS Spree 2026, the annual sports festival of BITS Goa.
          Participate in various sports events and competitions. Complete your
          Spree registration here.
        </p>
      </div>
    </div>
  );
}

function BannerButton({ label, href = "#", delay, visible, primary, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        group relative flex items-center justify-center w-full cursor-pointer
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
        ${primary ? "h-14 md:h-16 mt-2" : "h-11 md:h-12"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`
        absolute inset-0 bg-gradient-to-r from-orange-600 via-purple-600 to-cyan-600 
        blur-md transition-opacity duration-500 
        ${primary ? "opacity-20 group-hover:opacity-50" : "opacity-0 group-hover:opacity-40"}
      `}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/10 group-hover:opacity-0 transition-opacity duration-300" />
      <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-full bg-black/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </div>
      </div>

      <span
        className={`
        relative z-10 font-bold uppercase transition-all duration-500 drop-shadow-md
        ${
          primary
            ? "text-white text-base md:text-lg tracking-[0.25em] group-hover:tracking-[0.3em] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-100 group-hover:to-cyan-100"
            : "text-gray-300 text-xs md:text-sm tracking-[0.2em] group-hover:tracking-[0.25em] group-hover:text-white"
        }
      `}
      >
        {label}
      </span>
    </a>
  );
}
