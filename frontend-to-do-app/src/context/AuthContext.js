import { createContext, useReducer, useEffect } from "react";
//importing createContext, useReducer, useEffect from react (line 1)//

//creating a custom context(line 4) and exporting it so that it can be used in other components//
export const AuthContext = createContext();
//exporting authReducer(line 6) function so that it can be used in other components//

//It takes in the previous state and the action
export const authReducer = (state, action) => {
  /*Inside the authReducer function it will handle 2 cases 
ie. a Login for when a user logs in and a logout case for when a user logs out*/

  //firstly we use a switch (line 13) to check the action type property which describes the action//
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    /*The first case is the login type in which we return a new state, 
  which is an object with a user property,
  but the user is going to be whatever the payload is on the action*/
    case "LOGOUT":
      return { user: null };
    //In the logout case (line 20) we reset the user back to null on the return (line 21)

    default:
      return state;
    //In case nothing matches by default(line 23) we just return the state(line 24)//
  }
};
//exporting AuthContextProvider(line 10) so that it can be used in other components//
export const AuthContextProvider = ({ children }) => {
  //The whole AuthContextProvider (line 29) is wrapping our root app compnent
  //the children represents whatever component it wraps

  /*inside the AuthContextProvider function we are going to use the useReducer hook,
  which was imported from react to register state*/
  const [state, dispatch] = useReducer(authReducer, {
    //The second argument inside the reducer is a user property which will be null at first//
    user: null,
    /*So when the user is first loaded in they are not logged in 
    therefor the user is set to null on (line 12)*/
  });

  /*using useEffect inside the AuthContextProvider, 
  inside the useEffect we fire a function and as a second argument we pass in an empty array*/

  //So the useEffect function (line 51) will only fire once and it's when the component first renders//

  /*Since the this useEffect function(line 51) only renders once, 
  it only checks for the token that token that is in local staorage once,
  and that is what we want to do inside the useEffect function (line 51)*/
  useEffect(()=>{
    /*We have to say JSON.parse(line 55), because localStorage.getItem('user')(line 55) is a string,
    when it is stored in local storage as a json string and we want to use it in JavaScrpt,
    so we have to pass it as an object and store it in a constant( line 55)*/
    const user = JSON.parse(localStorage.getItem('user'))
    /*Now if there is a user is present in local storage,
    then we will get the user object with the username property and the token property, 
    but if the user isn't presnt in local storage, then we get nothing and we get null */

    /*So if(line 62) we do have a value for the user then we want to dispatch a login action (line 65) 
    to upate the global state on (line 16) to match the user in local storage*/
    if(user){
      /*Inside the dispatch function (line 65) the type is login,
      and the payload is the user we get back from the object on (line 55)*/
      dispatch({type: "LOGIN", payload: user})
    }
  }, [])
  console.log("AuthContext state:", state);
  /*Inside the function we console.log() a message,
  so every time the state changes it is logged to the console*/

  return (
  /*returning a template inside this authContenxt component and it's going to be the authContext,
  which is the context created on (line 4) and it has the provider(line 29)*/
    <AuthContext.Provider value={{...state, dispatch}}>
    {children}
    </AuthContext.Provider>
    /*using spread syntax on the state and we have the user property as a value, 
    which is equal to an object within the authContextProvider(line 48)*/
    
    /*We are returning our authContextProvider (line 48) and it's wrapping our root app component, 
    therefore providing our state value to the whole application*/
  
  )
  
};
