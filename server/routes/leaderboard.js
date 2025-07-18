import express from 'express'
// import { Router } from 'express'

import User from '../models/Users.js'
import History from '../models/History.js'

const router = express.Router();

// Create new user 
router.post("/users", async(req, res) => {
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(200).json(user);
});

// Get all users sorted by totalPoints
router.get("/users", async(req, res) => {
    const users = await User.find().sort({ totalPoints: -1});
    res.json(users);
})

// Claim points 
router.post("/claim/:userId", async(req, res) => {
    const userId = req.params.userId;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints+=points;
    await user.save();

    const history = new History({ userId, pointsClaimed: points });
    await history.save();

    res.json({ points, user });
})

// Get Claim History 
router.get("/history", async(req, res) => {
    const history = await History.find().populate('userId', 'name').sort({ timeStamp: -1 });
    res.json(history);
})

// Add new User 
router.post('/add-user', async(req, res) => {
    const { name } = req.body;
    try{
        const newUser = await User.create({ name });
        res.status(201).json({ message: "user added", newUser })
    }catch(err){
        res.status(500).json({ message: "Error creating user" });
    }
})

export default router