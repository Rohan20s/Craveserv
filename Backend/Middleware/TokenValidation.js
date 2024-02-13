const jwt =require('jsonwebtoken');

function TokenValidation(req,res,next){

    const authHeader=req.header('authorization');

    //check token
    if(authHeader==null){
        return res.status(401).json({error:"Access-denied"});
    }

    //check validity
    try{
        const verified=jwt.verify(authHeader,"secret");
        console.log(verified)
        req.user={ username: verified.name,email:verified.email,phone:verified.phone } //if verified the token will be decoded and the username of the user will be extracted and passed.
        next();

    }catch (e){
        res.status(401).json({error:"Invalid-token"});
    }

}

module.exports=TokenValidation