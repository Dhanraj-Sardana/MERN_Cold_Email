const logout = (req, res) => {

    res.cookie('token', "", {
        httpOnly: true,
        secure: false, expires: new Date(0),sameSite: 'Lax',
        path: '/',
    });
    console.log(req.cookies.token);
    
    res.status(200).json({ message: 'logged out' });
}

export default logout;