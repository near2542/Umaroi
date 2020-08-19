const express = require('express');
const router = express.Router();
const Food = require("../Food/FoodModel");
const Order = require("../Order/OrderModel");
const admin = require('./AdminModel')
const cookieParser = require("cookie-parser");
const path = require('path')
const multer = require('multer')


const Imgpath = path.resolve('public/imgs')
const storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,Imgpath)
  },
  filename:function(req,file,callback){
    callback(null,file.originalname)
  }
})

const upload = multer({storage:storage})  ///////////////////////////create multer 

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
  console.log(Imgpath);
   res.render('admin/login');
});

router.post("/login",async(req,res)=>
{
     admin.findOne({id: req.body.id}).exec((err,data)=>
     {
      if(data) 
      {
          if(data.password === req.body.password) res.redirect('/admin/dashboard/')
          else res.redirect('/admin/login')
      }
    else 
     {
      res.redirect('/admin/login');
     }
    })
})

// ------------------------------------------end Login------------------------------------------ //



//----------------------------------------ADMIN control panel----------------------------------------//
router.get("/dashboard",async(req,res)=>
{
  res.render("admin/dashboard")
})

router.get("/food",async(req,res)=>
{
  Food.find({}).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).render('admin/menu',{foods:data})
  });
})

router.get("/food/newfood",async(req,res)=>
{
  res.render('admin/foodForm');
})

router.post("/food/newfood", upload.single('img'),async (req,res)=>
{
  try{
    console.log(req.file)
    console.log(req.body)
    const newFood = new Food(
      {name : req.body.name,
      price : req.body.price,
      img : `\\imgs\\${req.file.originalname}`,
      description : req.body.description}
    )
    await newFood.save((err, data) => {
    console.log('save')
  });
  res.redirect(200,'/admin/dashboard');
}
catch(err)
{
  console.log(err)
  res.redirect('/admin/food');
}
})

router.get("/food/:id",async (req,res)=>
{

  Food.findById(req.params.id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(data);
  });
})



router.get("/food/edit/:_id",(req,res)=>
{
  Food.findById(req.params).exec((err,data)=>
  {
    if(err) res.status(400).send(err)
    res.status(200).render('admin/editfoodForm',{food:data});

  })
})
router.post("/food/edit/:_id",upload.single('img'),(req,res)=>
{
    Food.findByIdAndUpdate(req.params._id, 
      {name : req.body.name,
      price : req.body.price,
      img : `\\imgs\\${req.file.originalname}`,
      description : req.body.description}, 
      (err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).redirect('/admin/food')
      });
})


router.post("/food/delete/:_id",(req,res)=>
{
    Food.findByIdAndDelete(req.params._id, (err, data) => {
        if (err) return res.status(400).send(err);
        console.log('done');
        res.status(200).redirect('/admin/food')
      });
})

router.get("/order",(req,res)=>
{
  Order.find({}).exec((err,data)=>
  {
    if (err) {console.log('data not found') 
    res.redirect(400,'/admin/dashboard')}

    res.render('admin/OrderHistory',{orders:data})
  })
})

router.get("/logout",(req,res)=>
{
  res.status(200).send('logout is done!')
})






//---------------------------------------- end ADMIN control panel----------------------------------------//

module.exports = router;