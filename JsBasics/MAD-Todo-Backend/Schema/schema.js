import mongoose from 'mongoose';
//Destructuring
const {Schema, model} = mongoose;

//Use Schema to structure the data in the DB
 const todoSchema =  Schema({
     todoTitle:{
     type:String,
     required:true
     },
     category:{
        type:String,
        required:true
     },
 });
//  const todoUserSchema = Schema({
//     userName:{
//     type:String,
//     required:true
//     }
// });

 export const todoModel = model('mad-todos',todoSchema);
//export const todoUserModel = model('mad-todo-users',todoUserSchema);
export default todoModel;

//types of exports
//1. default export
//2. named exports
//export const todoModel = model('todo',todoSchema);
// export {TodoModel as TodoModel}; 


