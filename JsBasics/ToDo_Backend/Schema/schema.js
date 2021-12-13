import mongoose from "mongoose";
//import { mongoose } from "mongoose";
//Destrucuturing:
const {Schema, model} = mongoose;
// import Shema from mongoose.Schema;
// import model from mongoose.model;

//Use Schema to structure the data in the DB
const todoSchema = Schema({
   todoTitle:{
       type:String,
       required:true
   },

   category:{
    type:String,
    required:true

   }

})

const todoModel = model('todo', todoSchema);
export default todoModel;
//types of exports
//1, default
//2. named
//export {TodoModel as TodoModel};
// application.patch('/todo/:id')