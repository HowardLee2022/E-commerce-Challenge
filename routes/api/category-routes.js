const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


//   // find one category by its `id` value
//   // be sure to include its associated Products
router.get("/",(req,res)=>{
  Category.findAll(
    {
      include:[Product]
    }
  ).then(data=>{
      res.json(data)
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
})
// Find category by Iid
router.get("/:id",(req,res)=>{
  Category.findByPk(req.params.id,{
      include:[Product]
  }).then(data=>{
      if(data){
         return  res.json(data);
      } else {
          res.status(404).json({
              msg:"no such record"
          })
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
})
//Creates new Catgeory
router.post("/",(req,res)=>{
  Category.create({
      category_name:req.body.category_name,
  }).then(data=>{
      res.status(201).json(data)
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
})
//Update Catgory
router.put("/:id",(req,res)=>{
  Category.update({
      category_name:req.body.category_name
  },{
      where:{
          id:req.params.id
      }
  }).then(data=>{
      if(data[0]){
          return res.json(data)
      } else {
          return res.status(404).json({msg:"no such record"})
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
})
//Delete Category
router.delete("/:id",(req,res)=>{
  Category.destroy({
      where:{
          id:req.params.id
      }
  }).then(data=>{
      if(data){
          return res.json(data)
      } else {
          return res.status(404).json({msg:"no such record"})
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"an error occurred",
          err:err
      })
  })
})


module.exports = router;
