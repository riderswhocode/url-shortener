const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt')

exports.get_user = async (req, res, next) => {

    const User = await UserModel.findById({_id: req.params.id})
    if (!User) {
        res.status(404).send({
            "status": 404,
            "message": "User cannot be found"
        })
    }

    res.status(200).send({
        "status": 200,
        "message": User
    })
}

exports.login_user = async (req, res, next) => {
    let { user, password } = req.body

    if (!email || !password) {
        res.status(400).send({
            'status': 400,
            'message': 'Username or Password cannot be empty'
        })
    }

    UserModel.findOne({ 
        $or: [
            { username: user },
            { email: user }
        ]
    })
    .then(async user => {
        if (!user){
            res.status(200),send({
                'status': 200,
                'message': 'Invalid Username or Password'
            })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(401).send({
                    'status': 401,
                    'message': 'Authentication Failed' 
                })
            }

            if (result) {
                req.session.user = user._id
                req.session.isLoggedIn = true
                return req.session.save(err => {
                    if (err) {
                        res.status(401).send({
                            "status": 401,
                            "message": 'Error Saving Sessions'
                        })
                    }
                    res.status(200).send({
                        "status": 200,
                        "message": "Session is created"
                    })
                })
            }
        })
    })
}

exports.sign_up = async (req, res, next) => {

    let { fistname, lastname, username, email, password } = req.body

    if (!email || !password) {
        res.status(400).send({
            "status": 400,
            "message": 'Email or Password cannot be empty'
        })
    }

    UserModel.findOne({
        username: username
    })
    .then(async user => {
        if (user) {
            res.status(200).send({
                "status": 200,
                "message": "Username already exist"
            })
        }
    })

    UserModel.findOne({
        email: email
    })
    .then(async user => {
        if (email) {
            res.status(200).send({
                "status": 200,
                "message": "Email address is already use"
            })
        }
    })

    const saltRounds = 10
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(400).send({
                "status": 400,
                "message": err.toString()
            })
        }
        const newUser = new UserModel({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hash
        })
        newUser.save((user_err, created_user) => {
            if (user_err) {
                res.status(200).send({
                    "status": 200,
                    "message": user_err.toString()
                })
            }
            if (created_user) {
                res.status(200).send({
                    "status": 200,
                    "message": "Registration Successful",
                    "id": created_user._id
                })
            }
        })

    })

}