const express = require('express')

const { getTodos, createTodo, deleteTodo} = require('../controllers/TodoController');
//importing the function in the conroller file in the controllers folder(line 3)//
const jwtAuth = require('../middleware/jwtAuth')
//importing the jwtAuth middleware function from the jwtAuth file in the middleware folder(line 5)//

const router =  express.Router();
//require auth for all todo routes
router.use(jwtAuth)
/*What the router.use(jwtAuth) (line 8) is going to first run the middleware function,
before any of the function on (lines 13, 17 and 20) because we need to protect these functons,
so if a user wants to get all todos, add or delete a todo they have to be authenticated first*/

//GET all Todos
router.get('/', getTodos)


//POST new Todo
router.post('/', createTodo)

//DELETE Todo
router.delete('/:id', deleteTodo)

module.exports = router