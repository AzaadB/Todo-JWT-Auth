import { useTodoContext } from "../hooks/useTodoContext"
//importing {useTodoContext} hook from the hooks folder (line 1)//
import {useAuthContext} from "../hooks/useAuthContext";
//importing {useAuthContext} hook from the hooks folder (line 3)//

const TodoDetails = ({todo})=>{

  const {dispatch} = useTodoContext()
  //Getting the dispatch function from the useTodoContext hook//
  const {user} = useAuthContext()
  //Getting the user from the useAuthContext hook//
  
  const handleDelete = async()=>{
    /*if we don't have a value for the user(line 16), 
    then we won't even execute the request on (lines 19-31)*/
    if(!user){
      return
    }
    const response = await fetch("http://localhost:9000/api/todos/" + todo._id, {
      method: "DELETE",
      //Adding authorization inside the headers( line 22)//
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_TODO', payload: json})
    }
  };
  
  return(
    <div className="todo-details">
      <h4>Catagory: {todo.catagory}</h4>
      <br></br>
      <p><strong>Tasks: {todo.tasks}</strong></p>
    <br></br>
    <p><strong>List: {todo.list}</strong></p>
    <br></br>
    <span onClick={handleDelete}>Delete</span>
    
    </div>
  )
}

export default TodoDetails