// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Modal,
//   Box,
//   Typography,
// } from "@mui/material";
// import {
//   getAccountDetails,
//   getAllAccounts,
// } from "../../services/customerServices";

// const CustomerList = ({ customers }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [accountDetails, setAccountDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleOpen = async (customer) => {
//     setOpen(true);
//     setSelectedCustomer(customer);
//     setLoading(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (selectedCustomer) {
//         const account = await getAllAccounts(selectedCustomer);
//         setAccountDetails(await getAccountDetails(account[0].account_no));
//       }
//     };
//     fetchData()
//   }, [selectedCustomer]);

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedCustomer(null);
//     setAccountDetails(null);
//   };

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>CustomerID</TableCell>
//               <TableCell>CustomerName</TableCell>
//               <TableCell>MobileNo</TableCell>
//               <TableCell>EmailID</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>AadharNo</TableCell>
//               <TableCell>PanNo</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customers.map((customer) => (
//               <TableRow key={customer.CustomerID}>
//                 <TableCell>{customer.CustomerID}</TableCell>
//                 <TableCell>{customer.CustomerName}</TableCell>
//                 <TableCell>{customer.MobileNo}</TableCell>
//                 <TableCell>{customer.EmailID}</TableCell>
//                 <TableCell>{customer.Address}</TableCell>
//                 <TableCell>{customer.AadharNo}</TableCell>
//                 <TableCell>{customer.PanNo}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     onClick={() => handleOpen(customer.CustomerID)}
//                   >
//                     View Account Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedCustomer && (
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="account-details-modal"
//           aria-describedby="account-details-modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               bgcolor: "background.paper",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography id="account-details-modal" variant="h6" component="h2">
//               Account Details
//             </Typography>
//             {accountDetails && (
//               <Typography id="account-details-modal-description" sx={{ mt: 2 }}>
//                 Account Number : {accountDetails[0].account_no}
//                 <br />
//                 Branch Code : {accountDetails[0].branch_code}
//                 <br />
//                 Balance : {accountDetails[0].balance}
//                 <br />
//                 Account Type : {accountDetails[0].account_type}
//               </Typography>
//             )}
//           </Box>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default CustomerList;
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import {
  getAccountDetails,
  getAllAccounts,
} from "../../services/customerServices";

const CustomerList = ({ customers }) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = (customerID) => {
    setOpen(true);
    setSelectedCustomer(customerID);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedCustomer) {
  //       setLoading(true);
  //       try {
  //         const accounts = await getAllAccounts(selectedCustomer);
  //         if (accounts.length > 0) {
  //           const details = await getAccountDetails(accounts[0].account_no);
  //           setAccountDetails(details);
  //         } else {
  //           setAccountDetails(null); // No accounts found
  //         }
  //       } catch (error) {
  //         console.error("Error fetching account details:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [selectedCustomer]);
  console.log("Selected Customer:", selectedCustomer);
  console.log("Account Details State:", accountDetails);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCustomer) {
        try {
          const account = await getAllAccounts(selectedCustomer);
          console.log("Accounts fetched:", account);

          if (account.length > 0) { // Ensure account has data
            const details = await getAccountDetails(account[0].account_no);
            console.log("Account details fetched:", details);
            setAccountDetails(details);
          } else {
            console.log("No accounts found for customer:", selectedCustomer);
          }
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
    };
    fetchData();
  }, [selectedCustomer]);


  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
    setAccountDetails(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CustomerID</TableCell>
              <TableCell>CustomerName</TableCell>
              <TableCell>MobileNo</TableCell>
              <TableCell>EmailID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>AadharNo</TableCell>
              <TableCell>PanNo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.CustomerID}>
                <TableCell>{customer.CustomerID}</TableCell>
                <TableCell>{customer.CustomerName}</TableCell>
                <TableCell>{customer.MobileNo}</TableCell>
                <TableCell>{customer.EmailID}</TableCell>
                <TableCell>{customer.Address}</TableCell>
                <TableCell>{customer.AadharNo}</TableCell>
                <TableCell>{customer.PanNo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(customer.CustomerID)}
                  >
                    View Account Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="account-details-modal"
        aria-describedby="account-details-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="account-details-modal" variant="h6" component="h2">
            Account Details
          </Typography>
          {loading ? (
            <Typography>Loading account details...</Typography>
          ) : accountDetails ? (
            <Typography id="account-details-modal-description" sx={{ mt: 2 }}>
              Account Number: {accountDetails[0].account_no}
              <br />
              Branch Code: {accountDetails[0].branch_code}
              <br />
              Balance: {accountDetails[0].balance}
              <br />
              Account Type: {accountDetails[0].account_type}
            </Typography>
          ) : (
            <Typography>No account details found.</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CustomerList;
