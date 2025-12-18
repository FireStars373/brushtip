import express from 'express';
import Database from '../database.js';
const router = express.Router();

//get all posts
router.get('/', async (req, res) => {
    try{
        const [posts] = await Database.query('SELECT * FROM posts');
        res.json(posts);
    } catch(err){
        console.error("Error fetching data of posts",err);
        res.status(500).json({message: 'Error fetching posts', error: err.message});
    }
});


export default router;