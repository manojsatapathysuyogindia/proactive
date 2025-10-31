import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
// import Sidebar from '../../Components/Sidebar';
// import './AdminUsers.css'; // You'll need to create corresponding CSS
import { useAllUser} from "../../apihooks/useUsers";
import { useApiRoutes } from "../../constants/apiRoutes";
// import { useNavigate } from "react-router-dom";
import Loader from '../../Components/Loader';
// Define TypeScript interfaces


const Alluser: React.FC = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  // const navigate = useNavigate();
  const { ALLUSER } = useApiRoutes();
  const { mutateAsync: alluser} = useAllUser();
  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    handleGetAllUser()
  }, []);
  const handleGetAllUser=async()=>{
    setIsLoading(true);
    try {
       const allUser=await alluser({
        URL: ALLUSER,
      });
      if(allUser.status==1){
        setIsLoading(false);
        // setIsLogoutModalOpen(false)
        // navigate("/");
        setAllUserData(allUser?.data)
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Logout failed:", error);
      // Still redirect even if API fails
      // navigate("/login");
    }
    //  const logoutUser=logout({
    //   URL: LOGOUT,
    // });
    // if(logoutUser.status){}
  
    
  }
  console.log(allUserData,'allUserData from api')



  const handleDelete = () => {}

  return (
   
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-body">
                    <div className="title-header option-title">
                      <h5>All Users</h5>
                      <form className="d-inline-flex">
                        <Link to="/add-new-user" className="align-items-center btn btn-theme d-flex">
                          <i data-feather="plus"></i>Add New
                        </Link>
                      </form>
                    </div>

                    <div className="table-responsive table-product">
                      <table className="table all-package theme-table" id="table_id">
                        <thead>
                          <tr>
                            
                            <th>Name</th>
                            <th>Department Name</th>
                            <th>Employee Id</th>
                            <th>Email</th>
                            <th>Option</th>
                          </tr>
                        </thead>

                        <tbody>
                          {allUserData?.map((user:any) => (
                            <tr key={user.id}>
                              {/* <td>
                                <div className="table-image">
                                  <img src={user.avatar} className="img-fluid" alt={user.name} />
                                </div>
                              </td> */}
                              <td>
                                <div className="user-name">
                                  <span>{user.employee_first_name} {' '} {user.employee_middle_name} {' '} {user.employee_last_name}</span>
                                  {/* <span>{user.address}</span> */}
                                </div>
                              </td>

                              <td>
                                <div className="user-name">
                                  <span>{user.department_name}</span>
                                  {/* <span>{user.address}</span> */}
                                </div>
                              </td>

                              <td>{user.employee_id}</td>

                              <td>{user.email?user.email:'-'}</td>

                              <td>
                                <ul>
                                  {/* <li>
                                    <a href="order-detail.html">
                                      <i className="ri-eye-line"></i>
                                    </a>
                                  </li> */}

                                  <li>
                                    <Link to={`/edit-user/${user.id}`}>
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </li>

                                  <li>
                                    <a href="javascript:void(0)" onClick={handleDelete}>
                                      <i className="ri-delete-bin-line"></i>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isLoading?<Loader />:null}
          </div>

          
  );
};

export default Alluser;