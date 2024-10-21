import bcrypt from "bcryptjs";
const { hashSync,compareSync } = bcrypt;
import {
  BRANCH_DETAILS_TABLE,
  EMP_DETAILS_TABLE,
} from "../Utility/constants.js";
import { dbConnection } from "../Utility/dbConnection.js";
import jwt from "jsonwebtoken"
export const createAdmin = (req, res) => {

  const { firstName, lastName, branchName, role, password } = req.body;

  const encryptedPassword = hashSync(password, 10);

  const branchCodeQry = `select branch_code from ${BRANCH_DETAILS_TABLE} where branch_address='${branchName}'`;

  dbConnection.query(branchCodeQry, (error, result) => {
    if (error) {
         console.log(error)
      res.status(500).send({ message: "Failed to retrive branch code" });
    } else {
      const branchCode = result[0].branch_code;

      const registerAdminQuery = `insert into ${EMP_DETAILS_TABLE} (employee_name,role,branch_code,employee_password) values ('${firstName} ${lastName}','${role}','${branchCode}','${encryptedPassword}')`;

      dbConnection.query(registerAdminQuery, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Failed to register user, Something went wrong...!",
          });
        } else {
          // console.log(result);
          res.status(200).send({ message: "User Registered Successfully...!" });
        }
      });
    }
  });
};

export const fetchEmpDetails = (req, res) => {
  const qry = `select * from ${EMP_DETAILS_TABLE}`;
  dbConnection.query(qry, (error, results) => {
    if (error) {
      res.status(500).send({ message: "Something went wrong" });
    } else {
      res.status(200).send(results);
    }
  });
};

// export const adminLogin = (req, res) => {
//   const { employeeId, password } = req.body;
//   const qry = `select * from ${EMP_DETAILS_TABLE} where empid=${employeeId}`;
//   dbConnection.query(qry, (error, result) => {
//     if (error) {
//         console.log(error);
//       res.status(500).send({ message: "Something went wrong....!" });
//     } else {
//       if (result.length == 0) {
//         res.status(400).send({ message: "Invalid Employee ID" });
//       } else {
//         console.log(result);
//         const encryptedPassword = result[0].password;
//         if(compareSync(password,encryptedPassword)){
        
//           const token=jwt.sign({employeeId:result[0].employeeId},"RuPayBank")

//           res.status(200).send({ message: "Login successful",token:token });
//         } else {
//           res
//             .status(400)
//             .send({ message: "Invalid password for the mentioned Employee ID" });
//         }
//       }
//     }
//   });
// };

export const adminLogin = (req, res) => {
  const { employeeId, password } = req.body; 

  // Check if username and password are provided
  // if (!username || !password) {
  //   return res.status(400).send({ message: 'Username and password are required' });
  // }

  const query = `select * from ${EMP_DETAILS_TABLE} where empid=${employeeId}`;
  dbConnection.query(query, [employeeId], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const hashedPassword = results[0].employee_password;

      // Log both hashed password and entered password
      console.log('Hashed Password from DB:', hashedPassword);
      console.log('Entered Password:', password);

      // Ensure the hashed password is defined
      if (!hashedPassword) {
        return res.status(500).send({ message: 'No hashed password found' });
      }

      try {
        const isMatch = bcrypt.compareSync(password, hashedPassword); 
        if (isMatch) {
          // Password matches, proceed with login
          res.status(200).send({ message: 'Login successful' });
        } else {
          // Password does not match
          res.status(401).send({ message: 'Invalid password' });
        }
      } catch (err) {
        console.error('Error during password comparison:', err);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    } else {
      // No user found
      res.status(404).send({ message: 'User not found' });
    }
  });
}




