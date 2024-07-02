const { check, body} = require('express-validator');

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');


router.get('/', authControllers.getSignupLogin);


router.post('/signup',[body('username')
    .isLength({min:5})
    .isAlphanumeric()
    .custom((value, {err})=>{
        return User.findOne({username: value})
        .then(user =>{
            if(user){
                return Promise.reject('User already exists');
            }
        })
}),
    body('password', "Please Enter a valid password").isLength({min:5})
    .isAlphanumeric().trim(),
    body('confirmPassword').custom((value, {req})=>{
        if(value != req.body.password){
            return Promis.reject('Passwords are not the same');
        }
    }).trim()
    ],authControllers.postSignup);

router.post('/login', [body('username')
    .isLength({min:5})
    .isAlphanumeric()
    .custom((value, {req})=>{
        return User.findOne({username:value})
        .then(user =>{
            if(!user){
                return Promise.reject('Invalid Username')
            }
        })
    }),
    body('password', 'Please enter a valid password with only numbers and text and at lease 5 characters ')
    .isLength({min:5}).isAlphanumeric().trim(),
    ] , authControllers.postLogin);

router.get('/auth/:token', authControllers.getAuthToken);

module.exports = router;