import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
// import Sidebar from '../../Components/Sidebar';
import { useDeleteSupplier, useSupplierList} from "../../apihooks/useUsers";
import { useApiRoutes } from "../../constants/apiRoutes";
// import { useNavigate } from "react-router-dom";
import { formatDate, formatTime } from '../../utils/Dateformat';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Loader from '../../Components/Loader';



const SupplierList: React.FC = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [allSupplierData, setAllSupplierData] = useState([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null); // Track selected supplier
  // const navigate = useNavigate();
  const { SUPPLIERLIST, DELETESUPPLIER } = useApiRoutes();
  const { mutateAsync: supplierlist} = useSupplierList();
  const { mutateAsync: deletesupplier} = useDeleteSupplier();

  useEffect(() => {
    handleGetAllSupplier()
  }, []);

  const handleGetAllSupplier = async () => {
    setIsLoading(true);
    try {
      const supplierList = await supplierlist({
        URL: SUPPLIERLIST,
      });
      if(supplierList.status == 1){

        setAllSupplierData(supplierList?.data)
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch suppliers:", error);
    }
  }

  // Open delete confirmation modal
  const openDeleteModal = (supplierId: number) => {
    setSelectedSupplierId(supplierId);
    setIsLogoutModalOpen(true);
  }

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!selectedSupplierId) return;
    
    try {
      const deleteSupplier = await deletesupplier({
        URL: DELETESUPPLIER,
        id: selectedSupplierId // Pass the selected supplier ID
      });
      
      if(deleteSupplier.status == 1){
        // Remove the deleted supplier from local state
        setAllSupplierData(prev => prev.filter((supplier: any) => supplier.id !== selectedSupplierId));
        setIsLogoutModalOpen(false);
        setSelectedSupplierId(null);
        handleGetAllSupplier();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsLogoutModalOpen(false);
      setSelectedSupplierId(null);
    }
  }

  // Close modal without deleting
  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
    setSelectedSupplierId(null);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>All Users</h5>
                <form className="d-inline-flex">
                  <Link to="/add-new-supplier" className="align-items-center btn btn-theme d-flex">
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
                    {allSupplierData?.map((user: any) => (
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
                              <Link to={`/edit-supplier/${user.id}`}>
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
        title="Delete Supplier"
        message={`Are you sure you want to delete this supplier?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        confirmButtonClass="btn btn--yes btn-danger"
      />
      {isLoading?<Loader />:null}
    </div>
  );
};

export default SupplierList;