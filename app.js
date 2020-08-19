const db = require("mongoose");
const express = require("express");
const url = "mongodb+srv://near2542:Near2542@cluster0.to5ax.mongodb.net/Product?retryWrites=true&w=majority";
const ejs = require('ejs');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session');

async function connect()
{   
    try{
      
      await db.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    }
    catch(err){
        console.log(err);
    }
}

connect();
app.set('views',)
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



const Food = require("./api/Food/FoodRouter");
app.use("/food", Food);

const Order = require("./api/Order/OrderRouter");
app.use("/order",Order);

const Admin = require("./api/admin/AdminRouter");     
app.use("/admin",Admin)

app.get('/',async(req, res)=> {
    res.render('index')

  })
  app.get('/review',async(req,res)=> {
    res.render('review')
  })

  app.get('/check', async(req,res)=>
  {
    res.render('check')
  })

var requestTime = function (req, res, next) {
    req.requestTime = new Date()
  }

  

  app.use(requestTime);
  
 // var cookieParser = require('cookie-parser') 
app.get('*',(req,res)=>
{
    res.send('you fuking dumb');
})




app.listen(5000);