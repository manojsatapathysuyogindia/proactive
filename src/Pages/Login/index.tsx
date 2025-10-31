import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
// import { encrypt } from '../../utils/encryption/cryptoUtils';
// import { loginService } from '../../Api/AllServices/AuthServices';
import { useLogin} from "../../apihooks/useUsers";
import { errorToast, successToast } from "../../Components/ToastMessege";
import { useApiRoutes } from "../../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import { encrypt,decrypt } from '../../utils/encryption/cryptoUtils';

interface LoginFormState {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginFormState, string>>;

export default function Login() {
  const navigate = useNavigate();
  
  // 1. Initialize state for form inputs
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });
  // email: 'EMP001',
  //   password: 'Password123',
  console.log(formData, 'formDatamanoj');

  // 2. State for handling loading/submission status
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<any>('');
  const [formErrors, setFormErrors] = useState<LoginErrors>({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const { LOGIN } = useApiRoutes();
  const { mutateAsync: login, isPending } = useLogin();
  const sanitizeInput = (input: string): string => {
    // Remove HTML tags
    return input.replace(/<[^>]*>/g, '');
  };
  // const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      sendData(formData);
    }
  }, [formErrors]);
console.log(loginData,'loginData')
  // Send data to backend
  const sendData = async (value: LoginFormState) => {
    setIsLoading(true);
    
    try {
      const encryptedUsername = encrypt(value.email);
      const encryptedPassword = encrypt(value.password);
      const response = await login({
        URL: LOGIN,
        email: encryptedUsername,
        password: encryptedPassword, // Fixed: was 'passWord' in API but 'password' in state
        
      });

      if (response?.status === 1) {
        // alert(1)
        successToast(response.message || "Login successful");
        const loginSuccessData=JSON.parse(decrypt(response?.data));
        Cookies.set("token", loginSuccessData.token.toString());
        Cookies.set("employeeName", loginSuccessData.employee_name.toString());
        // Cookies.set("current_role_id", loginSuccessData.department_id);
        setLoginData(loginSuccessData)
        navigate("dashboard");
      } else {
        // alert(2)
        errorToast(response?.message || "Login failed");
      }
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      setIsSubmit(false);
    }
  };

  // Validate form
  const validate = (values: LoginFormState): LoginErrors => {
    const errors: LoginErrors = {};
    
    if (!values.email) {
      errors.email = 'Employee id is required';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };

  // 3. Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prevData => ({
      ...prevData,
      [name]: sanitizedValue,
    }));
  };

  // 4. Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  return (
    <section className="log-in-section section-b-space">
      <div className="w-100 container">
        <div className="row">
          <div className="me-auto col-lg-6 col-xl-5">
            <div className="box-wrapper">
              <div className="log-in-box" tabIndex={0}> 
                <div className="log-in-title">
                  <h3>Welcome To React Ecommerce</h3>
                  <h4>Log In Your Account</h4>
                </div>
                
                <div className="input-box">
                  <form className="row g-2" onSubmit={handleSubmit}>
                    
                    {/* Email Input */}
                    <div className="col-sm-12">
                      <div className="mb-3 form-floating">
                        <input
                          id="email"
                          placeholder="Email Address"
                          autoComplete="off" 
                          type="text"
                          className="form-control"
                          aria-invalid="false"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="email" className="form-label">
                          Employee Id
                        </label>
                        {formErrors.email && (
                          <div className="text-danger small mt-1">{formErrors.email}</div>
                        )}
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="col-sm-12">
                      <div className="mb-3 form-floating">
                        <input
                          id="password"
                          placeholder="Password"
                          autoComplete="off"
                          type="password"
                          className="form-control"
                          aria-invalid="false"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        {formErrors.password && (
                          <div className="text-danger small mt-1">{formErrors.password}</div>
                        )}
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="col-sm-12">
                      <div className="forgot-box">
                        <a className="forgot-password" href="/en/auth/forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        title="Login"
                        disabled={isLoading || isPending}
                        className="btn btn-animation w-100 justify-content-center btn btn-false"
                      >
                        <div className="d-flex align-items-center position-relative">
                          {isLoading || isPending ? 'Logging in...' : 'Login'}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}