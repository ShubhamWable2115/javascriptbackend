
// let create the same function using the promise syntax and then we will use the async 
// await syntax to create the same function

const asyncHandler =(requestHandler) =>{
  (req, res, next) => {
    promise.resolve(requestHandler(req, res, next))
    .catch((err)=> next (err));
   }
}

export {asyncHandler}



// asyncHandler is   a higher-order function that takes an asynchronous function (fn)
//  as an argument and returns a new function. This new function wraps the original a
// synchronous function in a try-catch block, allowing for error handling in asynchronous operations. 
// If an error occurs during the execution of the asynchronous function, it is caught and passed to the 
// next middleware in the Express.js application.



// below we have used the arrow function with the asyc await syntax to creat the asycHandler fuction 
// which takes the function as an argument and returns a new function which is an async 
// function that takes the req, res, next as arguments and then we have used the try catch
//  block to catch the error and then we have used the res.status to send the error message to the client.

// const asyncHandler = (fn) => async (req, res, next) => 
//     { try{
//       await fn(req, res, next);
//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || "Internal Server Error",
//         })
//     }

// }