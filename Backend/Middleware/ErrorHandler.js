const errorHandler = (err, req, res, next)=> {
    console.log(res.statusCode)
    const statusCode = res.statusCode ? res.statusCode : 500
    console.log("kdkdkdk",statusCode,err)
    switch (statusCode) {
        case 403:
            console.log("run")
            res.status(403).send({title:"Not Found",error:err.message,stacktrance:err.stack})
            break; 
    
        default:
            console.log("Ready to Go , No Error Found")
            break;
    }
    // res.status(statusCode).send({title:"Not Found",message:err.message,stacktrance:err.stack})
    // res.json()

   next()
}


module.exports = errorHandler