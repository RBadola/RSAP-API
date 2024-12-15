import USER from "../models/user.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { match } from "assert";
async function UserRegistration(req, res) {
  try {
    const { name, email, photoBase64, ...otherFields } = req.body;

    let photoPath = null;
    if (photoBase64) {
      const matches = photoBase64.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ message: "Invalid Base64 string" });
      }

      const fileType = matches[1].split("/")[1];
      const base64Data = matches[2];
console.log(fileType,base64Data,matches)
      const fileName = `${Date.now()}.${fileType}`;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, "../uploads", fileName);

      fs.writeFileSync(filePath, base64Data, "base64");
      photoPath = `/uploads/${fileName}`;
    }

    const newUser = new USER({
      name,
      email,
      photo: photoPath,
      ...otherFields,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
}

export default UserRegistration;
