import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/authorization.js';
import cors from 'cors';

const app = express();
const PORT = 5000

app.use(cors({
    origin: "http://localhost:5173",   // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // important!

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));



app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/authorization", authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to BrushTip Server");
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
