const jwt = require("jsonwebtoken");
//importing jwt package (line 1)//
const UserModel = require('../models/UserModel');
//importing UserModel from ../models/UserModel (line 3)//

/*creating a function called jwtAuth(line 10)and it is a middleware function,
and it has access to the req, res and next function*/

//we invoke the next function(line 10) to move on to the piece of middleware//
const jwtAuth = async (req, res, next) => {
  //verify authentication//

  //using an authorization headers property to verify if a user is authenticated//

  /*on the request object we get access to the headers, 
    such as the { "Content-Type": "application/json" } property on the headers,
    one of the other header properties is the authorization property and we can grab it from the headers*/
  const { authorization } = req.headers;
  //destructuring the authorization property from req.headers (line 18)

  //once we grab the authorization property from the headers it should contain the json web token//

  //checking if the authorization property has a value//
  if (!authorization) {
    /*if the authorization doesn't have a value(line 24),
    then we return res.status(401) and add json with an error message (line 27)*/
    return res.status(401).json({ error: "auth token needed" });
  }
  /*The next thing is that we need to get the token from the authorization property (line 24),
    because we send the token as part of the request headers*/

  /*So the value of the authorization property(line 24) when we send it is going to be a string*/

  /*We need to split the string into 2 parts, 
    in order to do that we will be using the split method on the string,
    that will split the string into an array and it will be split at a certain character,
    so when it comes across that character it gets split at that character,
    and into its different elements(line 34)*/
  const token = authorization.split(" ")[1];
  /*The first part is position 0 and second part is position 1 which is the actual token,
    and position 1 is the one that we want (line 39)*/

  //Now we need to verify the token to make sure it has'nt been altered//

  //To verify we need to use the json web token package to do that//

  //using a try and catch method to do this (line 48)//
  try {
    //trying to verify the token with jwt.verify function from jwt(line 54)//

    //Inside the function we pass in the token variable on (line 39)//

    //Grabbing the id from the token (line 54)//
    const {_id} = jwt.verify(token, process.env.SECRET_KEY);
    /*We also the secret key from the .env file,
    because we need the secret key to verify the signature*/

    /*Since we have the id  we can use  the id from the payload, 
    to see if the user exists in the database(line 60)*/
    req.user = await UserModel.findOne({_id}).select("_id")
    /*Now with the .select(line 60) it will only return,
    the specific document with the id the user we looking for has*/
    //The thing we want to find is the _id (line 60)//
    next()
    //This will fire the next function (line 64)//
    
    /*The reason for doing this on (line 60) is ,
    because we have the requset object (line 10),
    and all we doing is attaching the user property to the request(line 60),
    so when we move on to the next piece of middleware for example,
    one of the todo handler functions in the todoRoutes file, on those reqest objects we're going to
    have the user property on (line 60) because it is being attached to the function on (line 60)*/
    
    //Once the it has been verified, then the token will be returned or the payload from the token//
  } catch (error) {
    //If jwt can't verify the token or the SECRET_KEY (line 54), then we catch the error(line 75)//
    console.log(error)
    res.status(401).json({error: "request not authorized"})
  }
};

module.exports = jwtAuth
//exporting the fuction on(line 10)