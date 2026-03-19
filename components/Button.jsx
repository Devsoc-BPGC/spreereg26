export default function Button({ text, onClick, className }) {
  return (
    <div className="relative inline-block animate-fadeIn transition-transform duration-500 hover:scale-110">
      {/* Background with opacity */}
      <div
        className="absolute inset-0 bg-contain sm:bg-cover bg-center bg-no-repeat opacity-75"
        style={{ backgroundImage: `url('button.svg')` }}
      ></div>

      {/* Text content */}
      <button
        className={`relative z-10 flex items-center justify-center text-button-text font-semibold text-xl cursor-pointer outline-none border-none play-button animate-fadeIn font-family-eczar ${className}`}
        style={{
          width: "280px",
          height: "48.5px",
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}