const User = require('../models/user');
const Organization = require('../models/organization');
const nodemailer = require('nodemailer');
exports.createUser =(req,res)=>{
    try {
        const user = new User(req.body);
        console.log("8001",user);
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    err :"something went wrong user can't created"
                });
            }
            res.json({message:"user created succefully",user});
        })
        const orgId = req.params.orgId;
        Organization.findByIdAndUpdate({_id:orgId},
        {$addToSet:{users:user._id}},{new:true , useFindAndModify:false},(err,org)=>{
            if(err){
                return res.status(400).json({
                    err :"organization can't link user"
                });   
            }
        })
            let tranporter = nodemailer.createTransport({
            service :"gmail",
            auth: {
                type:'OAuth2',
                user:`${req.profile.email}`,
                pass :process.env.PASSWORD,
                clientId: '624707044206-n623aiasg9qvsloc81okp3v50cqrgi9d.apps.googleusercontent.com',
                clientSecret: 'TkGO613qFGzC0vOGn5KIYs0-',
                refreshToken: '1//045ZQaqnGXJcQCgYIARAAGAQSNwF-L9IrPSWOdYxIZU2nP4sp5mIJ7P_q6ItX9JDiZBImD4nM7DdIWEZHxQuSNMu0vxd4IJGGA4c'
            }
        })
        let mailoption = {
            from :'swapnilmathur2999@gmail.com',
            to :`${user.email}`,
            subject :`link to organization`,
            text :`hello,${user.user} you are employee of  ${req.profile.name}`          
        }
        tranporter.sendMail(mailoption,(err,data)=>{
            if(err){
                console.log(`email can't be send ${err}`);
            }else{
                console.log(`email send sucessfully `);
            }
        })
    }catch (e) {
        return res.status(500).json({errror:`internal server error ${e}`});    
    }
}