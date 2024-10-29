const express=require("express")
const app=express()

app.listen(8007,
    ()=>(console.log("Servidor corriendo",8007
)));
app.get("/",(req,res)=>{
    res.sendFile("C:/Users/IDAT/Downloads/Proyecto/carta.html")
})