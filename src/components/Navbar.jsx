import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated , role  }) => {
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">PassGo</Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-yellow-400 transition">Events</Link>
          </li>

          {/* User Role-based Links */}
          {role === "user" && isAuthenticated && (
            <>
              <li>
                <Link to="/user/profile" className="hover:text-yellow-400 transition">Profile</Link>
              </li>
              <li>
                <Link to="/user/tickets" className="hover:text-yellow-400 transition">My Tickets</Link>
              </li>
            </>
          )}

          {/* Host Role-based Links */}
          {role === "host" && isAuthenticated && (
            <>
              <li>
                <Link to="/host/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/host/events" className="hover:text-yellow-400 transition">My Events</Link>
              </li>
            </>
          )}

          {/* Auth Controls */}
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/signup" className="text-green-400 hover:underline">Signup</Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
              </li>
            </>
          ) : (
            <li>
              <button className="text-red-400 hover:underline">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
