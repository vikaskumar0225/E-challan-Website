import User from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const loginUser = async (req,res)=>{
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
        console.log("1");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("2");
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign(
        { userId: user._id },
        'your_secret_key',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: { username: user.username, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


export default loginUser;