/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

const Hero = (props) => {
  return (
    <section className={`hero container`}>
      <div className="hero__image"></div>
      <div className={`hero__text container container-pall`}>
        <h1>Next Generation Restaurent Management</h1>
        <p>
          This "Restaurant Management System" is aimed to break the barrier
          restaurant workers are facing.
        </p>
        {props.user ? (
          <a href="/order" className={`button header__cta`}>
            Dashboard
          </a>
        ) : (
          <a href="/join" className={`button header__cta`}>
            Join
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
