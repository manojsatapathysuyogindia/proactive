import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditSupplier, useSupplierDetails } from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import Loader from '../../Components/Loader';

// Define TypeScript interfaces for Supplier
interface SupplierDetails {
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
  RegisteredOfficeSame: string;
  RegisteredOfficeStreetAddress: string;
  RegisteredOfficeAddressLine2: string;
  RegisteredOfficeCity: string;
  RegisteredOfficeState: string;
  RegisteredOfficePostalCode: string;
  RegisteredOfficeCountry: string;
  CompanyRegisteredNumber: string;
  VATNumber: string;
}

interface SupplierFormData {
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
  RegisteredOfficeSame: string;
  RegisteredOfficeStreetAddress: string;
  RegisteredOfficeAddressLine2: string;
  RegisteredOfficeCity: string;
  RegisteredOfficeState: string;
  RegisteredOfficePostalCode: string;
  RegisteredOfficeCountry: string;
  CompanyRegisteredNumber: string;
  VATNumber: string;
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
}

const EditSupplier: React.FC = () => {
  // const [activeTab, setActiveTab] = useState('account');
  const [supplierDetails, setSupplierDetails] = useState<SupplierDetails | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<SupplierFormData>({
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
    RegisteredOfficeSame: 'N',
    RegisteredOfficeStreetAddress: '',
    RegisteredOfficeAddressLine2: '',
    RegisteredOfficeCity: '',
    RegisteredOfficeState: '',
    RegisteredOfficePostalCode: '',
    RegisteredOfficeCountry: '',
    CompanyRegisteredNumber: '',
    VATNumber: ''
  });

  const navigate = useNavigate();
  const { SUPPLIERDETAILS, EDITSUPPLIER } = useApiRoutes();
  const { mutateAsync: editsupplier } = useEditSupplier();
  const { mutateAsync: supplierdetails } = useSupplierDetails();
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

    // Registered Office Address Validation (if different from organisation address)
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

  // Update formData when supplierDetails is loaded
  useEffect(() => {
    if (supplierDetails) {
      setFormData({
        OrganisationID: supplierDetails.OrganisationID || '',
        OrganisationName: supplierDetails.OrganisationName || '',
        ContactFirstName: supplierDetails.ContactFirstName || '',
        ContactLastName: supplierDetails.ContactLastName || '',
        ContactEmail: supplierDetails.ContactEmail || '',
        ContactPhone: supplierDetails.ContactPhone || '',
        OrganisationStreetAddress: supplierDetails.OrganisationStreetAddress || '',
        OrganisationAddressLine2: supplierDetails.OrganisationAddressLine2 || '',
        OrganisationCity: supplierDetails.OrganisationCity || '',
        OrganisationState: supplierDetails.OrganisationState || '',
        OrganisationPostalCode: supplierDetails.OrganisationPostalCode || '',
        OrganisationCountry: supplierDetails.OrganisationCountry || '',
        RegisteredOfficeSame: supplierDetails.RegisteredOfficeSame || 'N',
        RegisteredOfficeStreetAddress: supplierDetails.RegisteredOfficeStreetAddress || '',
        RegisteredOfficeAddressLine2: supplierDetails.RegisteredOfficeAddressLine2 || '',
        RegisteredOfficeCity: supplierDetails.RegisteredOfficeCity || '',
        RegisteredOfficeState: supplierDetails.RegisteredOfficeState || '',
        RegisteredOfficePostalCode: supplierDetails.RegisteredOfficePostalCode || '',
        RegisteredOfficeCountry: supplierDetails.RegisteredOfficeCountry || '',
        CompanyRegisteredNumber: supplierDetails.CompanyRegisteredNumber || '',
        VATNumber: supplierDetails.VATNumber || ''
      });
    }
  }, [supplierDetails]);

  useEffect(() => {
    if (id) {
      getSupplierDetails();
    }
  }, [id]);

  const getSupplierDetails = async () => {
    setIsLoading(true);
    try {
      const response = await supplierdetails({
        URL: SUPPLIERDETAILS,
        id: id
      });

      if (response?.status === 1) {
        setSupplierDetails(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        errorToast(response?.message || "Failed to fetch supplier details");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      errorToast("Please fix the validation errors before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await editsupplier({
        URL: EDITSUPPLIER,
        id: id,
        editData: formData
      });

      if (response?.status === 1) {
        successToast(response?.message || "Supplier updated successfully");
        navigate('/supplier-list');
      } else {
        errorToast(response?.message || "Failed to update supplier");
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
                    <h5>Edit Supplier</h5>
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

                    <div className="row mt-4">
                      <div className="col-md-12 text-end">
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Updating Supplier...' : 'Update Supplier'}
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

export default EditSupplier;