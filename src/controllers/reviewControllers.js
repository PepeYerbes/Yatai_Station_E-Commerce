import Review from "../models/review.js";

async function getReviews(req, res) {
    try { 
        const reviews = await Review.find().sort({createdAt: -1}).populate('user', 'name email').populate('product', 'name price');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error });
    }
}
async function getReviewById(req, res) {
    try {
        const review = await Review.findById(req.params.id).populate('user product');
        if (!review) {
            return res.status(404).json({ message: "review not found" });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function createReview(req, res) {
    try { 
        const { user, product, rating, comment } = req.body;
        if (!user || !product ) {
            return res.status(400).json({ message: "User and product are required" });
        }
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        const existingReview = await Review.findOne({ user, product });
        if (existingReview) {
            return res.status(400).json({ message: "Product already in review" });
        }

        const newReview = new Review({ user, product, rating, comment }); 
        await newReview.save();
        res.status(201).json(await newReview.populate(['user','product']));
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function getUserReviews(req, res) {
    try {
        const reviews = await Review.find({ user: req.params.userId }).populate('product', 'name image').sort({ createdAt: -1 });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }   
}

async function deleteReview(req, res) {
    try {
        const deletedReview = await review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: "review not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error });
    }
}

export {
    getReviews,
    getReviewById,  
    createReview,
    getUserReviews,
    deleteReview
}
