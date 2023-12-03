const axios = require("axios");
const fs = require("fs");
const BSON = require("bson");
// import { BSON, EJSON, ObjectId } from 'bson';
exports.generateToken = async (req, res) => {
    try{  
        const postData= req.body 
        const response = await axios.post(
        process.env.baseUrl,
        postData
        );
        if(response.status==200){
           return res.json({data:response.data, message:"Token Generated Successfully"})    
        }else{
           return res.status(500).json({message:"Something Went Wrong"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: err.message
        })
    }
}


      