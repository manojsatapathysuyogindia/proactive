import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useChangeUserPassword } from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";

const ChangeUserPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { CHANGEUSERPASSWORD } = useApiRoutes();
  const { mutateAsync: changeuserpassword } = useChangeUserPassword();
  const sanitizeInput = (input: string): string => {
    // Remove HTML tags
    return input.replace(/<[^>]*>/g, '');
  };
  const sendData = async () => {
    // setIsLoading(true);
    
    try {
      // const encryptedUsername = encrypt(value.email);
      // const encryptedPassword = encrypt(value.password);
      const response = await changeuserpassword({
        URL: CHANGEUSERPASSWORD,
        password:formData
      });

      if (response?.status === 1) {
        // alert(1)
        successToast(response.message || "changeed successfully");
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        // const loginSuccessData=JSON.parse(decrypt(response?.data));
        // Cookies.set("token", loginSuccessData.token.toString());
        // Cookies.set("current_role_id", loginSuccessData.department_id);
        // setLoginData(loginSuccessData)
        navigate("alluser");
      } else {
        // alert(2)
        errorToast(response?.message || null);
        setLoading(false)
      }
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again."
      );
      setLoading(false)
    } 
    // finally {
    //   setIsLoading(false);
    //   setIsSubmit(false);
    // }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match');
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    sendData()
 
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header py-3 mb-0">
              <h4 className="card-title text-center mb-0 text-dark">Change Password</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                    ></button>
                  </div>
                )}

                {message && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {message}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setMessage('')}
                    ></button>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label text-dark">
                    Current Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="form-control"
                    required
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label text-dark">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="form-control"
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  {/* <div className="form-text">
                    Password must be at least 6 characters long.
                  </div> */}
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label text-dark">
                    Confirm New Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your new password"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Changing Password...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChangeUserPassword;