// import axios from "axios";
// import {
//   CUSTOMER_AC_DETAILS,
//   CUSTOMER_LOGIN,
//   CUSTOMER_PR_DETAILS,
//   CUSTOMER_TR_DETAILS,
//   GET_ALL_CUSTOMERS,
//   REGISTER_CUSTOMER,
//   GET_ALL_ACCOUNTS,
// } from "../constants/ApiRputes";
// import { } from "./adminServices";
// import { getToken } from "./authServices";

// export const registerCustomer = (customerData) =>
//   axios.post(REGISTER_CUSTOMER, customerData);

// export const customerLogin = (loginCredentials) =>
//   axios.post(CUSTOMER_LOGIN, loginCredentials);

// export const getTransactionDetails = (accountNumber) =>
//   axios.get(CUSTOMER_TR_DETAILS, accountNumber);

// export const getPersonalDetails = async (customerID) => {
//   const config = {
//     headers: {
//       Auth: getToken(),
//       "Content-Type": "application/json",
//     },
//   };

//   const data = {
//     customerID: customerID,
//   };

//   try {
//     const response = await axios.post(CUSTOMER_PR_DETAILS, data, config);
//     return response.data;
//   } catch (error) {
//     // console.error("Error fetching personal details:", error);
//     throw error;
//   }
// };

// // export const getAllAccounts = async (customerID) => {
// //   const config = {
// //     headers: {
// //       Auth: getToken(),
// //       "Content-Type": "application/json",
// //     },
// //   };

// //   const data = {
// //     customerID: customerID,
// //   };
// //   console.log(data);
// //   try {
// //     const response = await axios.post(GET_ALL_ACCOUNTS, data, config);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching account list:", error);
// //     throw error;
// //   }
// // };

// // export const getAccountDetails = async (accountNo) => {
// //   const config = {
// //     headers: {
// //       Auth: getToken(),
// //       "Content-Type": "application/json",
// //     },
// //   };

// //   const data = {
// //     accountNumber: accountNo,
// //   };

// //   console.log(data)
// //   try {
// //     const response = await axios.post(CUSTOMER_AC_DETAILS, data, config);
// //     return response.data;
// //   } catch (error) {
// //      console.error("Error fetching account details:", error);
// //     throw error;
// //   }
// // };

// export const getAllAccounts = async (customerID) => {
//   const config = {
//     headers: {
//       Auth: getToken(),
//       "Content-Type": "application/json",
//     },
//   };

//   const data = { customerID };

//   try {
//     console.log("Request to getAllAccounts:", data);
//     const response = await axios.post(GET_ALL_ACCOUNTS, data, config);
//     console.log("Response from getAllAccounts:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching account list:", error);
//     throw error;
//   }
// };

// export const getAccountDetails = async (accountNo) => {
//   const config = {
//     headers: {
//       Auth: getToken(),
//       "Content-Type": "application/json",
//     },
//   };

//   const data = { accountNumber: accountNo };

//   try {
//     console.log("Request to getAccountDetails:", data);
//     const response = await axios.post(CUSTOMER_AC_DETAILS, data, config);
//     console.log("Response from getAccountDetails:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching account details:", error);
//     throw error;
//   }
// };


// // export const getCustomers = async () => {
// //   const config = {
// //     headers: {
// //       Auth: getToken(),
// //       "Content-Type": "application/json",
// //     },
// //   };
// //   const response = await axios.post(GET_ALL_CUSTOMERS, {}, config);
// //   return response.data
// // };
// export const getCustomers = async () => {
//   const token = getToken();
//   console.log("Token:", token);  // Log the token to check if it's valid

//   const config = {
//     headers: {
//       Auth: token ? `Bearer ${token}` : '',  // Ensure the token is in "Bearer <token>" format
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const response = await axios.post(GET_ALL_CUSTOMERS, {}, config);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     throw error;
//   }
// };

import axios from "axios";
import {
  CUSTOMER_AC_DETAILS,
  CUSTOMER_LOGIN,
  CUSTOMER_PR_DETAILS,
  CUSTOMER_TR_DETAILS,
  GET_ALL_CUSTOMERS,
  REGISTER_CUSTOMER,
  GET_ALL_ACCOUNTS,
} from "../constants/ApiRputes";
import { getToken } from "./authServices";

// Registration of a new customer
export const registerCustomer = (customerData) =>
  axios.post(REGISTER_CUSTOMER, customerData);

// Customer login function
export const customerLogin = (loginCredentials) =>
  axios.post(CUSTOMER_LOGIN, loginCredentials);

// Fetch transaction details based on account number
export const getTransactionDetails = (accountNumber) =>
  axios.get(CUSTOMER_TR_DETAILS, accountNumber);

// Fetch personal details of a customer
export const getPersonalDetails = async (customerID) => {
  const config = {
    headers: {
      Auth: `Bearer ${getToken()}`,  // Add Bearer to token
      "Content-Type": "application/json",
    },
  };

  const data = { customerID };

  try {
    const response = await axios.post(CUSTOMER_PR_DETAILS, data, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching personal details:", error); // Add error logging
    throw error;
  }
};

// Fetch all accounts related to a customer
export const getAllAccounts = async (customerID) => {
  const config = {
    headers: {
      Auth: `Bearer ${getToken()}`,  // Add Bearer to token
      "Content-Type": "application/json",
    },
  };

  const data = { customerID };

  try {
    console.log("Request to getAllAccounts:", data);
    const response = await axios.post(GET_ALL_ACCOUNTS, data, config);
    console.log("Response from getAllAccounts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching account list:", error); // Add error logging
    throw error;
  }
};

// Fetch account details based on account number
export const getAccountDetails = async (accountNo) => {
  const config = {
    headers: {
      Auth: `Bearer ${getToken()}`,  // Add Bearer to token
      "Content-Type": "application/json",
    },
  };

  const data = { accountNumber: accountNo };

  try {
    console.log("Request to getAccountDetails:", data);
    const response = await axios.post(CUSTOMER_AC_DETAILS, data, config);
    console.log("Response from getAccountDetails:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error); // Add error logging
    throw error;
  }
};

// Fetch all customers (used in AdminDashboard)
export const getCustomers = async () => {
  const token = getToken();
  console.log("Token:", token);  // Log token to verify it's valid

  const config = {
    headers: {
      Auth: token ? `Bearer ${token}` : '',  // Ensure the token is in "Bearer <token>" format
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(GET_ALL_CUSTOMERS, {}, config);
    console.log("Response from getCustomers:", response.data);  // Log response for debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);  // Log the error for debugging
    throw error;
  }
};
