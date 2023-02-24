import { useAuthContext } from "./useAuthContext";
//importing the useAuthContext hook (line 1)//
import { useTodoContext } from "./useTodoContext";
//importing the useAuthContext hook (line 3)//

//creating and exporting the useLogout hook (line 7)
export const useLogout = () => {
  //invoking the useAuthContext hook and grabbing the dispatch function from it (line 9)//
  const { dispatch } = useAuthContext();
  //invoking the useTodoContext hook and grabbing the dispatch function from it (line 11)//
  const { dispatch: todosDispatch } = useTodoContext();
  /*Destructuring dispatch from the useTodoContext into something, 
  because we can't have two things with the same name otherwise there will be an error,
  so now if we want to use the dispatch function in the useTodoContext hook,
  the todosDispatch just needs to be invoked*/
  
  //inside the use logout hook we create a logout function (line 18)//
  const logout = () => {
    //removing a user from local storage (line 11)//
    localStorage.removeItem("user");
    //dispatching a logout action (line 13)//
    dispatch({ type: "LOGOUT" });
    /*the type for this dispatch function (line 13) doesn't have a payload,
    because if you look at the case for the logout in the AuthContext file,
    it returns the user back to null*/
    todosDispatch({type: "SET_TODOS", payload: null})
    /*the type for this dispatch function (line 26) is SET_TODOS and the payload will just be null,
    because the todos become the action payload*/ 
  };
  return { logout }; // returning the logout function on (line 9)
};
