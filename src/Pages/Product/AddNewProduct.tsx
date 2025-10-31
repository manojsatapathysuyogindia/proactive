import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
// import Sidebar from '../../Components/Sidebar';
import { useAddProduct} from "../../apihooks/useUsers";
import { useApiRoutes } from "../../constants/apiRoutes";
import { errorToast, successToast } from '../../Components/ToastMessege';

// Define TypeScript interfaces
interface ProductForm {
  name: string;
  type: string;
  MfrPartNumber: string;
  OurPartNumber: string;
  Manufacturer: string;
  Warrenty: string;
  Condition: string;
  category: string;
  subcategory: string;
  brand: string;
  unit: string;
  tags: string[];
  exchangeable: boolean;
  refundable: boolean;
  shortDescription: string;
  longDescription: string;
  images: File[];
  thumbnail: File[];
  videoProvider: string;
  videoLink: string;
  optionName: string;
  optionValue: string[];
  weight: string;
  dimensions: string;
  price: string;
  comparePrice: string;
  costPerItem: string;
  sku: string;
  stockStatus: string;
  variants: Variant[];
  upsells: string;
  crossSells: string;
  pageTitle: string;
  metaDescription: string;
  urlHandle: string;
}

interface Variant {
  type: string;
  value: string;
  price: string;
  sku: string;
  quantity: string;
}

// interface Notification {
//   type: string;
//   message: string;
//   time: string;
// }

interface VariantModalData {
  type: string;
  value: string;
  price: string;
  sku: string;
  quantity: string;
}

interface FormErrors {
  MfrPartNumber?: string;
  OurPartNumber?: string;
  Manufacturer?: string;
  Warrenty?: string;
  Condition?: string;
  category?: string;
  shortDescription?: string;
  longDescription?: string;
}

const AddNewProduct: React.FC = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantModalData, setVariantModalData] = useState<VariantModalData>({
    type: 'Color',
    value: '',
    price: '',
    sku: '',
    quantity: ''
  });
console.log(variantModalData)
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    type: '',
    MfrPartNumber: '',
    OurPartNumber: '',
    Manufacturer: '',
    Warrenty: '',
    Condition: '',
    category: '',
    subcategory: '',
    brand: '',
    unit: '',
    tags: [],
    exchangeable: false,
    refundable: true,
    shortDescription: '',
    longDescription: '',
    images: [],
    thumbnail: [],
    videoProvider: 'Vimeo',
    videoLink: '',
    optionName: 'Color',
    optionValue: [],
    weight: '',
    dimensions: 'Length',
    price: '',
    comparePrice: '',
    costPerItem: '',
    sku: '',
    stockStatus: 'In Stock',
    variants: [],
    upsells: '',
    crossSells: '',
    pageTitle: '',
    metaDescription: '',
    urlHandle: ''
  });
