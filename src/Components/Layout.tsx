import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';
import { useLogout} from "../apihooks/useUsers";
// import { errorToast, successToast } from "../Components/ToastMessege";
import { useApiRoutes } from "../constants/apiRoutes";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import userProfileImg from "../assets/images/users/4.jpg";

declare global {
  interface Window {
    jQuery: any;
    $: any;
    feather: any;
  }
}

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const [scriptsLoaded, setScriptsLoaded] = useState(false);
//   const location = useLocation();

//   useEffect(() => {

//     if (window.jQuery && window.feather) {
//       setScriptsLoaded(true);
//       return;
//     }

    // Set a timeout to set scripts as loaded (fallback)
//     const timeout = setTimeout(() => {
//       setScriptsLoaded(true);
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, []);

  // Re-initialize when route changes
//   useEffect(() => {
//     if (scriptsLoaded && window.jQuery) {
//       setTimeout(() => {
//         if (window.jQuery?.fn?.DataTable) {
//           try {
//             window.jQuery('.dataTable').DataTable()?.draw();
//           } catch (error) {
//             console.log('DataTable init skipped:', error);
//           }
//         }
        
//         if (window.feather?.replace) {
//           try {
//             window.feather.replace();
//           } catch (error) {
//             console.log('Feather replace skipped:', error);
//           }
//         }
//       }, 100);
//     }
//   }, [location.pathname, scriptsLoaded]);

//   if (!scriptsLoaded) {
//     return (
//       <>
     
//         <div className="loading-container">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p>Loading Admin Dashboard...</p>
//         </div>
//       </>
//     );
//   }
const userName = Cookies.get("employeeName");
const navigate = useNavigate();
const { LOGOUT } = useApiRoutes();
  const { mutateAsync: logout} = useLogout();
