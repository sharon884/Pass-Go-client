const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 mt-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo / Brand */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-yellow-400">PassGo</h1>
            <p className="text-sm text-gray-400">Your gateway to events & experiences</p>
          </div>
  
          {/* Navigation Links */}
          <ul className="flex gap-6 text-sm text-gray-300">
            <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Events</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>
  
        {/* Bottom Note */}
        <div className="text-center text-xs text-gray-500 mt-6 space-y-1">
          <p>© {new Date().getFullYear()} PassGo. All rights reserved.</p>
          <p className="text-gray-600">🚀 Developed by <span className="text-yellow-400 font-medium">Sharon</span></p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  