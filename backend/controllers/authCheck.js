import jwt from 'jsonwebtoken';
const authCheck=(req,res)=>{
const token=req.cookies.token;


if(!token) return res.status(401).json({message:'not authenticated'});
try {
     const decoded = jwt.verify(token, process.env.KEY);
    res.status(200).json({ message: 'Authenticated', user: req.user });

} catch (error) {
    return res.status(403).json({ message: "Invalid token" });
}
}

export default authCheck;