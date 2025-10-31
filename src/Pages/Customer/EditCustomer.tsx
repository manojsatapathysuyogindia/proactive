import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditCustomer, useCustomerDetails } from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import Loader from '../../Components/Loader';

// Define TypeScript interfaces for Customer
interface CustomerDetails {
  OrganisationID: string;
  OrganisationName: string;
  ContactFirstName: string;
  ContactLastName: string;
  ContactEmail: string;
  ContactPhone: string;
  OrganisationStreetAddress: string;
  OrganisationAddressLine2: string;
  OrganisationCity: string;
  OrganisationState: string;
  OrganisationPostalCode: string;
  OrganisationCountry: string;
  EducationalEstablishment: string;
  RegisteredOfficeSame: string;
  RegisteredOfficeStreetAddress: string;
  RegisteredOfficeAddressLine2: string;
  RegisteredOfficeCity: string;
  RegisteredOfficeState: string;
  RegisteredOfficePostalCode: string;
  RegisteredOfficeCountry: string;
  CompanyRegisteredNumber: string;
  VATNumber: string;
  AccountsContactFirstName: string;
  AccountsContactLastName: string;
  AccountsContactEmail: string;
  AccountsContactPhone: string;
  CreditLimitRequired: number;
  NatureOfBusiness: string;
  NumberOfStaff: string;
  AnnualTurnover: number;
  TradeRef1: string;
  TradeRef1Email: string;
  TradeRef1Phone: string;
  TradeRef2: string;
  TradeRef2Email: string;
  TradeRef2Phone: string;
  ProActiveSolutionsAccountManager: number;
  ProActiveSolutionsAccountManagerEmail: string;
}

interface CustomerFormData {
  OrganisationID: string;
  OrganisationName: string;
  ContactFirstName: string;
  ContactLastName: string;
  ContactEmail: string;
  ContactPhone: string;
  OrganisationStreetAddress: string;
  OrganisationAddressLine2: string;
  OrganisationCity: string;
  OrganisationState: string;
  OrganisationPostalCode: string;
  OrganisationCountry: string;
  EducationalEstablishment: string;
  RegisteredOfficeSame: string;
  RegisteredOfficeStreetAddress: string;
  RegisteredOfficeAddressLine2: string;
  RegisteredOfficeCity: string;
  RegisteredOfficeState: string;
  RegisteredOfficePostalCode: string;
  RegisteredOfficeCountry: string;
  CompanyRegisteredNumber: string;
  VATNumber: string;
  AccountsContactFirstName: string;
  AccountsContactLastName: string;
  AccountsContactEmail: string;
  AccountsContactPhone: string;
  CreditLimitRequired: number;
  NatureOfBusiness: string;
  NumberOfStaff: string;
  AnnualTurnover: number;
  TradeRef1: string;
  TradeRef1Email: string;
  TradeRef1Phone: string;
  TradeRef2: string;
  TradeRef2Email: string;
  TradeRef2Phone: string;
  ProActiveSolutionsAccountManager: number;
  ProActiveSolutionsAccountManagerEmail: string;
}

interface FormErrors {
  OrganisationID?: string;
  OrganisationName?: string;
  ContactFirstName?: string;
  ContactLastName?: string;
  ContactEmail?: string;
  ContactPhone?: string;
  OrganisationStreetAddress?: string;
  OrganisationCity?: string;
  OrganisationState?: string;
  OrganisationPostalCode?: string;
  OrganisationCountry?: string;
  RegisteredOfficeStreetAddress?: string;
  RegisteredOfficeCity?: string;
  RegisteredOfficeState?: string;
  RegisteredOfficePostalCode?: string;
  RegisteredOfficeCountry?: string;
  CompanyRegisteredNumber?: string;
  VATNumber?: string;
  AccountsContactFirstName?: string;
  AccountsContactLastName?: string;
  AccountsContactEmail?: string;
  AccountsContactPhone?: string;
  CreditLimitRequired?: string;
  NatureOfBusiness?: string;
  NumberOfStaff?: string;
  AnnualTurnover?: string;
  TradeRef1?: string;
  TradeRef1Email?: string;
  TradeRef1Phone?: string;
  TradeRef2?: string;
  TradeRef2Email?: string;
  TradeRef2Phone?: string;
  ProActiveSolutionsAccountManager?: string;
  ProActiveSolutionsAccountManagerEmail?: string;
}

