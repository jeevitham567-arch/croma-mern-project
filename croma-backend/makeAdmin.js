const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const users = await User.find().select("name email role");

    if (users.length === 0) {
      console.log("No users found in database");
      process.exit();
    }

    console.log("\n========== USERS ==========");

    users.forEach((user, index) => {
      console.log(
        `${index + 1}. Name: ${user.name} | Email: ${user.email} | Role: ${user.role}`
      );
    });

    console.log("===========================\n");

    const email = users[0].email;

    const user = await User.findOne({ email });

    user.role = "admin";

    await user.save();

    console.log("================================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Role:", user.role);
    console.log("================================");

    process.exit();
  } catch (error) {
    console.log("Make Admin Error:", error);
    process.exit(1);
  }
};

makeAdmin();