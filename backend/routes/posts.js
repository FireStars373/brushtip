import express from "express";
import multer from "multer";
import Database from "../database.js";
import verifyToken from "../authMiddleware.js";
const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
  try {
    const [posts] = await Database.query("SELECT * FROM posts");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching data of posts", err);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
export const upload = multer({ storage });

router.post("/post", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const uid = req.id;
    const now = new Date();

    const postType = req.file ? 2 : 1;
    const imagePath = req.file ? req.file.path : null;

    const [result] = await Database.query(
      "INSERT INTO posts (title, description, upload_date, comment_count, like_count, post_type, user_id, isActive, needsCheck) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        title,
        description,
        now,
        0,
        0,
        postType,
        uid,
        postType === 1 ? 1 : 0,
        postType === 1 ? 0 : 1,
      ],
    );
    const postId = result.insertId;
    await Database.query(
      "INSERT INTO post_images (image, post_id) VALUES (?,?)",
      [imagePath, postId],
    );

    res.json({ message: "Post uploaded successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await Database.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    const post = rows[0];
    const uid = Number(req.id);
    if (post.user_id !== uid) {
      return res.status(401).json({ message: "This post is not yours" });
    }

    const [deleted] = await Database.query("DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.patch(
  "/edit/:id",
  verifyToken,
  upload.single("image"), // single new image upload
  async (req, res) => {
    try {
      const postId = req.params.id;
      const uid = Number(req.id);

      // Fetch post
      const [rows] = await Database.query("SELECT * FROM posts WHERE id = ?", [
        postId,
      ]);
      if (!rows.length) return res.status(404).json({ message: "Post not found" });

      const post = rows[0];
      if (post.user_id !== uid) {
        return res.status(401).json({ message: "This post is not yours" });
      }

      // Update title/description if provided
      const allowedFields = ["title", "description"];
      const updates = [];
      const values = [];

      allowedFields.forEach((field) => {
        const value = req.body[field];
        if (value !== undefined && value !== "") {
          updates.push(`${field} = ?`);
          values.push(value);
        }
      });

      if (updates.length) {
        values.push(postId);
        await Database.query(`UPDATE posts SET ${updates.join(", ")} WHERE id = ?`, values);
      }

		let imagePath = null;
      // Handle new image
      if (req.file) {
         imagePath = `assets/${req.file.filename}`;

        // Check if post already has an image in post_images
        const [imageRows] = await Database.query(
          "SELECT * FROM post_images WHERE post_id = ?",
          [postId]
        );

        if (imageRows.length) {
          // Update existing image
          await Database.query("UPDATE post_images SET image = ? WHERE post_id = ?", [
            imagePath,
            postId,
          ]);
        } else {
          // Insert new image
          await Database.query("INSERT INTO post_images (image, post_id) VALUES (?,?)", [
            imagePath,
            postId,
          ]);
        }

      }

      res.json({ message: "Post updated successfully", image: imagePath});
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ message: err.message });
    }
  }
);export default router;

