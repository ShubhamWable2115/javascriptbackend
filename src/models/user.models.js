import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
         type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
        
    },
    avatar:{
        type:String,  /// CLoudinary URL
        required:false,
    },
    watchhistory:[{
        type:{type:Schema.Types.ObjectId,ref:"Video"},
        ref:"Video",    
    }
],
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    refreshToken:{
        type: String,

    }
    
},{timestamps:true});

userSchema.pre("save", async function (next){
    if(this.modified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (){
    jwt.sign({_id:this.id,
        email:this.email,
        username:this.username,
        fullName:this.fullname,
         },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

userSchema.methods.generateRefreshToken = function (){
    jwt.sign({_id:this.id,
       
         },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}

export const User = mongoose.model("User", UserSchema);