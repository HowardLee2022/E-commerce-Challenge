const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get("/",(req,res)=>{
  Tag.findAll(
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

router.get("/:id",(req,res)=>{
  Tag.findByPk(req.params.id,{
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

router.post("/",(req,res)=>{
  Tag.create({
      tag_name:req.body.tag_name,
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

router.put("/:id",(req,res)=>{
  Tag.update({
      tag_name:req.body.tag_name
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

router.delete("/:id",(req,res)=>{
  Tag.destroy({
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


// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

module.exports = router;
