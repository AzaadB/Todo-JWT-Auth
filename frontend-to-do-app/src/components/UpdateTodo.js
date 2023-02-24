// import { useState } from "react";
// import {useTodoContext} from "../hooks/useTodoContext"

// const UpdateList = ({todo, todoId}) => {
//   const {dispatch} = useTodoContext()
//   const [catagory, setCatagory] = useState(todo.catagory);
//   const [tasks, setTasks] = useState(todo.tasks);
//   const [list, setList] = useState(todo.list);
//   const [error, setError] = useState(null);

//   const handleUpdate = async (e)=>{
//     e.preventDefault();

//     const todo = {catagory, tasks, list}

//       const response = await fetch(`http://localhost:9000/api/todos/${todoId}`, {
//         method: "PATCH",
//         body: JSON.stringify(todo),
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       const json = await response.json()

//       if(!response.ok){
//         setError(json.error)
//       }
//       if(response.ok){
//         setCatagory(todo.catagory)
//         setTasks(todo.tasks)
//         setList(todo.list)
//         setError(null)
//         console.log("new Todo added")
//         dispatch({type: "UPDATE_TODO", payload: json})
//       }
//   }

//   return (
//     <form className="update" onSubmit={handleUpdate}>
//       <h3>Update Todo</h3>

//       <label>Catagory</label>
//       <input
//         type="text"
//         onChange={(e) => setCatagory(e.target.value)}
//         value={catagory}
//       />
//       <label>Tasks</label>
//       <input
//         type="text"
//         onChange={(e) => setTasks(e.target.value)}
//         value={tasks}
//       />
//       <label>List</label>
//       <input
//         type="text"
//         onChange={(e) => setList(e.target.value)}
//         value={list}
//       />
//       <button>Update Todo</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };
// export default UpdateList;
