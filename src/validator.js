module.exports = {
    validateBody = (req,res,next) =>{
        console.log("validate function");
        next();
    }
}