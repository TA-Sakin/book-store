import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../Firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";

const AddBook = () => {
  const [user, loading, error] = useAuthState(auth);
  const handleAddBook = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const supplierName = e.target.supplierName.value;
    const price = e.target.price.value;
    const quantity = parseInt(e.target.quantity.value);
    const sold = parseInt(e.target.sold.value);
    const image = e.target.image.value;
    fetch("https://secure-mesa-81244.herokuapp.com/addbook", {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        description,
        supplierName,
        price,
        quantity,
        sold,
        image,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Book added successfully");
        e.target.reset();
      });
  };
  return (
    <div className="mx-auto col-sm-6 col-lg-4 px-5 mt-5">
      <h3 className="text-center my-3">Add new book to the inventory</h3>
      <form onSubmit={handleAddBook}>
        <div className="form-group mb-2">
          <input
            type="email"
            name="email"
            className="form-control shadow-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user?.email}
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            name="name"
            className="form-control shadow-none"
            id="exampleInputText"
            aria-describedby="textHelp"
            placeholder="Book name"
            required
          />
        </div>
        <div className="form-group mb-2">
          <textarea
            type="text"
            name="description"
            className="form-control shadow-none"
            id="exampleInputText"
            aria-describedby="textHelp"
            placeholder="Short description about the book"
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            name="supplierName"
            className="form-control shadow-none"
            id="exampleInputText"
            aria-describedby="textHelp"
            placeholder="Supplier name"
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="text"
            name="price"
            className="form-control shadow-none"
            id="exampleInputText"
            aria-describedby="textHelp"
            placeholder="Book's price"
            required
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="number"
            name="quantity"
            className="form-control shadow-none"
            id="exampleInputNumber"
            aria-describedby="numberHelp"
            placeholder="How many book?"
            required
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="number"
            name="sold"
            className="form-control shadow-none"
            id="exampleInputNumber"
            aria-describedby="numberHelp"
            placeholder="How many books sold?"
            required
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="imageUrl"
            name="image"
            className="form-control shadow-none"
            id="exampleInputNumber"
            aria-describedby="numberHelp"
            placeholder="Enter a book's image url"
            required
          />
        </div>

        <button type="submit" className="btn btn-dark ">
          Add Book
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddBook;
