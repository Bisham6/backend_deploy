const crypto = require('crypto');
const User = require('../models/userModel');



exports.createUser = async (req, res) => {
    try{
        const{ name, email, role, password } = req.body;

        if(!name || !email || !role || !password){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }
        //check if email already exists
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({
                message: "Email already exists!"
            });
        }

        const salt = crypto.randomBytes(32).toString('hex');// generate random salt.
        const hashedPassword  = crypto
        .createHmac('sha256',salt)// Create HMAC hash using sha256
        .update(password) // Update the password with the data
        .digest('hex'); // Convert the data into hexadecimal format


        //create new user
        const newUser = new User({
            name, email, role, 
            password:`${salt}:${hashedPassword}`, // Store both salt and hashed password
        }); 
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({ message: "User does not exist!" });
        }

        const [salt, originalHashedPassword] = existingUser.password.split(':');
        const hashedPassword = crypto
        .createHmac('sha256',salt)
        .update(password)
        .digest('hex');

        if(hashedPassword !== originalHashedPassword){
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        //generate token
        const token = crypto.randomBytes(16).toString('hex');

        //store the token in the user document
        existingUser.token = token;
        existingUser.tokenExpiry = Date.now() + 360000; // 1 hour
        await existingUser.save();

        res.status(200).json({ 
            message: "Login successful!" ,
            token
        });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    role: 1,
                },
            },
            {
                $facet: {
                    users: [{ $skip: 0 }, { $limit: 100 }], // Paginate if needed
                    totalCount: [{ $count: "count" }],
                },
            },
        ]);

        // Extract total count and user array
        const users = result[0].users;
        const totalCount = result[0].totalCount[0]?.count || 0;

        res.status(200).json({ users, totalCount });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error!" });
    }
};
