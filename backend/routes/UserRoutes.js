const express = require('express');//requiring express
const router =  express.Router();//making an instance of express
const {SignUpUser, loginUser} = require("../controllers/UserController")

/*both the login(line 9) and signUp(line 12) routes are going to be post requests because 
we are sending data to the server*/

//Login Route//
router.post("/login", loginUser)

//SignUp Route
router.post("/register", SignUpUser)

module.exports = router










module.exports = router//exporting the router