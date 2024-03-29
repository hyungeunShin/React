import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        //첫번째 파라미터는 토큰에 담을 내용
        {
            _id: this.id,
            username: this.username
        },
        process.env.JWT_SECRET, //두번째 파라미터는 JWT암호
        {
            expiresIn: '7d',    //7일 유효기간
        },
    );

    return token;
}

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);

export default User;