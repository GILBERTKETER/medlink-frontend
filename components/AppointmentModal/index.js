import React, { useState } from "react";
import { Button, Checkbox, Modal, Tag, TextArea } from "@carbon/react";
import ReactDOM from "react-dom";
import "./styles.scss";

const AppointmentModal = ({ onClose, appointmentDetails }) => {
  const [openFirstModal, setOpenFirstModal] = useState(true); 
  const [openProblemModal, setOpenProblemModal] = useState(false); 
  const [openPaymentModal, setOpenPaymentModal] = useState(false); 
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState("Morning");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("");
  const timeSlots = generateTimeSlots(selectedPeriod);

  function generateTimeSlots(period) {
    let slots = [];
    if (period === "Morning") {
      slots = generateMorningSlots();
    } else if (period === "Afternoon") {
      slots = generateAfternoonSlots();
    } else if (period === "Evening") {
      slots = generateEveningSlots();
    }
    return slots;
  }

  function generateMorningSlots() {
    let slots = [];
    for (let i = 9; i <= 12; i++) {
      slots.push(`${i < 10 ? "0" + i : i}:00 am`);
    }
    return slots;
  }

  function generateAfternoonSlots() {
    let slots = [];
    for (let i = 1; i <= 5; i++) {
      slots.push(`${i}:00 pm`);
    }
    return slots;
  }

  function generateEveningSlots() {
    let slots = [];
    for (let i = 5; i <= 8; i++) {
      slots.push(`${i}:00 pm`);
    }
    return slots;
  }

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const handleNextButtonClick = () => {
    setOpenFirstModal(false); 
    setOpenProblemModal(true); 
  };

  const handleBackToBookingClick = () => {
    setOpenFirstModal(true); 
    setOpenProblemModal(false); 
  };

  const handleProblemSubmit = () => {
    setOpenProblemModal(false); 
    setOpenPaymentModal(true); 
  };

  const handleBackToProblemClick = () => {
    setOpenProblemModal(true); 
    setOpenPaymentModal(false); 
  };

  const handlePaymentSubmit = () => {
    console.log("Payment processed successfully");
    setOpenPaymentModal(false); 
    setOpenConfirmationModal(true); 
  };

  const handleConfirmationClose = () => {
    setOpenConfirmationModal(false); 
    onClose(); 
  };

  return (
    <>
      <Modal
        open={openFirstModal}
        modalHeading={`Booking for ${appointmentDetails.doctorName}`}
        modalLabel={appointmentDetails.speciality}
        primaryButtonText="Next"
        secondaryButtonText="Cancel"
        onRequestClose={onClose}
        primaryButtonDisabled={!selectedPeriod || !selectedTime || !selectedConsultationType}
        onRequestSubmit={handleNextButtonClick}
      >
        <p style={{ marginBottom: "1rem" }}>
          You are booking an appointment with Dr.{" "}
          {appointmentDetails.doctorName} on {appointmentDetails.date}.
        </p>
        <section className="booking">
          <section className="appointment-hours">
            <Tag
              className={`period-tag ${
                selectedPeriod === "Morning" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Morning")}
            >
              {"Morning"}
            </Tag>
            <Tag
              className={`period-tag ${
                selectedPeriod === "Afternoon" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Afternoon")}
            >
              {"Afternoon"}
            </Tag>
            <Tag
              className={`period-tag ${
                selectedPeriod === "Evening" ? "selected" : ""
              }`}
              type="outline"
              onClick={() => handlePeriodClick("Evening")}
            >
              {"Evening"}
            </Tag>
          </section>
          <section className="available-time">
            {timeSlots.map((time, index) => (
              <Tag
                key={index}
                className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                type="cool-gray"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Tag>
            ))}
          </section>
          <section className="meeting-type">
            <Checkbox
              labelText={`Video Consultation`}
              id="video"
              checked={selectedConsultationType === "video"}
              onChange={() => setSelectedConsultationType("video")}
            />
            <Checkbox
              labelText={`In person Consultation`}
              id="inPerson"
              checked={selectedConsultationType === "inPerson"}
              onChange={() => setSelectedConsultationType("inPerson")}
            />
          </section>
        </section>
      </Modal>

      <Modal
        open={openProblemModal}
        modalHeading="Describe Your Problem"
        primaryButtonText="Submit"
        secondaryButtonText="Previous"
        onRequestClose={() => setOpenProblemModal(false)}
        onRequestSubmit={handleProblemSubmit}
      >
        <TextArea
          id="problemDescription"
          labelText="Describe your problem:"
          placeholder="Enter your problem description here"
        />
      </Modal>

      <Modal
        open={openPaymentModal}
        modalHeading="Pay with PayPal"
        primaryButtonText="Pay Now"
        secondaryButtonText="Previous"
        onRequestClose={() => setOpenPaymentModal(false)}
        onRequestSubmit={handlePaymentSubmit}
      >
        <p>Placeholder for PayPal integration.</p>
      </Modal>

      <Modal
        open={openConfirmationModal}
        modalHeading="Appointment Booked Successfully"
        secondaryButtonText="Go to dashboard"
        primaryButtonText="View Calender"
        onRequestClose={handleConfirmationClose}
      >
        <div className="success-booking">
          <img src="../../doctor.jpg" alt="doc"/>
        </div>
        <p>
          Your appointment with Dr. {appointmentDetails.doctorName} on{" "}
          {appointmentDetails.date} at {selectedTime} has been successfully booked.
        </p>
      </Modal>
    </>
  );
};

export default AppointmentModal;
