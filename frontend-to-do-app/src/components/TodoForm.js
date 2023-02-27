import { useState } from "react";
//importing {uesEffect} hook from react (line 1)//
import { useTodoContext } from "../hooks/useTodoContext";
//importing {useTodoContext} hook from the hooks folder(line 3)//
import {useAuthContext} from "../hooks/useAuthContext";
//importing {useAuthContext} hook from the hooks folder (line 5)//

const TodoForm = () => {
   /*useState in this functional component is allowing us to create state variables within it*/
  const { dispatch } = useTodoContext();
  //Getting the dispatch function from the useTodoContext hook//
  const {user} = useAuthContext()
  //Getting the user from the useAuthContext hook//
  
  const [catagory, setCatagory] = useState("");
  const [tasks, setTasks] = useState("");
  const [list, setList] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    //Submit event handler//
    e.preventDefault();

    //if we don't have a user (line 26), then we shoud return out of the function on(line 30)//

    if(!user){
      //setting an error message(line 28)
      setError("Login first")
      return
      //If we do have a user then send back the bearer token in the authorization header(line 42)
    }

    const todo = { catagory, tasks, list };

    const response = await fetch("https://todo-app-api-yvo5.onrender.com/", {
      //Creating a post request//
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        //Adding authorization inside the headers( line 42)//
        "Authorization": `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      //checking that if the response is not ok an error will be shown
      setError(json.error);
    }
    if (response.ok) {
      //If the respone is ok it will add a new todo to the collection//
      setCatagory("");
      setTasks("");
      setList("");
      setError(null);
      console.log("new Todo added");
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    /*below we are creating a form with input fields that have an onchange handler,
            it also has an onsubit function with a handleSubmit handler which is as the add button is 
            clicked a new todo is added.*/
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Todo</h3>

      <label>Catagory</label>
      <input
        type="text"
        onChange={(e) => setCatagory(e.target.value)}
        value={catagory}
      />
      <label>Tasks</label>
      <input
        type="text"
        onChange={(e) => setTasks(e.target.value)}
        value={tasks}
      />
      <label>List</label>
      <input
        type="text"
        onChange={(e) => setList(e.target.value)}
        value={list}
      />
      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default TodoForm;
