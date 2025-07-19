import User from "../models/user.js";

async function getUsers(req, res) {
    try { 
        const Users = await User.find().sort({name:1}).populate('user');
        res.json(Users);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const User = await User.findById(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(User);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function getUsersByCategory(req, res) {
        try {
            const id = req.params.idCategory;
            const Users = await User.find({ category: id }).populate('category').sort({ name: 1 });
            if (Users.length === 0) {
                return res.status(404).json({ message: "No Users found in this category" });
            }
            res.json(Users);
        } catch (error) {
            res.status(500).send({ error });
        }
    }
async function createUser(req, res) {
    try { 
        const { displayName, email, hashpassword, role, avatar} = req.body;
        if (!displayName || !email || !hashpassword || !role || !avatar) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = new User({
            displayName,
            email,
            hashpassword,
            role,
            avatar,
            phone,
            isActive
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const { displayName, email, hashpassword, role, avatar } = req.body;
        if (!displayName || !email || !hashpassword || !role || !avatar) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedUser = await User.findByIdAndUpdate(id,
            {
            displayName,
            email,
            hashpassword,
            role,
            avatar,
            phone,
            isActive
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error });
    }
}

export {
    getUsers,
    getUserById,  
    getUsersByCategory,  
    createUser,
    updateUser,
    deleteUser
}
