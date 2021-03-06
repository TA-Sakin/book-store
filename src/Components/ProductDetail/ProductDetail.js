import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    fetch(`https://secure-mesa-81244.herokuapp.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (book.length === 0) {
    return <Spinner></Spinner>;
  }

  const updateQuantity = (quantity, toastMessage, sold) => {
    if (quantity === -1) {
      return toast.error("Stock is empty");
    }
    const updateQuantity = { quantity, sold };
    fetch(`https://secure-mesa-81244.herokuapp.com/books/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateQuantity),
    })
      .then((res) => res.json())
      .then((data) => {
        setBook({ ...book, quantity: quantity, sold: sold });
        toast(toastMessage);
      });
  };
  const handleDelivered = () => {
    let quantity = parseInt(book.quantity);
    quantity = quantity - 1;
    let sold = parseInt(book.sold) + 1;
    updateQuantity(quantity, "Book delivered", sold);
  };
  const handleRestock = (e) => {
    e.preventDefault();
    const restockBook = parseInt(e.target.restock.value);
    if (restockBook) {
      let quantity = book.quantity;
      quantity = quantity + restockBook;
      updateQuantity(quantity, "Book added to the stock", book.sold);
      e.target.reset();
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: "66vh" }}>
      <h3 className="text-center mb-4">Update the book's stock</h3>
      <div className="card mb-3 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={book.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{book.name}</h5>
              <p className="card-text">{book.description}</p>
              <p className="card-text">Supplier: {book.supplierName}</p>
              <p className="card-text">Price: ${book.price}</p>
              <p className="card-text">Quantity: {book.quantity}</p>
              <p className="card-text">Sold: {book.sold}</p>
              <button className="btn btn-primary" onClick={handleDelivered}>
                Delivered
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h3 className="my-3">Restock the book</h3>
        <form onSubmit={handleRestock}>
          <input
            type="number"
            placeholder="Enter quantity"
            name="restock"
            id=""
            
          />
          <button type="submit" className="btn btn-success py-1 ms-2">
            Restock
          </button>
        </form>
        <Link to={`/manageinventory`}>
          <button className="border-0 py-3 px-5 btn-dark my-5">
            <b>Manage Inventory </b>
          </button>
        </Link>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ProductDetail;
