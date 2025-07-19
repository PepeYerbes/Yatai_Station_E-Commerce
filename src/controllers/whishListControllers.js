import wishList from "../models/wishList.js";

async function getwishLists(req, res) {
    try { 
        const wishLists = await wishList.find().sort({name:1}).populate('user product');
        res.json(wishLists);
    } catch (error) {
        res.status(500).send({ error });
    }
}
async function getwishListById(req, res) {
    try {
        const id = req.params.id;
        const wishList = await wishList.findById(id);
        if (!wishList) {
            return res.status(404).json({ message: "wishList not found" });
        }
        res.json(wishList);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function createwishList(req, res) {
    try { 
        const { user, product } = req.body;
        if (!user || !product) {
            return res.status(400).json({ message: "User and product are required" });
        }

        const existingItem = await wishList.findOne({ user, product });
        if (existingItem) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        const newwishList = new wishList({ user, product }); 
        await newwishList.save();
        res.status(201).json(await newwishList.populate('product'));
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getUserWishList(req, res) {
    const userId = req.params.userId;
    const items = await wishList.find({ user: userId }).populate('product');
    res.json(items);
}

async function deletewishList(req, res) {
    try {
        const id = req.params.id;
        const deletedwishList = await wishList.findByIdAndDelete(id);
        if (!deletedwishList) {
            return res.status(404).json({ message: "wishList not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error });
    }
}

export {
    getwishLists,
    getwishListById,  
    createwishList,
    deletewishList
}
