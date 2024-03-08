import React from "react";

const PrivacyPolicy = ({ date }) => {
  return (
    <section>
      <div className="hero-content px-8" data-aos="fade-up">
        <span className="text-darkblue">Đồng Hành Network</span>
        <h1 className="text-4xl">Privacy Policy</h1>
        <hr />
        <p className="mb-8 max-w">
          This Privacy Policy outlines how Đồng Hành Network collects, utilizes,
          and safeguards your personal information when utilizing our website
          www.dong-hang.com to purchase event tickets.
        </p>
        <div
          className="w-full"
          data-aos="zoom-in-up"
          data-aos-duration="500"
          data-aos-offset="200"
        >
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Collection of Personal Information -
            </p>
            <p className="mb-5 text-base text-body-color">
              When utilizing our website and purchasing virtual event tickets,
              we gather the following personal details: - Name - Surname - Age -
              Address - Country - Billing Address - Billing Phone Number - Email
              address - Encrypted password - Order number assigned during online
              purchase with PayPal - Event preferences - Allergies - Payment
              status - Payment date.
            </p>
            <p> We do not retain credit card information.</p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Use of Personal Information -
            </p>
            <p className="mb-5 text-base text-body-color">
              We employ the gathered personal data exclusively for processing
              orders, delivering purchased virtual tickets, and communicating
              event particulars. Additionally, we may employ your data for
              marketing analysis and prospecting purposes.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">- Security of Data -</p>
            <p className="mb-5 text-base text-body-color">
              We implement reasonable security measures to safeguard your
              personal data against loss, misuse, and unauthorized access. Your
              password is stored securely and accessible solely by you.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">- User Rights -</p>
            <p className="mb-5 text-base text-body-color">
              You possess the right to request the deletion of your account and
              personal data at any time by contacting contact@dong-hanh.org. We
              will promptly address such requests in compliance with relevant
              data protection regulations.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Language of the Privacy Policy -
            </p>
            <p className="mb-5 text-base text-body-color">
              Our privacy policy is available exclusively in English, the sole
              accessible language on our website.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Changes to the Privacy Policy -
            </p>
            <p className="mb-5 text-base text-body-color">
              We reserve the right to revise this privacy policy at any time.
              Any alterations will be posted on this page. We advise regular
              review of this policy to remain informed of any updates.
            </p>
          </div>
          <div className="py-8">
            <p className="mb-5 text-lg text-darkblue">
              - Cookies and Tracking Technologies -
            </p>
            <p className="mb-5 text-base text-body-color">
              Our website utilizes cookies to enhance user experience and
              provide essential functionalities, such as account login. These
              cookies are stored on your device for a maximum duration of 1 hour
              to maintain your session. You have the option to manage cookies in
              your browser settings. By using our website, you agree to abide by
              this privacy policy.
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

export default PrivacyPolicy;
