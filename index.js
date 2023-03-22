const express=require('express');
const jwt =require('jsonwebtoken');
const app=express();
const secretKey="secretKey"


app.get('/',(req,resp)=>{
    resp.send({
        result:"Working"
    })
})

app.post('/login',(req,resp)=>{
    const user={
        "id":1,
        "username":"KingDestroyer",
        "email":"kingdestroyer@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(error,token)=>{
        resp.json({
            token
        })
    })
})

app.post('/profile',verifyToken,(req,resp)=>{
    jwt.verify(req.token,secretKey,(error,authData)=>{
        if(error){
            resp.json({
                result:"Invalid Token"
            })
        }
        else{
            resp.json({
                message:"Valid Token",
                authData
            })
        }
    })

})

function verifyToken(req,resp,next){
    const token=req.headers['authorization'];
    if(typeof token !== "undefined"){
       req.token=token;
       next();
    }else{
        resp.json({
            result:"Token is Invalid"
        })
    }
}

app.listen(4000,()=>{
    console.log('running on port 4000');
})