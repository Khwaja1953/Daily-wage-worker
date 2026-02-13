require('dotenv').config()
const mongoose=require('mongoose')
const express=require('express')
const userRoutes=require('./routes/userRoutes')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI missing from .env');
    process.exit(1);
}


app.use('/api/user',userRoutes)

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

  
app.listen(PORT,()=>{
    console.log(`server is up and running at http://localhost:${PORT}`)
})