const EditCustomer: React.FC = () => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CustomerFormData>({
    OrganisationID: '',
    OrganisationName: '',
    ContactFirstName: '',
    ContactLastName: '',
    ContactEmail: '',
    ContactPhone: '',
    OrganisationStreetAddress: '',
    OrganisationAddressLine2: '',
    OrganisationCity: '',
    OrganisationState: '',
    OrganisationPostalCode: '',
    OrganisationCountry: '',
    EducationalEstablishment: 'N',
    RegisteredOfficeSame: 'Y',
    RegisteredOfficeStreetAddress: '',
    RegisteredOfficeAddressLine2: '',
    RegisteredOfficeCity: '',
    RegisteredOfficeState: '',
    RegisteredOfficePostalCode: '',
    RegisteredOfficeCountry: '',
    CompanyRegisteredNumber: '',
    VATNumber: '',
    AccountsContactFirstName: '',
    AccountsContactLastName: '',
    AccountsContactEmail: '',
    AccountsContactPhone: '',
    CreditLimitRequired: 0,
    NatureOfBusiness: '',
    NumberOfStaff: '',
    AnnualTurnover: 0,
    TradeRef1: '',
    TradeRef1Email: '',
    TradeRef1Phone: '',
    TradeRef2: '',
    TradeRef2Email: '',
    TradeRef2Phone: '',
    ProActiveSolutionsAccountManager: 0,
    ProActiveSolutionsAccountManagerEmail: ''
  });

  const navigate = useNavigate();
  const { CUSTOMERDETAILS, EDITCUSTOMER } = useApiRoutes();
  const { mutateAsync: editcustomer } = useEditCustomer();
  const { mutateAsync: customerdetails } = useCustomerDetails();
  const { id } = useParams<{ id: string }>();

  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>/g, '');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
  
    // Organisation Information Validation
    if (!formData.OrganisationID.trim()) {
      newErrors.OrganisationID = 'Organisation ID is required';
    }
  
    if (!formData.OrganisationName.trim()) {
      newErrors.OrganisationName = 'Organisation Name is required';
    }
  
    // Contact Information Validation
    if (!formData.ContactFirstName.trim()) {
      newErrors.ContactFirstName = 'First Name is required';
    }
  
    if (!formData.ContactLastName.trim()) {
      newErrors.ContactLastName = 'Last Name is required';
    }
  
    if (!formData.ContactEmail.trim()) {
      newErrors.ContactEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ContactEmail)) {
      newErrors.ContactEmail = 'Please enter a valid email address';
    }
  
    if (!formData.ContactPhone.trim()) {
      newErrors.ContactPhone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.ContactPhone)) {
      newErrors.ContactPhone = 'Please enter a valid phone number';
    }
  
    // Accounts Contact Information Validation
    if (formData.AccountsContactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.AccountsContactEmail)) {
      newErrors.AccountsContactEmail = 'Please enter a valid email address';
    }
  
    if (formData.AccountsContactPhone && !/^[0-9+\-\s()]{10,}$/.test(formData.AccountsContactPhone)) {
      newErrors.AccountsContactPhone = 'Please enter a valid phone number';
    }
  
    // Trade Reference Validation
    if (formData.TradeRef1Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.TradeRef1Email)) {
      newErrors.TradeRef1Email = 'Please enter a valid email address';
    }
  
    if (formData.TradeRef2Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.TradeRef2Email)) {
      newErrors.TradeRef2Email = 'Please enter a valid email address';
    }
  
    // Organisation Address Validation
    if (!formData.OrganisationStreetAddress.trim()) {
      newErrors.OrganisationStreetAddress = 'Street Address is required';
    }
  
    if (!formData.OrganisationCity.trim()) {
      newErrors.OrganisationCity = 'City is required';
    }
  
    if (!formData.OrganisationState.trim()) {
      newErrors.OrganisationState = 'State is required';
    }
  
    if (!formData.OrganisationPostalCode.trim()) {
      newErrors.OrganisationPostalCode = 'Postal Code is required';
    }
  
    if (!formData.OrganisationCountry.trim()) {
      newErrors.OrganisationCountry = 'Country is required';
    }
  
    // Registered Office Address Validation (only if different from organisation address)
    if (formData.RegisteredOfficeSame === 'N') {
      if (!formData.RegisteredOfficeStreetAddress.trim()) {
        newErrors.RegisteredOfficeStreetAddress = 'Registered Office Street Address is required';
      }
  
      if (!formData.RegisteredOfficeCity.trim()) {
        newErrors.RegisteredOfficeCity = 'Registered Office City is required';
      }
  
      if (!formData.RegisteredOfficeState.trim()) {
        newErrors.RegisteredOfficeState = 'Registered Office State is required';
      }
  
      if (!formData.RegisteredOfficePostalCode.trim()) {
        newErrors.RegisteredOfficePostalCode = 'Registered Office Postal Code is required';
      }
  
      if (!formData.RegisteredOfficeCountry.trim()) {
        newErrors.RegisteredOfficeCountry = 'Registered Office Country is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update formData when customerDetails is loaded
  useEffect(() => {
    if (customerDetails) {
      setFormData({
        OrganisationID: customerDetails.OrganisationID || '',
        OrganisationName: customerDetails.OrganisationName || '',
        ContactFirstName: customerDetails.ContactFirstName || '',
        ContactLastName: customerDetails.ContactLastName || '',
        ContactEmail: customerDetails.ContactEmail || '',
        ContactPhone: customerDetails.ContactPhone || '',
        OrganisationStreetAddress: customerDetails.OrganisationStreetAddress || '',
        OrganisationAddressLine2: customerDetails.OrganisationAddressLine2 || '',
        OrganisationCity: customerDetails.OrganisationCity || '',
        OrganisationState: customerDetails.OrganisationState || '',
        OrganisationPostalCode: customerDetails.OrganisationPostalCode || '',
        OrganisationCountry: customerDetails.OrganisationCountry || '',
        EducationalEstablishment: customerDetails.EducationalEstablishment || 'N',
        RegisteredOfficeSame: customerDetails.RegisteredOfficeSame || 'Y',
        RegisteredOfficeStreetAddress: customerDetails.RegisteredOfficeStreetAddress || '',
        RegisteredOfficeAddressLine2: customerDetails.RegisteredOfficeAddressLine2 || '',
        RegisteredOfficeCity: customerDetails.RegisteredOfficeCity || '',
        RegisteredOfficeState: customerDetails.RegisteredOfficeState || '',
        RegisteredOfficePostalCode: customerDetails.RegisteredOfficePostalCode || '',
        RegisteredOfficeCountry: customerDetails.RegisteredOfficeCountry || '',
        CompanyRegisteredNumber: customerDetails.CompanyRegisteredNumber || '',
        VATNumber: customerDetails.VATNumber || '',
        AccountsContactFirstName: customerDetails.AccountsContactFirstName || '',
        AccountsContactLastName: customerDetails.AccountsContactLastName || '',
        AccountsContactEmail: customerDetails.AccountsContactEmail || '',
        AccountsContactPhone: customerDetails.AccountsContactPhone || '',
        CreditLimitRequired: customerDetails.CreditLimitRequired || 0,
        NatureOfBusiness: customerDetails.NatureOfBusiness || '',
        NumberOfStaff: customerDetails.NumberOfStaff || '',
        AnnualTurnover: customerDetails.AnnualTurnover || 0,
        TradeRef1: customerDetails.TradeRef1 || '',
        TradeRef1Email: customerDetails.TradeRef1Email || '',
        TradeRef1Phone: customerDetails.TradeRef1Phone || '',
        TradeRef2: customerDetails.TradeRef2 || '',
        TradeRef2Email: customerDetails.TradeRef2Email || '',
        TradeRef2Phone: customerDetails.TradeRef2Phone || '',
        ProActiveSolutionsAccountManager: customerDetails.ProActiveSolutionsAccountManager || 0,
        ProActiveSolutionsAccountManagerEmail: customerDetails.ProActiveSolutionsAccountManagerEmail || ''
      });
    }
  }, [customerDetails]);

  useEffect(() => {
    if (id) {
      getCustomerDetails();
    }
  }, [id]);

  const getCustomerDetails = async () => {
    setIsLoading(true);
    try {
      const response = await customerdetails({
        URL: CUSTOMERDETAILS,
        id: id
      });

      if (response?.status === 1) {
        setCustomerDetails(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        errorToast(response?.message || "Failed to fetch customer details");
      }
    } catch (error: any) {
      setIsLoading(false);
      errorToast(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let sanitizedValue: string | number = value;
    
    if (type === 'text' || type === 'email' || type === 'tel' || type === 'textarea') {
      sanitizedValue = sanitizeInput(value);
    } else if (type === 'number') {
      sanitizedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // If RegisteredOfficeSame is set to 'Y', copy organisation address to registered office address
    if (name === 'RegisteredOfficeSame' && value === 'Y') {
      setFormData(prev => ({
        ...prev,
        RegisteredOfficeStreetAddress: prev.OrganisationStreetAddress,
        RegisteredOfficeAddressLine2: prev.OrganisationAddressLine2,
        RegisteredOfficeCity: prev.OrganisationCity,
        RegisteredOfficeState: prev.OrganisationState,
        RegisteredOfficePostalCode: prev.OrganisationPostalCode,
        RegisteredOfficeCountry: prev.OrganisationCountry,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      errorToast("Please fix the validation errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await editcustomer({
        URL: EDITCUSTOMER,
        id: id,
        editData: formData
      });

      if (response?.status === 1) {
        successToast(response?.message || "Customer updated successfully");
        navigate('/customer-list');
      } else {
        errorToast(response?.message || "Failed to update customer");
      }
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-10 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="title-header option-title">
                    <h5>Edit Customer</h5>
                  </div>

                  <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit}>
                    {/* Organisation Information */}
                    <div className="card-header-1">
                      <h5>Organisation Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Organisation ID <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationID ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationID"
                            value={formData.OrganisationID}
                            onChange={handleInputChange}
                            
                          />
                          {errors.OrganisationID && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationID}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Organisation Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationName ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationName"
                            value={formData.OrganisationName}
                            onChange={handleInputChange}
                           
                          />
                          {errors.OrganisationName && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Educational Establishment
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <select 
                            className="form-control" 
                            name="EducationalEstablishment"
                            value={formData.EducationalEstablishment}
                            onChange={handleInputChange}
                          >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Company Registered Number
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="CompanyRegisteredNumber"
                            value={formData.CompanyRegisteredNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          VAT Number
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="VATNumber"
                            value={formData.VATNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Nature of Business
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="NatureOfBusiness"
                            value={formData.NatureOfBusiness}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Number of Staff
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="NumberOfStaff"
                            value={formData.NumberOfStaff}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Annual Turnover
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="number"
                            name="AnnualTurnover"
                            value={formData.AnnualTurnover}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Credit Limit Required
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="number"
                            name="CreditLimitRequired"
                            value={formData.CreditLimitRequired}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="card-header-1 mt-4">
                      <h5>Contact Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ContactFirstName ? 'is-invalid' : ''}`}
                            type="text"
                            name="ContactFirstName"
                            value={formData.ContactFirstName}
                            onChange={handleInputChange}
                           
                          />
                          {errors.ContactFirstName && (
                            <div className="invalid-feedback d-block">
                              {errors.ContactFirstName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ContactLastName ? 'is-invalid' : ''}`}
                            type="text"
                            name="ContactLastName"
                            value={formData.ContactLastName}
                            onChange={handleInputChange}
                           
                          />
                          {errors.ContactLastName && (
                            <div className="invalid-feedback d-block">
                              {errors.ContactLastName}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ContactEmail ? 'is-invalid' : ''}`}
                            type="email"
                            name="ContactEmail"
                            value={formData.ContactEmail}
                            onChange={handleInputChange}
                            
                          />
                          {errors.ContactEmail && (
                            <div className="invalid-feedback d-block">
                              {errors.ContactEmail}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ContactPhone ? 'is-invalid' : ''}`}
                            type="tel"
                            name="ContactPhone"
                            value={formData.ContactPhone}
                            onChange={handleInputChange}
                            
                          />
                          {errors.ContactPhone && (
                            <div className="invalid-feedback d-block">
                              {errors.ContactPhone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Accounts Contact Information */}
                    <div className="card-header-1 mt-4">
                      <h5>Accounts Contact Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Accounts First Name
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="AccountsContactFirstName"
                            value={formData.AccountsContactFirstName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Accounts Last Name
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="AccountsContactLastName"
                            value={formData.AccountsContactLastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Accounts Email
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.AccountsContactEmail ? 'is-invalid' : ''}`}
                            type="email"
                            name="AccountsContactEmail"
                            value={formData.AccountsContactEmail}
                            onChange={handleInputChange}
                          />
                          {errors.AccountsContactEmail && (
                            <div className="invalid-feedback d-block">
                              {errors.AccountsContactEmail}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Accounts Phone
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.AccountsContactPhone ? 'is-invalid' : ''}`}
                            type="tel"
                            name="AccountsContactPhone"
                            value={formData.AccountsContactPhone}
                            onChange={handleInputChange}
                          />
                          {errors.AccountsContactPhone && (
                            <div className="invalid-feedback d-block">
                              {errors.AccountsContactPhone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Organisation Address */}
                    <div className="card-header-1 mt-4">
                      <h5>Organisation Address</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Street Address <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationStreetAddress ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationStreetAddress"
                            value={formData.OrganisationStreetAddress}
                            onChange={handleInputChange}
                          />
                          {errors.OrganisationStreetAddress && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationStreetAddress}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Address Line 2
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="OrganisationAddressLine2"
                            value={formData.OrganisationAddressLine2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          City <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationCity ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationCity"
                            value={formData.OrganisationCity}
                            onChange={handleInputChange}
                          />
                          {errors.OrganisationCity && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationCity}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          State <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationState ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationState"
                            value={formData.OrganisationState}
                            onChange={handleInputChange}
                          />
                          {errors.OrganisationState && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationState}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Postal Code <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationPostalCode ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationPostalCode"
                            value={formData.OrganisationPostalCode}
                            onChange={handleInputChange}
                          />
                          {errors.OrganisationPostalCode && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationPostalCode}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Country <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.OrganisationCountry ? 'is-invalid' : ''}`}
                            type="text"
                            name="OrganisationCountry"
                            value={formData.OrganisationCountry}
                            onChange={handleInputChange}
                          />
                          {errors.OrganisationCountry && (
                            <div className="invalid-feedback d-block">
                              {errors.OrganisationCountry}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Registered Office Address */}
                    <div className="card-header-1 mt-4">
                      <h5>Registered Office Address</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Same as Organisation Address
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <select 
                            className="form-control" 
                            name="RegisteredOfficeSame"
                            value={formData.RegisteredOfficeSame}
                            onChange={handleInputChange}
                          >
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                          </select>
                        </div>
                      </div>

                      {formData.RegisteredOfficeSame === 'N' && (
                        <>
                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              Street Address <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className={`form-control ${errors.RegisteredOfficeStreetAddress ? 'is-invalid' : ''}`}
                                type="text"
                                name="RegisteredOfficeStreetAddress"
                                value={formData.RegisteredOfficeStreetAddress}
                                onChange={handleInputChange}
                              />
                              {errors.RegisteredOfficeStreetAddress && (
                                <div className="invalid-feedback d-block">
                                  {errors.RegisteredOfficeStreetAddress}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              Address Line 2
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className="form-control"
                                type="text"
                                name="RegisteredOfficeAddressLine2"
                                value={formData.RegisteredOfficeAddressLine2}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              City <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className={`form-control ${errors.RegisteredOfficeCity ? 'is-invalid' : ''}`}
                                type="text"
                                name="RegisteredOfficeCity"
                                value={formData.RegisteredOfficeCity}
                                onChange={handleInputChange}
                              />
                              {errors.RegisteredOfficeCity && (
                                <div className="invalid-feedback d-block">
                                  {errors.RegisteredOfficeCity}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              State <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className={`form-control ${errors.RegisteredOfficeState ? 'is-invalid' : ''}`}
                                type="text"
                                name="RegisteredOfficeState"
                                value={formData.RegisteredOfficeState}
                                onChange={handleInputChange}
                              />
                              {errors.RegisteredOfficeState && (
                                <div className="invalid-feedback d-block">
                                  {errors.RegisteredOfficeState}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              Postal Code <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className={`form-control ${errors.RegisteredOfficePostalCode ? 'is-invalid' : ''}`}
                                type="text"
                                name="RegisteredOfficePostalCode"
                                value={formData.RegisteredOfficePostalCode}
                                onChange={handleInputChange}
                              />
                              {errors.RegisteredOfficePostalCode && (
                                <div className="invalid-feedback d-block">
                                  {errors.RegisteredOfficePostalCode}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3 row align-items-center">
                            <label className="form-label-title col-lg-3 col-md-3 mb-0">
                              Country <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-9 col-lg-9">
                              <input 
                                className={`form-control ${errors.RegisteredOfficeCountry ? 'is-invalid' : ''}`}
                                type="text"
                                name="RegisteredOfficeCountry"
                                value={formData.RegisteredOfficeCountry}
                                onChange={handleInputChange}
                              />
                              {errors.RegisteredOfficeCountry && (
                                <div className="invalid-feedback d-block">
                                  {errors.RegisteredOfficeCountry}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Trade References */}
                    <div className="card-header-1 mt-4">
                      <h5>Trade References</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 1
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="TradeRef1"
                            value={formData.TradeRef1}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 1 Email
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef1Email ? 'is-invalid' : ''}`}
                            type="email"
                            name="TradeRef1Email"
                            value={formData.TradeRef1Email}
                            onChange={handleInputChange}
                          />
                          {errors.TradeRef1Email && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef1Email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 1 Phone
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="tel"
                            name="TradeRef1Phone"
                            value={formData.TradeRef1Phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 2
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="TradeRef2"
                            value={formData.TradeRef2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 2 Email
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef2Email ? 'is-invalid' : ''}`}
                            type="email"
                            name="TradeRef2Email"
                            value={formData.TradeRef2Email}
                            onChange={handleInputChange}
                          />
                          {errors.TradeRef2Email && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef2Email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 2 Phone
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="tel"
                            name="TradeRef2Phone"
                            value={formData.TradeRef2Phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ProActive Solutions Information */}
                    <div className="card-header-1 mt-4">
                      <h5>ProActive Solutions Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Account Manager ID
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="number"
                            name="ProActiveSolutionsAccountManager"
                            value={formData.ProActiveSolutionsAccountManager}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Account Manager Email
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="email"
                            name="ProActiveSolutionsAccountManagerEmail"
                            value={formData.ProActiveSolutionsAccountManagerEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-12 text-end">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Updating Customer...' : 'Update Customer'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading?<Loader />:null}
    </div>
  );
};

export default EditCustomer;