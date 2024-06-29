exports.getHome = (req, res, next) =>{
    res.render('chat/index', {
        pageTitle: "Home",
        path: '/home',
    })
};