const unverifiedUser = require('../models/unverifiedUser');
const User = require('../models/user');
const crypto = require('crypto');
const Recipient = require('mailersend').Recipient
const EmailParams = require('mailersend').EmailParams
const MailerSend = require('mailersend').MailerSend
const Sender = require('mailersend').Sender
const mailerSendConfig = {apiKey: 'mlsn.c59908742ca4fc2711df6f7a713e8dc26da5d8b02c5a7bb7e509aaa526242e21'}
const mailerSend = new MailerSend(mailerSendConfig)


exports.getSignupLogin = (req, res, next)=>{
    res.render('home/home', {
        pageTitle: 'LikeMinded',
        path: '/', 
    })
}

exports.postSignup = (req, res, next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(confirmPassword !== password){
        throw new Error('passwords aint matchng')
    }

    crypto.randomBytes(32, (err, buffer)=>{
        if(err){
            console.log(err);
            return res.redirect("/");
        }
        const token = buffer.toString('hex');
        const user = new unverifiedUser({
            username: username,
            email: email,
            password: password,
            dateCreated: Date.now(),
            verifiedEmail: false,
            emailVerificationToken: token,
            emailVerificationTokenExpiration: Date.now() + 3600000,
        })
        return user.save().then(result=>{
            console.log("user saved succesfully");
            res.redirect('/')
        }).then(result => {
      
            const sentFrom = new Sender('MS_Nx2TRU@trial-neqvygmev7z40p7w.mlsender.net', 'Pranav Lande');
      
            const recipients = [new Recipient(email)];
      
            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setSubject('Password Reset')
                .setHtml(`<p>Hello ${username}, Welcome to LikeMinded</p>
                          <p>Please verify your email using the below link<p>
                          <p>Click this <a href="http://localhost:5000/auth/${token}">Link</a> to set a new Password<p>
                          <p>If that doesn't work please copy and paste the link below in your browser</p>
                          <p>http://localhost:5000/auth/${token}</p>
                            `)
                .setText("Greetings from the team, you got this message because you requested a signup to LikeMinded website.");
            return mailerSend.email.send(emailParams);
        })
        
    
    })

}

exports.getAuthToken = (req, res, next)=>{
    const token = req.params.token;
    unverifiedUser.findOne({emailVerificationToken: token})
    .then(unverifiedUsers =>{
        console.log(unverifiedUsers);
        const user = new User({
            username: unverifiedUsers.username,
            userName: unverifiedUsers.userName,
            email: unverifiedUsers.email,
            password: unverifiedUsers.password,
            profileUrl: unverifiedUsers.profileUrl,
            dateCreated: unverifiedUsers.dateCreated,
        })
        return user.save();
    })
    .then(result=>{
        console.log(token);
        unverifiedUser.findOneAndDelete({emailVerificationToken: token})
        .then(result =>{
            res.redirect('/home');
        })
    })
    .catch(err =>{
        console.log(err);
    })
    
}




