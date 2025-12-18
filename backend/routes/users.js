import express from 'express';
import Database from '../database.js';
import verifyToken from '../authMiddleware.js'

const router = express.Router();

//gets users and their posts
router.get('/', async (req, res) => {
    try {
        const [rows] = await Database.query(`
      SELECT 
        u.id as user_id, u.username, u.email, u.description, u.profile_img, u.banner_img, u.is_Admin, u.profile_font,
        p.id as post_id, p.title, p.description as post_description, p.upload_date, p.comment_count, p.like_count, p.post_type, p.isActive, p.needsCheck,
        i.id as image_id, i.image
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN post_images i ON p.id= i.id
      ORDER BY u.id, p.upload_date DESC
    `);

        // group posts under each user
        const usersMap = {};
        rows.forEach(row => {
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
                    posts: []
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
                    image_id: row.image_id,   // <-- added
                    image: row.image
                });
            }


        });

        res.json(Object.values(usersMap));
    } catch (err) {
        console.error("Error fetching users with posts:", err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});


//gets users by id
router.get('/:id', async (req, res) => {
    try{

        const [users] = await Database.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        res.json(users);
    } catch(err){
        console.error("Error fetching data of users",err);
        res.status(500).json({message: 'Error fetching users', error: err.message});
    }
});


//gets logged-in user info along with posts
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = Number(req.id);
        const [users] = await Database.query("SELECT * FROM users WHERE id = ?", [userId]);
        console.log("Logged-in user ID: ", req.id);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const user = users[0];

        const [posts] = await Database.query("SELECT * FROM posts WHERE user_id = ?", [userId]);
        user.posts = posts;

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;