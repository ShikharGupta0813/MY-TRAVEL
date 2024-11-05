const mongoose = require("mongoose");
let Schema = mongoose.Schema;

// let imageSchema = new Schema({
//   filename: {
//     type: String,
//     required:true,
//   },
//     {
//     type: String,
//     required:true,
//   },
// });

let listSchema = new Schema({
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true
  },
  image:{
    type:String,
    set: function(v) {
      return v.trim().length > 0 ? v : "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
    }
    
  } ,
  price: {
    type: Number,
    set: function(v) {
      return v.trim().length > 0 ? v : 1200;
    }
  },
  location: {
    type: String,
    required:true
  },
  country: {
    type: String,
    required:true
  },
});


const listing = mongoose.model("listing", listSchema);

// let list=new listing({
//   title:"modinagar",
// })
// list.save()
// .then((result)=>{
//   console.log(result);
// });
module.exports = listing;
