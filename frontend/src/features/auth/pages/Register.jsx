import React from "react";
import { Link } from "react-router";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit form register");
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
      {/* heading */}
      <div className="flex justify-center items-center bg-amber-100 rounded-xl m-3 p-5! w-full max-w-sm">
        <h3 className="text-2xl text-blue-400">Register</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {/* main container div */}
        <div className="flex flex-col justify-center gap-4">
          {/* // username */}
          <div className="flex gap-2 justify-between">
            <label htmlFor="username" id="username">
              username
            </label>
            <input
              className="p-2 bg-gray-100 text-black border-0 focus:outline-none focus:ring-1 rounded-md"
              id="username"
              type="text"
              placeholder="Enter userName"
            />
          </div>
          {/* email */}
          <div className="flex gap-2 justify-between">
            <label htmlFor="email" id="email">
              Email
            </label>
            <input
              className="p-2 border-none bg-gray-100 text-black focus:outline-none focus:ring-1 rounded-md"
              id="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>
          {/* password */}
          <div className="flex gap-2 justify-between">
            <label htmlFor="password" id="password">
              password
            </label>
            <input
              className="p-2 border-none bg-gray-100 text-black focus:outline-none focus:ring-1 rounded-md"
              id="password"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          {/* confirm password */}
          <div className="flex gap-2 justify-between">
            <label htmlFor="confirmpassword" id="confirmpassword">
              confirm Password
            </label>
            <input
              className="p-2 border-none bg-gray-100 text-black focus:outline-none focus:ring-1 rounded-md"
              id="confirmpassword"
              type="password"
              placeholder="Enter confirm Password"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 p-2! rounded-md shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-lg active:scale-95 active:shadow-sm"
          >
            Register
          </button>
        </div>
      </form>
      <p>
        Already Have a Account?{" "}
        <Link
          className="cursor-pointer hover:text-blue-200 underline"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
