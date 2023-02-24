import { AuthContext } from "../context/AuthContext"; //importing AuthContext function//
import { useContext } from "react"; //This imported hook will be used to consume the context//

//creating useTodoContext function and exporting it (line 5)//
export const useAuthContext = () => {
  const content = useContext(AuthContext);

  /*Inside the useContext hook we pass in the CarsConext object from line 1,
   which will retun to us the value from the AuthContext object in the useContext function*/

  if (!content) {
    throw Error("useAuthContext must be used inside a AuthContextProvider");
    //So if there is no content an error message should be thrown//
  }

  return content;
  // returning the context constant with the useContext hook//

  /*Everytime we want to use the cars data we envoke the useAuthConext hook and get the 
      context value back*/
};
