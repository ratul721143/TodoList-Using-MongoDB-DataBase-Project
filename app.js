const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

mongoose.connect("mongodb+srv://RatulTodoDatabase:RatulTodo@123@clustertodo.gbrfd.mongodb.net/todoListDB",
    {useUnifiedTopology : true,
     useNewUrlParser:true,
     useFindAndModify: false });

const itemSchema = {
    name : String
}

const items = mongoose.model("Item",itemSchema);

//create documents one by one
const item1 = new items({
    name : "geeks for geeks"
});

const item2 = new items({
    name : 'web designing'
});

const item3 = new items({
    name : 'reading algorithm'
});

//store in a array
const documentArr = [item1,item2,item3];

//today's date
const today = new Date().toISOString().slice(0, 10);
const year = today[0]+today[1]+today[2]+today[3];
const month = Number(today[5]+today[6]);
const date = Number(today[8]+today[9]); 

function datePostfix(date){
    var datefix = ''; 
    if(date === 1){datefix = '1st';}
    else if(date === 2){datefix = '2nd';}
    else if(date === 3){datefix = '3rd';}
    else{datefix = String(date) + 'th';}
    return datefix;
}

function monthNameis(month){
    var arr= ['January','February','March','April','May','June','July','August','september','October','November','December'];
    return arr[month-1];
}

const datefix = datePostfix(date);
const monthName = monthNameis(month);

const todayDate = datefix + ' ' + monthName + ' ' + year;


app.get('/',function(req,res){
    items.find({},function(err,foundItems){
        if(foundItems.length === 0){
            items.insertMany(documentArr,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("inserted successfully!");
                }
            });
            res.redirect("/");
        }
        else{
            res.render("home",{listTitle : todayDate, newListItem: foundItems});
        }
    });

});
var tood='/today';

app.get(tood,function(req,res){
    console.log(todayDate);
    items.find({},function(err,foundItems){
    res.render('home',{listTitle:'Today',newListItem:foundItems});
    });
});


app.post('/',function(req,res){
    var newitem = req.body.newitem;
    console.log(newitem);
    const item = new items({
        name : newitem
    });
    item.save();
    res.redirect('/');
});


app.post('/delete',function(req,res){
    const checkboxId = req.body.checkbox;
    items.findByIdAndRemove(checkboxId,function(err){
        if(!err){
            res.redirect('/');
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,function(){
    console.log("server has started");
});

//username:RatulTodoDatabase
//pass: RatulTodo@123
//mongo "mongodb+srv://clustertodo.gbrfd.mongodb.net/mytodo" --username RatulTodoDatabase

//?retryWrites=true&w=majority/