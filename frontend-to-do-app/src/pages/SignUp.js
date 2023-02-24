import { useState } from "react";
//importing the useState hook from react (line 1)
import { useSignUp } from "../hooks/UseSignUp";
//importing the useSignup hook from the hooks folder (line 3)

//creating signup component and exporting it (line 4)//
const Signup = () => {
  /*Inside this function we are going to use useState, 
to keep track of what a user types in to the different input fields ie. the username and password*/

  //creating an event handler//
  const handleSignUp = async (e) => {
    /*This function is an async function (line 10),
    because when we click the button we need to await for the response,
    that is sent from the backend to the frontend*/
    e.preventDefault();
    /*instead of logging the information to the console we await the signup function, 
    and pass in the username and password (line 19) which is stored in state*/
    await signup(username, password);
  };

  const [username, setUsername] = useState("");
  /*set the username to update the value of the username (line 20)and 
    we set it equal to useState and invoke it,
    and the original value of it will be an empty string (line 20)*/

  //Now we also need state for the password//
  const [password, setPassword] = useState("");
  /*invoking the useSignup hook and getting the three things from it,
  ie. the signup function, the error and isLoading (line 29)*/
  const { signup, error, isLoading } = useSignUp();

  return (
    //returning a form template//
    <form className="signup" onSubmit={handleSignUp}>
      <h1>Signup</h1>

      <lable>Username:</lable>
      <input
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <lable>Password:</lable>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
    //disabling the button if isLoading is true (line 51)//

    //outputting the error underneath the button (line 52)

    //crating a button when clicked it will trigger the handleSignup function (line 10)

    //creating a handler inside the form (line 19)//

    /*creating username and password input fields (lines 23 and 30), 
    with an Onchange becase when the value changes, 
    we need to upadate the username and passwords state (lines 9 and 15)*/
  );
};
export default Signup;
