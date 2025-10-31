import React from "react";
// import Login from "../pages/Auth/LoginPage";
// import Dashboard from "../pages/Dashboard";
// import ProtectedRoute from "../routes/ProtectedRoute";
// import GuestRoute from "../routes/GuestRoute";
import AllUser from "../Pages/User/Alluser";
import AddNewUser from "../Pages/User/AddNewUser";
import EditUser from "../Pages/User/EditUser";
import Allproduct from "../Pages/Product/Allproduct";
import AddNewProduct from "../Pages/Product/AddNewProduct";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ChangeUserPassword from "../Pages/User/ChangeUserPassword";
import SupplierList from "../Pages/Supplier/SupplierList";
import EditSupplier from "../Pages/Supplier/EditSupplier";
import AddNewSupplier from "../Pages/Supplier/AddNewSupplier";
import CustomerList from "../Pages/Customer/CustomerList";
import EditCustomer from "../Pages/Customer/EditCustomer";
import AddNewCustomer from "../Pages/Customer/AddNewCustomer";
// import Master from "../pages/Master";
// import AuditCategory from "../pages/Audit_Category";
// import ManageUser from "../pages/ManageUser";
// import StaffView from "../pages/Staff_View";
// import AddCompliances from "../pages/Add-Complains";
// import AuditDetails from "../pages/Audit-page";
// import Add_govt_audit from "../pages/Add_govt_audit";
// import ProgrammePlan from "../pages/Programme";
// import ProgrammeEdit from "../pages/Programme/ProgrammeEdit";
// import Audit_Type from "../pages/Audit-type";
// import GovernmentAuditDetailsForm from "../pages/Audit_Details";
// import Recovery_type from "../pages/Recovery-Type";
// import Establishment from "../pages/Establishment";
// import SubPara from "../pages/SubPara";
// import AuditTypes from "../pages/Audit-types";
// import RecoveryTypes from "../pages/RecoveryTypes";
// import RecoveryAddForm from "../pages/AddRecovery";
// import Notification from "../pages/Notification";
// import ViewRecoverylist from "../pages/ViewRecoveryList";
// import Report from "../pages/Report";
// import ComplianceView from "../pages/ComplaianceView";
// import Audit_More_Details from "../pages/Audit_More_Details";
// import Compliance_More_Details from "../pages/View_More_Compliance";
// import Change_password from "../pages/Change_password";
// import LogHistory from "../pages/Log_History";
// import SeeHistory from "../pages/See_History";
// import RecoveryList from "../pages/Recovery/RecoveryList";
// import GenerateReport from "../pages/Generate_Report";
// import ReportList from "../pages/Report_List";
// import Programme_Letter from "../pages/Programme/Programme_Letter";
// import ComplianceTab from "../pages/Compliance2/TabScreen";
// import Audit_Report_List from "../pages/Audit_Approval_List";
// import Audit_Approval_List from "../pages/Audit_Approval_List";
// import Notice from "../pages/Notice";
// import AuditTabScreens from "../pages/AuditTabScreen/Auditab";
// import ProgrammeDashboard from "../pages/Programme/ApprovalProgramme/ProgrammeDashboard";
// import ProgrammeLetterdata from "../pages/Programme/ApprovalProgramme/ProgrammeLetterdata";
// import AddNotice from "../pages/Add_Notice";
// import Programme_report from "../components/ReportData/ProgrammeReport";
// import NoticeList from "../pages/NoticeList";
// import Audit_Report_List from "../components/ReportData/AuditReport";
// import Compliance_Report from "../components/ReportData/ComplianceReport";
// import AuditSystem from "../pages/AuditSystem_Report/AuditSystem";

// import { BASE_PATH } from "../services/axiosInstance";
interface Route {
  path: string;
  element: React.ReactNode;
}

