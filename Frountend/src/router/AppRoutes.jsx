import { Route, Routes } from "react-router-dom";

// actual Webpage
import Customer from "../WebPages/Customers/Customer";
import AddCustomer from "../WebPages/Customers/AddCustomer";
import Vehicle from "../WebPages/Vehicles/Vehicle";
import AddVehicle from "../WebPages/Vehicles/AddVehicle";
import Services from "../WebPages/Services/Services";
import AddService from "../WebPages/Services/AddService";
import Quotation from "../WebPages/Quotations/Quotation";
import AddQuotation from "../WebPages/Quotations/AddQuotation";
import JobCard from "../WebPages/JobCard/JobCard";
import AddJobCard from "../WebPages/JobCard/AddJobCard";
import Employee from "../WebPages/Employee/Employee";
import AddEmployee from "../WebPages/Employee/AddEmployee";
import Admin from "../WebPages/Admin/Admin";
import Login from "../WebPages/Accounts/Login";
import Register from "../WebPages/Accounts/Register";
import ForgetPassword from "../WebPages/Accounts/ForgetPassword";
import VerifyOtp from "../WebPages/Accounts/VerifyOtp";
import ResetPassword from "../WebPages/Accounts/ResetPassword";
import Orders from "../WebPages/Orders/Orders";
import AddOrder from "../WebPages/Orders/AddOrder";
import Dashboard from "../WebPages/Dashboard/Dashboard";
import ViewVehicles from "../WebPages/Vehicles/ViewVehicles";
import ViewCustomer from "../WebPages/Customers/ViewCustomer";
import ViewOrderDetails from "../WebPages/Orders/ViewOrderDetails";
import ViewQuotation from "../WebPages/Quotations/ViewQuotation";

import Auth from "../WebPages/Accounts/Auth";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth>
                <Dashboard />
            </Auth>} />
            <Route path="/customers" element={<Auth>
                <Customer />
            </Auth>} />
            <Route path="/addcustomer" element={<Auth>
                <AddCustomer />
            </Auth>} />
            <Route path="/editcustomer/:id" element={<Auth>
                <AddCustomer />
            </Auth>} />
            <Route path="/viewcustomer/:id" element={<Auth>
                <ViewCustomer />
            </Auth>} />
            <Route path="/admins" element={<Auth>
                <Admin />
            </Auth>} />
            <Route path="/employees" element={<Auth>
                <Employee />
            </Auth>} />
            <Route path="/addemployee" element={<Auth>
                <AddEmployee />
            </Auth>} />
            <Route path="/editemployee/:id" element={<Auth>
                <AddEmployee />
            </Auth>} />
            <Route path="/jobcards" element={<Auth>
                <JobCard />
            </Auth>} />
            <Route path="/addjobcard" element={<Auth>
                <AddJobCard />
            </Auth>} />
            <Route path="/quotation" element={<Auth>
                <Quotation />
            </Auth>} />
            <Route path="/addquotation" element={<Auth>
                <AddQuotation />
            </Auth>} />
            <Route path="/editquotation/:id" element={<Auth>
                <AddQuotation />
            </Auth>} />
            <Route path="/viewquotation/:id" element={<Auth>
                <ViewQuotation />
            </Auth>} />
            <Route path="/services" element={<Auth>
                <Services />
            </Auth>} />
            <Route path="/addservice" element={<Auth>
                <AddService />
            </Auth>} />
            <Route path="/editservice/:id" element={<Auth>
                <AddService />
            </Auth>} />
            <Route path="/vehicles" element={<Auth>
                <Vehicle />
            </Auth>} />
            <Route path="/addvehicle" element={<Auth>
                <AddVehicle />
            </Auth>} />
            <Route path="/editvehicle/:id" element={<Auth>
                <AddVehicle />
            </Auth>} />
            <Route path="/viewvehicles/:id" element={<Auth>
                <ViewVehicles />
            </Auth>} />
            <Route path="/orders" element={<Auth>
                <Orders />
            </Auth>} />
            <Route path="/placeorder" element={<Auth>
                <AddOrder />
            </Auth>} />
            <Route path="/updateorder/:id" element={<Auth>
                <AddOrder />
            </Auth>} />
            <Route path="/viewordersdetails/:id" element={<Auth>
                <ViewOrderDetails />
            </Auth>} />


            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgetpassword" element={<ForgetPassword />} />
            <Route path="/auth/verifyotp" element={<VerifyOtp />} />
            <Route path="/auth/resetpassword" element={<ResetPassword />} />

    
        </Routes>
    )
}
export default AppRoutes;