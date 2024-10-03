// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(express.json());

// app.use(cors())

// const port = 9000

// const data = [
//     {id: 1, name: 'John Doe'},
//     {id: 2, name: 'Jane Doe'},
//     // {id: 3, name: 'Jane Doe'}
// ]

// app.post('/signup', (req, res)=>{
//     console.log(req.body);
//     return res.send({
//         status: 1,
//         message: 'User registered successfully',
//         data: req.body
//     })
// })

// app.post('/login', (req, res)=>{
//     console.log(req.body);
//     res.send({
//         status: 1,
//         message: 'User logged in successfully',
//         data: req.body
//     })
// })

// app.get('/api/users', (req, res)=>{
//     console.log('testing data');
//     res.send({
//         status:200,
//         message: "list users successfully",
//         users: data
//     })
// })

// app.get('/user/:id')

// app.listen(port || 3000, ()=>{
//     console.log(`app is listening on ${port}`);
// })