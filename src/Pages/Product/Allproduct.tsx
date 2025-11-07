import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAllProduct} from "../../apihooks/useUsers";
import { useApiRoutes } from "../../constants/apiRoutes";
import Loader from '../../Components/Loader';
import CommonTable from '../../Components/CommonTable';


const Allproduct: React.FC = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ALLPRODUCT } = useApiRoutes();
  const { mutateAsync: allproduct} = useAllProduct();
  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    handleGetAllProduct()
  }, []);
  const handleGetAllProduct=async()=>{
    setIsLoading(true);
    try {
       const allProduct=await allproduct({
        URL: ALLPRODUCT,
      });
      if(allProduct.status==1){
        // setIsLogoutModalOpen(false)
        // navigate("/");
        setAllProductData(allProduct?.data)
        setIsLoading(false);
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

  
  const headers = [
    'Product',
    'Category',
    'Description', 
    'Mfr Part No.',
    'Our Part NO.',
    'Manufacturer',
    'Condition',
    'Warrenty',
    'Option'
  ];
  
  return (

        // <div className="page-body">
        
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-body">
                    <div className="title-header option-title d-sm-flex d-block">
                      <h5>Products List</h5>
                      <div className="right-options">
                        <ul>
                          {/* <li>
                            <a href="javascript:void(0)">Import</a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">Export</a>
                          </li> */}
                          <li>
                            <Link className="btn btn-solid" to="/add-new-product">
                              Add Product
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* <div className="table-responsive">
                      <table className="table all-package theme-table table-product" id="table_id">
                        <thead>
                          <tr>
                            
                            <th>Product</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Mfr Part No.</th>
                            <th>Our Part NO.</th>
                            <th>Manufacturer</th>
                            <th>Condition</th>
                            <th>Warrenty</th>
                            <th>Option</th>
                          </tr>
                        </thead>

                        <tbody>
                          {allProductData?.map((product:any) => (
                            <tr key={product.id}>
                          

                              <td>{product.ShortDescription}</td>

                              <td>{product.Category}</td>

                              <td>{product.LongDescription}</td>

                              <td>{product.MfrPartNumber}</td>
                              <td>{product.OurPartNumber}</td>
                              <td>{product.Manufacturer}</td>
                              <td>{product.Condition}</td>
                              <td>{product.Warranty}</td>
                              <td>
                                <ul>
                             

                                  <li>
                                    <Link to={`/edit-product/${product.id}`}>
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </li>

                                  <li>
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                                      <i className="ri-delete-bin-line"></i>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div> */}
                    <CommonTable headers={headers}>
                    {allProductData?.map((product:any) => (
                            <tr key={product.id}>
                              {/* <td>
                                <div className="table-image">
                                  <img src={product.image} className="img-fluid" alt={product.name} />
                                </div>
                              </td> */}

                              <td>{product.ShortDescription}</td>

                              <td>{product.Category}</td>

                              <td>{product.LongDescription}</td>

                              {/* <td className="td-price">{product.MfrPartNumber}</td> */}

                              {/* <td className={getStatusClass(product.status)}>
                                <span>{getStatusText(product.status)}</span>
                              </td> */}
                              <td>{product.MfrPartNumber}</td>
                              <td>{product.OurPartNumber}</td>
                              <td>{product.Manufacturer}</td>
                              <td>{product.Condition}</td>
                              <td>{product.Warranty}</td>
                              <td>
                                <ul>
                                  {/* <li>
                                    <a href="order-detail.html">
                                      <i className="ri-eye-line"></i>
                                    </a>
                                  </li> */}

                                  <li>
                                    <Link to={`/edit-product/${product.id}`}>
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </li>

                                  <li>
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                                      <i className="ri-delete-bin-line"></i>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
              </CommonTable>
                  </div>
                </div>
              </div>
            </div>
            {isLoading?<Loader />:null}
          </div>

         
          
 
  );
};

export default Allproduct;