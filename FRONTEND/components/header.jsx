/* eslint-disable no-unused-vars */
import Session, { SessionContext } from "../Context/SessionContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Header() {
  const { session, setSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!session) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/logout",
        { session }
      );
      alert(response.data.message);
      setSession('');
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed: " + (error.response?.data?.message || error.message));
    }
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        sticky top-0 z-50 
        backdrop-blur-xl bg-white/60 
        shadow-[0_4px_20px_rgba(0,0,0,0.07)]
        border-b border-gray-200
      "
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="
                h-10 w-10 flex items-center justify-center 
                rounded-xl font-black text-lg text-white
                bg-gradient-to-br from-blue-600 to-indigo-500
                shadow-lg"
            >
              SAP
            </motion.div>
            <span className="hidden sm:inline text-xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-wide">
              Business One
            </span>
          </motion.div>
          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            {!session ? (
              // If no session, show nav links
              ["Features", "Partners", "Pricing", "Docs"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative text-gray-600 font-medium text-sm group"
                >
                  {item}
                  <span
                    className="
                      absolute left-0 -bottom-1 h-0.5 w-0
                      bg-gradient-to-r from-indigo-500 to-blue-500
                      transition-all duration-300 group-hover:w-full
                    "
                  ></span>
                </motion.a>
              ))
            ) : null}
          </nav>
          {/* LOGOUT button */}
          {session && (
            <motion.button
              onClick={handleLogout}
              className="
                px-4 py-2 rounded-lg text-white text-sm font-semibold 
                bg-gradient-to-r from-red-500 to-red-600 
                hover:from-red-600 hover:to-red-700 hover:cursor-pointer
                shadow-md transition-all flex items-center"
            >
              Logout
            </motion.button>)
          }
        </div>
      </div>
    </motion.header>
  );
}
