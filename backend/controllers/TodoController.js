const TodoModel = require('../models/TodoModel');
const mongoose = require('mongoose')

//Get All Todo//
const getTodos = async (req, res) =>{
  /*In here we want to limit the todos to a specifuc user, 
  but first we need to find out the user id which is attached to the request object(line 5)*/
  const user_id = req.user._id
  //So now that we have the user we can find the todos based on certine criteria (line 10)
  const todos = await TodoModel.find({user_id}).sort({createdAt: -1})
  /*So we want to find out if the user id property of the documents matches the user_id(line 8),
  So we pass in the user_id property on(line 8) into the find method on (line 10)*/
  
  /*awaiting to find all the todos and 
    then it get sorted is decending order*/
  res.status(200).json(todos)
}

//Create a new todo//
const createTodo = async (req, res) =>{
  const {catagory, tasks, list} = req.body
  /*From lines 15-31 is basically saying if any of the input field is empty ie. item
  when adding a new car an error won't throw an error saying that field will just be empty*/

  //add document to db and associating it with the current user that is logged in//
  try {
    
    const user_id = req.user._id
    const todo = await TodoModel.create({catagory, tasks, list, user_id})
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//Delete Todo//
const deleteTodo = async (req, res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({err: "No Todo found"})
  }
  const todo = await TodoModel.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ err: "No Todo found" });
  }
  res.status(200).json(todo);

}
//Update Todo//

const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No Todo found" });
  }
  const todo = await TodoModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!todo) {
    //if there is no todo a res.status(404) and an error message will be returned(line 67)//
    return res.status(404).json({ err: "No Todo found" });
  }
  res.status(200).json(todo);
};

module.exports = {
//exporting all functions//
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo
}