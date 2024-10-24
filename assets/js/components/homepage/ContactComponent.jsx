import React, { useState } from "react";
import axios from "axios";
import Modal from "@components/ModalComponent";
import Recaptcha from "./RecaptchaComponent";

const ContactSection = ({ onError }) => {
  const [isChecked, setChecked] = useState(false);
  const [isDefaultModalVisible, setIsDefaultModalVisible] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!isChecked) {
        return;
      }

      const response = await axios.post("/api/mailer/send", formData);

      if (response.status === 200) {
        // window.location.href = "/response/success/contact";
      } else {
        onError("Error sending email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      onError("Error sending email.");
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const handleOpenDefaultModal = () => {
    setIsDefaultModalVisible(true);
  };

  return (
    <section className="contact" id="contact">
      <form method="POST" className="needs-validation">
        <div className="container wrapper-element m-auto bg-cream p-12 rounded-xl">
          <div className="w-full">
            <span>Any questions ?</span>
            <h1>Contact</h1>
            <hr className="solid" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Nguyễn"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="Thanh Việt"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="your.email@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}+"
                    placeholder="123-456-7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  Subject
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Informations on registration"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-darkblue"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-darkblue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Hello,
                    I am interested in your services and would like to learn more about Đồng Hành Network. Could you provide detailed information about your events and services ?
                    Thank you in advance for your response.
                    Best regards,
                    Thanh Việt Nguyễn."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-x-4 sm:col-span-2 mx-auto">
                <div className="flex h-6 items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={handleCheckboxChange}
                      checked={isChecked}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-whitesmoke after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cognac"></div>
                  </label>
                </div>
                <p
                  className="text-sm leading-6 text-gray-600"
                  id="switch-1-label"
                >
                  By selecting this, you agree to our{" "}
                  <a
                    href="/privacy_policy"
                    className="font-semibold text-cognac hover:underline"
                    // onClick={handleOpenDefaultModal}
                  >
                    privacy&nbsp;policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="grid gap-2 justify-content-end">
              <button
                type="button"
                disabled={!isChecked}
                className="animation-hover uppercase text-white bg-darkblue hover:bg-forest font-medium rounded-full text-sm px-4 py-2 text-center mt-5 disabled:hover:bg-darkblue disabled:opacity-25"
                onClick={handleSubmit}
              >
                Send
                <i className="ml-3 text-cream fa-regular fa-envelope ms-2"></i>
              </button>
            </div>
          </div>
          <Recaptcha />
        </div>
      </form>
      {isDefaultModalVisible && (
        <Modal
          id="default-modal"
          title="Privacy Policy"
          content={[
            "By selecting this, you acknowledge and agree to our Privacy Policy.",
            "We respect your privacy and assure you that the information you provide will be handled with confidentiality. It will only be used for the purpose of communication and will not be shared with third parties without your consent.",
            "If you have any concerns or questions about our privacy practices, please feel free to contact us.",
          ]}
          onClose={() => setIsDefaultModalVisible(false)}
        />
      )}
    </section>
  );
};

export default ContactSection;
