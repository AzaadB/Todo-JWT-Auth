const mongoose = require('mongoose');//Require Mongoose.
const Schema = mongoose.Schema;


//Build Schema for documentation.
const TodoSchema = new Schema({
  catagory: {
    type: String,
    
  },

  tasks: {
    type: String
  },
  list: {
    type: String
  },
  user_id: {
    /*Adding a user_id property(line 18), 
    which reflects the id of the user that has added a new todo,
    and now we are assosiating that document/s with that specific user*/
    type: String,
    required: true
    /*with this user_id property(line 18),
    we are saying each todo document must have a user id property,
    and each todo must be associated with a user*/
  }
  

  },{timestamps: true})

  module.exports = mongoose.model('TodoModel', TodoSchema)