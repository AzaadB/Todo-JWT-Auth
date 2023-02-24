import { useEffect} from "react";
//importing {uesEffect} hook from react (line 1)//
import {useTodoContext} from "../hooks/useTodoContext"
//importing {useTodoContext} hook from the hooks folder(line 3)//
import {useAuthContext} from "../hooks/useAuthContext";
//importing {useAuthContext} hook from the hooks folder (line 5)//

//components//
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";


const Home = () => {
  const {todos, dispatch} = useTodoContext()
  const {user} = useAuthContext()
  //Getting the user from the useAuthContext hook//
  
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:9000/api/todos/", {
        //Sending the authorization headers (line 29)//
        headers: {
          //Adding authorization inside the headers( line 29)//

          /*The value for the authorization(line 26) is Bearer, 
          because it's a bearer token and it's inputed with back ticks like this: `Bearer`, 
          and now that we have access to the token on the user by using the user property(line 15),
          so that we can output a variable in the back ticks like this: `${user.token}`*/
          "Authorization": `Bearer ${user.token}`
          /*Now on (line 29) we're sending the authorization header along with the users token,
          then we can grab it on the backend with the middlware function and protect our todo api routes
          and it will detect if ther users token(line 29) is valid,
          then we get access to the endpoints(line 20)*/
        }
      });
      const json = await response.json();
      if(response.ok){
        
        /*if the response is ok we dispatch an action which has a type called 'SET_TODOS' because 
        we want to update all todos and the payload is going to represent the whole array of todos we
        recieve from the server*/
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };
    if(user){/*When the useEffect function runs, 
      If we have a value for the user (line 30), then we will try to fetch the todos, 
      but if we don't have a value for the user, 
      then we won't even execute the fetchTodos function (line 34)*/
      fetchTodos();
      //calling the fetchTodos function (line 19)//
    }
    
  }, [dispatch, user]);

  return (
    /*below we are mapping the car object and making an instace of the different 
    components ie. TodoDetails and TodoForm*/
    <div className="home">
      <div className="to-dos">
      {todos && todos.map((todo) => <TodoDetails key={todo._id} todo={todo} />)}
      </div>
      <TodoForm/>
    </div>
   
  );
};

export default Home;
