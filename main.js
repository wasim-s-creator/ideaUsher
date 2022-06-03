const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const app = express();

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/myNewDatabase",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("connected to the database")
    }
    else{
        console.log("ERR")
    }
})

// const posts ={
//     title:String,
//     desc:String,
//     image:String
// }
// const tags={
//   //  tag: ObjectId(),
//     tagName:String,
//     postName :String
// }

const userSchema = new Schema({ name: String }, { timestamps: true });
const User = mongoose.model('User', userSchema);

const postSchema = new Schema ({title: String , desc:String ,image:String},{timestamps :true})
const posts = mongoose.model('post',postSchema);

const tagSchema = new Schema({tagName :String ,postName:String},{timestamps:true})
const tags = mongoose.model('tags',tagSchema)

// const monmodel = mongoose.model("NEWCOL",posts);
// const tagModel =mongoose.model('NEWTAG', tags);
//post

app.post('/post',async(req,res)=>{
//console.log("here 1")
    const data = new posts({
        title : req.body.title,
        desc : req.body.desc,
        image:req.body.image
    })
    const dd = new User({
        name:'wasim'
    })
    dd.save()
    const val = await data.save()
    res.json(val)
})

app.post('/addTag',(req,res)=>{
    posts.findOne({title :req.body.postName}).then((data)=>{
        const data1 = new tags({
            tagName:req.body.tagName,
            postName:data.title
        })
        const val1 = data1.save()
        res.json(val1)
    })
})

app.get('/getPost',(req,res)=>{
    //console.log("here")
    posts.find({}).sort({createdAt:-1}).limit(1).then((data)=>{
        res.send(data)
    })
})

app.listen(3000,()=>{
    console.log("on port 3000")
})