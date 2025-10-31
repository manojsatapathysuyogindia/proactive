// src/api/apiRoutes.ts
import { useSelector } from "react-redux";
import { type RootState } from "../state/store";

export const BASE_URL='http://77.68.14.214/proactive-dashboard/public/api';
export type OrderType = "regular" | "backorder";

const API_VERSION = "v1";

// Common API path builder (not tied to order type)
const withVersion = (path: string) => `${path}`;

// Order-type specific API path builder
const withOrderType = (path: string, type: OrderType) =>
  `/${API_VERSION}/${type}${path}`;

// 🔹 Common APIs — available regardless of order type
export const commonRoutes = {
  LOGIN: withVersion("/login"),
  LOGOUT: withVersion("/users/logout"),
  ALLUSER:withVersion("/users/all-users"),
  USERDETAILS:withVersion("/users/user-details"),
  ADDUSER:withVersion("/users/create"),
  CHANGEUSERPASSWORD:withVersion("/users/change-password"),
  ALLPRODUCT:withVersion("/product/list"),
  ADDPRODUCT:withVersion("/product/create"),
  SUPPLIERLIST:withVersion("/supplier/list"),
  DELETESUPPLIER:withVersion("/supplier/delete"),
  EDITSUPPLIER:withVersion("/supplier/edit"),
  SUPPLIERDETAILS:withVersion("/supplier/details"),
  ADDSUPPLIER:withVersion("/supplier/create"),
  CUSTOMERLIST:withVersion("/customer/all"),
  DELETECUSTOMER:withVersion("/customer/delete"),
  EDITCUSTOMER:withVersion("/customer/edit"),
  CUSTOMERDETAILS:withVersion("/customer/details"),
  ADDCUSTOMER:withVersion("/customer/add"),

  PROFILE: withVersion("/profile"),
  DASHBOARD: withVersion("/dashboard"),
  REGISTER:withVersion('/user/register'),
  COUNTRIES:withVersion('/address/countries'),
  ALLCLASS:withVersion(`/class/all?page=0&size=${500}&sort=string`),
  GETSUBJECT:withVersion('/subject/class'),
  GETALLSUBJECT:withVersion('/subject/all'),
  ADDSUBJECT:withVersion('subject/addsubject'),
  DELETESUBJECT:withVersion('subject'), 
  EDITSUBJECT:withVersion('subject'),
  GETSUBJECTBYID:withVersion('subject'),
  QUESTIONTYPE:withVersion('/questiontype/all'),
  ADDQUESTION:withVersion('/questionbank'),
  UPDATEQUESTION:withVersion('/questionbank/update'),
  GETQUESTIONLIST:withVersion('/questionbank/all'),
  DELETEQUESTION:withVersion('/questionbank/qusdelete'),
  CREATEEXAM:withVersion('/exam/create'),
  GETEXAMLIST:withVersion('/exam/get'),
  DELETEEXAM:withVersion('/exam'),
  GETEDITEXAMDATA:withVersion('exam/getById'),
  UPDATEEXAM:withVersion('exam/update'),
  GETQUESTIONBYID:withVersion('questionbank'),
  STATES:withVersion('/address/states'),
  CITY:withVersion('/address/cities'),
  UPLOADIMAGE:withVersion('upload/image'),
  DELETEIMAGE:withVersion('upload/delete'),
  OTP:withVersion('/auth/otp-verify'),
  RESENDOTP:withVersion('/auth/resend-otp'),
  DELETECOLUMNOPTION:withVersion('/questionbank/ansdelete'),
  GETEXAMSCHEDULES:withVersion('/exam-schedules'),
  ADDEXAMSCHEDULES:withVersion('/exam-schedules/add'),
  DELETEEXAMSCHEDULES:withVersion('/exam-schedules/schedule'),
  GETEXAMBYID:withVersion('/exam/getById'),
  GETEXAMWITHATTEMPTS:withVersion('/exam/with-attempts'),
  SUBMITEXAM:withVersion('/ans-attempt/attempt'),
  GETSTUDENRTDATA:withVersion('/student/filter-by-class-and-exam'),
  GETEXAMBYCLASSID:withVersion('exam/getByClassId/'),
  EXAMASSIGN:withVersion('/examassign/assign'),
   GETEXAMBYSTUDENT:withVersion('/student/getexam'),
   ASSIGNEXAMSCHEDULE:withVersion('/student/assign-exam-schedule'),
   FINALSUBMIT:withVersion('question/submit'),
   SAVENEXT:withVersion('question/attempt'),
   GETSTUDENTLIST:withVersion('student/all'),
   STARTEXAM:withVersion('stu-exam-attempt/add'),
   BULKUPLOADSTUDENT:withVersion('upload/bulk-register'),
   UPDATESTUDENTPROFILE:withVersion('student/update-profile'),
    GETSTUDENTPROFILE:withVersion('student/profile'),
   SAMPLEDOWNLOAD:withVersion('upload/download-sample-excel'),
   STUDENTDETAILSDOWNLOAD:withVersion('student/stu-details'),
   STUDENTSFROMEXAM:withVersion('result'),
   CALMARK:withVersion('result/calculate'),
   DETAILRESULT:withVersion('result/detailresult'),
   PUBLISHRESULT:withVersion('result/publish'),
   CREATEDUPLICATE:withVersion('exam/dublicate'),
   ACTIVEINACTIVE:withVersion('student/update-status'),
   CMS_EMAIL_CONFIG:withVersion('cms'),
   GETSLUG:withVersion('cms'),
   GETLOGO:withVersion('cms/logs'),
   GETSTUDENTDETAILS:withVersion('student'),
   RESULTDOWNLOAD:withVersion('result/download-results'),
   GETLIVESTATUS:withVersion('exam/attend-details'),
   STUDENTRESULTDOWNLOAD:withVersion('result/pdf-results'),
};

// 🔹 Order-type specific APIs — vary based on regular/backorder
export const orderRoutes = (type: OrderType) => ({
  ORDERS: withOrderType("/orders", type),
  ORDER_BY_ID: (id: string) => withOrderType(`/orders/${id}`, type),
  CREATE_ORDER: withOrderType("/orders", type),
  UPDATE_ORDER: (id: string) => withOrderType(`/orders/${id}`, type),
  SUBMIT_ORDER: withOrderType("/orders/submit", type),
  DELETE_ORDER: (id: string) => withOrderType(`/orders/${id}`, type),
  // Add more as needed
});
export const useApiRoutes = () => {
    const orderType:any = useSelector((state: RootState) => state.settings.tab);
    return {
      ...commonRoutes,
      ...orderRoutes(orderType),
    };
  };