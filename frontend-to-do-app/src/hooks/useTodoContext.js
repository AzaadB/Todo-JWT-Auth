import { TodoContext } from "../context/TodoContext"; //importing TodoContext function//
import { useContext } from "react"; //This imported hook will be used to consume the context//

//creating useTodoContext function and exporting it (line 5)//
export const useTodoContext = () => {
  const content = useContext(TodoContext);

  /*Inside the useContext hook we pass in the CarsConext object from line 1,
 which will retun to us the value from the CarsContext object in the useContext function*/

  if (!content) {
    throw Error("useCarsContext must be used inside a CarsContextProvider");
    //So if there is no content an error message should be thrown//
  }

  return content;
  // returning the context constant with the useContext hook//

  /*Everytime we want to use the cars data we envoke the useCarsConext hook and get the 
    context value back*/
};
