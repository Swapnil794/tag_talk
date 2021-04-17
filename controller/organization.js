const Organization = require('../models/organization');
const User = require('../models/user');

exports.getOrganization = (req,res,next,id)=>{
    Organization.findById(id).exec((err,org)=>{
        if(err || !org){
            return res.status(400).json({
                err : "not able to get"
            })
        }
        req.profile = org;
        console.log(req.profile);
        next();
    })
}
exports.getOrganizationById = (req,res) =>{
    console.log("007",req.profile.users);
   return res.json(req.profile)
}

exports.createOrganization = (req,res)=>{
    try {
        const organization = new Organization(req.body);
        console.log("9001",organization);
        organization.save((err,org)=>{
            if(err){
                return res.status(400).json({
                    err :"not able to save organization"
                });
            }
                res.json({message:"organization created sucessfully",org});
            })
    } catch (e) {
        res.status(500).json({error:`internal server error,${e}`});
    }
}
exports.updateOrganization = (req,res)=>{
    try {
        const orgId = req.params.orgId;
        Organization.findByIdAndUpdate({_id:orgId},
        {$set:req.body},{new:true , useFindAndModify:false},(err,org)=>{
            if(err){
                return res.status(400).json({
                    err :"organization can't link user"
                });   
            }
            res.json({message:"organization update sucessfully",org})
        })
    } catch (e) {
        res.status(500).json({error:`internal server error,${e}`})
    }
}

exports.deleteOrganization = (req,res) =>{
    try {
        if(req.params.orgId == req.profile._id){
            req.profile.users.forEach(UserId => {
                User.findByIdAndDelete({_id:UserId}).exec((err,user)=>{
                    if(err){
                        return res.status(400).json({
                            err : "user cant't exit"
                        })
                    }
                    console.log("009usersdeleted");
                })
            });
            Organization.findByIdAndDelete({_id:req.profile._id}).exec((err,org)=>{
                if(err){
                    return res.status(400).json({
                        err : "organization can't be deleted"
                    })
                }
                res.json({message:"organization deleted sucessfully",org});
            })
        }else{
            return `you are trying to delete wrong oraganization`
        }
    } catch (e) {
        res.status(500).json({error:`internal server error,${e}`})
    }
}