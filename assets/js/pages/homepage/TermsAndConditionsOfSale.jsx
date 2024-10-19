import React from "react";

const TermsAndConditionsOfSale = ({ date }) => {
  return (
    <section>
      <div className="hero-content px-8" data-aos="fade-up">
        <span className="text-darkblue">Đồng Hành Network</span>
        <h1 className="text-4xl">Terms and Conditions of Sale</h1>
        <hr />
        <p className="mb-8 max-w">
          These Terms and Conditions of Sale ("Terms") govern the sale of
          products globally by Đồng Hành Network ("Seller") to you ("Customer")
          through our website www.dong-hanh.org. By placing an order with us,
          you agree to be bound by these Terms.
        </p>
        <div
          className="w-full"
          data-aos="zoom-in-up"
          data-aos-duration="500"
          data-aos-offset="200"
        >
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">- Orders -</p>
            <p className="mb-5 text-base text-body-color">
              By placing an order on our website, you make an offer to purchase
              the products listed in your order.
            </p>
            <p>
              All orders are subject to acceptance by us. We reserve the right
              to refuse or cancel any order for any reason at any time.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">- Prices and Payment -</p>
            <p className="mb-5 text-base text-body-color">
              Prices for products are as listed on our website and are subject
              to change without notice.
            </p>
            <p>
              Payment must be made in full at the time of placing the order. We
              accept payment by{" "}
              <a href="https://www.paypal.com/fr/home">Paypal</a> methods.
            </p>
            <p>
              All payments are processed securely through{" "}
              <a href="https://www.paypal.com/fr/home">Paypal</a>.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Returns and Refunds -
            </p>
            <p className="mb-5 text-base text-body-color">
              We accept returns of products within refund days of delivery
              event, subject to our Return Policy.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Limitation of Liability -
            </p>
            <p className="mb-5 text-base text-body-color">
              Our liability for any claim arising out of or in connection with
              the purchase of products shall not exceed the purchase price of
              the products.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">- Entire Agreement -</p>
            <p className="mb-5 text-base text-body-color">
              These Terms constitute the entire agreement between the Customer
              and the Seller with respect to the purchase of products and
              supersede all prior or contemporaneous agreements and
              understandings.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Contact Information -
            </p>
            <p className="mb-5 text-base text-body-color">
              By placing an order on our website, you acknowledge that you have
              read, understood, and agree to be bound by these Terms and our
              other policies referenced herein.
            </p>
          </div>
          <div className="py-8">
            <p className="text-right">Last Updated: {date}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsOfSale;
