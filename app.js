const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); 
const { appendFile } = require("fs");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({exteneded: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/47354999dd";

  const options = {
    method: "POST",
    auth: "ezrag:e34a5a1a9b36ea6b3fb604a8fa807fe7"
  }

  const request = https.request(url, options, function(){


    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  // request.write(jsonData);
  request.end();
});


app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});


// API key
// e34a5a1a9b36ea6b3fb604a8fa807fe7-us5
// <dc>
// list id
// 47354999dd