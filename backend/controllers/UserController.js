const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken")

const createWebToken = (_id) =>{
/*creating this fuction so that it can be used multiple times 
and it basically generates tokens everytime the user SignsIn or signsUp*/

/*The reason for passing _id (line 4) as an argument inside is 
because it's part of the payload of the token*/

//using the jwt package and attching the .sign method to it (line 19)//

/*Inside the sign method we pass in 3 arguments th first one represents the payload on the token we want to create, 
the second is the SECRET_KEY which is only known to the server,

and the third argument has the expiresIn property which says how long the user will stayed logged in for before the token expires*/ 

//When the createWebToken(line 4) is called then this token that is created will be returned (line 19)
return jwt.sign({_id,}, process.env.SECRET_KEY, {expiresIn: "1d"})
}

//login user//
const loginUser = async (req, res) => {
  /*Inside the async function(line 25) we take in the request object and the response object*/
  const {username, password} = req.body;
  
  try {//using a trycatch block to catch the error on (line 36) in the userModel file//
    //In the try we are trying to signIn//
    const user = await UserModel.signIn(username, password);

    //create a token//
    const token = createWebToken(user._id)
    //calling the createWebToken on (line 4) in this token variable (line 38)

    res.status(200).json({ username, token});// passing the token variable back to the brower//
  } catch (error) {
    //In the catch we are catching the error on (line 36) in the userModel file if there is one//
    res.status(404).json({ error: error.message });
  }
};
//SignUp user//
const SignUpUser = async (req, res) => {
  /*Inside the async function(line 31) we take in the request object and the response object*/

  const { username, password } = req.body;

  try {//using a trycatch block to catch the error on (line 36) in the userModel file//
    //In the try we are trying to signUp//
    const user = await UserModel.signUp(username, password);

    //create a token//
    const token = createWebToken(user._id)
    //calling the createWebToken on (line 4) in this token variable (line 38)

    res.status(200).json({ username, token});// passing the token variable back to the brower//
  } catch (error) {
    //In the catch we are catching the error on (line 36) in the userModel file if there is one//
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
//exporting the login an sign up functions//
  loginUser,
  SignUpUser,
};
