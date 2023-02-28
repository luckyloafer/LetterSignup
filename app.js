const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
     const firstName= req.body.fname;
     const lastName=req.body.lname;
     const email=req.body.email;
     
     var data={
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
            }
        ]
     };
     var jsonData=JSON.stringify(data);

     const url = "https://us21.api.mailchimp.com/3.0/lists/5fcefecc00";

     const options={
        method: "POST",
        auth: "lakshman:c90a3f583c5bace9af4616fb6a8a1956-us21"
     }
    const request= https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

     })
     request.write(jsonData);
     request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});


//api mailchimp key
// 823f0a7bbc1231d60585fc3ae40a3e1d-us21

//audience id
// 5fcefecc00
