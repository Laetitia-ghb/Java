import dotenv from 'dotenv';
import express from 'express';
import todoModel from './Schema/schema.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = process.env.DB_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
}).then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

//home
app.get('/', (req, res)=>{
//res.send('Welcome to the todo backend API');
res.json({
    message: 'Welcome to M.A.D todo backend API'
})
})

//Get all todos
app.get('/todos',async (req, res)=>{
const allTodos = await todoModel.find({});
if(allTodos){
//success
return res.status(200).json({
    message: 'Todos fetched successfully',
    data: allTodos
});
}else{
//error
return res.status(500).json({
    message: 'Ooops!,unable to fetch todos'
});
}

})


//Get all category todos
app.get('/todos/:category',async (req, res)=>{
 const {category} = req.params;
 //const category = req.params.category;
 const todosByCategory = await todoModel.find({})
 .where("category").equals(category);
 if(todosByCategory){
 //success
 return res.status(200).json({
     message: `${category} todos fetched successfully`,
     data: todosByCategory
 });
 }else{
    //error
    return res.status(500).json({
        message: `Ooops!,unable to fetch ${category} todos`
    });
 }
})

//Creating a new todo 
app.post('/todo', async (req, res)=> {
const {todoTitle, category} = req.body;
const newTodo = await todoModel.create(
    {
    todoTitle,
    category
});
if(newTodo){
//success
return res.status(200).json({
    message: 'Todo created successfully',

})
}else{
 return res.status(500).json({
     message: 'Error creating todo'
 })
}
})



//delete a todo
app.delete('/todo/:id', async (req, res)=> {
const {id} = req.params;
const deletedTodo = await todoModel
.findByIdAndDelete(id);
if(deletedTodo){
    //success
    return res.status(200).json({
        message: 'Todo deleted successfully'
    })

}else{
    //error
    return res.status(500).json({
        message: 'Error deleting todo'
    })
}
})




app.listen((PORT), () => {
    console.log(`Your app is listening to port ${PORT}`);
});
