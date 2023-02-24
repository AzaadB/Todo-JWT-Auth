import React, { useState } from "react";
//importing the useState hook from react (line 1)
import { useLogin } from "../hooks/useLogin";
//importing the useSignup hook from the hooks folder (line 3)

//creating signin component and exporting it (line 5)//
export default function SignIn() {
  /*Inside this function we are going to use useState, 
  to keep track of what a user types in to the different input fields ie. the username and password*/
  const [username, setUsername] = useState("");
  /*set the username to update the value of the username (line 20)and 
    we set it equal to useState and invoke it,
    and the original value of it will be an empty string (line 20)*/

  //Now we also need state for the password//
  const [password, setPassword] = useState("");

  /*invoking the useSignup hook and getting the three things from it,
  ie. the signup function, the error and isLoading (line 29)*/
  const { login, error, isLoading } = useLogin();

  const handleSignIn = async (e) => {
    e.preventDefault();
    /*instead of logging the information to the console we await the signup function, 
    and pass in the username and password (line 19) which is stored in state*/
    await login(username, password);
  };

  return (
    <form className="signin" onSubmit={handleSignIn}>
      <h1>SignIn</h1>
      <br></br>
      <label>UserName:</label>
      <input
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>SignIn</button>
      {error && <div className="error">{error}</div>}
    </form>
    //disabling the button if isLoading is true (line 45)//

    //outputting the error underneath the button (line 46)

    //crating a button when clicked it will trigger the handleSignIn function (line 30)

    //creating a handler inside the form (line 22)//

    /*creating username and password input fields (lines 34 and 40), 
    with an Onchange becase when the value changes, 
    we need to upadate the username and passwords state (lines 10 and 16)*/
  );
}