const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const toggleSearch = () => {
  setIsSearchOpen(!isSearchOpen);
};
// setIsDarkMode(false)
// const toggleDarkMode = () => {
//   setIsDarkMode(!isDarkMode);
// };
const handleDelete=async()=>{
  try {
     const logoutUser=await logout({
      URL: LOGOUT,
    });
    if(logoutUser.status==1){
      setIsLogoutModalOpen(false)
      navigate("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    // Still redirect even if API fails
    // navigate("/login");
  }
  //  const logoutUser=logout({
  //   URL: LOGOUT,
  // });
  // if(logoutUser.status){}

  
}
// const notifications: Notification[] = [
//   {
//     type: "primary",
//     message: "Delivery processing",
//     time: "10 min."
//   },
//   {
//     type: "success",
//     message: "Order Complete",
//     time: "1 hr"
//   },
//   {
//     type: "info",
//     message: "Tickets Generated",
//     time: "3 hr"
//   },
//   {
//     type: "danger",
//     message: "Delivery Complete",
//     time: "6 hr"
//   }
// ];
  return (
    <>
        {/* <Helmet>
         
          <script src="../../src/assets/js/jquery-3.6.0.min.js"></script>
          <script src="../../src/assets/js/bootstrap/bootstrap.bundle.min.js"></script>
          <script src="../../src/assets/js/icons/feather-icon/feather.min.js"></script>
          <script src="../../src/assets/js/icons/feather-icon/feather-icon.js"></script>
          <script src="../../src/assets/js/scrollbar/simplebar.js"></script>
          <script src="../../src/assets/js/scrollbar/custom.js"></script>
          <script src="../../src/assets/js/customizer.js"></script>
          <script src="../../src/assets/js/config.js"></script>
          <script src="../../src/assets/js/sidebar-menu.js"></script>
          <script src="../../src/assets/js/sidebareffect.js"></script>
          <script src="../../src/assets/js/notify/bootstrap-notify.min.js"></script>
          <script src="../../src/assets/js/notify/index.js"></script>
          <script src="../../src/assets/js/jquery.dataTables.js"></script>
          <script src="../../src/assets/js/custom-data-table.js"></script>
          <script src="../../src/assets/js/checkbox-all-check.js"></script>
          <script src="../../src/assets/js/script.js"></script>
        </Helmet> */}
        {/* <div className={`page-wrapper compact-wrapper ${isDarkMode ? 'dark-mode' : ''}`} id="pageWrapper"></div> */}
       <div className={`page-wrapper compact-wrapper`} id="pageWrapper">
      {/* Tap to top button */}
      <div className="tap-top">
        <span className="lnr lnr-chevron-up"></span>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <div className="header-wrapper m-0">
          <div className="header-logo-wrapper p-0">
            <div className="logo-wrapper">
              <a href="index.html">
                <img className="img-fluid main-logo" src="assets/images/logo/1.png" alt="logo" />
                <img className="img-fluid white-logo" src="assets/images/logo/1-white.png" alt="logo" />
              </a>
            </div>
            <div className="toggle-sidebar" onClick={toggleSidebar}>
              <i className="status_toggle middle sidebar-toggle" data-feather="align-center"></i>
              <a href="index.html">
                <img src="assets/images/logo/1.png" className="img-fluid" alt="" />
              </a>
            </div>
          </div>

          {/* Search Form */}
          <form className={`form-inline search-full ${isSearchOpen ? 'active' : ''}`} action="javascript:void(0)" method="get">
            <div className="form-group w-100">
              <div className="Typeahead Typeahead--twitterUsers">
                <div className="u-posRelative">
                  <input 
                    className="demo-input Typeahead-input form-control-plaintext w-100" 
                    type="text"
                    placeholder="Search .." 
                    name="q" 
                    title="" 
                    autoFocus 
                  />
                  <i className="close-search" data-feather="x" onClick={toggleSearch}></i>
                  <div className="spinner-border Typeahead-spinner" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                <div className="Typeahead-menu"></div>
              </div>
            </div>
          </form>

          {/* Right Header Navigation */}
          <div className="nav-right col-6 pull-right right-header p-0">
            <ul className="nav-menus">
              <li>
                <span className="header-search" onClick={toggleSearch}>
                  <i className="ri-search-line"></i>
                </span>
              </li>
              
              <li className="onhover-dropdown">
                <div className="notification-box">
                  <i className="ri-notification-line"></i>
                  <span className="badge rounded-pill badge-theme">4</span>
                </div>
                <ul className="notification-dropdown onhover-show-div">
                  <li>
                    <i className="ri-notification-line"></i>
                    <h6 className="f-18 mb-0">Notifications</h6>
                  </li>
                  {/* {notifications.map((notification, index) => (
                    <li key={index}>
                      <p>
                        <i className={`fa fa-circle me-2 font-${notification.type}`}></i>
                        {notification.message} <span className="pull-right">{notification.time}</span>
                      </p>
                    </li>
                  ))} */}
                  <li>
                    <a className="btn btn-primary" href="javascript:void(0)">Check all notification</a>
                  </li>
                </ul>
              </li>

              {/* <li>
                <div className="mode" onClick={toggleDarkMode}>
                  <i className="ri-moon-line"></i>
                </div>
              </li> */}

              <li className="profile-nav onhover-dropdown pe-0 me-0">
                <div className="media profile-media">
                   <img className="user-profile rounded-circle" src={userProfileImg} alt="" />
                  <div className="user-name-hide media-body">
                    <span>{userName}</span>
                    <p className="mb-0 font-roboto">Admin<i className="middle ri-arrow-down-s-line"></i></p>
                  </div>
                </div>
                <ul className="profile-dropdown onhover-show-div">
                  {/* <li>
                    <a href="all-users.html">
                      <i data-feather="users"></i>
                      <span>Users</span>
                    </a>
                  </li>
                  <li>
                    <a href="order-list.html">
                      <i data-feather="archive"></i>
                      <span>Orders</span>
                    </a>
                  </li>
                  <li>
                    <a href="support-ticket.html">
                      <i data-feather="phone"></i>
                      <span>Support Tickets</span>
                    </a>
                  </li>
                  <li>
                    <a href="profile-setting.html">
                      <i data-feather="settings"></i>
                      <span>Settings</span>
                    </a>
                  </li> */}
                  <li>
                    <a data-bs-toggle="modal" data-bs-target="#staticBackdrop" href="javascript:void(0)" onClick={()=>setIsLogoutModalOpen(true)}>
                      <i data-feather="log-out"></i>
                      <span>Log out</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className="page-body-wrapper">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      {/* <div className="page-wrapper compact-wrapper" id="pageWrapper"> */}
      <div className="page-body">
        <Outlet />
      {/* </div> */}
      <div className="container-fluid">
            <footer className="footer">
              <div className="row">
                <div className="col-md-12 footer-copyright text-center">
                  <p className="mb-0">Copyright 2025 © react ecommerce</p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
     <div className="modal" id="" style={{display:`${isLogoutModalOpen?'block':'none'}`}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="modal-title">Logging Out</h5>
              <p>Are you sure you want to log out?</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setIsLogoutModalOpen(false)}></button>
              <div className="button-box">
                <button type="button" className="btn btn--no"  onClick={()=>setIsLogoutModalOpen(false)}>No</button>
                <button type="button" className="btn btn--yes btn-primary" onClick={handleDelete}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade theme-modal remove-coupon" id="exampleModalToggle" aria-hidden="true" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-block text-center">
              <h5 className="modal-title w-100">Are You Sure ?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="remove-box">
                <p>The permission for the use/group, preview is inherited from the object, object will create a new permission for this object</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Yes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Success Modal */}
      <div className="modal fade theme-modal remove-coupon" id="exampleModalToggle2" aria-hidden="true" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Done!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="remove-box text-center">
                <div className="wrapper">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h4 className="text-content">It's Removed.</h4>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Layout;