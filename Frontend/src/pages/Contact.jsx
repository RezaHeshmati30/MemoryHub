import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Contact = () => {
  const { firstName, setFirstName, lastName, setLastName } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">First Name</span>
          <input
            type="text"
            name="name"
            value={firstName}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Last Name</span>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Message</span>
          <textarea
            name="message"
            value={message}
            onChange={handleChange}
            className="form-textarea mt-1 block w-full"
            placeholder="Write your message here..."
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
