import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from "../../apihooks/useUsers";
import { errorToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import Loader from '../../Components/Loader';
// Define TypeScript interfaces
interface Permission {
  name: string;
  allow: boolean;
}

interface UserDetails {
  employee_id: string;
  employee_first_name: string;
  employee_middle_name: string;
  employee_last_name: string;
  department_name: string;
  email: string;
  phone: string;
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

const EditUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ Properly type userDetails
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  
  // ✅ Initialize with empty values
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
  setActiveTab('account')
  const navigate = useNavigate();
  const { USERDETAILS } = useApiRoutes();
  const { mutateAsync: userdetails } = useUserDetails();
  const { id } = useParams<{ id: string }>();

  console.log(id, 'id from link');

  // ✅ Update formData when userDetails is loaded
  useEffect(() => {
    if (userDetails) {
      setFormData(prev => ({
        ...prev,
        employeeId: userDetails.employee_id,
        firstName: userDetails.employee_first_name,
        middleName: userDetails.employee_middle_name,
        lastName: userDetails.employee_last_name,
        userType: userDetails.department_name,
        email: userDetails.email,
        phone: userDetails.phone,
      }));
    }
  }, [userDetails]);

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [id]);

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await userdetails({
        URL: USERDETAILS,
        id: id
      });

      if (response?.status === 1) {
        setIsLoading(false);
        setUserDetails(response.data);
      } else {
        setIsLoading(false);
        errorToast(response?.message || "Failed to fetch user details");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    console.log('Form submitted:', formData);
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
                    <h5>Edit User</h5>
                  </div>
                  
                  {/* Tabs */}
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {/* <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                        type="button"
                      >
                        Account
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'permission' ? 'active' : ''}`}
                        onClick={() => setActiveTab('permission')}
                        type="button"
                      >
                        Permission
                      </button>
                    </li> */}
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    {/* Account Tab */}
                    {activeTab === 'account' && (
                      <div className="tab-pane fade show active" role="tabpanel">
                        <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit}>
                          <div className="card-header-1">
                            <h5>User Information</h5>
                          </div>

                          <div className="row">
                            <div className="mb-4 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Employee Id
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className="form-control" 
                                  type="text"
                                  name="employeeId"
                                  value={formData.employeeId}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-4 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                First Name
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className="form-control" 
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-4 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Middle Name
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className="form-control" 
                                  type="text"
                                  name="middleName"
                                  value={formData.middleName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-4 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                Last Name
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className="form-control" 
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-4 row align-items-center">
                              <label className="form-label-title col-lg-2 col-md-3 mb-0">
                                User Type
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <select 
                                  className="js-example-basic-single w-100" 
                                  name="userType"
                                  value={formData.userType}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select User Type</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Sales">Sales</option>
                                  <option value="Account">Account</option>
                                </select>
                              </div>
                            </div>
                           
                            <div className="mb-4 row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Email Address
                              </label>
                              <div className="col-md-9 col-lg-10">
                                <input 
                                  className="form-control" 
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-4 row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Password
                              </label>
                              <div className="col-md-9 col-lg-10">
                              <div className="row align-items-center">
                              <div className="col-md-7 col-lg-8">
                                <input 
                                  className="form-control" 
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleInputChange}
                                  placeholder="Leave blank to keep current password"
                                />
                                    </div>
                                   
                                <div className='col-lg-4 col-md-5'>
                                <button type="button" className="btn btn-primary" onClick={()=> navigate("/change-user-password")}>
                                  Change Password
                                </button>
                                </div>
                              </div>
                            </div>
                            </div>
                            <div className="row align-items-center">
                              <label className="col-lg-2 col-md-3 col-form-label form-label-title">
                                Phone
                              </label>
                              <div className="col-md-9 col-lg-10">
                         
                                <input 
                                  className="form-control" 
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  required
                                />
                                {/* </div>
                                
                                </div> */}
                              </div>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-12">
                                {/* <button type="submit" className="btn btn-primary">
                                  Update User
                                </button> */}
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
      {isLoading?<Loader />:null}
    </div>
  );
};

export default EditUser;