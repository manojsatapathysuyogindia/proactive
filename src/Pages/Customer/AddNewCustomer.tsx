import React, { useState } from 'react';
import { useAddCustomer } from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";

// Define TypeScript interfaces for Customer
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
  CreditLimitRequired: string;
  NatureOfBusiness: string;
  NumberOfStaff: string;
  AnnualTurnover: string;
  TradeRef1: string;
  TradeRef1Email: string;
  TradeRef1Phone: string;
  TradeRef2: string;
  TradeRef2Email: string;
  TradeRef2Phone: string;
  ProActiveSolutionsAccountManager: string;
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

const AddNewCustomer: React.FC = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    RegisteredOfficeSame: 'N',
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
    CreditLimitRequired: '',
    NatureOfBusiness: '',
    NumberOfStaff: '',
    AnnualTurnover: '',
    TradeRef1: '',
    TradeRef1Email: '',
    TradeRef1Phone: '',
    TradeRef2: '',
    TradeRef2Email: '',
    TradeRef2Phone: '',
    ProActiveSolutionsAccountManager: '',
    ProActiveSolutionsAccountManagerEmail: ''
  });
console.log(formData,'formDatacreate+')
  const { ADDCUSTOMER } = useApiRoutes();
  const { mutateAsync: addcustomer } = useAddCustomer();

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

    // Accounts Contact Validation
    if (!formData.AccountsContactFirstName.trim()) {
      newErrors.AccountsContactFirstName = 'Accounts Contact First Name is required';
    }

    if (!formData.AccountsContactLastName.trim()) {
      newErrors.AccountsContactLastName = 'Accounts Contact Last Name is required';
    }

    if (!formData.AccountsContactEmail.trim()) {
      newErrors.AccountsContactEmail = 'Accounts Contact Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.AccountsContactEmail)) {
      newErrors.AccountsContactEmail = 'Please enter a valid email address';
    }

    if (!formData.AccountsContactPhone.trim()) {
      newErrors.AccountsContactPhone = 'Accounts Contact Phone is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.AccountsContactPhone)) {
      newErrors.AccountsContactPhone = 'Please enter a valid phone number';
    }

    // Business Information Validation
    if (!formData.CreditLimitRequired.trim()) {
      newErrors.CreditLimitRequired = 'Credit Limit is required';
    }

    if (!formData.NatureOfBusiness.trim()) {
      newErrors.NatureOfBusiness = 'Nature of Business is required';
    }

    if (!formData.NumberOfStaff.trim()) {
      newErrors.NumberOfStaff = 'Number of Staff is required';
    }

    if (!formData.AnnualTurnover.trim()) {
      newErrors.AnnualTurnover = 'Annual Turnover is required';
    }

    // Trade References Validation
    if (!formData.TradeRef1.trim()) {
      newErrors.TradeRef1 = 'Trade Reference 1 is required';
    }

    if (!formData.TradeRef1Email.trim()) {
      newErrors.TradeRef1Email = 'Trade Reference 1 Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.TradeRef1Email)) {
      newErrors.TradeRef1Email = 'Please enter a valid email address';
    }

    if (!formData.TradeRef1Phone.trim()) {
      newErrors.TradeRef1Phone = 'Trade Reference 1 Phone is required';
    }

    if (!formData.TradeRef2.trim()) {
      newErrors.TradeRef2 = 'Trade Reference 2 is required';
    }

    if (!formData.TradeRef2Email.trim()) {
      newErrors.TradeRef2Email = 'Trade Reference 2 Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.TradeRef2Email)) {
      newErrors.TradeRef2Email = 'Please enter a valid email address';
    }

    if (!formData.TradeRef2Phone.trim()) {
      newErrors.TradeRef2Phone = 'Trade Reference 2 Phone is required';
    }

    // Account Manager Validation
    if (!formData.ProActiveSolutionsAccountManager.trim()) {
      newErrors.ProActiveSolutionsAccountManager = 'Account Manager is required';
    }

    if (!formData.ProActiveSolutionsAccountManagerEmail.trim()) {
      newErrors.ProActiveSolutionsAccountManagerEmail = 'Account Manager Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ProActiveSolutionsAccountManagerEmail)) {
      newErrors.ProActiveSolutionsAccountManagerEmail = 'Please enter a valid email address';
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

  const sendData = async () => {
    if (!validateForm()) {
      errorToast("Please fix the validation errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await addcustomer({
        URL: ADDCUSTOMER,
        customerData: formData
      });

      if (response?.status === 1) {
        successToast(response.message || "Customer added successfully");
        // Reset form
        setFormData({
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
          CreditLimitRequired: '',
          NatureOfBusiness: '',
          NumberOfStaff: '',
          AnnualTurnover: '',
          TradeRef1: '',
          TradeRef1Email: '',
          TradeRef1Phone: '',
          TradeRef2: '',
          TradeRef2Email: '',
          TradeRef2Phone: '',
          ProActiveSolutionsAccountManager: '',
          ProActiveSolutionsAccountManagerEmail: ''
        });
        setErrors({});
        navigate("/customer-list");
      } else {
        errorToast(response?.message || "Failed to add customer");
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


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendData();
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
                    <h5>Add New Customer</h5>
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
                            placeholder="e.g., CUST001"
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
                            placeholder="e.g., Global Tech Pvt Ltd"
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
                          Company Registered Number
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className="form-control"
                            type="text"
                            name="CompanyRegisteredNumber"
                            value={formData.CompanyRegisteredNumber}
                            onChange={handleInputChange}
                            placeholder="e.g., CRN4567"
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
                            placeholder="e.g., GSTIN12345XYZ"
                          />
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
                            placeholder="e.g., Anita"
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
                            placeholder="e.g., Sharma"
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
                            placeholder="e.g., anita@globaltech.com"
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
                            placeholder="e.g., 9876543210"
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
                          First Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.AccountsContactFirstName ? 'is-invalid' : ''}`}
                            type="text"
                            name="AccountsContactFirstName"
                            value={formData.AccountsContactFirstName}
                            onChange={handleInputChange}
                            placeholder="e.g., Ravi"
                          />
                          {errors.AccountsContactFirstName && (
                            <div className="invalid-feedback d-block">
                              {errors.AccountsContactFirstName}
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
                            className={`form-control ${errors.AccountsContactLastName ? 'is-invalid' : ''}`}
                            type="text"
                            name="AccountsContactLastName"
                            value={formData.AccountsContactLastName}
                            onChange={handleInputChange}
                            placeholder="e.g., Kumar"
                          />
                          {errors.AccountsContactLastName && (
                            <div className="invalid-feedback d-block">
                              {errors.AccountsContactLastName}
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
                            className={`form-control ${errors.AccountsContactEmail ? 'is-invalid' : ''}`}
                            type="email"
                            name="AccountsContactEmail"
                            value={formData.AccountsContactEmail}
                            onChange={handleInputChange}
                            placeholder="e.g., accounts@globaltech.com"
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
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.AccountsContactPhone ? 'is-invalid' : ''}`}
                            type="tel"
                            name="AccountsContactPhone"
                            value={formData.AccountsContactPhone}
                            onChange={handleInputChange}
                            placeholder="e.g., 9876501234"
                          />
                          {errors.AccountsContactPhone && (
                            <div className="invalid-feedback d-block">
                              {errors.AccountsContactPhone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="card-header-1 mt-4">
                      <h5>Business Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Credit Limit Required <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.CreditLimitRequired ? 'is-invalid' : ''}`}
                            type="number"
                            name="CreditLimitRequired"
                            value={formData.CreditLimitRequired}
                            onChange={handleInputChange}
                            placeholder="e.g., 500000"
                          />
                          {errors.CreditLimitRequired && (
                            <div className="invalid-feedback d-block">
                              {errors.CreditLimitRequired}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Nature of Business <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.NatureOfBusiness ? 'is-invalid' : ''}`}
                            type="text"
                            name="NatureOfBusiness"
                            value={formData.NatureOfBusiness}
                            onChange={handleInputChange}
                            placeholder="e.g., IT Services"
                          />
                          {errors.NatureOfBusiness && (
                            <div className="invalid-feedback d-block">
                              {errors.NatureOfBusiness}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Number of Staff <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.NumberOfStaff ? 'is-invalid' : ''}`}
                            type="text"
                            name="NumberOfStaff"
                            value={formData.NumberOfStaff}
                            onChange={handleInputChange}
                            placeholder="e.g., 120"
                          />
                          {errors.NumberOfStaff && (
                            <div className="invalid-feedback d-block">
                              {errors.NumberOfStaff}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Annual Turnover <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.AnnualTurnover ? 'is-invalid' : ''}`}
                            type="number"
                            name="AnnualTurnover"
                            value={formData.AnnualTurnover}
                            onChange={handleInputChange}
                            placeholder="e.g., 20000000"
                          />
                          {errors.AnnualTurnover && (
                            <div className="invalid-feedback d-block">
                              {errors.AnnualTurnover}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Trade References */}
                    <div className="card-header-1 mt-4">
                      <h5>Trade References</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 1 <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef1 ? 'is-invalid' : ''}`}
                            type="text"
                            name="TradeRef1"
                            value={formData.TradeRef1}
                            onChange={handleInputChange}
                            placeholder="e.g., Tech Supplies Ltd"
                          />
                          {errors.TradeRef1 && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef1}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef1Email ? 'is-invalid' : ''}`}
                            type="email"
                            name="TradeRef1Email"
                            value={formData.TradeRef1Email}
                            onChange={handleInputChange}
                            placeholder="e.g., ref1@techsupplies.com"
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
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef1Phone ? 'is-invalid' : ''}`}
                            type="tel"
                            name="TradeRef1Phone"
                            value={formData.TradeRef1Phone}
                            onChange={handleInputChange}
                            placeholder="e.g., 9988776655"
                          />
                          {errors.TradeRef1Phone && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef1Phone}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Trade Reference 2 <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef2 ? 'is-invalid' : ''}`}
                            type="text"
                            name="TradeRef2"
                            value={formData.TradeRef2}
                            onChange={handleInputChange}
                            placeholder="e.g., Office Mart"
                          />
                          {errors.TradeRef2 && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef2}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef2Email ? 'is-invalid' : ''}`}
                            type="email"
                            name="TradeRef2Email"
                            value={formData.TradeRef2Email}
                            onChange={handleInputChange}
                            placeholder="e.g., ref2@officemart.com"
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
                          Phone <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.TradeRef2Phone ? 'is-invalid' : ''}`}
                            type="tel"
                            name="TradeRef2Phone"
                            value={formData.TradeRef2Phone}
                            onChange={handleInputChange}
                            placeholder="e.g., 8877665544"
                          />
                          {errors.TradeRef2Phone && (
                            <div className="invalid-feedback d-block">
                              {errors.TradeRef2Phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Account Manager Information */}
                    <div className="card-header-1 mt-4">
                      <h5>Account Manager Information</h5>
                    </div>

                    <div className="row">
                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Account Manager <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ProActiveSolutionsAccountManager ? 'is-invalid' : ''}`}
                            type="text"
                            name="ProActiveSolutionsAccountManager"
                            value={formData.ProActiveSolutionsAccountManager}
                            onChange={handleInputChange}
                            placeholder="e.g., 1"
                          />
                          {errors.ProActiveSolutionsAccountManager && (
                            <div className="invalid-feedback d-block">
                              {errors.ProActiveSolutionsAccountManager}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row align-items-center">
                        <label className="form-label-title col-lg-3 col-md-3 mb-0">
                          Account Manager Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-9 col-lg-9">
                          <input 
                            className={`form-control ${errors.ProActiveSolutionsAccountManagerEmail ? 'is-invalid' : ''}`}
                            type="email"
                            name="ProActiveSolutionsAccountManagerEmail"
                            value={formData.ProActiveSolutionsAccountManagerEmail}
                            onChange={handleInputChange}
                            placeholder="e.g., manager@proactive.com"
                          />
                          {errors.ProActiveSolutionsAccountManagerEmail && (
                            <div className="invalid-feedback d-block">
                              {errors.ProActiveSolutionsAccountManagerEmail}
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
                            placeholder="e.g., Plot 12, InfoCity"
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
                            placeholder="e.g., Phase 2"
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
                            placeholder="e.g., Bhubaneswar"
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
                            placeholder="e.g., Odisha"
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
                            placeholder="e.g., 751024"
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
                            placeholder="e.g., India"
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
                                placeholder="e.g., Plot 12, InfoCity"
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
                                placeholder="e.g., Phase 2"
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
                                placeholder="e.g., Bhubaneswar"
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
                                placeholder="e.g., Odisha"
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
                                placeholder="e.g., 751024"
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
                                placeholder="e.g., India"
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

                    <div className="row mt-4">
                      <div className="col-md-12 text-end">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Adding Customer...' : 'Add Customer'}
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
    </div>
  );
};

export default AddNewCustomer;