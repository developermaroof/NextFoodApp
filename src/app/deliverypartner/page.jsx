"use client";
import React, { useState } from "react";
import DeliveryPartnerLogin from "../_components/DeliveryPartnerLogin";
import DeliveryPartnerSignup from "../_components/DeliveryPartnerSignup";
import DeliveryPartnerHeader from "../_components/DeliveryPartnerHeader";
import Footer from "../_components/Footer";

const DeliveryPartner = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <DeliveryPartnerHeader />
        <h1>Delivery Partner Login/Signup Page</h1>
        {login ? <DeliveryPartnerLogin /> : <DeliveryPartnerSignup />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Don't have an account? SignUp"
              : "Already have an account? Login"}
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DeliveryPartner;
