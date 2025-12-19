import express from "express";
import multer from "multer";
import Database from "../database.js";
import verifyToken from "../authMiddleware.js";
import verifyTokenOptional from "../optAuth.js";
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
      if (!rows.length)
        return res.status(404).json({ message: "Post not found" });

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
        await Database.query(
          `UPDATE posts SET ${updates.join(", ")} WHERE id = ?`,
          values,
        );
      }

      let imagePath = null;
      // Handle new image
      if (req.file) {
        imagePath = `assets/${req.file.filename}`;

        // Check if post already has an image in post_images
        const [imageRows] = await Database.query(
          "SELECT * FROM post_images WHERE post_id = ?",
          [postId],
        );

        if (imageRows.length) {
          // Update existing image
          await Database.query(
            "UPDATE post_images SET image = ? WHERE post_id = ?",
            [imagePath, postId],
          );
        } else {
          // Insert new image
          await Database.query(
            "INSERT INTO post_images (image, post_id) VALUES (?,?)",
            [imagePath, postId],
          );
        }
      }

      res.json({ message: "Post updated successfully", image: imagePath });
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ message: err.message });
    }
  },
);
// get single post + comments
router.get("/:id", verifyTokenOptional, async (req, res) => {
  try {
    const postId = req.params.id;
    const requesterId = req.id;
    // 1️⃣ Get post
    const [postRows] = await Database.query(
      `
      SELECT 
  p.*,
  pi.image,
  u.id AS user_id,
  u.username,
  u.profile_img,
		  pl.user_id AS liked_by_user
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN post_images pi ON p.id = pi.post_id
		  LEFT JOIN post_likes pl
        ON pl.post_id = p.id AND pl.user_id = ?
WHERE p.id = ?      `,
      [requesterId, postId],
    );

    if (!postRows.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = postRows[0];
    // Attach isLiked boolean
    post.isLiked = !!post.liked_by_user;
    // 2️⃣ Get comments + replies
    const [commentRows] = await Database.query(
      `
      SELECT
        c.id,
        c.comment_text,
        c.upload_date,
        c.like_count,
        c.user_id,
        cr.reply_to_comment_id,
        u.username,
        u.profile_img
      FROM comments c
      LEFT JOIN comment_replies cr
        ON c.id = cr.comment_id
      JOIN users u
        ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.upload_date ASC
      `,
      [postId],
    );

    // 3️⃣ Build comment tree
    const commentMap = {};
    const rootComments = [];

    commentRows.forEach((row) => {
      commentMap[row.id] = {
        id: row.id,
        text: row.comment_text,
        date: row.upload_date,
        likes: row.like_count,
        user: {
          id: row.user_id,
          username: row.username,
          profileImg: row.profile_img,
        },
        parentId: row.reply_to_comment_id,
        replies: [],
      };
    });

    Object.values(commentMap).forEach((comment) => {
      if (comment.parentId) {
        commentMap[comment.parentId]?.replies.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    // 4️⃣ Final response
    res.json({
      post,
      comments: rootComments,
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
});

router.post("/like/:id", verifyToken, async (req, res) => {
  try {
    const uid = req.id;
    const postId = req.params.id;

    const [result] = await Database.query(
      "INSERT INTO post_likes (post_id, user_id) VALUES (?,?)",
      [postId, uid],
    );
    await Database.query(
      "UPDATE posts SET like_count = like_count + 1 WHERE id = ?",
      [postId],
    );
    res.json({ message: "Post liked successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/like/:id", verifyToken, async (req, res) => {
  try {
    const uid = req.id;
    const postId = req.params.id;

    const [result] = await Database.query(
      "DELETE FROM post_likes WHERE post_id = ? AND user_id = ?",
      [postId, uid],
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Post not liked yet" });
    }

    await Database.query(
      "UPDATE posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = ?",
      [postId],
    );

    res.json({ message: "Post unliked successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
