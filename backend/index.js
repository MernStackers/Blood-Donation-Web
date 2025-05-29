require('dotenv').config();  // Load env variables first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// Use env variables for config
const uri = process.env.MONGODB_URI;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const jwtSecret = process.env.JWT_SECRET;
const securityKey = process.env.SECURITY_KEY;
const port = process.env.PORT || 5000;

// MongoDB connection 
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Donor schema and model
const donorSchema = new mongoose.Schema({
  name: String,
  username: String,
  address: String, 
  phone: String,
  blood_type: String,
  birthdate: Date,
  gender: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpires: Date,
}, { timestamps: true });

const Donor = mongoose.model("Donor", donorSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

// Generate OTP function
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

// Send OTP email function
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"BloodBank" <${emailUser}>`,
    to: email,
    subject: '🩸 Blood Donation - Email Verification OTP',
    html: `
      <h2>Verify Your Email</h2>
      <p>Your OTP for BloodBank registration is:</p>
      <h3 style="color: red;">${otp}</h3>
      <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
      <br/>
      <small>Powered by BloodBank</small>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully");
    console.log("✅ Email sent:", info.response);
    console.log("📧 OTP sent to:", email, "| OTP:", otp);
  } catch (err) {
    console.error("❌ Error sending OTP email:", err.response || err);
  }
};

// Staff schema and model
const staffSchema = new mongoose.Schema({
  name: String,
  username: String,
  address: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);

// Request schema and model
const requestSchema = new mongoose.Schema({
  bloodGroup: String,
  reason: String,
  status: { type: String, default: 'Pending' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

// AcceptedDonorInfo schema and model
const acceptedDonorInfoSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  bloodGroup: String,
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
}, { timestamps: true });

const AcceptedDonorInfo = mongoose.model("AcceptedDonorInfo", acceptedDonorInfoSchema);

// Routes...

app.post("/api/accepted-donors", async (req, res) => {
  const { name, email, phone, bloodGroup, requestId } = req.body;

  try {
    const newAcceptedDonor = new AcceptedDonorInfo({ name, email, phone, bloodGroup, requestId });
    await newAcceptedDonor.save();

    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status: "Accepted" }, { new: true });

    if (!updatedRequest) return res.status(404).json({ message: "Request not found" });

    res.status(201).json({ message: "Donor info saved and request accepted", newAcceptedDonor, updatedRequest });
  } catch (error) {
    console.error("Error saving accepted donor:", error);
    res.status(500).json({ message: "Error saving accepted donor", error });
  }
});

app.get("/api/accepted-donors/:requestId", async (req, res) => {
  try {
    const donorInfo = await AcceptedDonorInfo.findOne({ requestId: req.params.requestId });
    if (!donorInfo) return res.status(404).json({ message: "Donor info not found" });

    res.status(200).json(donorInfo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/api/requests/create", async (req, res) => {
  const { bloodGroup, reason } = req.body;
  try {
    const newRequest = new Request({ bloodGroup, reason, status: 'Pending' });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: 'Error creating request', error });
  }
});

app.get("/api/donors/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/donors/register", async (req, res) => {
  const { name, username, address, phone, blood_type, birthdate, gender, email, password } = req.body;

  try {
    const existing = await Donor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await sendOtpEmail(email, otp);
    console.log("✅ OTP generated for donor:", otp);

    res.status(200).json({
      message: "OTP sent. Please verify.",
      donorData: { name, username, address, phone, blood_type, birthdate, gender, email, password, otp, otpExpires }
    });
  } catch (error) {
    console.error("Error during donor registration:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/api/donors/verify-otp", async (req, res) => {
  const { donorData } = req.body;

  if (!donorData || !donorData.otp || !donorData.email) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  if (new Date() > new Date(donorData.otpExpires)) {
    return res.status(400).json({ message: "OTP expired" });
  }

  try {
    const existing = await Donor.findOne({ email: donorData.email });
    if (existing) {
      return res.status(400).json({ message: "Email already verified and exists." });
    }

    const hashedPassword = await bcrypt.hash(donorData.password, 10);

    const newDonor = new Donor({
      name: donorData.name,
      username: donorData.username,
      address: donorData.address,
      phone: donorData.phone,
      blood_type: donorData.blood_type,
      birthdate: donorData.birthdate,
      gender: donorData.gender,
      email: donorData.email,
      password: hashedPassword,
      verified: true,
      otp: null,
      otpExpires: null
    });

    await newDonor.save();

    res.status(201).json({ message: "Donor account verified and registered successfully." });
  } catch (error) {
    console.error("❌ Error verifying donor OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.patch("/api/requests/reject/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status: "Rejected" }, { new: true });
    if (!updatedRequest) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting request", error });
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const requests = await Request.find({ status: { $ne: "Canceled" } })
      .populate({
        path: 'donor',
        select: 'name email phone blood_type address gender'
      });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
});

app.patch("/api/requests/accept/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status: "Accepted" }, { new: true });
    if (!updatedRequest) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error accepting request", error });
  }
});

app.post("/api/donors/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: donor._id, email: donor.email }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      donor: {
        _id: donor._id,
        fullName: donor.name,
        email: donor.email,
        phone: donor.phone,
        birthdate: donor.birthdate,
        gender: donor.gender,
        address: donor.address,
        blood_type: donor.blood_type
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/donors/by-email/:email", async (req, res) => {
  try {
    const donor = await Donor.findOne({ email: req.params.email }).select("username name");
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/staff/register", async (req, res) => {
  const { name, username, address, phone, email, password, securityKeyFromClient, gender } = req.body;

  if (securityKeyFromClient !== securityKey) {
    return res.status(403).json({ message: "Invalid security key" });
  }

  try {
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, username, address, phone, email, password: hashedPassword, gender });

    await newStaff.save();
    res.status(201).json({ message: "Staff registration successful" });
  } catch (error) {
    console.error("Error during staff registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/staff/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(400).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: staff._id, email: staff.email }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      staff: {
        _id: staff._id,
        fullName: staff.name,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
      }
    });
  } catch (error) {
    console.error("Error during staff login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});

app.delete("/api/donors/:id", async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);
    if (!deletedDonor) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json({ message: "Donor account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.delete("/api/staff/:id", async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json({ message: "Staff account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/api/contact/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("Received message:", req.body);

  const mailOptions = {
    from: `"Contact Form" <${email}>`, // Dynamic sender
    to: emailUser,
    subject: `New message from: ${name} - ${subject}`,
    html: `
      <h3>Message from: ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ message: "Error sending email", error: err });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
   