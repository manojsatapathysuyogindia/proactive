import React, { useState } from 'react';
import { useAddUser } from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";

// Define TypeScript interfaces
interface Permission {
  name: string;
  allow: boolean;
}

interface UserFormData {
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userType: string;
  email: string;
  password: string;
  phone: string;
  permissions: Permission[];
}

interface FormErrors {
  employeeId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userType?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const AddNewUser: React.FC = () => {
  const navigate = useNavigate();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  setActiveTab('account')
  const [formData, setFormData] = useState<UserFormData>({
    employeeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    userType: '',
    email: '',
    password: '',
    phone: '',
    permissions: [
      { name: 'addProduct', allow: true },
      { name: 'updateProduct', allow: false },
      { name: 'deleteProduct', allow: true },
      { name: 'applyDiscount', allow: false },
      { name: 'addCategory', allow: true },
      { name: 'updateCategory', allow: false },
      { name: 'deleteCategory', allow: false },
      { name: 'applyCategoryDiscount', allow: true },
    ]
  });

  const { ADDUSER } = useApiRoutes();
  const { mutateAsync: adduser } = useAddUser();

  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>/g, '');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Employee ID Validation
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    // Name Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First Name must be at least 2 characters long';
    }

    if (!formData.middleName.trim()) {
      newErrors.middleName = 'Middle Name is required';
    } else if (formData.middleName.length < 2) {
      newErrors.middleName = 'Middle Name must be at least 2 characters long';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last Name must be at least 2 characters long';
    }

    // User Type Validation
    if (!formData.userType.trim()) {
      newErrors.userType = 'User Type is required';
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Phone Validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
      const response = await adduser({
        URL: ADDUSER,
        userData: formData
      });

      if (response?.status === 1) {
        successToast(response.message || "User added successfully");
        // Reset form
        setFormData({
          employeeId: '',
          firstName: '',
          middleName: '',
          lastName: '',
          userType: '',
          email: '',
          password: '',
          phone: '',
          permissions: [
            { name: 'addProduct', allow: true },
            { name: 'updateProduct', allow: false },
            { name: 'deleteProduct', allow: true },
            { name: 'applyDiscount', allow: false },
            { name: 'addCategory', allow: true },
            { name: 'updateCategory', allow: false },
            { name: 'deleteCategory', allow: false },
            { name: 'applyCategoryDiscount', allow: true },
          ]
        });
        setErrors({});
        navigate("alluser");
      } else {
        errorToast(response?.message || "Failed to add user");
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

  // Sample notifications data


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  };

  const handlePermissionChange = (index: number, allow: boolean) => {
    const updatedPermissions = [...formData.permissions];
    updatedPermissions[index].allow = allow;
    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions
    }));
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
            <div className="col-sm-8 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="title-header option-title">
                    <h5>Add New User</h5>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    {/* Account Tab */}
                    {activeTab === 'account' && (
                      <div className="tab-pane fade show active" role="tabpanel">
                        <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit}>
                          <div className="card-header-1">
                            <h5>User Information</h5>
                          </div>

                          <div className="row">
                            <div className="mb-3 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Employee Id <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                                  type="text"
                                  name="employeeId"
                                  value={formData.employeeId}
                                  onChange={handleInputChange}
                                  
                                  placeholder="Enter Employee ID"
                                />
                                {errors.employeeId && (
                                  <div className="invalid-feedback d-block">
                                    {errors.employeeId}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                First Name <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                 
                                  placeholder="Enter First Name"
                                />
                                {errors.firstName && (
                                  <div className="invalid-feedback d-block">
                                    {errors.firstName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Middle Name <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.middleName ? 'is-invalid' : ''}`}
                                  type="text"
                                  name="middleName"
                                  value={formData.middleName}
                                  onChange={handleInputChange}
                                  
                                  placeholder="Enter Middle Name"
                                />
                                {errors.middleName && (
                                  <div className="invalid-feedback d-block">
                                    {errors.middleName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                 
                                  placeholder="Enter Last Name"
                                />
                                {errors.lastName && (
                                  <div className="invalid-feedback d-block">
                                    {errors.lastName}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                User Type <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <select 
                                  className={`js-example-basic-single w-100 ${errors.userType ? 'is-invalid' : ''}`}
                                  name="userType"
                                  value={formData.userType}
                                  onChange={handleInputChange}
                                >
                                  <option value="" disabled>Select User Type</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Sales">Sales</option>
                                  <option value="Account">Account</option>
                                </select>
                                {errors.userType && (
                                  <div className="invalid-feedback d-block">
                                    {errors.userType}
                                  </div>
                                )}
                              </div>
                            </div>
                           
                            <div className="mb-3 row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Email Address <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                 
                                  placeholder="Enter Email Address"
                                />
                                {errors.email && (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                  
                                  placeholder="Enter Password"
                                />
                                {errors.password && (
                                  <div className="invalid-feedback d-block">
                                    {errors.password}
                                  </div>
                                )}
                                {/* <small className="text-muted">
                                  Password must be at least 6 characters long and contain uppercase, lowercase letters and numbers
                                </small> */}
                              </div>
                            </div>

                            <div className="mb-3 row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Phone <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                
                                  placeholder="Enter Phone Number"
                                />
                                {errors.phone && (
                                  <div className="invalid-feedback d-block">
                                    {errors.phone}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-12">
                                <button 
                                  type="submit" 
                                  className="btn btn-primary"
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Adding User...' : 'Add User'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Permission Tab */}
                    {activeTab === 'permission' && (
                      <div className="tab-pane fade show active" role="tabpanel">
                        <div className="card-header-1">
                          <h5>Product Related Permission</h5>
                        </div>
                        
                        {/* Product Permissions */}
                        {formData.permissions.slice(0, 4).map((permission, index) => (
                          <div key={index} className="mb-4 row align-items-center">
                            <label className="col-md-2 mb-0">
                              {permission.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <div className="col-md-9">
                              <div className="radio-section">
                                <label>
                                  <input 
                                    type="radio" 
                                    name={`opinion-${index}`}
                                    checked={permission.allow}
                                    onChange={() => handlePermissionChange(index, true)}
                                  />
                                  <i></i>
                                  <span>Allow</span>
                                </label>

                                <label>
                                  <input 
                                    type="radio" 
                                    name={`opinion-${index}`}
                                    checked={!permission.allow}
                                    onChange={() => handlePermissionChange(index, false)}
                                  />
                                  <i></i>
                                  <span>Deny</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="card-header-1 mt-4">
                          <h5>Category Related Permission</h5>
                        </div>
                        
                        {/* Category Permissions */}
                        {formData.permissions.slice(4).map((permission, index) => (
                          <div key={index + 4} className="mb-4 row align-items-center">
                            <label className="col-md-2 mb-0">
                              {permission.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <div className="col-md-9">
                              <div className="radio-section">
                                <label>
                                  <input 
                                    type="radio" 
                                    name={`opinion-${index + 4}`}
                                    checked={permission.allow}
                                    onChange={() => handlePermissionChange(index + 4, true)}
                                  />
                                  <i></i>
                                  <span>Allow</span>
                                </label>

                                <label>
                                  <input 
                                    type="radio" 
                                    name={`opinion-${index + 4}`}
                                    checked={!permission.allow}
                                    onChange={() => handlePermissionChange(index + 4, false)}
                                  />
                                  <i></i>
                                  <span>Deny</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;