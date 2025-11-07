import { BASE_URL } from './../constants/apiRoutes';

import axios from "axios";
import { Service } from "../services/apiService";
import Cookies from "js-cookie";
// import BASE_URL from "../constants"


// 1. login user (send JSON payload)
export const loginUser = async ( URL: string,email: string, password: string ) => {
let data ={
  employee_id:email,
  password,
  // recaptchaToken
}
    const { response, error } = await Service("POST", URL, JSON.stringify(data));
    if (error) throw new Error("Invalid username or password.");
    return response;
  };
  export const logOutUser = async (URL: string) => {
    const token = Cookies.get("token");
    
    try {
      // Use axios directly for logout to include Bearer token
      const response = await axios.post(BASE_URL+URL, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Cookies.remove("token");   
      Cookies.remove("employeeName");   
      return response.data;
    } catch (error) {
      Cookies.remove("token");
      Cookies.remove("employeeName");   
      sessionStorage.clear();
      throw error;
    }
  };
  export const allUser = async (URL: string) => {
    const token = Cookies.get("token");
    
    try {
      // Use axios directly for logout to include Bearer token
      const response = await axios.post(BASE_URL+URL, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // Cookies.remove("token");   
      return response.data;
    } catch (error) {
      // Cookies.remove("token");
      // sessionStorage.clear();
      throw error;
    }
  };
  export const userDetails = async ( URL: string,id: string) => {
    let data ={
      user_id:id,    
      // recaptchaToken
    }
        const { response, error } = await Service("POST", URL, JSON.stringify(data));
        if (error) throw new Error("Invalid id");
        return response;
      };
  export const addUser = async (URL: string, userData: any) => {
        const token = Cookies.get("token");
        let data = {
          employee_id: userData.employeeId,
          employee_first_name: userData.firstName,
          employee_middle_name: userData.middleName,
          employee_last_name: userData.lastName,
          password: userData.password,
          employee_work_email: userData.email,
          employee_work_phone: userData.phone,
          department_name: userData.userType    
          // recaptchaToken
        };
        
        try {
          // Remove JSON.stringify - axios will handle it automatically
          const response = await axios.post(BASE_URL + URL, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };
  export const changeUserPassword = async (URL: string, password: any) => {
        const token = Cookies.get("token");
        let data = {
          old_password: password.currentPassword,
    new_password: password.newPassword,
    new_password_confirmation: password.confirmPassword   
          // recaptchaToken
        };
        
        try {
          // Remove JSON.stringify - axios will handle it automatically
          const response = await axios.post(BASE_URL + URL, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };
  export const allProduct = async (URL: string) => {
        const token = Cookies.get("token");
        
        try {
          // Use axios directly for logout to include Bearer token
          const response = await axios.post(BASE_URL+URL, {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // Cookies.remove("token");   
          return response.data;
        } catch (error) {
          // Cookies.remove("token");
          // sessionStorage.clear();
          throw error;
        }
      };
  export const masterDropdown = async (URL: string) => {
        const token = Cookies.get("token");
        
        try {
          // Use axios directly for logout to include Bearer token
          const response = await axios.post(BASE_URL+URL, {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // Cookies.remove("token");   
          return response.data;
        } catch (error) {
          // Cookies.remove("token");
          // sessionStorage.clear();
          throw error;
        }
      };
  export const addProduct = async (URL: string, productData: any) => {
        const token = Cookies.get("token");
        let data = {
          MfrPartNumber: productData.MfrPartNumber,
          OurPartNumber: productData.OurPartNumber,
          ShortDescription: productData.shortDescription,
          LongDescription: productData.longDescription,
          manufacturer_id: productData.Manufacturer,
          condition_id: productData.Condition,
          warranty_id: productData.Warrenty,
          category_id: productData.category    
          // recaptchaToken
        };
        
        try {
          // Remove JSON.stringify - axios will handle it automatically
          const response = await axios.post(BASE_URL + URL, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };
  export const supplierList = async (URL: string) => {
        const token = Cookies.get("token");
        
        try {
          // Use axios directly for logout to include Bearer token
          const response = await axios.post(BASE_URL+URL, {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          // Cookies.remove("token");   
          return response.data;
        } catch (error) {
          // Cookies.remove("token");
          // sessionStorage.clear();
          throw error;
        }
      };
  export const deleteSupplier = async ( URL: string,id: string) => {
        let data ={
          id:id,    
          // recaptchaToken
        }
            const { response, error } = await Service("POST", URL, JSON.stringify(data));
            if (error) throw new Error("Invalid id");
            return response;
      };
  export const toggleSupplierStatus = async ( URL: string,id: string) => {
        let data ={
          id:id,    
          // recaptchaToken
        }
            const { response, error } = await Service("POST", URL, JSON.stringify(data));
            if (error) throw new Error("Invalid id");
            return response;
          };
  export const editSupplier = async (URL: string, id: string, editData: any) => {
            const data = {
              OrganisationID: editData.OrganisationID,
              OrganisationName: editData.OrganisationName,
              ContactFirstName: editData.ContactFirstName,
              ContactLastName: editData.ContactLastName,
              ContactEmail: editData.ContactEmail,
              ContactPhone: editData.ContactPhone,
              OrganisationStreetAddress: editData.OrganisationStreetAddress,
              OrganisationAddressLine2: editData.OrganisationAddressLine2,
              OrganisationCity: editData.OrganisationCity,
              OrganisationState: editData.OrganisationState,
              OrganisationPostalCode: editData.OrganisationPostalCode,
              OrganisationCountry: editData.OrganisationCountry,
              RegisteredOfficeSame: editData.RegisteredOfficeSame,
              RegisteredOfficeStreetAddress: editData.RegisteredOfficeStreetAddress,
              RegisteredOfficeAddressLine2: editData.RegisteredOfficeAddressLine2,
              RegisteredOfficeCity: editData.RegisteredOfficeCity,
              RegisteredOfficeState: editData.RegisteredOfficeState,
              RegisteredOfficePostalCode: editData.RegisteredOfficePostalCode,
              RegisteredOfficeCountry: editData.RegisteredOfficeCountry,
              CompanyRegisteredNumber: editData.CompanyRegisteredNumber,
              VATNumber: editData.VATNumber
            };
          
            const { response, error } = await Service("POST", `${URL}/${id}`, data);
            if (error) throw new Error("Failed to update supplier");
            return response;
      };
  export const supplierDetails = async ( URL: string,id: string) => {
                let data ={
                  id:id,    
                  // recaptchaToken
                }
                    const { response, error } = await Service("POST", URL, JSON.stringify(data));
                    if (error) throw new Error("Invalid id");
                    return response;
      };
  export const addSupplier = async (URL: string, supplierData: any) => {
                    const token = Cookies.get("token");
                    let data = {
                      OrganisationID: supplierData.OrganisationID,
                      OrganisationName: supplierData.OrganisationName,
                      ContactFirstName: supplierData.ContactFirstName,
                      ContactLastName: supplierData.ContactLastName,
                      ContactEmail: supplierData.ContactEmail,
                      ContactPhone: supplierData.ContactPhone,
                      OrganisationStreetAddress: supplierData.OrganisationStreetAddress,
                      OrganisationAddressLine2: supplierData.OrganisationAddressLine2,
                      OrganisationCity: supplierData.OrganisationCity,
                      OrganisationState: supplierData.OrganisationState,
                      OrganisationPostalCode: supplierData.OrganisationPostalCode,
                      OrganisationCountry: supplierData.OrganisationCountry,
                      RegisteredOfficeSame: supplierData.RegisteredOfficeSame,
                      RegisteredOfficeStreetAddress: supplierData.RegisteredOfficeStreetAddress,
                      RegisteredOfficeAddressLine2: supplierData.RegisteredOfficeAddressLine2,
                      RegisteredOfficeCity: supplierData.RegisteredOfficeCity,
                      RegisteredOfficeState: supplierData.RegisteredOfficeState,
                      RegisteredOfficePostalCode: supplierData.RegisteredOfficePostalCode,
                      RegisteredOfficeCountry: supplierData.RegisteredOfficeCountry,
                      CompanyRegisteredNumber: supplierData.CompanyRegisteredNumber,
                      VATNumber: supplierData.VATNumber
                    };
                    
                    try {
                      // Remove JSON.stringify - axios will handle it automatically
                      const response = await axios.post(BASE_URL + URL, data, {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      });
                      return response.data;
                    } catch (error) {
                      throw error;
                    }
      };
  export const customerList = async (URL: string) => {
                    const token = Cookies.get("token");
                    
                    try {
                      // Use axios directly for logout to include Bearer token
                      const response = await axios.post(BASE_URL+URL, {}, {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      });
                      // Cookies.remove("token");   
                      return response.data;
                    } catch (error) {
                      // Cookies.remove("token");
                      // sessionStorage.clear();
                      throw error;
                    }
      };
  export const deletCustomer = async ( URL: string,id: string) => {
                    let data ={
                      id:id,    
                      // recaptchaToken
                    }
                        const { response, error } = await Service("POST", URL, JSON.stringify(data));
                        if (error) throw new Error("Invalid id");
                        return response;
      };
      export const editCustomer = async (URL: string, id: string, editData: any) => {
        const data = {
          OrganisationID: editData.OrganisationID,
          OrganisationName: editData.OrganisationName,
          ContactFirstName: editData.ContactFirstName,
          ContactLastName: editData.ContactLastName,
          ContactEmail: editData.ContactEmail,
          ContactPhone: editData.ContactPhone,
          EducationalEstablishment: editData.EducationalEstablishment,
          OrganisationStreetAddress: editData.OrganisationStreetAddress,
          OrganisationAddressLine2: editData.OrganisationAddressLine2,
          OrganisationCity: editData.OrganisationCity,
          OrganisationState: editData.OrganisationState,
          OrganisationPostalCode: editData.OrganisationPostalCode,
          OrganisationCountry: editData.OrganisationCountry,
          RegisteredOfficeSame: editData.RegisteredOfficeSame,
          RegisteredOfficeStreetAddress: editData.RegisteredOfficeStreetAddress,
          RegisteredOfficeAddressLine2: editData.RegisteredOfficeAddressLine2,
          RegisteredOfficeCity: editData.RegisteredOfficeCity,
          RegisteredOfficeState: editData.RegisteredOfficeState,
          RegisteredOfficePostalCode: editData.RegisteredOfficePostalCode,
          RegisteredOfficeCountry: editData.RegisteredOfficeCountry,
          CompanyRegisteredNumber: editData.CompanyRegisteredNumber,
          VATNumber: editData.VATNumber,
          // New fields added
          AccountsContactFirstName: editData.AccountsContactFirstName,
          AccountsContactLastName: editData.AccountsContactLastName,
          AccountsContactEmail: editData.AccountsContactEmail,
          AccountsContactPhone: editData.AccountsContactPhone,
          CreditLimitRequired: editData.CreditLimitRequired,
          NatureOfBusiness: editData.NatureOfBusiness,
          NumberOfStaff: editData.NumberOfStaff,
          AnnualTurnover: editData.AnnualTurnover,
          TradeRef1: editData.TradeRef1,
          TradeRef1Email: editData.TradeRef1Email,
          TradeRef1Phone: editData.TradeRef1Phone,
          TradeRef2: editData.TradeRef2,
          TradeRef2Email: editData.TradeRef2Email,
          TradeRef2Phone: editData.TradeRef2Phone,
          ProActiveSolutionsAccountManager: editData.ProActiveSolutionsAccountManager,
          ProActiveSolutionsAccountManagerEmail: editData.ProActiveSolutionsAccountManagerEmail
        };
      
        const { response, error } = await Service("POST", `${URL}/${id}`, data);
        if (error) throw new Error("Failed to update supplier");
        return response;
      };
  export const customerDetails = async ( URL: string,id: string) => {
                            let data ={
                              id:id,    
                              // recaptchaToken
                            }
                                const { response, error } = await Service("POST", URL, JSON.stringify(data));
                                if (error) throw new Error("Invalid id");
                                return response;
      };
      export const addCustomer = async (URL: string, supplierData: any) => {
        const token = Cookies.get("token");
        let data = {
          OrganisationID: supplierData.OrganisationID,
          OrganisationName: supplierData.OrganisationName,
          ContactFirstName: supplierData.ContactFirstName,
          ContactLastName: supplierData.ContactLastName,
          ContactEmail: supplierData.ContactEmail,
          ContactPhone: supplierData.ContactPhone,
          EducationalEstablishment: supplierData.EducationalEstablishment,
          OrganisationStreetAddress: supplierData.OrganisationStreetAddress,
          OrganisationAddressLine2: supplierData.OrganisationAddressLine2,
          OrganisationCity: supplierData.OrganisationCity,
          OrganisationState: supplierData.OrganisationState,
          OrganisationPostalCode: supplierData.OrganisationPostalCode,
          OrganisationCountry: supplierData.OrganisationCountry,
          RegisteredOfficeSame: supplierData.RegisteredOfficeSame,
          RegisteredOfficeStreetAddress: supplierData.RegisteredOfficeStreetAddress,
          RegisteredOfficeAddressLine2: supplierData.RegisteredOfficeAddressLine2,
          RegisteredOfficeCity: supplierData.RegisteredOfficeCity,
          RegisteredOfficeState: supplierData.RegisteredOfficeState,
          RegisteredOfficePostalCode: supplierData.RegisteredOfficePostalCode,
          RegisteredOfficeCountry: supplierData.RegisteredOfficeCountry,
          CompanyRegisteredNumber: supplierData.CompanyRegisteredNumber,
          VATNumber: supplierData.VATNumber,
          // New fields added
          AccountsContactFirstName: supplierData.AccountsContactFirstName,
          AccountsContactLastName: supplierData.AccountsContactLastName,
          AccountsContactEmail: supplierData.AccountsContactEmail,
          AccountsContactPhone: supplierData.AccountsContactPhone,
          CreditLimitRequired: supplierData.CreditLimitRequired,
          NatureOfBusiness: supplierData.NatureOfBusiness,
          NumberOfStaff: supplierData.NumberOfStaff,
          AnnualTurnover: supplierData.AnnualTurnover,
          TradeRef1: supplierData.TradeRef1,
          TradeRef1Email: supplierData.TradeRef1Email,
          TradeRef1Phone: supplierData.TradeRef1Phone,
          TradeRef2: supplierData.TradeRef2,
          TradeRef2Email: supplierData.TradeRef2Email,
          TradeRef2Phone: supplierData.TradeRef2Phone,
          ProActiveSolutionsAccountManager: supplierData.ProActiveSolutionsAccountManager,
          ProActiveSolutionsAccountManagerEmail: supplierData.ProActiveSolutionsAccountManagerEmail
        };
        
        try {
          const response = await axios.post(BASE_URL + URL, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };
      export const toggleCustomerStatus = async ( URL: string,id: string) => {
        let data ={
          id:id,    
          // recaptchaToken
        }
            const { response, error } = await Service("POST", URL, JSON.stringify(data));
            if (error) throw new Error("Invalid id");
            return response;
          };


  export const register = async ( URL: string,registerData:any) => {

    const { response, error } = await Service("POST", URL, JSON.stringify(registerData));
    if (error) return error;
    return response;
  };
  export const studentedit = async ( URL: string,registerData:any) => {

    const { response, error } = await Service("PUT", URL, JSON.stringify(registerData));
    if (error) return error;
    return response;
  };
  export const getOTPService = async ( URL: string,OTPData:any) => {

    const { response, error } = await Service("POST", URL, JSON.stringify(OTPData));
    if (error) throw new Error("Failed to send OTP");
    return response;
  };
  export const activateService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL, JSON.stringify(data));
    if (error) throw new Error("Failed");
    return response;
  };
  export const cmsEmailConfigService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL, JSON.stringify(data));
    if (error) throw new Error("Failed");
    return response;
  };
  export const getResendOTPService = async ( URL: string) => {

    const { response, error } = await Service("POST", URL);
    if (error) throw new Error("Failed to resend OTP");
    return response;
  };
 export const testApi = async ( URL: string,testdata:any) => {

    const { response, error } = await Service("POST", URL, JSON.stringify(testdata));
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getCountriesService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getStateService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getCityService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getClassesService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getgetcalculatemarkService = async ( URL: string) => {

    const { response, error } = await Service("POST", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
  const getAuthToken =()=>  Cookies.get("token");
export const getDownloadSampleService = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL+'/upload/download-sample-excel', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        // SessionId: sessionId, // Uncomment if needed
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    // Return as Blob for file download
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error downloading sample file:", error);
    throw error;
  }
};
export const getDownloadStudentService = async (URL: any) => {
  console.log(URL.URL, "URL"); 
  console.log(import.meta.env.VITE_API_BASE_URL,"56")

  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL+`/${URL.URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        // SessionId: sessionId, // Uncomment if needed
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    // Return as Blob for file download
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error downloading sample file:", error);
    throw error;
  }
};

 export const getStartExamService = async ( URL: string) => {

    const { response, error } = await Service("POST", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const addSubjectService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getQuestionTypeService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getAllSubjectService = async ( URL: string,data:any) => {

    const { response, error } = await Service("GET", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const addQuestionService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const updateQuestionService = async ( URL: string,data:any) => {

    const { response, error } = await Service("PUT", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getQuestionbyIdService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const uploadImageService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const deleteImageService = async ( URL: string) => {

    const { response, error } = await Service("DELETE", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const deleteColumnoptionService = async ( URL: string,data:any) => {

    const { response, error } = await Service("DELETE", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const deleteSubjectService = async ( URL: string) => {

    const { response, error } = await Service("DELETE", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const editSubjectService = async ( URL: string,data:any) => {

    const { response, error } = await Service("PUT", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getSubjectService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getExamByIdService = async ( URL: any) => {
  // console.log(URL,'malay')

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const finalSubmitService = async ( URL: any,data:any) => {
  // console.log(URL,'malay')

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };

 export const saveNextService = async ( URL: any,data:any) => {
  // console.log(URL,'malay')

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const deleteQuestionService = async ( URL: string) => {

    const { response, error } = await Service("DELETE", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const deleteExamService = async ( URL: string) => {

    const { response, error } = await Service("DELETE", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getquestionlistService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getExamListService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
   export const getThemeOptionService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const setbulkUploadStudentsService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
  export const setAssignExamScheduleService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const getExamScheduleService = async ( URL: string) => {

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
   export const deleteExamScheduleService = async ( URL: string) => {

    const { response, error } = await Service("DELETE", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const addExamScheduleService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
 export const createExamService = async ( URL: string,data:any) => {

    const { response, error} = await Service("POST", URL,data);

    if (error) throw new Error(error);
    return response;
  };
 export const updateExamService = async ( URL: string,data:any) => {

    const { response, error } = await Service("PUT", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };


// 1. Fetch all users
export const fetchUsers = async () => {
  const { response, error } = await Service("GET", "users");

  if (error) throw new Error("Failed to fetch users");

  return response;
};

// 2. Fetch single user by ID
export const fetchUserById = async (id: string) => {
  const { response, error } = await Service("GET", `users/${id}`);

  if (error) throw new Error("Failed to fetch user");

  return response;
};

// 3. Raw API call (returns everything: response, error, message)
export const fetchUsersRaw = async () => {
  return await Service("GET", "users");
  // Caller will manually check .response, .error, .message
};

// 4. Submit FormData (uploading a user photo for example)
export const uploadUserProfilePic = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  const { response, error } = await Service("POST", `users/${id}/upload-photo`, formData);

  if (error) throw new Error("Failed to upload profile picture");

  return response;
};

// 5. Create user (send JSON payload)
export const createUser = async (userData: { name: string; email: string; password: string }) => {
  const { response, error } = await Service("POST", "users", userData);

  if (error) throw new Error("Failed to create user");

  return response;
};
  export const setSaveNextExamService = async ( URL: string,examData:any) => {

    const { response, error } = await Service("POST", URL, examData);
    if (error) return error;
    return response;
  };
// 6. Update user (send JSON payload)
 export const getStudentdataService = async (URL: string, data: Record<string, any>) => {
  // Convert `data` to query string
  const queryParams = new URLSearchParams(data).toString();
  const fullUrl = `${URL}?${queryParams}`;

  const { response, error } = await Service("GET", fullUrl); // Don't pass `data` as body
  if (error) throw new Error("Failed to fetch student data");
  return response;
};


 export const fetchExamById = async (id: string) => {
  const { response, error } = await Service("GET", `${id}`);
  if (error) throw new Error("Failed to fetch user");
  return response;
};
 export const examAssign = async ( URL: string,data:any) => {
    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
   export const updateStudentProfileService = async ( URL: string,data:any) => {

    const { response, error } = await Service("POST", URL,data);
    if (error) throw new Error("Failed testApi");
    return response;
  };
  export const getStudentProfileService = async ( URL: any) => {
  // console.log(URL,'malay')

    const { response, error } = await Service("GET", URL);
    if (error) throw new Error("Failed testApi");
    return response;
  };