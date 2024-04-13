import React from "react";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const Navigate = useNavigate();

  const handlelogin = () => {
    Navigate("/login");
  };

  const handlesignup = () => {
    Navigate("/signup");
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-purple-500 font-bold">Startoon </span>
          Labs
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlelogin}
            className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl"
          >
            Signup
          </button>
        </div>
      </nav>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-purple-500 sm:text-5xl">
          Pheezee gets USFDA Clearance.
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Startoon Labs, an ISO 13485 & ISO 9001 certified medical device
          company, is proud to announce that our revolutionary product - PHEEZEE
          is USFDA Registered [510(k) Exempt] Product.
        </p>
        <a
          className="bg-purple-500 rounded-3xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
          onClick={() => Navigate("/login")}
        >
          Know More →
        </a>
      </main>
      <br />
      <br />
      <br />
      <br />

      {/* footer section */}
      <div className="bg-gray-50">
        <div className="max-w-screen-lg py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
          <div className="p-5 sm:w-2/12 border-r">
            <div className="text-sm uppercase text-purple-500 font-bold">
              Menu
            </div>
            <ul>
              <li className="my-2">
                <a className="hover:text-purple-600">Home</a>
              </li>
              <li className="my-2">
                <a className="hover:text-purple-600">Services</a>
              </li>
              <li className="my-2">
                <a className="hover:text-purple-600">Products</a>
              </li>
              <li className="my-2">
                <a className="hover:text-purple-600">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="p-5 sm:w-7/12 border-r text-center">
            <h3 className="font-bold text-xl text-purple-600 mb-4">
              Componentity
            </h3>
            <p className="text-gray-500 text-sm mb-10">
              Want to connect with us? Lets get this conversation started. Tell
              us a bit about yourself, and we'll be happy to help you with your
              queries.
            </p>
          </div>
          <div className="p-5 sm:w-3/12">
            <div className="text-sm uppercase text-purple-600 font-bold">
              Contact Us
            </div>
            <ul>
              <li className="my-2">
                <a className="hover:text-purple-600">
                  15-142/1/103, Sahiti Nest Apartments, Kodandaram Nagar,
                  Dilsukh Nagar, Hyderabad - 500060, Telangana.
                </a>
              </li>
              <li className="my-2">
                <a className="hover:text-purple-600">
                  careers@startoonlabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex py-5 m-auto text-gray-800 text-sm flex-col items-center border-t max-w-screen-xl">
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex"></div>
          <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
