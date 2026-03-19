import React from "react";

const QueriesModal = ({ isOpen, setIsOpen }) => {
  const contacts = [
    {
      name: "Devansh Wason",
      role: "Spree Controls Events Head",
      phone: "+91 9667289984"
    },
    {
      name: "Yuvraj Sawant",
      role: "Fest Convener",
      phone: "+91 8779581186"
    },
    {
      name: "Tanishq Srivastav",
      role: "Spree Controls Chief Coordinator",
      phone: "+91 9555606071"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[100] font-cinzel">
      
      {/* Outer Glow Wrapper */}
      <div className="relative w-full max-w-lg p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        
        {/* Main Modal Body */}
        <div className="bg-[#00000c]/95 backdrop-blur-2xl rounded-3xl p-6 md:p-10 relative border border-white/5">
          
          {/* Close Icon */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-cyan-400">
              QUERIES
            </h2>
            <div className="h-[1px] w-24 mx-auto mt-2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Contact List */}
          <div className="space-y-4">
            {contacts.map((c, index) => (
              <div
                key={index}
                className="group relative bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative z-10">
                  <p className="text-white font-bold text-lg tracking-wider mb-1">
                    {c.name}
                  </p>
                  <p className="text-gray-400 text-xs uppercase tracking-[0.15em] mb-3">
                    {c.role}
                  </p>
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-medium transition-colors"
                  >
                    <span className="text-sm">☏</span>
                    {c.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Close Button */}
          <div className="mt-8">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              BACK TO SITE
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QueriesModal;