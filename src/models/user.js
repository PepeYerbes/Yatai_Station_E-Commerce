import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,   
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    
    hashpassword: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "customer", "guest"],
        default: "guest",
    },
    avatar: {
        type: String,
        required: true,
        default: "https://placeholder.com/100x100.png",  
    },
    phone: {
        type: String,
        required: false,
        match: [/^\d{10}$/, 'El número de teléfono debe contener exactamente 10 dígitos'],
    },
    
    age: {
        type: Number,
        required: false,
        min: 0,  
        max: 10,
    },
    isActive: { 
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;