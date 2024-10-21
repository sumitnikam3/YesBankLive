// import jwt from 'jsonwebtoken'

// export const authenticateLogin=(req,res,next)=>{
//     const header=req.get('Auth')
//     if(header){
//         const token=header.split(" ")[0]
        
//         jwt.verify(token,'RuPayBank',(error,payload)=>{
//             if(error){
//                  console.log(error)
//                 res.status(401).send({message:'Invalid Token'})
//             }else{
//                 next()
//             }
//         })
//     }
// }

// import jwt from 'jsonwebtoken';

// export const authenticateLogin = (req, res, next) => {
//     // Get the 'Auth' header (or 'Authorization', if applicable)
//     const header = req.get('Auth');

//     if (!header) {
//         return res.status(401).send({ message: 'Access denied, no token provided' });
//     }

//     // Extract the token after the 'Bearer' part
//     const token = header.split(" ")[1];  // Fix: Take the second part, which is the token

//     // Verify the token using the secret
//     jwt.verify(token, 'RuPayBank', (error, payload) => {
//         if (error) {
//             console.log(error);
//             return res.status(401).send({ message: 'Invalid Token' });
//         } else {
//             // Token is valid, proceed to the next middleware
//             next();
//         }
//     });
// };
import jwt from 'jsonwebtoken';

export const authenticateLogin = (req, res, next) => {
    const header = req.get('Auth');  // Adjust this if you use a different header like 'Authorization'

    if (!header) {
        return res.status(401).send({ message: 'Token not provided' });  // Token is missing
    }

    const token = header.split(" ")[1];  // Use the second part (JWT) after "Bearer"

    if (!token) {
        return res.status(401).send({ message: 'Token format is incorrect' });  // Check if token exists
    }

    jwt.verify(token, 'RuPayBank', (error, payload) => {
        if (error) {
            console.error(error);
            return res.status(401).send({ message: 'Invalid Token' });  // Invalid token
        } else {
            req.user = payload;  // Pass user data to next middleware if needed
            next();  // Proceed to the next middleware
        }
    });
};
