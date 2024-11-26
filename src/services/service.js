const Users = require("../model/model");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
    const userSignUp = async (req, res) => {
        try {
            const { name, email, password, confirmpassword, dateofbirth } = req.body;

            if (!name || !email || !password || !confirmpassword || !dateofbirth) {
                return res.status(400).json({ message: "All fields are required" });
            }

            if (password !== confirmpassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

       
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already registered" });
            }

        
            const hashedPassword = await bcrypt.hash(password, 10);

            let newUser = new Users();
            newUser.name = name;
            newUser.email = email;
            newUser.password = hashedPassword; 
            newUser.confirmpassword = hashedPassword; 

            await newUser.save();

            return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    const signUserIn = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

          
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            return res.status(200).json({ message: "User signed in successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
        const alloftheusers = async (req, res)=>{
         await  Users.find().select("-password").select("-confirmpassword") 
           .then((data)=>{
            res.status(200).json({
                message: "All users",
                data
               })
           })
}


    return { userSignUp, signUserIn,  alloftheusers};
};

module.exports = getAllUsers;
