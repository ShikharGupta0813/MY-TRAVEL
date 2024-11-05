let express = require("express");
let app = express();
let mongo = require("mongoose");
let path = require("path");
let listing = require("./models/listing.js");
let override = require("method-override");
let ejsmate = require("ejs-mate");
let wrapasync = require("./utils/wrapasync.js");
let ExpressError = require("./utils/expresserror.js");

let port = 3000;

// let data = require("./data.js");

main()
  .then((res) => {
    console.log("connection succesfully initiated!!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongo.connect("mongodb://127.0.0.1:27017/project");
}

app.listen(port, () => {
  console.log("PROJECT started!!");
});

app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "/views/listings"),
  path.join(__dirname, "/views/layouts"),
]);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));
app.engine("ejs", ejsmate);

// let db=async ()=>{await listing.insertMany(data.data);}

app.get("/listings", async (req, res) => {
  let alldata = await listing.find({});
  res.render("view.ejs", { alldata });
});

app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

app.get(
  "/listings/:id",
  wrapasync(async (req, res, next) => {
    let { id } = req.params;
    let info = await listing.findById(id);
    res.render("show.ejs", { info });
  })
);

app.post("/listings", async (req, res,next) => {
  if(!req.body){
    next (new ExpressError(500,"Errors&Errors"))
  }
  let data = req.bo
  
  dy;
  console.log(data);
  let list = new listing(data);
  await list.save();
  res.redirect("/listings");
});

app.get("/listings/edit/:id", async (req, res) => {
  let { id } = req.params;
  let info = await listing.find({ _id: `${id}` });
  res.render("edit.ejs", { info });
});

app.patch("/listings/edit/:id", async (req, res) => {
  let { id } = req.params;
  await listing.updateMany({ _id: `${id}` }, { ...req.body }); //we deconstructed req.body object
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await listing.deleteOne({ _id: `${id}` });
  res.redirect("/listings");
});

// let id="6693ba3407391d7c0cb97058";
// listing.findByIdAndUpdate(id,{image:"https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"})
// .then(res=>console.log(res))

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "not found!!"));
});

app.use((err, req, res,next) => {
  let { statusCode=404, message="Some Error Occurss" } = err;
   res.render("error.ejs",{err})
});

// app.use((err,req,res,next)=>{
// console.log("galat h bhai galat h!!")
// res.send("wrong image!!")
// })
