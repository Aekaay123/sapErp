const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

module.exports = async (req, res) => {
  const { employeeCode, password, company, server } = req.body;

  try {
    // Call SAP Service Layer login
    const response = await axios.post(
      `https://192.168.196.${server}:50000/b1s/v1/Login`,
      {
        UserName: employeeCode,
        Password: password,
        CompanyDB: company,
      },
      {
        httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
      },
    );
    res.json({
      message: "Login successful",
      session: response.data.SessionId,
      sessionTimeout: response.data.SessionTimeout,
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(401).json({ message: "Login failed" });
  }
};
