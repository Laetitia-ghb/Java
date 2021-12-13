//const express =('express')
import dotenv from 'dotenv';
import express from 'express';
import todoModel from './Schema/schema.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());


const PORT = 3000 || process.env.port;

const db = process.env.DB_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Connected to DB'))
.catch(err => console.log(err));
//home route
// app.get(`/todos`, (req, res) => {
//     res.send('Hello Laetii')
// })

//Post
//app.post(`todo/createtodo`, (req, res) => {
    //res.send('Hello Use thid s route to create a new todo')
 //})
// //Patch
// app.patch(`/todo`, (req, res) => {
//     res.send('Hello Use patch to Update some data in the database')
// })
// //Delete
// app.delete(`/todo`, (req, res) => {
//     res.send('Delete this data')
// })
// //Put
// app.put(`/todo`, (req, res) => {
//     res.send('U[pdate the whole data in the database')
// })
//CRUD: Create, Read, Update, Delete




// Home
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MAD Todo API'
    })
});

app.get('/todos', async (req, res) => {
    const allTodos = todoModel.find({});
    if(allTodos){
        //Successful
        return res.status(200).json({
            message: "Todos fetched successfully",
            data: allTodos
        })
    }else{
        //error
        return res.status(500).json({
            message:"Ooops!, unable to fetch todos",
})
    }
});

//Get all category todos
app.get('/todos/:category', async(req, res)=>{
    const {category} = req.params;
    //const category = req.params.category;
    const allCategoryTodos = await todoModel.find({})
    .where("category").equals(category);
    if(allCategoryTodos){
//success
return res.status(200).json({
    message: `${category} todos fetched successfully`,
    data: allCategoryTodos
})
    }else{
        //error
        return res.status(500).json({
            message: `Ooops!, unable to fetch ${category} todos`,

        })
    }
});

//Creating a new todo
app.post('/todo', async (req, res) => {
    const {todoTitle, category} = req.body
    const newTodo = await todoModel.create(
        {
            todoTitle,
            category
        }
   )
   if (newTodo) {
       //success
       return res.status(200).json({
           message:'Todo created successfully',
           data: newTodo
       })
   } else {
       //error
       return res.status(500).json({
        message:'Unable to create todo',
        
    })  
   }   
});

//delete a todo
app.delete('/todo/:id', async (req, res) => {
    const {id} = req.params;
    const deleteTodo = await todoModel.findByIdAndDelete(id);
    if (deleteTodo) {
        //Success
        return res.status(200).json({
            message: 'Todo deleted successfully'
        })
    }else{
        //error
        return res.status(500).json({
            message: 'Error deleting Todo'
        })    
    }
});

app.listen((PORT), () => {
    console.log(`listening on port ${PORT}`);
})