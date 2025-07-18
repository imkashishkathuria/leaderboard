import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    totalPoints: {type: Number, default: 0}
});

const Users = mongoose.model("User", UserSchema);

export default Users