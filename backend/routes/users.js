import express from "express";
import Database from "../database.js";
import verifyToken from "../authMiddleware.js";
import multer from "multer";
const router = express.Router();
import { upload } from "./posts.js"
import verifyTokenOptional from "../optAuth.js";
//gets users and their posts
router.get("/", verifyTokenOptional, async (req, res) => {
  try {
    const requesterId = req.id; // number or null

const [rows] = await Database.query(
  `
  SELECT 
    u.id as user_id, u.username, u.email, u.description, 
    u.profile_img, u.banner_img, u.is_Admin, u.profile_font,

    p.id as post_id, p.title, p.description as post_description, 
    p.upload_date, p.comment_count, p.like_count, 
    p.post_type, p.isActive, p.needsCheck,

    i.id as image_id, i.image,

    pl.user_id as liked_by_user

  FROM users u
  LEFT JOIN posts p ON u.id = p.user_id
  LEFT JOIN post_images i ON p.id = i.post_id
  LEFT JOIN post_likes pl 
    ON pl.post_id = p.id 
    AND pl.user_id = ?

  ORDER BY u.id, p.upload_date DESC
  `,
  [requesterId]
);

    // group posts under each user
    const usersMap = {};
    rows.forEach((row) => {
      if (!usersMap[row.user_id]) {
        usersMap[row.user_id] = {
          id: row.user_id,
          username: row.username,
          email: row.email,
          description: row.description,
          profile_img: row.profile_img,
          banner_img: row.banner_img,
          is_Admin: row.is_Admin,
          profile_font: row.profile_font,
          posts: [],
        };
      }

      if (row.post_id) {
        usersMap[row.user_id].posts.push({
          id: row.post_id,
          title: row.title,
          description: row.post_description,
          upload_date: row.upload_date,
          comment_count: row.comment_count,
          like_count: row.like_count,
          post_type: row.post_type,
          isActive: row.isActive,
          needsCheck: row.needsCheck,
          image_id: row.image_id, // <-- added
          image: row.image,
			 isLiked: !!row.liked_by_user,
        });
      }
    });

    res.json(Object.values(usersMap));
  } catch (err) {
    console.error("Error fetching users with posts:", err);
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = Number(req.id);
    const [users] = await Database.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    console.log("Logged-in user ID: ", req.id);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users[0];

    const [posts] = await Database.query(
      `
  SELECT 
    p.*,
    i.image
  FROM posts p
  LEFT JOIN post_images i ON p.id = i.post_id
  WHERE p.user_id = ?
`,
      [userId],
    );

    user.posts = posts;

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//gets users by id
router.get("/:id", async (req, res) => {
  try {
    const [users] = await Database.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    res.json(users);
  } catch (err) {
    console.error("Error fetching data of users", err);
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});


// PATCH profile with optional images

router.patch(
  "/profile",
  verifyToken,
  upload.fields([
    { name: "profile_img", maxCount: 1 },
    { name: "banner_img", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = Number(req.id);

      const allowedFields = ["username", "email", "description", "profile_font"];
      const updates = [];
      const values = [];

      // Handle text fields
      allowedFields.forEach((field) => {
        const value = req.body[field];
        if (value !== undefined && value !== "") {
          updates.push(`${field} = ?`);
          values.push(value);
        }
      });

      // Handle images with assets/ prefix
      if (req.files) {
        if (req.files["profile_img"]) {
          updates.push("profile_img = ?");
          values.push(`assets/${req.files["profile_img"][0].filename}`);
        }
        if (req.files["banner_img"]) {
          updates.push("banner_img = ?");
          values.push(`assets/${req.files["banner_img"][0].filename}`);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({ message: "No valid fields provided" });
      }

      values.push(userId);

      const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      const [result] = await Database.query(sql, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const [users] = await Database.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );

      res.json(users[0]);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/profile", verifyToken, async (req, res) => {
  try {
    const uid = Number(req.id);

    const [deleted] = await Database.query("DELETE FROM users WHERE id = ?", [
      uid,
    ]);
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

