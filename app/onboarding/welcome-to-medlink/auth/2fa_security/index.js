import { React, useState } from "react";
import "@carbon/react";
import { Button, Form, Heading, TextInput, Loading } from "@carbon/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const verify2Fa = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Verifying 2FA",
      text: "Please wait...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/verify_2fa/`, { email, code }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      Swal.close();

      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        toast.success('2FA verified successfully.');
        
        Swal.fire({
          title: "Redirecting",
          text: "Please wait while we redirect you...",
          imageUrl: "/logov2.svg",
          imageWidth: 70,
          imageHeight: 70,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        setTimeout(() => {
          Swal.close();
          router.push('/onboarding/welcome-to-medlink/auth/2fa_security/verified');
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      Swal.close();
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
      toast.error('An error occurred during 2FA verification.');
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/resend-2fa-code/`, { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('2FA code resent. Please check your email.');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('An error occurred while resending the 2FA code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="form">
      <ToastContainer />
      <div className="svg-part"></div>
      <div className="form-part">
        <Form
          aria-label="request-form"
          className="fa-form"
          onSubmit={verify2Fa}
        >
          <Heading
            style={{
              textAlign: "left",
              width: "100%",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Two Factor Authentication
          </Heading>
          <Heading>
            You are seeing this feature because you enabled two-factor
            authentication. You can disable this in your account settings.
          </Heading>
          <TextInput
            id="code"
            type="number"
            className="inputs"
            labelText="Enter the code"
            placeholder="Enter your 2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex-btnss">
            <Button size="sm" type="submit" className="btns">
              Proceed
            </Button>
            <Heading 
              style={{cursor: "pointer", display: "flex", alignItems: "center"}} 
              onClick={resendCode}
            >
              {isResending ? (
                <>
                  <Loading small withOverlay={false} />
                  <span style={{marginLeft: "8px"}}>Resending...</span>
                </>
              ) : (
                "Resend 2FA code"
              )}
            </Heading>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </Form>
      </div>
    </div>
  );
}

export default TwoFactorAuth;