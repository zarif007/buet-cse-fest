import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "UserName is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    role: {
        type: String,
        enum: [ "general","admin","superadmin"],
        default: "general",
    },

    
}, {
    timestamps: true
});


export const UserModel =  mongoose.model("User", UserSchema);

