import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useDeleteCustomer, useCustomerList} from "../../apihooks/useUsers";
import { useApiRoutes } from "../../constants/apiRoutes";
import { formatDate, formatTime } from '../../utils/Dateformat';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Loader from '../../Components/Loader';



const CustomerList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null); // Track selected supplier

  const { CUSTOMERLIST, DELETECUSTOMER } = useApiRoutes();
  const { mutateAsync: customerlist} = useCustomerList();
  const { mutateAsync: deletecustomer} = useDeleteCustomer();

  useEffect(() => {
    handleGetAllCustomer()
  }, []);

  const handleGetAllCustomer = async () => {
    setIsLoading(true);
    try {
      const customerList = await customerlist({
        URL: CUSTOMERLIST,
      });
      if(customerList.status == 1){
        setAllCustomerData(customerList?.data)
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch suppliers:", error);
    }
  }

  // Open delete confirmation modal
  const openDeleteModal = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setIsLogoutModalOpen(true);
  }

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!selectedCustomerId) return;
    
    try {
      const deleteSupplier = await deletecustomer({
        URL: DELETECUSTOMER,
        id: selectedCustomerId // Pass the selected supplier ID
      });
      
      if(deleteSupplier.status == 1){
        // Remove the deleted supplier from local state
        setAllCustomerData(prev => prev.filter((supplier: any) => supplier.id !== selectedCustomerId));
        setIsLogoutModalOpen(false);
        setSelectedCustomerId(null);
        handleGetAllCustomer();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsLogoutModalOpen(false);
      setSelectedCustomerId(null);
    }
  }

  // Close modal without deleting
  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
    setSelectedCustomerId(null);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>All Customer</h5>
                <form className="d-inline-flex">
                  <Link to="/add-new-customer" className="align-items-center btn btn-theme d-flex">
                    <i data-feather="plus"></i>Add New
                  </Link>
                </form>
              </div>

              <div className="table-responsive table-product">
                <table className="table all-package theme-table" id="table_id">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Organisation Name</th>
                      <th>Contact Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Organisation Address</th>
                      <th>Registered Office Address</th>
                      <th>Company Registered Number</th>
                      <th>VAT</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allCustomerData?.map((user: any) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-name">
                            <span>{user.OrganisationID}</span>
                          </div>
                        </td>
                        <td>
                          <div className="user-name">
                            <span>{user.OrganisationName}</span>
                          </div>
                        </td>
                        <td>
                        {user.ContactFirstName} {' '} {user.ContactLastName}
                        </td>
                        <td>
                          {user.ContactEmail}
                        </td>
                        <td>{user.ContactPhone}</td>
                        <td>
                          {user.OrganisationStreetAddress},{user.OrganisationAddressLine2},{user.OrganisationCity},
                          {user.OrganisationState},{user.OrganisationPostalCode},{user.OrganisationCountry}
                        </td>
                        <td>
                          {user.RegisteredOfficeStreetAddress},{user.RegisteredOfficeAddressLine2},{user.RegisteredOfficeCity},
                          {user.RegisteredOfficeState},{user.RegisteredOfficePostalCode},{user.RegisteredOfficeCountry}
                        </td>
                        <td>{user.CompanyRegisteredNumber}</td>
                        <td>{user.VATNumber}</td>
                        <td>{user.status}</td>
                        <td>{formatDate(user.created_at)} {formatTime(user.created_at)}</td>
                        <td>{formatDate(user.updated_at)} {formatTime(user.updated_at)}</td>
                        <td>
                          <ul>
                            <li>
                              <Link to={`/edit-customer/${user.id}`}>
                                <i className="ri-pencil-line"></i>
                              </Link>
                            </li>
                            <li>
                              <a href="javascript:void(0)" onClick={() => openDeleteModal(user.id)}>
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
      
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete this customer?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        confirmButtonClass="btn btn--yes btn-danger"
      />
      {isLoading?<Loader />:null}
    </div>
  );
};

export default CustomerList;