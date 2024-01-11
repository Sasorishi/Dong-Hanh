import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import TicketInformation from "../../components/register/TicketInformationComponent";
import Stepper from "../../components/register/StepperComponent";
import Modal from "../../components/ModalComponent";

const Register = () => {
  const [tickets, setTickets] = useState(null);
  const [ticketsData, setTicketsData] = useState({});

  const { eventId, numTickets } = useParams();
  const navigate = useNavigate();

  const [isCheckbox1Checked, setCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setCheckbox2Checked] = useState(false);
  const [isConfirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

  const [isDefaultModalVisible, setIsDefaultModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/checkout", {
      state: {
        eventId: eventId,
        numTickets: numTickets,
        ticketsData: ticketsData,
      },
    });
    window.scrollTo(0, 0);
  };

  const handleCheckbox1Change = (e) => {
    setCheckbox1Checked(e.target.checked);
  };

  const handleCheckbox2Change = (e) => {
    setCheckbox2Checked(e.target.checked);
  };

  const handleOpenDefaultModal = () => {
    setIsDefaultModalVisible(true);
  };

  const handleOpenSecondModal = () => {
    setIsSecondModalVisible(true);
  };

  useEffect(() => {
    const ticketComponents = Array.from({ length: numTickets }, (_, index) => (
      <TicketInformation
        key={index}
        ticketKey={index + 1}
        onTicketsDataChange={(key, data) =>
          setTicketsData((prevData) => ({ ...prevData, [key]: data }))
        }
      />
    ));

    const parsedNumTickets = parseInt(numTickets, 10);

    if (
      isNaN(parsedNumTickets) ||
      parsedNumTickets < 1 ||
      parsedNumTickets > 15
    ) {
      navigate("/");
    }

    setTickets(ticketComponents);
    setConfirmButtonDisabled(!(isCheckbox1Checked && isCheckbox2Checked));
  }, [isCheckbox1Checked, isCheckbox2Checked]);

  return (
    <section className="bg-white">
      {Stepper()}
      <div className="py-24 sm:py-32 px-6 lg:px-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          {tickets}
          <div className="flex items-center justify-center mt-6">
            <input
              id="link-checkbox-1"
              type="checkbox"
              checked={isCheckbox1Checked}
              onChange={handleCheckbox1Change}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="link-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <span
                className="text-blue-600 hover:underline text-sm font-medium "
                onClick={handleOpenDefaultModal}
              >
                the accident waiver and release of liability.
              </span>
              .
            </label>
          </div>
          <div className="flex items-center justify-center mt-6">
            <input
              id="link-checkbox-2"
              type="checkbox"
              checked={isCheckbox2Checked}
              onChange={handleCheckbox2Change}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="link-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <span
                className="text-blue-600 hover:underline text-sm font-medium "
                onClick={handleOpenSecondModal}
              >
                parent / guardian waiver for minors.
              </span>
              .
            </label>
          </div>
          {isDefaultModalVisible && (
            <Modal
              id="default-modal"
              title="The parent / guardian waiver for minors (Under 18 years old)"
              content={[
                "The undersigned parent and natural guardian does hereby represent that he/she is, in fact, acting in such capacity, has consented to his/her child or ward’s participation in the activity or event, and has agreed individually and on behalf of the child or ward, to the terms of the accident waiver and release of liability set forth above",
                "The undersigned parent or guardian further agrees to save and hold harmless and indemnify each and all of the parties referred to above from all liability, loss, cost, claim, or damage whatsoever which may be imposed upon said parties because of any defect in or lack of such capacity to so act and release said parties on behalf of the minor and the parents or legal guardian.",
              ]}
              onClose={() => setIsDefaultModalVisible(false)}
            />
          )}

          {isSecondModalVisible && (
            <Modal
              id="second-modal"
              title="The accident waiver and release of liability"
              content={[
                "I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING AND/OR VOLUNTEERING IN THIS ACTIVITY OR EVENT, including by way of example and not limitation, any risks that may arise from negligence or carelessness on the part of the persons or entities being released, from dangerous or defective equipment or property owned, maintained, or controlled by them, or because of their possible liability without fault.",
                "I certify that I am physically fit, have sufficiently prepared or trained for participation in the activity or event, and have not been advised to not participate by a qualified medical professional. I certify that there are no health-related reasons or problems which preclude my participation in this activity or event. I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders, sponsors, and organizers of the activity or event in which I may participate, and that it will govern my actions and responsibilities at said activity or event.",
                "In consideration of my application and permitting me to participate in this event, I hereby take action for myself, my executors, administrators, heirs, next of kin, successors, and assigns as follows:",
                "(A) I WAIVE, RELEASE, AND DISCHARGE from any and all liability, including but not limited to, liability arising from the negligence or fault of the entities or persons released, for my death, disability, personal injury, property damage, property theft, or actions of any kind which may hereafter occur to me including my traveling to and from this event, THE FOLLOWING ENTITIES OR PERSONS: DONG HANH and/or their directors, officers, employees, volunteers, representatives, and agents, the activity or event holders, activity or event sponsors, activity or event volunteers;",
                "(B) I INDEMNIFY, HOLD HARMLESS, AND PROMISE NOT TO SUE the entities or persons mentioned in this paragraph from any and all liabilities or claims made as a result of participation in this activity or event, whether caused by the negligence of release or otherwise.",
                "I acknowledge that DONG HANH and their directors, officers, volunteers, representatives, and agents are NOT responsible for the errors, omissions, acts, or failures to act of any party or entity conducting a specific event or activity on behalf of Đồng Hành Network.",
                "I acknowledge that this activity or event may involve a test of a person’s physical and mental limits and may carry with it the potential for death, serious injury, and property loss. The risks may include, but are not limited to, those caused by terrain, facilities, temperature, weather, condition of participants, equipment, vehicular traffic, actions of other people, including, but not limited to, participants, volunteers, spectators, coaches, event officials, and event monitors, and/or producers of the event, and lack of hydration. These risks are not only inherent to participants but are also present for volunteers.",
                "I hereby consent to receive medical treatment that may be deemed advisable in the event of injury, accident, and/or illness during this activity or event.",
                "I understand that at this event or related activities, I may be photographed. I agree to allow my photo, video, or film likeness to be used for any legitimate purpose by the event holders, producers, sponsors, organizers, and assigns. The accident waiver and release of liability shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law.",
              ]}
              onClose={() => setIsSecondModalVisible(false)}
            />
          )}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isConfirmButtonDisabled}
              className="rounded-md bg-darkblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-darkblue disabled:opacity-25"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
