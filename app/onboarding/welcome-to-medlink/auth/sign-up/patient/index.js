"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../../internals/header/index";
import BackBtn from "../../../../../../components/Button/back";
import Image from "next/image";
import Footer from "../../../../../../components/more-inquiry";
import {
  Button,
  Select,
  SelectItem,
  TextInput,
  Form,
  DatePicker,
  DatePickerInput,
  ProgressBar,
  Heading,
  Checkbox,
  Stack,
  PasswordInput,
  Loading,
} from "@carbon/react";
import { PatientProgressSteps } from "../progress";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@carbon/icons-react";

function PatientRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [patientData, setPatientData] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
    emergency_contact_email: "",
    current_health_conditions: "",
    past_medical_history: "",
    allergies: "",
    current_medications: "",
    primary_care_physician: "",
    family_health_conditions: "",
    lifestyle_habits: "",
    exercise_routine: "",
    dietary_habits: "",
    insurance_provider: "",
    policy_number: "",
    insurance_phone: "",
    consent_to_treat: false,
    privacy_policy: false,
    password: "",
    confirm_password: "",
    enable_2fa: false,
  });

  const totalSteps = 7;

  useEffect(() => {
    const savedData = localStorage.getItem("patientData");
    if (savedData) {
      setPatientData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    const updatedData = {
      ...patientData,
      [id]: type === "checkbox" ? checked : value,
    };
    setPatientData(updatedData);
    localStorage.setItem("patientData", JSON.stringify(updatedData));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep > 6) {
      return;
    }
    setIsSubmitting(true);
    Swal.fire({
      title: "Adding you to Medlink",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        fetch("http://127.0.0.1:8000/api/patients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Swal.close();
            toast.success("Registration successful! Redirecting to home...");
            localStorage.removeItem("patientData");
            window.location.href = "/home";
          })
          .catch((error) => {
            Swal.close();
            toast.error("Registration failed. Please try again.");
            console.error("There was an error!", error);
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      },
    });
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextInput
              id="name"
              type="text"
              className="inputs"
              labelText="Name"
              onChange={handleChange}
              value={patientData.name}
            />
            <DatePicker datePickerType="single" dateFormat="Y-m-d">
              <DatePickerInput
                id="date_of_birth"
                labelText="Date of Birth"
                placeholder="MM/DD/YYYY"
                onChange={handleChange}
                value={patientData.date_of_birth}
              />
            </DatePicker>
            <TextInput
              id="gender"
              type="text"
              className="inputs"
              labelText="Gender"
              onChange={handleChange}
              value={patientData.gender}
            />
            <Stack gap={6} orientation="horizontal">
              <TextInput
                id="email"
                type="text"
                className="inputs"
                labelText="Contact Information (email)"
                onChange={handleChange}
                value={patientData.email}
              />
              <TextInput
                id="phone_number"
                type="text"
                className="inputs"
                labelText="Contact Information (Phone number)"
                onChange={handleChange}
                value={patientData.phone_number}
              />
            </Stack>
            <TextInput
              id="address"
              type="text"
              className="inputs"
              labelText="Address"
              onChange={handleChange}
              value={patientData.address}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInput
              id="emergency_contact_name"
              type="text"
              className="inputs"
              labelText="Emergency Contact Name"
              onChange={handleChange}
              value={patientData.emergency_contact_name}
            />
            <TextInput
              id="emergency_contact_relationship"
              type="text"
              className="inputs"
              labelText="Emergency Contact Relationship"
              onChange={handleChange}
              value={patientData.emergency_contact_relationship}
            />
            <TextInput
              id="emergency_contact_phone"
              type="text"
              className="inputs"
              labelText="Emergency Contact Phone Number"
              onChange={handleChange}
              value={patientData.emergency_contact_phone}
            />
            <TextInput
              id="emergency_contact_email"
              type="text"
              className="inputs"
              labelText="Emergency Contact Email"
              onChange={handleChange}
              value={patientData.emergency_contact_email}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              id="current_health_conditions"
              type="text"
              className="inputs"
              labelText="Current Health Conditions"
              onChange={handleChange}
              value={patientData.current_health_conditions}
            />
            <TextInput
              id="past_medical_history"
              type="text"
              className="inputs"
              labelText="Past Medical History (major illnesses, surgeries)"
              onChange={handleChange}
              value={patientData.past_medical_history}
            />
            <TextInput
              id="allergies"
              type="text"
              className="inputs"
              labelText="Allergies (medications, food, environmental)"
              onChange={handleChange}
              value={patientData.allergies}
            />
            <TextInput
              id="current_medications"
              type="text"
              className="inputs"
              labelText="Medications Currently Taking (name, dosage)"
              onChange={handleChange}
              value={patientData.current_medications}
            />
            <TextInput
              id="primary_care_physician"
              type="text"
              className="inputs"
              labelText="Primary Care Physician (name, contact)"
              onChange={handleChange}
              value={patientData.primary_care_physician}
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              id="family_health_conditions"
              type="text"
              className="inputs"
              labelText="Health Conditions that Run in the Family (e.g., diabetes, heart disease)"
              onChange={handleChange}
              value={patientData.family_health_conditions}
            />
          </>
        );
      case 4:
        return (
          <>
            <TextInput
              id="lifestyle_habits"
              type="text"
              className="inputs"
              labelText="Lifestyle Habits (smoking, alcohol use)"
              onChange={handleChange}
              value={patientData.lifestyle_habits}
            />
            <TextInput
              id="exercise_routine"
              type="text"
              className="inputs"
              labelText="Exercise Routine"
              onChange={handleChange}
              value={patientData.exercise_routine}
            />
            <TextInput
              id="dietary_habits"
              type="text"
              className="inputs"
              labelText="Dietary Habits"
              onChange={handleChange}
              value={patientData.dietary_habits}
            />
          </>
        );
      case 5:
        return (
          <>
            <TextInput
              id="insurance_provider"
              type="text"
              className="inputs"
              labelText="Insurance Provider"
              onChange={handleChange}
              value={patientData.insurance_provider}
            />
            <TextInput
              id="policy_number"
              type="text"
              className="inputs"
              labelText="Policy Number"
              onChange={handleChange}
              value={patientData.policy_number}
            />
            <TextInput
              id="insurance_phone"
              type="text"
              className="inputs"
              labelText="Insurance Company Phone Number"
              onChange={handleChange}
              value={patientData.insurance_phone}
            />
          </>
        );
      case 7:
        return (
          <>
            <Heading
              style={{
                marginBottom: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Please review the following consent and authorization information.
              You must agree to the terms to proceed with the treatment and
              ensure compliance with privacy policies.
            </Heading>
            <Checkbox
              id="consent_to_treat"
              labelText="I give my consent to be treated."
              helperText="By checking this box, you agree to allow our medical team to provide necessary treatment."
              onChange={handleChange}
              checked={patientData.consent_to_treat}
            />
            <Checkbox
              id="privacy_policy"
              labelText="I acknowledge the privacy policy (HIPAA compliance)."
              helperText="By checking this box, you acknowledge that you have read and understood our privacy policy in compliance with HIPAA regulations."
              onChange={handleChange}
              checked={patientData.privacy_policy}
            />
          </>
        );
      case 6:
        return (
          <>
            <Heading
              style={{
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Create a Secure Password
            </Heading>
            <PasswordInput
              id="password"
              labelText="New Password"
              helperText="Your password must meet the following criteria: at least 8 characters long, include both uppercase and lowercase letters, and contain at least one number and one special character."
              autoComplete="off"
              onChange={handleChange}
              value={patientData.password}
            />
            <PasswordInput
              id="confirm_password"
              labelText="Confirm Password"
              helperText="Ensure this matches your new password."
              autoComplete="off"
              onChange={handleChange}
              value={patientData.confirm_password}
            />
            <Checkbox
              id="enable_2fa"
              labelText="Enable Two-Factor Authentication (2FA)"
              helperText="By selecting this option, you agree to enhance your account security by enabling two-factor authentication."
              onChange={handleChange}
              checked={patientData.enable_2fa}
            />
          </>
        );
      default:
        return null;
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="patient-reg">
      <ToastContainer />
      <div className="reg-body">
        <Header>
          <section className="flex-left">
            <Image
              width={70}
              height={70}
              alt="logo"
              src={"../../../../../../logov2.svg"}
            />
            <Link
              href={"../../auth/sign-up"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
              onClick={()=>setIsLoading(true)}
            >
              {isLoading ? (
                <>
                  <Loading withOverlay={false} small /> Back
                </>
              ) : (
                <>
                  <BackBtn /> Back
                </>
              )}{" "}
            </Link>
          </section>
          <h4>Patient Registration</h4>
        </Header>
        <section className="reg-form">
          <div className="svg-part"></div>
          <div className="cont">
            <h4 className="reg-title">Register Patient Account</h4>
            <h4>Please fill in your details.</h4>
            <div className="my-form">
              {isSubmitting ? (
                <div className="signin-progress"></div>
              ) : (
                <Form
                  aria-label="Registration form"
                  className="form"
                  onSubmit={handleSubmit}
                >
                  {renderFormFields()}
                  <div className="flex-btns">
                    <Button
                      kind="secondary"
                      size="sm"
                      renderIcon={ArrowLeft}
                      className="some-class"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    {currentStep < totalSteps - 1 ? (
                      <Button
                        kind="secondary"
                        size="sm"
                        renderIcon={ArrowRight}
                        className="some-class"
                        type="button"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        kind="primary"
                        size="sm"
                        className="some-class"
                        type="submit"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </div>
          </div>
          {/* <Footer /> */}
        </section>
      </div>
      <section className="reg-progress">
        <PatientProgressSteps currentStep={currentStep} />
      </section>
    </div>
  );
}

export default PatientRegistration;
