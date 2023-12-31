const multer =require("multer")
const path=require("path")
//Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    // check log to see what types of details we get in file 
    console.log(file);
    // here come location of where we want to save the file after upload
    cb(null, './public/uploads')
  },
  // making a function in filename to get random and unique number to save file in server that no file will be override
  filename:function(req, file, cb){
    // fieldname contain the value of form input name value
    //  path.extname is use take only extention from the orignal file name 
    // originalname provide the orignal name of file that uoploaded by user
    let newName = file.fieldname + "-"+ Date.now() + path.extname(file.originalname);
    cb(null, newName);
  }
});
//Init upload
const upload = multer({
  storage:storage,
  // fileFilter:- we use this method to check whether the file is uploaded is image type or any other type that our app or website support.
  // also we use this function because no one can implement any type of viruse or bat file in our server using it
  fileFilter:function(req, file, cb){
    // here we mention all the format that be allow to upload in our server
    //Checkfile type
    let fileTypes =  /jpeg|jpg|png|gif|webp|svg/;
    // test is javascript predefine function that check whether is file has same type that we support or mention in our website or app
    let mimetype = fileTypes.test(file.mimetype);
    // here we are checking where file uploaded contain same extention that we mention above
    let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // now it time to check whether above condition is true or not 
    // whene both condition become ture then file will upload to server 
    if(mimetype && extname){
      return cb(null, true);
    } 
      cb(
        "Error: File upload only supports the following filetypes - " + fileTypes
      )
   
  }
})

module.exports = upload;