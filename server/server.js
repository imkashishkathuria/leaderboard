import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import leaderboardRoutes from './routes/leaderboard.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log("Mongodb Error", err));


app.use("/api", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})
