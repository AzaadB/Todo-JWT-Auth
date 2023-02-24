import { useState } from "react";
//importing the useState hook from react (line 1) since we are going to need local state//
import { useAuthContext } from "./useAuthContext";
//importing useAuthContext (line 3) from useAthContext js file in the hooks folder//

/*creating a custom hook called useLogin (line 8) and exporting it,
so that it could be used in different components*/
export const useLogin = () => {
  //inside this function are going to be a few pieces of state//
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  /*so the pieces of state that we have is for an error and if there is an error with the login request,
    and also set the error to change to null to begin with (line 10), 
    and state for isloading and set isloading to chang to null at first (line 11)*/
    const {dispatch} = useAuthContext();
    /*getting the dispatch function from the useAuthContext file,
    and setting it equal to the useAuthConext hook*/

  //The isLoading piece of state is true when we start the request//

  //creating a login function inside the useSignup hook (line 19)//
  const login = async (username, password) => {
    //inside the async function we take in the username and password (line 19) that the user logs in with//

    //Now inside the login function we set isLoading to true (line 23)//
    setIsLoading(true);
    setError(null);
    /*we're setting isLoading to (true) and setError to (null) (lines 23 and 24),
    because we are just starting the request*/

    //making the post request (line 33)//

    /*setting the response equal to await and using the fetch api, 
    and inside it we use '/api/user/login'(line 33) the reason we not using localhost port 9000 is,
    because it is set up in our reacts pacage.json as a proxy*/
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      //Inside the body of the requst(line 36) we stringify pass in an object with the username and password//
    });
    /*In order for us to get the json data we need to say response.json, 
    but because it's asynchronus then we have to say await response.json() like on (line 41)*/
    const json = await response.json();
    /*This response.json (line 41) will either return to us some info with a json web token,
    if the request was successful, but if it failed it will return an error message*/

    //so if an error was sent back to us then ok is going to be false//
    if (!response.ok) {
      //So if there was a problem with the request, then isLoading will be set to false//
      setIsLoading(false);
      setError(json.error)
      //We also set thee error to json.error (line 49) because we recieved an error from the response//
    }
    /*Now if the reponse is ok then firstly we update the authContext with the user 
    username we get back, so we storing the user's username in the user property in the authContext file, 
    we need to use the dispatch function from the authContext file, 
    the action will be login and we need to update the loading state to false because we are done*/
    if(response.ok){
    //storing the user in local storage//
    localStorage.setItem('user', JSON.stringify(json))
    /*the reason for storing user in local storage(line 61) is,
    because if the user closes the web app and returns later,
    we will still know that it's the same user because of the web token in local storage*/
    
    //updating auth the context//
    dispatch({type: "LOGIN", payload: json})
    setIsLoading(false)
    }
  };
  return {login, isLoading, error}
  /*returning the signup function (line 22), isLoading(line 11) and error(line 10),
  so that we can get all three of these things from this hook*/
};

