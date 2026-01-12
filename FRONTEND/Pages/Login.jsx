/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { SessionContext } from "../Context/SessionContext";

export default function Login() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { session, setSession } = useContext(SessionContext)

  const companies = [
    { code: "BCCL_DB_TST", name: "BCCL_TEST" },
    { code: "BCCL_DB_PROD", name: "BCCL_PROD" },
    { code: "PROD_COMP", name: "Production Company" },
  ];

  const [company, setCompany] = useState(companies[0].code);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        employeeCode,
        password,
        company
      });
      setSession(response.data.session)
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Wrong Credentials");
      navigate("/login")
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (session) {
    return <>
      <Navigate to="/main" replace />
    </>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 30, -30, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -30, 30, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl backdrop-blur-md border border-slate-700 shadow-2xl overflow-hidden p-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">SAP</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-2"
            >
              Business One
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-400 text-sm">
              Welcome back to your workspace
            </motion.p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants} className="relative group">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company
              </label>

              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              >
                {companies.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-800">
                    {c.name}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Employee Code */}
            <motion.div variants={itemVariants} className="relative group">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Employee Code
              </label>
              <input
                type="text"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                placeholder="Enter your employee code"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="relative group">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </motion.div>

            {/* Login button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-70 relative overflow-hidden group flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
