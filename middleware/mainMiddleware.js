const User= require("../models/userModel");

const authenticate = async (req, res, next) => {
    console.log("inside middleware", req.header('Authorization'));
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing!" });
        }

        const user = await User.findOne({token});  
        if(!user){
            return res.status(401).json({ message: "Invalid token!" });
        }

         // Check if the token is expired
        if (user.tokenExpiry < Date.now()) {
            return res.status(401).json({ message: "Token has expired!" });
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).send({error: "Please authenticate!"});
    }
}


module.exports = authenticate;
