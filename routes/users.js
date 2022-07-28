
var express = require('express');
const auth = require("../middleware/auth");
const db = require('../public/javascripts/db');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const moment = require('moment');


const router = express.Router();


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});

router.get("/:LoginId",auth, async (req, res, next) => {
  console.log("welcome login"); 
  try {
    const userid = await db.getAllCustomer();
    const userlog = await db.getOpenTicket();
    const TicketLog = [];
    console.log(userid);
    res.render('mainpage', { date:dateTime,openstate: userlog,userdata: userid, moment: moment,checkTicketLog: TicketLog,LoginId:req.params.LoginId});
     return;
  }
  catch (e) {
    console.log(e);   
  }
});
router.post("/:LoginId/update",upload.single('image'),auth, async (req, res, next) => {
  try {
    var LogInd = req.params.LoginId
    var Ticket_No = req.body.Ticket_No;
    var materials = req.body.materials;
    var Amount = req.body.Amount;
    var callstatus = "U";
    const updateTicketLogTbl = db.updateTicketLogTbl(Ticket_No, materials, Amount, callstatus);
    const updateCostomerTbl = db.updateCostomerTbl(Ticket_No,callstatus);
    if (!req.file) {
      console.log("No file upload");
  } else {
    var Ticket_No1 = req.body.Ticket_No1;
      console.log(req.file.filename)
      var imgsrc = 'http://localhost:3001/images/' + req.file.filename
      const uploadimg = await db.uploadImage(imgsrc,Ticket_No);
      console.log(uploadimg);
  }
    res.redirect("/users/"+LogInd);
    return;  
  }
  catch (e) {
    console.log(e); 
  }
});
router.post("/:LoginId/mark",auth, async (req, res, next) => {
  var LogInd = req.params.LoginId
  try {
    var millname = req.body.millname;
    var address = req.body.add;
    var mobno = req.body.mob_no;
    var model = req.body.modelname;
    var file = req.body.myfile
    const addTicketCustomerTbl = db.getAllAddTicketcustomerTbl(millname, address, mobno, model,file);
    const addTicketLogTbl = db.getAllAddTicketLogTbl(millname,address, model);
    console.log("Save Success ");

    res.redirect("/users/"+LogInd);
    //res.render()
    return;
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

});
router.post("/:LoginId/Ticket",auth, async (req, res, next) => {
  try {
    var millName = req.body.millname
    var address = req.body.add;
    var LoginId = req.params.LoginId;
    const TicketLog = await db.selectCustomerTicket(millName,address);
    console.log("TicketLog" ,JSON.stringify(TicketLog));
    const userid = await db.getAllCustomer();
    const userlog = await db.getOpenTicket();
    console.log(userid);
    res.render('mainpage', { date:dateTime,openstate: userlog,userdata: userid,checkTicketLog: TicketLog,LoginId:req.params.LoginId});
    
    
    return; 
  }
  catch (e) {
    console.log(e);   
  }
});
module.exports = router;

