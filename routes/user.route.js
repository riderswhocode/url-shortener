const router = require('express').Router()

const User = require('../controller/user.controller')

router.get('/:id', User.get_user)
router.post('/login', User.login_user)
router.post('/register', User.sign_up)

module.exports = router