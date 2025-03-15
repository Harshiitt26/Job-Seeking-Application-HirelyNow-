const asyncHandler = (logic)=>{
    return (req,res,next) => {
        Promise.resolve(logic(req,res,next))
        .catch(next);
    }
}

export default asyncHandler