'use client';
import Button from "./Button";

export default function PaymentModal({ handlePayClick }) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center font-cinzel">
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={handlePayClick}
      />

      {/* Modal Container */}
      <div className="relative w-[92%] sm:w-[70%] md:w-[500px] p-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Glassmorphism Inner Background */}
        <div className="bg-[#00000c]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 flex flex-col items-center">
          
          {/* Close Button */}
          <button 
            onClick={handlePayClick}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Heading with Gradient Text */}
          <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-100 via-white to-cyan-100 drop-shadow-sm">
            PAYMENT INFO
          </h1>

          {/* Styled List */}
          <ol className="space-y-4 mb-8 w-full text-gray-300 text-sm md:text-base tracking-wide">
            <li className="flex gap-3">
              <span className="text-orange-500 font-bold">01.</span>
              <span>Click on <b className="text-white">PAY</b> to be redirected to SBI Collect.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500 font-bold">02.</span>
              <span>Search for <b className="text-white">Birla Institute of Technology and Science, Goa</b>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-500 font-bold">03.</span>
              <span>Select <b className="text-white text-glow">SPREE 2026 Registration</b>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/50 font-bold">04.</span>
              <span>Complete the payment and keep the receipt.</span>
            </li>
          </ol>

          {/* The Styled Button Container */}
          <div className="w-full max-w-[280px] text-white">
             <Button
                text="PROCEED TO PAY"
                onClick={() =>
                  window.open(
                    "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm",
                    "_blank"
                  )
                }
              />
          </div>
          
        </div>
      </div>
    </div>
  );
}