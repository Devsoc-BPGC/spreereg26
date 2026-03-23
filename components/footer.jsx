export default function Footer() {
  return (
    <footer className="w-full fixed bottom-0 py-4 bg-transparent text-white text-center z-50">
      <p className="text-sm">
        Made with <span className="text-red-500">♥</span> by{" "}
        <span className="font-bold bg-gradient-to-t" >
          <a href="https://devsoc.club/" className="text-white hover:underline">
            DevSoc
          </a>
        </span>
      </p>
    </footer>
  );
}
