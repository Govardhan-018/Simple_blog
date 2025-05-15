import express from "express";
import fs from "fs/promises"
import path from "path";

const app = express();

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

var headings;
var name;
var contantent;

app.get("/", async (req, res) => {
  try {
    headings = await fs.readdir("./content");
    console.log(headings);
    res.render("index1", { headings });
  } catch (error) {
    console.error("Error reading directory:", error);
    res.status(500).send("Error reading content directory.");
  }
});


app.post("/contant", async (req, res) => {
  try {
    name = req.body.filename;
    console.log(name);
    contantent = await fs.readFile(path.join("./content/", name), "utf-8");
    console.log(contantent);
    res.render("index2", { contant: contantent });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Error reading content file.");
  }
});

app.post("/back",(req,res)=>{
  res.redirect("/");
})

app.post("/edit",(req,res)=>{
  res.render("index3",{contant:contantent})
})

app.post("/done",async(req,res)=>{
  contantent=req.body.content
  console.log(contantent);
   await fs.writeFile(path.join("./content/", name), contantent, err => {
    if (err) {
      console.error(err);
    }
})
res.redirect("/")
})

app.post("/creat",(req,res)=>{
  res.render("index4")
})

app.post("/newcreated",async(req,res)=>{
  name=req.body.fname;
  contantent=req.body.fcontent
  await fs.writeFile(path.join("./content/", name), contantent, err => {
    if (err) {
      console.error(err);
    }
})
res.redirect("/")
})

app.post("/delete",async(req,res)=>{
 try{ 
await fs.unlink(path.join("./content/", name))
console.log(name+" deleted")
 }catch(err){
  console.log(err)
 }
 res.redirect("/")
})
app.listen(3000, (req, res) => {
  console.log("Unluckey....")
})