const express= require('express')
const app= express();
const bcrypt = require('bcrypt')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const jwt = require('jsonwebtoken');


app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/login',async(req,res)=>{
    let {email,password}= req.body;
    try{
        let user= await User.findOne({email});
        if(!user) return res.status(400).send({message:'Invalid email or password'})

            const isMatch = await bcrypt.compare(password, user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({email:email, userid:user._id},"mysecretkey");
                    res.cookie("token",token);
                    res.status(200).redirect('/profile')
                }
                else{
                    res.status(500).send("invalid userid or password");
                }
            })
    }
    catch{
        console.log(err);
        res.status(500).send("internal server error")
        
    }
})

app.get('/logout',(req,res)=>{
    if(req.cookies.token===""){
        res.redirect('/login');
    }
    else{   
        let data = jwt.verify(req.cookies.token,"mysecretkey");
        req.user=data;
        next();
    }
})

app.listen(3001,()=>{
    console.log("Server started at port 3001");
})
