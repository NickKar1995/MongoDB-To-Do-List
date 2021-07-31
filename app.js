const express = require('express')

const port = process.env.PORT || 3000

const app=express();
const mongoose=require('mongoose')

app.use(express.urlencoded( {extended:true} ))

app.set('view engine','ejs')
app.use(express.static('public'))

let items=['Buy Food','Cook Food', 'Eat Food']

// const error=require(__dirname + '/error.js')

// Here we connect Mongoose!

mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser:true})

const itemsSchema =  ({
    name:String,
})

const Item = mongoose.model('Item',itemsSchema)



// remove everything
    
// Item.remove({},(error)=>{
//     if (error){
//                 console.log('Fuck')
//             }else{
//                 console.log('YES')
//             }
// })

//here end remove everything

app.get('/',(req,res)=>{



//here if you fuck up
Item.find({},(error,foundItems)=>{
    if(foundItems.length === 0){
        ItemModel.insertMany(defaultItems, (err) => { (err) ? console.log(err) : console.log("Succesfully saved defaults items to DB.") });
        foundItems = defaultItems;
      }
   
      res.render("list", {listTitle: "Today", newListItems: foundItems});
   
    });
})

// app.get('/:customListName',(req,res)=>{
//    const customListName = req.params.customListName

// })    
    


app.post('/',(req,res)=>{
    const itemName=req.body.newItem
    const item= new Item({
        name:itemName
    })
    item.save()
    res.redirect('/')
    // item=req.body.newItem
    // items.push(item)
    // res.redirect('/')
    // console.log(item.length)
})


//Delete Route


app.post('/delete',(req,res)=>{
   const  checkedItemId= req.body.checkbox
   Item.findByIdAndRemove(checkedItemId,(error)=>{
    if (error){
                console.log('Problem')
            }else{
                console.log('Success')
                res.redirect('/')
            }

   })
})




//Listening Here


app.listen(port,()=>{
    console.log('Server up')
})