const routes: Route[] = [
  // {
  //   path:BASE_PATH,
  //   element: (
  //     <GuestRoute>
  //       <Login />
  //     </GuestRoute>
  //   ),
  // },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "alluser",
    element: (
      <ProtectedRoute>
        <AllUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-new-user",
    element: (
      <ProtectedRoute>
        <AddNewUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit-user/:id",
    element: (
      <ProtectedRoute>
        <EditUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "products",
    element: (
      <ProtectedRoute>
        <Allproduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-new-product",
    element: (
      <ProtectedRoute>
        <AddNewProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "change-user-password",
    element: (
      <ProtectedRoute>
        <ChangeUserPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "supplier-list",
    element: (
      <ProtectedRoute>
        <SupplierList />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit-supplier/:id",
    element: (
      <ProtectedRoute>
        <EditSupplier />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-new-supplier",
    element: (
      <ProtectedRoute>
        <AddNewSupplier/>
      </ProtectedRoute>
    ),
  },
  {
    path: "customer-list",
    element: (
      <ProtectedRoute>
        <CustomerList />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit-customer/:id",
    element: (
      <ProtectedRoute>
        <EditCustomer />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-new-customer",
    element: (
      <ProtectedRoute>
        <AddNewCustomer/>
      </ProtectedRoute>
    ),
  },
  
  // {
  //   path: "/edit-product/:id",
  //   element: (
  //     <GuestRoute>
  //       <EditProduct />
  //     </GuestRoute>
  //   ),
  // }
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/master",
  //   element: (
  //     <ProtectedRoute>
  //       <Master />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-category",
  //   element: (
  //     <ProtectedRoute>
  //       <AuditCategory />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/manage-user",
  //   element: (
  //     <ProtectedRoute>
  //       <ManageUser />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/manage-user-details",
  //   element: (
  //     <ProtectedRoute>
  //       <StaffView />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/change-password",
  //   element: (
  //     <ProtectedRoute>
  //       <Change_password />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/add-compliances",
  //   element: (
  //     <ProtectedRoute>
  //       <AddCompliances />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit",
  //   element: (
  //     <ProtectedRoute>
  //       <AuditDetails />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/add-govt-audit",
  //   element: (
  //     <ProtectedRoute>
  //       <Add_govt_audit />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-more-details",
  //   element: (
  //     <ProtectedRoute>
  //       <Audit_More_Details />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/compliance-more-details",
  //   element: (
  //     <ProtectedRoute>
  //       <Compliance_More_Details />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/programme",
  //   element: (
  //     <ProtectedRoute>
  //       <ProgrammePlan />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/programme/edit",
  //   element: (
  //     <ProtectedRoute>
  //       <ProgrammeEdit />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-type",
  //   element: (
  //     <ProtectedRoute>
  //       <Audit_Type />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-details",
  //   element: (
  //     <ProtectedRoute>
  //       <GovernmentAuditDetailsForm />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recovery-type",
  //   element: (
  //     <ProtectedRoute>
  //       <Recovery_type />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/establishment",
  //   element: (
  //     <ProtectedRoute>
  //       <Establishment />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/sub-para",
  //   element: (
  //     <ProtectedRoute>
  //       <SubPara />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-types",
  //   element: (
  //     <ProtectedRoute>
  //       <AuditTypes />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recovery",
  //   element: (
  //     <ProtectedRoute>
  //       {/* <RecoveryForm /> */}
  //       <RecoveryTypes />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recovery-types",
  //   element: (
  //     <ProtectedRoute>
  //       <RecoveryTypes />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recovery-add-form",
  //   element: (
  //     <ProtectedRoute>
  //       <RecoveryAddForm />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/notification",
  //   element: (
  //     <ProtectedRoute>
  //       <Notification />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recoverydetails",
  //   element: (
  //     <ProtectedRoute>
  //       <ViewRecoverylist />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/report",
  //   element: (
  //     <ProtectedRoute>
  //       <Report />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/complianceview",
  //   element: (
  //     <ProtectedRoute>
  //       <ComplianceView />
  //     </ProtectedRoute>
  //   ),
  // },
  // // LogHistory
  // {
  //   path: "/loghistory",
  //   element: (
  //     <ProtectedRoute>
  //       <LogHistory />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/seehistory",
  //   element: (
  //     <ProtectedRoute>
  //       <SeeHistory />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/recoverylist",
  //   element: (
  //     <ProtectedRoute>
  //       <RecoveryList />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/add-report",
  //   element: (
  //     <ProtectedRoute>
  //       <GenerateReport />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/reportlist",
  //   element: (
  //     <ProtectedRoute>
  //       <ReportList />
  //     </ProtectedRoute>
  //   ),
  // },
  //  {
  //   path: "/programme-letter",
  //   element: (
  //     <ProtectedRoute>
  //       <Programme_Letter />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-approval-list",
  //   element: (
  //     <ProtectedRoute>
  //       <Audit_Approval_List />
  //     </ProtectedRoute>
  //   ),
  // },
  //   {
  //   path: "/notice",
  //   element: (
  //     <ProtectedRoute>
  //       <Notice />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/compliance",
  //   element: (
  //     <ProtectedRoute>
  //       <ComplianceTab />
  //     </ProtectedRoute>
  //   ),
  // },
  // // AuditTabScreens
  //  {
  //   path: "/manage-audit",
  //   element: (
  //     <ProtectedRoute>
  //       <AuditTabScreens />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/approve-letter",
  //   element: (
  //     <ProtectedRoute>
  //       <ProgrammeDashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  //  {
  //   path: "/programme-letter-data",
  //   element: (
  //     <ProtectedRoute>
  //       <ProgrammeLetterdata />
  //     </ProtectedRoute>
  //   ),
  // },
  //  {
  //   path: "/add-notice",
  //   element: (
  //     <ProtectedRoute>
  //       <AddNotice />
  //     </ProtectedRoute>
  //   ),
  // },
  //  {
  //   path: "/notice-list",
  //   element: (
  //     <ProtectedRoute>
  //       <NoticeList />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/programme-report",
  //   element: (
  //     <ProtectedRoute>
  //       <Programme_report />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-report",
  //   element: (
  //     <ProtectedRoute>
  //       <Audit_Report_List />
  //     </ProtectedRoute>
  //   ),
  // },
  //  {
  //   path: "/compliance-report",
  //   element: (
  //     <ProtectedRoute>
  //       <Compliance_Report />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/audit-report-section",
  //   element: (
  //     <ProtectedRoute>
  //       <AuditSystem />
  //     </ProtectedRoute>
  //   ),
  // },
  
];

export default routes;
