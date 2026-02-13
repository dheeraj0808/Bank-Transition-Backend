const { MdEmail } = require('react-icons/md');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const userschema = db.schema({
    email: {
        type: String,
        required: [true, "Email is required for creating a user"],
        // required is used because this is required field
        trim: true,
        //here trim is used to remove the white spaces from the email
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
        //match is used to validate the email address
        lowercase: true,
        //lowercase is used to convert the email address to lowercase
        unique: [true, "Email already exists"],
        //unique is used to ensure that the email address is unique
        index: true
        // index is used to create an index on the email field

    },
    name:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [20, "Name must be at most 50 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
        //select is used to hide the password from the response
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
},{
    timestamps: true
})

userschema.pre("save",async function(next){
    if(!this.isModified("password")) {return next()}
    //here we are checking if the password is modified or not
    //if the password is not modified then we are returning next()
    //if the password is modified then we are hashing the password
    const hash = await bcrypt.hash(this.password, 10);
    //here we are hashing the password
    this.password = hash;
    //here we are storing the hashed password
    next();
    //here we are returning next()
})

userschema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
//here we are comparing the password and returning the result in boolean 
// this is used in the login controller to compare the password and return the result in boolean 
// if the password is correct then it will return true and if the password is incorrect then it will return false
const userModel = db.model("User", userschema);
// here we are exporting the user model 
//db.model is used to create a model 
// "User" is the name of the model 
// userschema is the schema of the model

module.exports = userModel;
// here we are exporting the user model