import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import '../Stylesheets/ProductPage.css';

const Productpagecomp = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    fetch(`http://localhost:3005/medicine/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setCurrentImage(data.imgurl1); // Set initial image
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, [location.search]);

  const handleImageChange = (image) => {
    setCurrentImage(image);
  };

  async function handlecartbutton(event){
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3005/addingtocart/${product.Id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...product, userid: localStorage.getItem('userid') }),
        });

        if (response.ok) {
            window.location.href = '/cartdetails';
        } else {
            window.location.href = '/cartdetails';
        }
    } catch (error) {
        console.error('Error registering:', error);
    }
  }

  return (
    <div className="productdetailscontainer">
      <div className="product-container">
        <div className="product-thumbnail">
          <div className="arrow left-arrow" onClick={() => handleImageChange(product.imgurl1)}>&#8592;</div>
          <img className="thumbimage" src={currentImage} alt="Product Thumbnail" />
          <div className="arrow right-arrow" onClick={() => handleImageChange(product.imgurl2)}>&#8594;</div>
        </div>
        <div className="product-details">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-id">Product ID: {product.Id}</p>
          <p className="manufacturers">Manufacturers: {product.manufacturers}</p>
          <p className="stock">Stock: {product.stock}</p>
          <p className="packaging">Packaging: {product.packaging}</p>
          <p className="package">Package: {product.package}</p>
          <p className="quantity">Quantity: {product.quantity}</p>
          <p className="product-form">Product Form: {product.product_form}</p>
          <p className="mrp">MRP: Rs. {product.mrp}</p>
          <button className="add-to-cart-btn" onClick={handlecartbutton}>{product.for_sale ? 'Add to Cart' : 'Out of Stock'}</button>
          <div className="discount-box">{product.discount_percent}% Off</div>
        </div>
      </div>
      <div className="additional-info-container">
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-additional-info">
          <h3>Additional Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Bought</td>
                <td>{product.bought}</td>
              </tr>
              <tr>
                <td>Prescription Required</td>
                <td>{product.prescription_required}</td>
              </tr>
              <tr>
                <td>Fact Box</td>
                <td>{product.fact_box}</td>
              </tr>
              <tr>
                <td>Primary Use</td>
                <td>{product.primary_use}</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>{product.storage}</td>
              </tr>
              <tr>
                <td>Use Of</td>
                <td>{product.use_of}</td>
              </tr>
              <tr>
                <td>Common Side Effect</td>
                <td>{product.common_side_effect}</td>
              </tr>
              <tr>
                <td>Alcohol Interaction</td>
                <td>{product.alcoholInteraction}</td>
              </tr>
              <tr>
                <td>Pregnancy Interaction</td>
                <td>{product.pregnancyInteraction}</td>
              </tr>
              <tr>
                <td>Lactation Interaction</td>
                <td>{product.lactationInteraction}</td>
              </tr>
              <tr>
                <td>Driving Interaction</td>
                <td>{product.drivingInteraction}</td>
              </tr>
              <tr>
                <td>Kidney Interaction</td>
                <td>{product.kidneyInteraction}</td>
              </tr>
              <tr>
                <td>Liver Interaction</td>
                <td>{product.liverInteraction}</td>
              </tr>
              <tr>
                <td>Manufacturer Address</td>
                <td>{product.MANUFACTURER_ADDRESS}</td>
              </tr>
              <tr>
                <td>Country of Origin</td>
                <td>{product.country_of_origin}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productpagecomp ;
