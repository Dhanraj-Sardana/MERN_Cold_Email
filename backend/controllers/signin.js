import dotenv from 'dotenv';
dotenv.config();
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const signin = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hash });
    await user.save();
          const userID=user._id;
    const token = jwt.sign({ email: email, userID: userID }, process.env.KEY);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
    });

    return res.status(200).json({ message: 'User signed in successfully' });

  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({ message: 'Error from server during signin' });
  }
};

export default signin;
