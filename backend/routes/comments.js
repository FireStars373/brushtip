import express from 'express';
import Database from '../database.js';
const router = express.Router();
import verifyToken from '../authMiddleware.js';
//gets users by id
router.get('/:id', async (req, res) => {
    try{
        const [comments] = await Database.query('SELECT * FROM comments WHERE post_id = ?', [req.params.id]);
        res.json(comments);

    } catch(err){
        console.error("Error fetching data of users",err);
        res.status(500).json({message: 'Error fetching users', error: err.message});
    }
});
router.post("/post", verifyToken, async (req, res) => {
  try {
    const { comment_text, reply_to_comment_id, post_id } = req.body;
    const uid = req.id;
    const now = new Date();

    const [result] = await Database.query(
      "INSERT INTO comments (comment_text, upload_date, like_count, post_id, user_id) VALUES (?,?,?,?,?)",
      [
        comment_text,
        now,
        0,
		post_id,
        uid,
      ],
    );
    const postId = result.insertId;
	if (reply_to_comment_id) {
	  await Database.query(
		  "INSERT INTO comment_replies (comment_id, reply_to_comment_id) VALUES (?,?)",
		[postId, reply_to_comment_id],
    );
	}
	await Database.query(
  'UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?',
  [post_id]
); 

    res.json({ message: "comment uploaded successfully", id: postId, reply_to_comment_id: reply_to_comment_id });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.post("/like/:id", verifyToken, async (req, res) => {
  try {
    const uid = req.id;
	const commentId = req.params.id;

    const [result] = await Database.query(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES (?,?)",
      [
        commentId,
        uid,
      ],
    );
	await Database.query(
	'UPDATE comments SET like_count = like_count + 1 WHERE id = ?',
	[commentId]
	); 
    res.json({ message: "Liked comment successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.delete("/like/:id", verifyToken, async (req, res) => {
  try {
    const uid = req.id;
    const commentId = req.params.id;

    // Remove like
    const [result] = await Database.query(
      "DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?",
      [commentId, uid]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "comment not liked yet" });
    }

    await Database.query(
      "UPDATE comments SET like_count = GREATEST(like_count - 1, 0) WHERE id = ?",
      [postId]
    );

    res.json({ message: "comment unliked successfully" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
