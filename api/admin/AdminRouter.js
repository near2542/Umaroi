const express = require('express');
const router = express.Router();
const Food = require("../Food/FoodModel");
const Order = require("../Order/OrderModel");
const admin = require('./AdminModel')
const bodyParser = require('body-parser');
const adminDB = require('./AdminModel');
const cookieParser = require("cookie-parser");
const { equal } = require('assert');
const { render } = require('ejs');


router.post("/register",async (req,res)=>{
  const newAdmin = new admin(req.body)
  newAdmin.save((err,data)=>{
    if(err) {res.status(400).send('fuck')}
    else {
      console.log(data.key)
      res.status(200).send('hello')
  }})
  }
)


// ------------------------------------------Login------------------------------------------ //

router.get("/login",async (req,res)=>
{
   res.render('admin/login');
});

router.post("/login",async(req,res)=>
{
     admin.findOne({id: req.body.id}).exec((err,data)=>
     {
      if(data) 
      {
          if(data.password === req.body.password) res.redirect(`admin/dashboard/`+req.body.id)
          else res.redirect('/admin/login')
      }
  else 
     {
      console.log('this one didnt find data')
       res.redirect('/admin/login')
     }})
})

// ------------------------------------------end Login------------------------------------------ //



//----------------------------------------ADMIN control panel----------------------------------------//
router.get("/dashboard/:id",async(req,res)=>
{
  res.render("admin/dashboard",{id:req.params.id})
})

router.get("/food",async(req,res)=>
{
  Food.find({}).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(data);
  });
})


router.get("/food/:id",async (req,res)=>
{

  Food.findById(req.params.id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(data);
  });
})

router.get("/food/newfood",async(req,res)=>
{
  res.render('admin/foodForm');
})
router.post("/food/newfood",(req,res)=>
{
  const newFood = new Food(req.body)
  newFood.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.redirect(200,'/admin/food')
  });
})

router.get("/food/edit/:id",(req,res)=>
{
  Food.findById(req.params).exec((err,data)=>
  {
    if(data) res.status(200).render('admin/foodForm',{food:data})
  })
})
router.put("/food/edit/:_id",(req,res)=>
{
    Food.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
      });
})


router.delete("/:_id",(req,res)=>
{
    Food.findByIdAndDelete(req.params._id, (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send("ลบข้อมูลเรียบร้อย");
      });
})

router.get("/menu/:_id",(req,res)=>
{
    Food.findById(params._id).exec((err,data) =>
    {
        if(err) return res.status(400).send(err)
        res.status(200).send(data);
    })
})

//---------------------------------------- end ADMIN control panel----------------------------------------//

module.exports = router;