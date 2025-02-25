import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProduct.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const initialvalues = {
  name: "",
  description: "",
  gender: "",
  size: [],
  basePrice: "",
  stock: "",
  discountType: "",
  discount: "",
  category: "",
  productImg: null,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must contain at least 2 characters")
    .max(20, "Name can contain a maximum of 20 characters")
    .required("Please enter the product name"),
  description: Yup.string()
    .min(20, "Description must contain at least 20 characters")
    .max(120, "Description can contain a maximum of 120 characters")
    .required("Please enter the description"),
  gender: Yup.string()
    .oneOf(["Men", "Women", "Unisex"], "Invalid gender")
    .required("Please select a gender"),
  size:  Yup.array()
  .of(Yup.string().required())
    .required("Please select a size"),
  basePrice: Yup.number()
    .required("Please enter the base price")
    .typeError("Base price must be a number"),
  stock: Yup.number()
    .required("Please enter the stock")
    .typeError("Stock must be a number"),
  discountType: Yup.string().required("Please select a discount type"),
  discount: Yup.number()
    .required("Please enter the discount")
    .typeError("Discount must be a number"),
  category: Yup.string().required("Please select a category"),
  productImg: Yup.mixed().required("Please upload a product image"),
});

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const id = useSelector((state) => state.userSlice.loginUser.data._id);
  console.log(id);
  const addProduct = async (values) => {
    const resp = await axios.post(
      `http://localhost:8080/api/product/addProduct/${id}`,
      values
    );
    console.log(resp);
    return resp;
  };
  const mutation = useMutation({
    mutationFn: (values) => addProduct(values),
    onSuccess: (resp) => {
      console.log(resp);
      if(resp.status == 200){
        swal({
          title: "Product add successfully!",
          icon: "success",
        });
        
      }
    },
  });
 
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialvalues,
    validationSchema: validationSchema,
    onSubmit: (values,{resetForm}) => {
      console.log("Form Values Submitted:", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      // formData.append("size", values.size);
      formData.append("gender", values.gender);
      formData.append("basePrice", values.basePrice);
      formData.append("stock", values.stock);
      formData.append("discountType", values.discountType);
      formData.append("discount", values.discount);
      formData.append("productImg", values.productImg);
      formData.append("category", values.category);
      values.size.forEach((size) => {
        formData.append("size[]", size);
      });
      mutation?.mutate(formData,{
        onSuccess:()=>{
          resetForm();
          setPreview(null);
        }
      });
      
    },
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    
    // Set the preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFieldValue("productImg", file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  // console.log('binary', values.productImg);
 
  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`form-control ${
              touched.name && errors.name ? "is-invalid" : ""
            }`}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Product Name"
          />
          {touched.name && errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className={`form-control ${
              touched.description && errors.description ? "is-invalid" : ""
            }`}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter product description"
            rows="3"
          ></textarea>
          {touched.description && errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="d-flex gap-3">
            {["Men", "Women", "Unisex"].map((gender) => (
              <div key={gender} className="form-check">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  className="form-check-input"
                  checked={values.gender === gender}
                  onChange={handleChange}
                />
                <label className="form-check-label">{gender}</label>
              </div>
            ))}
          </div>
          {touched.gender && errors.gender && (
            <div className="text-danger">{errors.gender}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Size</label>
          <div className="d-flex gap-3">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="form-check">
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  className="form-check-input"
                  checked={values.size.includes(size)}
                  onChange={handleChange}
                />
                <label className="form-check-label">{size}</label>
              </div>
            ))}
          </div>
          {touched.size && errors.size && (
            <div className="text-danger">{errors.size}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="basePrice" className="form-label">
            Base Price
          </label>
          <input
            type="number"
            name="basePrice"
            id="basePrice"
            className={`form-control ${
              touched.basePrice && errors.basePrice ? "is-invalid" : ""
            }`}
            value={values.basePrice}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Base Price"
          />
          {touched.basePrice && errors.basePrice && (
            <div className="invalid-feedback">{errors.basePrice}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            className={`form-control ${
              touched.stock && errors.stock ? "is-invalid" : ""
            }`}
            value={values.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Stock"
          />
          {touched.stock && errors.stock && (
            <div className="invalid-feedback">{errors.stock}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            className={`form-control ${
              touched.discount && errors.discount ? "is-invalid" : ""
            }`}
            value={values.discount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Discount"
          />
          {touched.discount && errors.discount && (
            <div className="invalid-feedback">{errors.discount}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="discountType" className="form-label">
            Discount Type
          </label>
          <select
            name="discountType"
            id="discountType"
            className={`form-select ${
              touched.discountType && errors.discountType ? "is-invalid" : ""
            }`}
            value={values.discountType}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Discount Type</option>
            {[
              "Seasonal discounts",
              "Percentage coupons",
              "Quantity discounts",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {touched.discountType && errors.discountType && (
            <div className="invalid-feedback">{errors.discountType}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            id="category"
            className={`form-select ${
              touched.category && errors.category ? "is-invalid" : ""
            }`}
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Category</option>
            {[
              "Swimwear",
              "Dress",
              "Blazer",
              "Workwear",
              "Skirt",
              "Jacket",
              "Denim",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="productImg" className="form-label">
            Product Image
          </label>
          <input type="file" name="productImg" onChange={handleFileChange} />

          {/* Preview the selected image */}
          {preview && (
            <div className="mt-3">
              <h5>Preview:</h5>
              <img
                src={preview}
                alt="Product Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
