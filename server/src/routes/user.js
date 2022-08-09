const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// Register user
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }
        const hashed_password = await bcrypt.hash(password, 10)
        user = new User({
            name,
            email,
            password: hashed_password
        })
        await user.save()
        return res.status(201).json({message: 'User created Successfully'})
    } catch(err) {
        console.log(err.message)
    }
})

// Login user
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({error: 'Invalid Credential'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({error: 'Invalid Credential'})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiersIn: '1h'
        })
        return res.json(token)
    } catch (err) {
        console.log(err.message)
    }
})


module.exports = router