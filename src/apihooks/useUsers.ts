import { useQuery ,useMutation} from "@tanstack/react-query";


import { loginUser,logOutUser, fetchUserById,register,testApi, getCountriesService, getClassesService, addSubjectService, getAllSubjectService, deleteSubjectService, editSubjectService, getSubjectService, getQuestionTypeService, addQuestionService, getquestionlistService, deleteQuestionService, createExamService, getExamListService,getThemeOptionService, deleteExamService, getExamByIdService, updateExamService, getQuestionbyIdService,getStateService, getCityService, updateQuestionService, uploadImageService ,deleteImageService,getOTPService,getResendOTPService, deleteColumnoptionService, getExamScheduleService, addExamScheduleService, deleteExamScheduleService, getStudentdataService, fetchExamById, examAssign, setAssignExamScheduleService, finalSubmitService, setSaveNextExamService, getStartExamService, setbulkUploadStudentsService, saveNextService,updateStudentProfileService, getStudentProfileService, getgetcalculatemarkService, activateService, cmsEmailConfigService, studentedit, allUser, userDetails, addUser, changeUserPassword, addProduct, supplierList, editSupplier, supplierDetails, addSupplier, customerList, editCustomer, customerDetails, addCustomer, deletCustomer, deleteSupplier, masterDropdown, toggleSupplierStatus, toggleCustomerStatus} from "../api/userApi";

export const useLogin = () => {
    return useMutation({
      mutationFn: ({ URL,email, password}: {URL:string, email: string; password: string}) =>
        loginUser(URL,email, password)
    });
  };
  export const useLogout = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => logOutUser(URL),
    });
  };
  export const useAllUser = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => allUser(URL),
    });
  };
  export const useUserDetails = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        userDetails(URL,id,),
    });
  };
  export const useAddUser = () => {
    return useMutation({
      mutationFn: ({ URL,userData }: {URL:string, userData:any }) =>
        addUser(URL,userData),
    });
  };
  export const useChangeUserPassword = () => {
    return useMutation({
      mutationFn: ({ URL,password }: {URL:string, password:any }) =>
        changeUserPassword(URL,password),
    });
  };
  export const useAllProduct = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => allUser(URL),
    });
  };
  export const useMasterDropdown = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => masterDropdown(URL),
    });
  };
  export const useAddProduct = () => {
    return useMutation({
      mutationFn: ({ URL,productData }: {URL:string, productData:any }) =>
        addProduct(URL,productData),
    });
  };
  export const useSupplierList = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => supplierList(URL),
    });
  };
  export const useDeleteSupplier = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        deleteSupplier(URL,id,),
    });
  };
  export const useToggleSupplierStatus = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        toggleSupplierStatus(URL,id,),
    });
  };
  export const useEditSupplier = () => {
    return useMutation({
      mutationFn: ({ URL,id,editData }: {URL:string,id:any, editData: any; }) =>
        editSupplier(URL,id,editData,),
    });
  };
  export const useSupplierDetails = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        supplierDetails(URL,id,),
    });
  };
  export const useAddSupplier = () => {
    return useMutation({
      mutationFn: ({ URL,supplierData }: {URL:string, supplierData:any }) =>
        addSupplier(URL,supplierData),
    });
  };
  export const useCustomerList = () => {
    return useMutation({
      mutationFn: ({ URL }: { URL: string }) => customerList(URL),
    });
  };
  export const useDeleteCustomer = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        deletCustomer(URL,id,),
    });
  };
  export const useEditCustomer = () => {
    return useMutation({
      mutationFn: ({ URL,id,editData }: {URL:string,id:any, editData: any; }) =>
        editCustomer(URL,id,editData,),
    });
  };
  export const useCustomerDetails = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        customerDetails(URL,id,),
    });
  };
  export const useAddCustomer = () => {
    return useMutation({
      mutationFn: ({ URL,customerData }: {URL:string, customerData:any }) =>
        addCustomer(URL,customerData),
    });
  };
  export const useToggleCustomerStatus = () => {
    return useMutation({
      mutationFn: ({ URL,id }: {URL:string, id: any; }) =>
        toggleCustomerStatus(URL,id,),
    });
  };

export const useRegister = () => {
    return useMutation({
      mutationFn: ({ URL,registerData }: {URL:string, registerData:any }) =>
        register(URL,registerData),
    });
  };
export const usestudentEdit = () => {
    return useMutation({
      mutationFn: ({ URL,registerData }: {URL:string, registerData:any }) =>
        studentedit(URL,registerData),
    });
  };
export const getActivate = () => {
    return useMutation({
      mutationFn: ({ URL,data }: {URL:string, data:any }) =>
        activateService(URL,data),
    });
  };
