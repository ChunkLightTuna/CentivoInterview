import express from "express"
import mongoose from "mongoose"

const {Schema, model} = mongoose
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/centivo_interview"

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('DB connection error:', err))

const User = model('User', new Schema({
    name: String,
    email: String,
    age: Number
}))

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || user.age <= 21) {
            return res.status(404).json({message: "User not found!"});
        }

        res.json(user)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({message: 'Invalid ID Format'})
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})