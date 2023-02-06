export const signup= async (req,res)=>{
    const password=req.body.password
    const name=req.body.name
   const hashedPwd=await bcrypt.hash(password, 10)
try{
   const alreadyExits= await User.findOne({name:name})
   if(alreadyExits){
       return res.status(409).json({message:"The Username is taken"})
   }
   const user = new User({
       name:req.body.name,
       email:req.body.email,
       password:hashedPwd
   })
   await user.save();
   res.status(500).json({message:"New User successfully created"})
}
catch(error){
console.log(error);
res.status(400).json({message:error.message})
}
}