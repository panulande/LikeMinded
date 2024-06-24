exports.getSignup = (req, res, next)=>{
    res.render('signup', {
        pageTitle: 'Sign Up',
        path: '/signup', 
    })
}

exports.getLogin = (req, res, next) =>{
    res.render('login', {
        pageTitle: "Login",
        path: '/login',
    })
}