import { DialogContent, DialogTitle } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React, { useState, useRef, useEffect } from "react";
import "./popup.css";
import "./popup-product.css";
import "./Customers.scss";
import axiosInstance from "../../../axios";
import { toast } from "react-toastify";
import { async } from "q";

export default function Popup(props) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState(0);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageData, setImageData] = useState("");
  const [prodID, setProdID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(0);
  const { openPopup, setOpenPopup, productId } = props;
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("products_api/product/all");
        const productsData = response.data.map(async (product) => {
          const imageResponse = await axiosInstance.get(
            `/products_api/imageupload/${product.id}/`
          );
          const image = imageResponse.data;
          return { ...product, image };
        });
        const productsWithImages = await Promise.all(productsData);
        // Find the product with the specified productId
        const product = productsWithImages.find(
          (item) => item.id === productId
        );
        setName(product.title);
        setCat(product.category);
        setDesc(product.description);
        setPrice(product.price);
        setStock(product.stock);
      } catch (error) {
        console.log(error);
      }
    };
    if (productId != 0) {
      fetchProducts();
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageUploaded(false);

    const postData = async () => {
      try {
        const formData = new FormData();
        formData.append("id", 20);
        formData.append("title", name);
        formData.append("description", desc);
        formData.append("published", "2023-05-10T12:03:56.136Z");
        formData.append("price", price);
        formData.append("sales", 0);
        formData.append("stock", stock);
        formData.append("image", imageData); // Replace 'imageFile' with your actual image file object
        formData.append("category", cat);
        formData.append("admincompany", "string");

        const response = await axiosInstance.post(
          "/products_api/product/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
          }
        );
        toast.success("Add Processing done");
        setName("");
        setCat(0);
        setDesc(0);
        setPrice(0);
        setStock(0);
        setShowUploadForm(1);
        setProdID(response.data.id);
      } catch (error) {
        console.error(error);
        toast.error("add failed");
      }
    };
    postData();
  };

  const fileInputRef = useRef(null);
  const handleFileClick = (e) => {
    fileInputRef.current.click();
  };
  const handleInputChange = ({ target }) => {
    setSelectedFile(target.files[0]);
    setImageUploaded(true);
  };
  const handleUpload = async (productId) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await axiosInstance.patch(
        `/products_api/imageupload/${productId}/`,
        formData
      );
      console.log(response);
      toast.success("Image Uploaded Successfully");

      setShowUploadForm(0);
    } catch (error) {
      console.log(error);
      toast.error("Please choose another image and try again");

      // Handle the error case
    }
  };
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setImageUploaded(false);
    if (productId != 0) {
      handleUpload(productId);
    } else {
      handleUpload(prodID);
    }
  };
  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        title: name,
        description: desc,
        price: price,
        stock: stock,
        category: cat,
      };

      const response = await axiosInstance.patch(
        `/products_api/${productId}/update`,
        updatedProduct
      );
      console.log(response);
      setShowUploadForm(1);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };
  return (
    <>
      <Dialog open={openPopup} className="open-close">
        {productId != 0 ? (
          <div>
            <div>
              <DialogTitle>
                <div style={{ textAlign: "center", height: "60px" }}>
                  {" "}
                  <div
                    style={{ float: "left", margin: "10px", color: " #0b69bb" }}
                  >
                    <img
                      src={"./icons/edit (1).png"}
                      alt="img"
                      className="dashphoto"
                      style={{ width: "30px", height: "30px" }}
                    />
                    &nbsp;&nbsp; Edit Product
                  </div>
                  <button
                    aria-label="close button"
                    className="invoiceClose"
                    onClick={() => {
                      setOpenPopup(false);
                      setShowUploadForm(0);
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/icons/cross.png"}
                      alt="img"
                    />
                  </button>
                </div>
              </DialogTitle>
              <DialogContent className="bodyofproductpoup">
                <div className="container add-product-form ">
                  <form className="form-group">
                    {showUploadForm === 1 ? (
                      <div className="wrapper__section">
                        <header>Change Photo</header>
                        <form action="#" onClick={handleFileClick}>
                          <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleInputChange}
                          />
                          {imageUploaded ? (
                            <span style={{ color: "green" }}>
                              Image uploaded successfully!
                            </span>
                          ) : (
                            <p>Browser Your File</p>
                          )}
                        </form>
                        <button
                          aria-label="submit the form"
                          className="image-btn"
                          onClick={handleUploadSubmit}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="form-group">
                          <label
                            for="product-name"
                            style={{ marginTop: "-20px" }}
                          >
                            Product Name
                          </label>
                          <input
                            type="text"
                            id="product-name"
                            value={name}
                            name="product-name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            style={{paddingLeft:"15px"}}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            for="product-category"
                            style={{ marginTop: "30px" }}
                          >
                            Category
                          </label>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="range"
                              id="product-category"
                              name="product-category"
                              min="1"
                              max="3"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setCat(value);
                              }}
                              value={cat}
                            />
                            <label
                              for="product-category"
                              style={{ color: " #0b69bb" }}
                            >
                              {cat === 1
                                ? "Accessories"
                                : cat === 2
                                ? "Device"
                                : cat === 3
                                ? "Gadgets"
                                : null}
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6 col-sm-12">
                            <label
                              for="product-price"
                              style={{ marginTop: "30px" }}
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              style={{ width: "150px", paddingLeft: "15px" }}
                              id="product-price"
                              name="product-price"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setPrice(value);
                              }}
                              value={price}
                            />
                          </div>
                          <div className="form-group col-md-6 col-sm-12">
                            <label
                              style={{
                                display: "inlinBlock",
                                marginTop: "30px",
                              }}
                              for="product-stock"
                            >
                              Stock
                            </label>
                            <input
                              type="number"
                              style={{ width: "150px", paddingLeft: "15px" }}
                              id="product-stock"
                              name="product-stock"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setStock(value);
                              }}
                              value={stock}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            or="product-description"
                            style={{ marginTop: "30px" }}
                          >
                            Description
                          </label>
                          <textarea
                            type="text"
                            // style={{ width: "100%", height: "90px", padding: "6px" }}
                            id="product-description"
                            name="product-description"
                            onChange={(e) => {
                              setDesc(e.target.value);
                            }}
                            value={desc}
                          />
                        </div>
                        <div className="ok-btn-invoice">
                          <button
                            aria-label="submit the form"
                            onClick={handleEditProduct}
                            className="btn"
                          >
                            &nbsp; Update
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </DialogContent>
            </div>
          </div>
        ) : (
          <div>
            <DialogTitle>
              <div style={{ textAlign: "center", height: "60px" }}>
                {" "}
                <div
                  style={{ float: "left", margin: "10px", color: " #0b69bb" }}
                >
                  <img
                    src={"./icons/product.png"}
                    alt="img"
                    className="dashphoto"
                    style={{ width: "30px", height: "30px" }}
                  />
                  &nbsp;&nbsp; Add Product
                </div>
                <button
                  aria-label="close button"
                  className="invoiceClose"
                  onClick={() => {
                    setOpenPopup(false);
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/icons/cross.png"}
                    alt="img"
                  />
                </button>
              </div>
            </DialogTitle>
            <DialogContent className="bodyofproductpoup">
              <div className="container add-product-form ">
                <form className="form-group">
                  {showUploadForm === 1 ? (
                    <div className="wrapper__section">
                      <header>Add Photo</header>
                      <form action="#" onClick={handleFileClick}>
                        <input
                          type="file"
                          hidden
                          ref={fileInputRef}
                          onChange={handleInputChange}
                        />
                        {imageUploaded ? (
                          <span style={{ color: "green" }}>
                            Image uploaded successfully!
                          </span>
                        ) : (
                          <p>Browser Your File</p>
                        )}
                      </form>
                      <button
                        aria-label="submit the form"
                        className="image-btn"
                        onClick={handleUploadSubmit}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="form-group">
                        <label for="product-name"  style={{ marginTop: "-20px" }}>Product Name</label>
                        <input
                          type="text"
                          id="product-name"
                          value={name}
                          name="product-name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          style={{paddingLeft:"15px"}}
                        />
                      </div>
                      <div className="form-group">
                        <label for="product-category"  style={{ marginTop: "30px" }}>Category</label>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="range"
                            id="product-category"
                            name="product-category"
                            min="1"
                            max="3"
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              setCat(value);
                            }}
                            value={cat}
                          />
                          <label for="product-category"  style={{ color: " #0b69bb" }}>
                            {cat === 1
                              ? "Accessories"
                              : cat === 2
                              ? "Device"
                              : cat === 3
                              ? "Gadgets"
                              : null}
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6 col-sm-12">
                          <label for="product-price" style={{ marginTop: "30px" }}>Price</label>
                          <input
                            type="number"
                            style={{ width: "150px" }}
                            
                            id="product-price"
                            name="product-price"
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              setPrice(value);
                            }}
                            value={price}
                          />
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                          <label
                            style={{ display: "inlinBlock",marginTop: "30px"  }}
                            for="product-stock"
                          >
                            Stock
                          </label>
                          <input
                            type="number"
                            style={{ width: "150px" }}
                            id="product-stock"
                            name="product-stock"
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              setStock(value);
                            }}
                            value={stock}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label or="product-description" style={{ marginTop: "30px" }}>Description</label>
                        <textarea
                          type="text"
                          // style={{ width: "100%", height: "90px", padding: "6px" }}
                          id="product-description"
                          name="product-description"
                          onChange={(e) => {
                            setDesc(e.target.value);
                          }}
                          value={desc}
                        />
                      </div>

                      <div className="ok-btn-invoice">
                        <button
                          aria-label="submit the form"
                          onClick={handleSubmit}
                          className="btn"
                        >
                          <img
                            src={"./icons/product (1) (1).png"}
                            alt="img"
                            className="dashphoto"
                          />
                          &nbsp; Add
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </>
  );
}
// export default Popup;
