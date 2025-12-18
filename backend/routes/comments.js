import express from 'express';
import Database from '../database.js';
const router = express.Router();

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