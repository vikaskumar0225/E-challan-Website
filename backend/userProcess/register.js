import User from "../models/usermodel.js";
import bcrypt from 'bcrypt';

const registerUser = async (req,res)=>{
    const { username, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, email, password: hashedPassword });

      await user.save();

      res.status(201).json({
        message: 'User created successfully',
        user: { username: user.username, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}

export default registerUser;