import { Route, Routes } from "react-router-dom";
// Layout
import { WithoutMenuPage } from "../pages/layouts/WithoutMenuPage";
import { WithoutNavbarPage } from "../pages/layouts/WithoutNavbarPage";
import { ContainerPage } from "../pages/layouts/ContainerPage";
import { FluidPage } from "../pages/layouts/FluidPage";
import { BlankPage } from "../pages/layouts/BlankPage";

import { LoginPage } from "../pages/authentication/LoginPage";
import { RegisterPage } from "../pages/authentication/RegisterPage";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage";
import { AccountPage } from "../pages/account/AccountPage";
import { Connections } from "../pages/account/ConnectionsPage";
import { NotificationPage } from "../pages/account/NotificationPage";
import { ErrorPage } from "../pages/misc/ErrorPage";
import { MaintenancePage } from "../pages/misc/MaintenancePage";

import { AccordionPage } from "../pages/user-interface/AccordionPage";
import { AlertPage } from "../pages/user-interface/AlertPage";
import { BadgesPage } from "../pages/user-interface/BadgePage";
import { ButtonPage } from "../pages/user-interface/ButtonPage";
import { CarouselPage } from "../pages/user-interface/CarouselPage";
import { CardsPage } from "../pages/user-interface/CardsPage";
import { CollapsePage } from "../pages/user-interface/CollapsePage";
import { DropdownPage } from "../pages/user-interface/DropdownPage";
import { FooterPage } from "../pages/user-interface/FooterPage";
import { ListGroupPage } from "../pages/user-interface/ListGroupPage";
import { ModalPage } from "../pages/user-interface/ModalPage";
import { NavbarPage } from "../pages/user-interface/NavbarPage";
import { OffcanvasPage } from "../pages/user-interface/OffcanvasPage";
import { PaginationBreadcrumbsPage } from "../pages/user-interface/PaginationBreadcrumbsPage";
import { ProgressPage } from "../pages/user-interface/ProgressPage";
import { SpinnersPage } from "../pages/user-interface/SpinnersPage";
import { TabsPillPage } from "../pages/user-interface/TabsPillPage";
import { ToastPage } from "../pages/user-interface/ToastPage";
import { TooltipPopoverPage } from "../pages/user-interface/TooltipPopoverPage";
import { TypographyPage } from "../pages/user-interface/TypographyPage";

import { BoxiconsPage } from "../pages/icons/BoxiconPage";

import { BasicInputPage } from "../pages/form-element/BasicInputPage";
import { InputGroupPage } from "../pages/form-element/InputGroupPage";
import { HorizontalFormPage } from "../pages/form-layout/HorizontalFormPage";
import { VerticalFormPage } from "../pages/form-layout/VerticalFormPage";
import { TablesPage } from "../pages/TablesPage";
import { DashboardPage } from "../pages/DashboardPage";

import { PerfectScrollbarPage } from "../pages/extended-ui/PerfectScrollbar";
import { TextDividerPage } from "../pages/extended-ui/TextDividerPage";

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

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/layout/without-menu" element={<WithoutMenuPage />} />
            <Route path="/layout/without-navbar" element={<WithoutNavbarPage />} />
            <Route path="/layout/container" element={<ContainerPage />} />
            <Route path="/layout/fluid" element={<FluidPage />} />
            <Route path="/layout/fluid" element={<FluidPage />} />
            <Route path="/layout/blank" element={<BlankPage />} />

            <Route path="/ui/accordion" element={<AccordionPage />} />
            <Route path="/ui/alerts" element={<AlertPage />} />
            <Route path="/ui/badges" element={<BadgesPage />} />
            <Route path="/ui/buttons" element={<ButtonPage />} />
            <Route path="/ui/cards" element={<CardsPage />} />
            <Route path="/ui/carousel" element={<CarouselPage />} />
            <Route path="/ui/collapse" element={<CollapsePage />} />
            <Route path="/ui/dropdown" element={<DropdownPage />} />
            <Route path="/ui/footer" element={<FooterPage />} />
            <Route path="/ui/list-group" element={<ListGroupPage />} />
            <Route path="/ui/modals" element={<ModalPage />} />
            <Route path="/ui/navbar" element={<NavbarPage />} />
            <Route path="/ui/offcanvas" element={<OffcanvasPage />} />
            <Route path="/ui/pagination-breadcrumbs" element={<PaginationBreadcrumbsPage />} />
            <Route path="/ui/progress" element={<ProgressPage />} />
            <Route path="/ui/spinners" element={<SpinnersPage />} />
            <Route path="/ui/tabs-pills" element={<TabsPillPage />} />
            <Route path="/ui/toasts" element={<ToastPage />} />
            <Route path="/ui/tooltips-popovers" element={<TooltipPopoverPage />} />
            <Route path="/ui/typography" element={<TypographyPage />} />



            <Route path="/account/settings" element={<AccountPage />} />
            <Route path="/account/notifications" element={<NotificationPage />} />
            <Route path="/account/connections" element={<Connections />} />

            <Route path="/misc/error" element={<ErrorPage />} />
            <Route path="/misc/under-maintenance" element={<MaintenancePage />} />

            <Route path="/extended-ui/perfect-scrollbar" element={<PerfectScrollbarPage />} />
            <Route path="/extended-ui/text-divider" element={<TextDividerPage />} />

            <Route path="/boxicons" element={<BoxiconsPage />} />

            <Route path="/form/basic-inputs" element={<BasicInputPage />} />
            <Route path="/form/input-groups" element={<InputGroupPage />} />

            <Route path="/form-layout/horizontal-form" element={<HorizontalFormPage />} />
            <Route path="/form-layout/vertical-form" element={<VerticalFormPage />} />

            <Route path="/tables" element={<TablesPage />} />
        </Routes>
    )
}
export default AppRoutes;