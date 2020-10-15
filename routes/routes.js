//require router
const express = require("express");
const fast2Sms = require("fast-two-sms");
const router = express.Router();


//main page
router.get("/", (req, res) => {
    res.render("index",{message: req.flash("message")});
})
router.post("/", (req, res) => {
        
    if(isNaN(req.body.telephone)){
        req.flash("message","Please enter valid phone number")
       res.redirect("/");

    }
    else if(req.body.telephone.length !== 10){
        req.flash("message","Please enter phone number of 10 digits without appending any zero at beginning")
        res.redirect("/")
    }
    else{
        var options = {authorization : process.env.API_KEY, message : req.body.text ,  numbers : [req.body.telephone], sender_id : req.body.name} 
        fast2Sms.sendMessage(options)
        .then((response)=>{
            req.flash("message",`${response.message}`)
            res.redirect("/");
            console.log(response.message);
    
        })
    }
})



module.exports = router;
