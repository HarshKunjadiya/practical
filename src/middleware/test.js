export function validateBody(req,res,next) {
    try {
        if(!req.body.name){
            return res.status(200).send({massage :"Name Required!"});
        }
        req.body.name = "harsh";
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({massage:"Internal server error!"});
    }
}