export const cmsEmailConfig = () => {
    return useMutation({
      mutationFn: ({ URL,data }: {URL:string, data:any }) =>
        cmsEmailConfigService(URL,data),
    });
  };
  export const useOTP = () => {
    return useMutation({
      mutationFn: ({ URL,OTPDATA }: {URL:string,OTPDATA:any}) =>
        getOTPService(URL,OTPDATA),
    });
  };
  export const useResendOTP = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getResendOTPService(URL),
    });
  };
export const useTest = () => {
    return useMutation({
      mutationFn: ({ URL,testdata }: {URL:string, testdata:any }) =>
        testApi(URL,testdata),
    });
  };
export const getCountries = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getCountriesService(URL),
    });
  };
export const getState = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getStateService(URL),
    });
  };
export const getCity = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getCityService(URL),
    });
  };
export const getClasses = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getClassesService(URL),
    });
  };
export const getcalculatemark = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getgetcalculatemarkService(URL),
    });
  };
// export const getdownloadsample = () => {
//     return useMutation({
//       mutationFn: ({ URL }: {URL:string}) =>
//         getdownloadsampleService(URL),
//     });
//   };
export const getStartExam = () => {
    return useMutation({
      mutationFn: ({ URL }: {URL:string}) =>
        getStartExamService(URL),
    });
  };
  //  subjectName: "string",
  //       subjectCode: "string",
  //       subjectDesc: "string",
  //       status: true,
  //       classId: 0,
export const addSubject = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        addSubjectService(URL,data),
    });
  };
export const ExamByIdService = () => {
    return useMutation({
      mutationFn: ( URL:any) =>
        getExamByIdService(URL),
    });
  };
export const SaveNextExam = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        setSaveNextExamService(URL,data),
    });
  };
export const FinalSubmit = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        finalSubmitService(URL,data),
    });
  };
export const saveNext = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        saveNextService(URL,data),
    });
  };
export const getQuestionType = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
       getQuestionTypeService(URL),
    });
  };
export const getquestionlist = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
       getquestionlistService(URL),
    });
  };
export const createexam = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
       createExamService(URL,data),
    });
  };
export const updateExam = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
       updateExamService(URL,data),
    });
  };
export const allSubjects = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        getAllSubjectService(URL,data),
    });
  };
export const addQuestion = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        addQuestionService(URL,data),
    });
  };
export const updateQuestion = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        updateQuestionService(URL,data),
    });
  };
export const getQuestionbyId = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getQuestionbyIdService(URL),
    });
  };
export const uploadImage = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        uploadImageService(URL,data),
    });
  };
export const deleteImage = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        deleteImageService(URL),
    });
  };
export const deleteColumnoption = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        deleteColumnoptionService(URL,data),
    });
  };
export const deleteSubject = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        deleteSubjectService(URL),
    });
  };
export const deleteQuestion = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        deleteQuestionService(URL),
    });
  };
export const deleteExam = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        deleteExamService(URL),
    });
  };
export const getExamList = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getExamListService(URL),
    });
  };
export const bulkUploadStudents = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        setbulkUploadStudentsService(URL,data),
    });
  };
  export const setAssignExamSchedule = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        setAssignExamScheduleService(URL,data),
    });
  };
export const getExamSchedule = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getExamScheduleService(URL),
    });
  };
  export const DeleteExamSchedule = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        deleteExamScheduleService(URL),
    });
  };
export const AddExamSchedule = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        addExamScheduleService(URL,data),
    });
  };
export const editSubject = () => {
    return useMutation({
      mutationFn: ({ URL,data}:any) =>
        editSubjectService(URL,data),
    });
  };
export const getSubject = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getSubjectService(URL),
    });
  };
export const getExamById = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getExamByIdService(URL),
    });
  };

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};
export const getStudentById = () => {
  return useMutation({
    mutationFn: ({ URL, data }: { URL: string; data: Record<string, any> }) =>
      getStudentdataService(URL, data),
  });
};

 export const useGetExamDataById = () => {
  return useMutation({
    mutationFn: ({ URL }: { URL: string }) => fetchExamById(URL),
  });
};
export const assignExamination = () => {
  return useMutation({
    mutationFn: ({ URL,data }:any) => examAssign(URL,data),
  });
};
export const updateStudentProfile = () => {
  return useMutation({
    mutationFn: ({URL,data}:any) => updateStudentProfileService(URL,data),
  });
};
export const getStudentProfile = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getStudentProfileService(URL),
    });
  };
  export const useThemeOptionMutation = () => {
    return useMutation({
      mutationFn: ({ URL}:any) =>
        getThemeOptionService(URL),
    });
  };