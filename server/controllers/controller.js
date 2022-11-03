var Userdb = require('../models/model')

// create and save user
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"})
        return;
    }

    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save
    user.save(user).then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    }).catch(err=>{
        res.status(500).send({
            message:err.message|| "Some error occurred"
        })
    })

}

//return all/single user
exports.find = (req,res)=>{
   if(req.query.id){
    const id = req.query.id
    Userdb.findById(id).then(data=>{
        if(!data){
            res.status(404).send({message:`Not found user with id:${id}`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred"})
    })
   }

    Userdb.find().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({message:err.message || "Some error occurred"})
    })

}

//update
exports.update = (req,res)=>{
 if(!req.body){
    return res.status(400).send({message:"Data to update not found"})
 }
 const id = req.params.id

 Userdb.findByIdAndUpdate(id,req.body,{useFindAndModift:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot find user with id ${id}`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:"Some error occurred"})
    })

}

//delete
exports.delete = (req,res)=>{
 const id = req.params.id
 
 Userdb.findByIdAndDelete(id).then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot find user with id ${id}`})
    }else{
        res.send({
            message:"User was deleted succesfully!!!"
        })
    }
 }).catch(err=>{
    res.status(500).send({
        message:`Could not delete User with id:${id}`
    })
 })
}