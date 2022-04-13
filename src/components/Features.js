import React from "react";
import customizedMenu from "../Media/customize_menu.svg";
import prep from "../Media/instructions.svg";
import saveMoney from "../Media/save_money.svg";
import payment from "../Media/payment.svg";

const Features = () => {
  return (
    <section className="feature">
      <div className={`feature__content container container-pall`}>
        <div className={`feature__intro`}>
          <h2>Why Choose Us?</h2>
          <p>
            This "Restaurant Management System" is aimed to break the barrier
            restaurant workers are facing.
          </p>
        </div>
        <div className={`feature__grid`}>
          <div className={`feature__item`}>
            <div className={`feature__icon`}>
              <img src={customizedMenu} alt="customizedMenu"></img>
            </div>
            <div className={`feature__title`}>Menu Customization</div>
            <div className={`feature__description`}>
              <p>
                {" "}
                Our Menu Customization will provide you the Ultimate Exprience
                to add/edit current items.
              </p>
            </div>
          </div>
          <div className={`feature__item`}>
            <div className={`feature__icon`}>
              <img src={prep} alt="prep"></img>
            </div>
            <div className={`feature__title`}>Clear Instructions</div>
            <div className={`feature__description`}>
              <p>This will remove the communication barrier between</p>
            </div>
          </div>

          <div className={`feature__item`}>
            <div className={`feature__icon`}>
              <img src={saveMoney} alt="saveMoney"></img>
            </div>
            <div className={`feature__title`}>Free</div>
            <div className={`feature__description`}>
              <p>Aimed to help small restros this is completely free!</p>
            </div>
          </div>
          <div className={`feature__item`}>
            <div className={`feature__icon`}>
              <img src={payment} alt="payment"></img>
            </div>
            <div className={`feature__title`}>Payment Integration</div>
            <div className={`feature__description`}>
              <p>
                Payment Integration for your customer to go cashless in Covid-19
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