console.log(showVariantModal)
  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>/g, '');
  };

  const { ADDPRODUCT } = useApiRoutes();
  const { mutateAsync: addproduct } = useAddProduct();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.MfrPartNumber.trim()) {
      newErrors.MfrPartNumber = 'Mfr Part Number is required';
    }

    if (!formData.OurPartNumber.trim()) {
      newErrors.OurPartNumber = 'Our Part Number is required';
    }

    if (!formData.Manufacturer.trim()) {
      newErrors.Manufacturer = 'Manufacturer is required';
    }

    if (!formData.Warrenty.trim()) {
      newErrors.Warrenty = 'Warranty is required';
    }

    if (!formData.Condition.trim()) {
      newErrors.Condition = 'Condition is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short Description is required';
    } else if (formData.shortDescription.length < 10) {
      newErrors.shortDescription = 'Short Description must be at least 10 characters long';
    }

    if (!formData.longDescription.trim()) {
      newErrors.longDescription = 'Long Description is required';
    } else if (formData.longDescription.length < 20) {
      newErrors.longDescription = 'Long Description must be at least 20 characters long';
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
      const response = await addproduct({
        URL: ADDPRODUCT,
        productData: formData
      });

      if (response?.status === 1) {
        successToast(response.message || "Product added successfully");
        navigate("products");
      } else {
        errorToast(response?.message || "Failed to add product");
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

  console.log(formData, 'formData');

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };



  const handleVariantChange = (index: number, field: keyof Variant, value: string) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      variants: updatedVariants
    }));
  };

  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      variants: updatedVariants
    }));
  };

  const openAddVariantModal = () => {
    setVariantModalData({
      type: 'Color',
      value: '',
      price: '',
      sku: '',
      quantity: ''
    });
    setShowVariantModal(true);
  };

  // const handleVariantModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setVariantModalData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const addVariant = () => {
  //   if (variantModalData.value && variantModalData.price) {
  //     const newVariant: Variant = {
  //       type: variantModalData.type,
  //       value: variantModalData.value,
  //       price: variantModalData.price,
  //       sku: variantModalData.sku,
  //       quantity: variantModalData.quantity
  //     };
      
  //     setFormData(prev => ({
  //       ...prev,
  //       variants: [...prev.variants, newVariant]
  //     }));
      
  //     setShowVariantModal(false);
  //   } else {
  //     alert('Please fill in all required fields (Type, Value, and Price)');
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendData();
  };

  const isClassifiedProduct = formData.type === 'Classified';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-8 m-auto">
              <form onSubmit={handleSubmit}>
                {/* Product Information */}
                <div className="card">
                  <div className="card-body">
                    <div className="card-header-2">
                      <h5>Product Information</h5>
                    </div>

                    <div className="theme-form theme-form-2 mega-form">
                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Mfr Part Number <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <input 
                            className={`form-control ${errors.MfrPartNumber ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Mfr Part Number"
                            name="MfrPartNumber"
                            value={formData.MfrPartNumber}
                            onChange={handleInputChange}
                            
                          />
                          {errors.MfrPartNumber && (
                            <div className="invalid-feedback d-block">
                              {errors.MfrPartNumber}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="form-label-title col-sm-3 mb-0">
                          Our Part Number <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <input 
                            className={`form-control ${errors.OurPartNumber ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Our Part Number"
                            name="OurPartNumber"
                            value={formData.OurPartNumber}
                            onChange={handleInputChange}
                          
                          />
                          {errors.OurPartNumber && (
                            <div className="invalid-feedback d-block">
                              {errors.OurPartNumber}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="col-sm-3 col-form-label form-label-title">
                          Category <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select 
                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                           
                          >
                            <option value="">Select Category</option>
                            <option value="1">Electronics</option>
                            <option value="2">TV & Appliances</option>
                            <option value="3">Home & Furniture</option>
                            <option value="4">Baby & Kids</option>
                            <option value="5">Health, Beauty & Perfumes</option>
                          </select>
                          {errors.category && (
                            <div className="invalid-feedback d-block">
                              {errors.category}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="col-sm-3 col-form-label form-label-title">
                          Warranty <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select 
                            className={`form-select ${errors.Warrenty ? 'is-invalid' : ''}`}
                            name="Warrenty"
                            value={formData.Warrenty}
                            onChange={handleInputChange}
                          
                          >
                            <option value="">Select warranty</option>
                            <option value="1">1 yr</option>
                            <option value="2">2 yr</option>
                            <option value="3">3 yr</option>
                            <option value="4">4 yr</option>
                            <option value="5">5 yr</option>
                          </select>
                          {errors.Warrenty && (
                            <div className="invalid-feedback d-block">
                              {errors.Warrenty}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="col-sm-3 col-form-label form-label-title">
                          Manufacturer <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select 
                            className={`form-select ${errors.Manufacturer ? 'is-invalid' : ''}`}
                            name="Manufacturer"
                            value={formData.Manufacturer}
                            onChange={handleInputChange}
                           
                          >
                            <option value="">Select Brand</option>
                            <option value="1">Puma</option>
                            <option value="2">HRX</option>
                            <option value="3">Roadster</option>
                            <option value="4">Zara</option>
                          </select>
                          {errors.Manufacturer && (
                            <div className="invalid-feedback d-block">
                              {errors.Manufacturer}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4 row align-items-center">
                        <label className="col-sm-3 col-form-label form-label-title">
                          Condition <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <select 
                            className={`form-select ${errors.Condition ? 'is-invalid' : ''}`}
                            name="Condition"
                            value={formData.Condition}
                            onChange={handleInputChange}
                            
                          >
                            <option value="">Select Condition</option>
                            <option value="1">test Condition 1</option>
                            <option value="2">test Condition 2</option>
                          </select>
                          {errors.Condition && (
                            <div className="invalid-feedback d-block">
                              {errors.Condition}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="card">
                  <div className="card-body">
                    <div className="card-header-2">
                      <h5>Description</h5>
                    </div>

                    <div className="theme-form theme-form-2 mega-form">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-4">
                            <label className="form-label-title col-sm-3 mb-0">
                              Product Short Description <span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-9">
                              <textarea 
                                className={`form-control ${errors.shortDescription ? 'is-invalid' : ''}`}
                                rows={6}
                                placeholder="Product Short Description"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                              
                              />
                              {errors.shortDescription && (
                                <div className="invalid-feedback d-block">
                                  {errors.shortDescription}
                                </div>
                              )}
                              <small className="text-muted">
                                Minimum 10 characters required
                              </small>
                            </div>
                          </div>
                          
                          <div className="row">
                            <label className="form-label-title col-sm-3 mb-0">
                              Product Long Description <span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-9">
                              <textarea 
                                className={`form-control ${errors.longDescription ? 'is-invalid' : ''}`}
                                rows={6}
                                placeholder="Product Long Description"
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleInputChange}
                                
                              />
                              {errors.longDescription && (
                                <div className="invalid-feedback d-block">
                                  {errors.longDescription}
                                </div>
                              )}
                              <small className="text-muted">
                                Minimum 20 characters required
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product variations - Only show for Classified products */}
                {isClassifiedProduct && (
                  <div className="card">
                    <div className="card-body">
                      <div className="card-header-2">
                        <h5>Product Variations</h5>
                        <small className="text-muted">Add different variations for your product</small>
                      </div>

                      {/* Variants Table */}
                      {formData.variants.length > 0 && (
                        <table className="table variation-table table-responsive-sm">
                          <thead>
                            <tr>
                              <th scope="col">Type</th>
                              <th scope="col">Value</th>
                              <th scope="col">Price</th>
                              <th scope="col">SKU</th>
                              <th scope="col">Quantity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.variants.map((variant, index) => (
                              <tr key={index}>
                                <td>{variant.type}</td>
                                <td>{variant.value}</td>
                                <td>
                                  <input 
                                    className="form-control" 
                                    type="number" 
                                    placeholder="0"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="SKU"
                                    value={variant.sku}
                                    onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input 
                                    className="form-control" 
                                    type="number" 
                                    placeholder="0"
                                    value={variant.quantity}
                                    onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <ul className="order-option">
                                    <li>
                                      <a href="javascript:void(0)" onClick={() => removeVariant(index)}>
                                        <i className="ri-delete-bin-line"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      
                      <button type="button" className="btn btn-secondary mt-3" onClick={openAddVariantModal}>
                        <i className="ri-add-line me-2"></i> Add Variation
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary me-2 mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;