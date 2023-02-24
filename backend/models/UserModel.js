const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt"); /*bcrypt is a hashing function that can hash passwords for protection*/
const validator = require("validator"); // requiring the validator package//

//Build Schema for documentation.
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

//static method signUp//

//The async function attached to our method handles the logic for signing up a new user//
UserSchema.statics.signUp = async function (username, password) {
  //Have to use the function keyword due to us using the this keyword inside it//

  //Validation//
  if (!username || !password) {
    //So if there is no value for either the username nor password then throw an error//
    throw Error("Both fields need to be filled");
  }
  //Now checking if the password is strong enough//
  if (!validator.isStrongPassword(password)) {
    //so if the password is not strong enough then throw an error//
    throw Error(
      "password must be 10 characters long and must contain letters upperCase, lowerCase, numbers and atleast one symbol"
    );
  }
  //creating own method on userModel to create a new user(line 21)

  const taken = await this.findOne({ username });

  /*On (line 23) creating a variable called taken, 
    which has an await method with a mongoose method called this.findOne(),
    which has the username as a param and is looking for a username*/

  /*In the if statement(line 35) we trigger the variable on (line 23),
    so the if statement is saying that, if the username already 
    exists an error on (line 36) will be returned*/
  if (taken) {
    throw Error("username already taken");
  }
  //salt line(39) is a random string of characters that gets added to a users password before it's hashed//
  const salt = await bcrypt.genSalt(0);
  //This will generate our salt (line 39)//

  /*In the bcrypt.genSalt method is how long it will take potential hackers to crack the password 
  and how long it takes a user to sign up. The default value for this method is 10.*/

  const hash = await bcrypt.hash(password, salt);

  /*On (line 45) we create a variable called hash which has a await method with,
    another bcrypt function called bcrypt.hash which has 2 arguments the 
    first one being the password the user wants to login and signUp with and 
    the second one being the generated salt (line 39)*/
  const user = await this.create({ username, password: hash });
  /*In the user variable we are creating a new user document to store on the database 
  with the this.create() method (line 51) which has 2 objects one being the username 
  and the other the password but the value is the hash (line 45)*/

  return user; //returning the user varible (line 51)
};

//static method login//
UserSchema.statics.signIn = async function (username, password) {
  //Have to use the function keyword due to us using the this keyword inside it//
  //Validation//
  if (!username || !password) {
    //So if there is no value for either the username nor password then throw an error//
    throw Error("Both fields need to be filled");
  }

  const user = await this.findOne({ username });

  /*On (line 82) creating a variable called user, 
    which has an await method with a mongoose method called this.findOne(),
    which has the username as a param and is looking for a username*/

  /*In the if statement(line 35) we trigger the variable on (line 82),
    so the if statement is saying that, if the user with the specified username is not in the database,
    then an error on (line 92) will be returned*/
  if (!user) {
    throw Error("username doesn't exist");
  }
  const match = await bcrypt.compare(password, user.password)
  /*using a method in the bcrypt called compare to see if the password the user wants to login with, 
  is the same as the hashed password in the database*/

  //if the 2 passwords don't match then an error should be thrown, but if they do match then the user should be returned(line 103)//
  if(!match){
    throw Error("wrong password")
  }

  return user

};

module.exports = mongoose.model("UserModel", UserSchema);
