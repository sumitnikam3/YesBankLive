// import React, { useEffect, useState } from "react";
// import CustomerList from "./CustomerList";
// import { getToken } from "../../services/authServices";
// import { useNavigate } from "react-router-dom";
// import { BASE_ROUTE } from "../../constants/AppRoutes";
// import {getAccountDetails, getCustomers} from '../../services/customerServices'

// const AdminDashboard = () => {
//   const [customers, setCustomers] = useState([]);

// const navigate=useNavigate()

// useEffect(()=>{
//   if(!getToken()) navigate(BASE_ROUTE)
// })

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setCustomers(await getCustomers())
//     } catch (error) {
//       // console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);

//   return (
//     <div className="w-full min-h-screen p-4 bg-gray-100 text-center">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div>
//         <h2 className="text-2xl my-5 font-semibold">Customer List Table</h2>
//         <CustomerList customers={customers}></CustomerList>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import CustomerList from "./CustomerList";
import { getToken } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { BASE_ROUTE } from "../../constants/AppRoutes";
import { getCustomers } from '../../services/customerServices';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // Redirect if token is not present
  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.log("No token found, redirecting to login");  // Add logging for token check
      navigate(BASE_ROUTE);
    }
  }, [navigate]);

  // Fetch customers when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);  // Log the error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div>
        <h2 className="text-2xl my-5 font-semibold">Customer List Table</h2>
        <CustomerList customers={customers}></CustomerList>
      </div>
    </div>
  );
};

export default AdminDashboard;