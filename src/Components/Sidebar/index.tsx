import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>('Dashboard');

  // Menu configuration
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'ri-home-line',
      path: 'dashboard',
      type: 'link'
    },
    {
      title: 'User',
      icon: 'ri-user-3-line',
      type: 'submenu',
      children: [
        { title: 'All users', path: '/alluser' },
        { title: 'Add new user', path: '/add-New-User' }
      ]
    },
    {
      title: 'Products',
      icon: 'ri-store-3-line',
      type: 'submenu',
      children: [
        { title: 'All Products', path: '/products' },
        { title: 'Add Product', path: '/add-product' }
      ]
    },
    {
      title: 'Supplier',
      icon: 'ri-store-3-line',
      type: 'submenu',
      children: [
        { title: 'Supplier List', path: '/supplier-list' },
        { title: 'Add Supplier', path: '/add-supplier' }
      ]
    },
    // {
    //   title: 'Settings',
    //   icon: 'ri-settings-line',
    //   path: '/settings',
    //   type: 'link'
    // }
  ];

  // Find active menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check direct links
    const directLink = menuItems.find(item => 
      item.type === 'link' && item.path === currentPath
    );
    if (directLink) {
      setActiveMenu(directLink.title);
      return;
    }
    
    // Check submenu items
    const parentMenu = menuItems.find(item => 
      item.type === 'submenu' && 
      item.children?.some(child => child.path === currentPath)
    );
    if (parentMenu) {
      setActiveMenu(parentMenu.title);
      return;
    }
    
    // setActiveMenu('');
  }, [location.pathname]);

  // Handle menu click
  const handleMenuClick = (menuTitle: string) => {
    console.log('Setting active menu to:', menuTitle);
    if(menuTitle==activeMenu){
      setActiveMenu('');
    }else{
      setActiveMenu(menuTitle);
    }
    
  };
// console.log(activeMenu,'activeMenu')
// console.log(activeMenu,'activeMenu')
  return (
    <div className={`sidebar-wrapper ${isSidebarOpen ? 'close_icon' : ''}`}>
      <div id="sidebarEffect"></div>
      <div>
        <div className="logo-wrapper logo-wrapper-center">
          <a href="index.html" data-bs-original-title="" title="">
            <img className="img-fluid for-white" src="assets/images/logo/full-white.png" alt="logo" />
          </a>
          <div className="back-btn">
            <i className="fa fa-angle-left"></i>
          </div>
          <div className="toggle-sidebar" onClick={toggleSidebar}>
            <i className="ri-apps-line status_toggle middle sidebar-toggle"></i>
          </div>
        </div>
        
        <div className="logo-icon-wrapper">
          <a href="index.html">
            <img className="img-fluid main-logo main-white" src="assets/images/logo/1-white.png" alt="logo" />
            <img className="img-fluid main-logo main-dark" src="assets/images/logo/logo-white.png" alt="logo" />
          </a>
        </div>
        
        <nav className="sidebar-main">
          <div className="left-arrow" id="left-arrow">
            <i data-feather="arrow-left"></i>
          </div>

          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <div className="simplebar-wrapper" style={{margin: '0px'}}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div className="simplebar-offset" style={{right: '0px', bottom: '0px'}}>
                    <div className="simplebar-content-wrapper" style={{height: '100%', overflow: 'hidden scroll'}}>
                      <div className="simplebar-content" style={{padding: '0px'}}>
                        
                        {/* Dashboard */}
                        <li className={`sidebar-list ${activeMenu === 'Dashboard' ? 'active' : ''}`}>
                          <NavLink 
                            to="/" 
                            className={`sidebar-link sidebar-title link-nav ${activeMenu === 'Dashboard' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('Dashboard')}
                          >
                            <i className="ri-home-line"></i>
                            <span>Dashboard</span>
                          </NavLink>
                        </li>

                        {/* User */}
                        <li className={`sidebar-list ${activeMenu === 'User' ? 'active' : ''}`}>
                          <a 
                            className={`sidebar-link sidebar-title link-nav ${activeMenu === 'User' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('User')}
                          >
                            <i className="ri-user-3-line"></i>
                            <span>User</span>
                          </a>
                          <ul className="sidebar-submenu">
                            <li>
                              <NavLink 
                                to="/alluser" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('User')}
                              >
                                All users
                              </NavLink>
                            </li>
                            <li>
                              <NavLink 
                                to="/add-New-User" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('User')}
                              >
                                Add new user
                              </NavLink>
                            </li>
                          </ul>
                        </li>

                        {/* Products */}
                        <li className={`sidebar-list ${activeMenu === 'Products' ? 'active' : ''}`}>
                          <a 
                            className={`sidebar-link sidebar-title link-nav ${activeMenu === 'Products' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('Products')}
                          >
                            <i className="ri-store-3-line"></i>
                            <span>Products</span>
                          </a>
                          <ul className="sidebar-submenu">
                            <li>
                              <NavLink 
                                to="/products" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Products')}
                              >
                                All Products
                              </NavLink>
                            </li>
                            <li>
                              <NavLink 
                                to="/add-new-product" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Products')}
                              >
                                Add Product
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                         {/* Supplier */}
                         <li className={`sidebar-list ${activeMenu === 'Supplier' ? 'active' : ''}`}>
                          <a 
                            className={`sidebar-link sidebar-title link-nav ${activeMenu === 'Supplier' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('Supplier')}
                          >
                            {/* <i className="ri-store-3-line"></i> */}
                            <i className="ri-user-voice-line"></i>
                            <span>Supplier</span>
                          </a>
                          <ul className="sidebar-submenu">
                            <li>
                              <NavLink 
                                to="/supplier-list" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Supplier')}
                              >
                                Supplier List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink 
                                to="/add-new-supplier" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Supplier')}
                              >
                                Add Supplier
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                         {/* Customer */}
                         <li className={`sidebar-list ${activeMenu === 'Supplier' ? 'active' : ''}`}>
                          <a 
                            className={`sidebar-link sidebar-title link-nav ${activeMenu === 'Customer' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('Customer')}
                          >
                            {/* <i className="ri-store-3-line"></i> */}
                            <i className="ri-group-line"></i>
                            <span>Customer</span>
                          </a>
                          <ul className="sidebar-submenu">
                            <li>
                              <NavLink 
                                to="/customer-list" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Customer')}
                              >
                                Customer List
                              </NavLink>
                            </li>
                            <li>
                              <NavLink 
                                to="/add-new-customer" 
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={() => handleMenuClick('Customer')}
                              >
                                Add Customer
                              </NavLink>
                            </li>
                          </ul>
                        </li>


                        {/* Settings */}
                        {/* <li className={`sidebar-list ${activeMenu === 'Settings' ? 'active' : ''}`}>
                          <NavLink 
                            to="/settings" 
                            className="sidebar-link sidebar-title link-nav"
                            onClick={() => handleMenuClick('Settings')}
                          >
                            <i className="ri-settings-line"></i>
                            <span>Settings</span>
                          </NavLink>
                        </li> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>

          <div className="right-arrow" id="right-arrow">
            <i data-feather="arrow-right"></i>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;