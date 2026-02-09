require('dotenv').config()
const express=require('express')
const app=express()
app.use(express.json())
const PORT=process.env.PORT 
app.use(express.urlencoded({extended:true}))



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})