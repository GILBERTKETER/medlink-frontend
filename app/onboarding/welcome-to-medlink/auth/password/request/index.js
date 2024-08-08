import React, { useState } from 'react';
import '@carbon/react';
import { Button, Form, Heading, TextInput, Loading } from '@carbon/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function PasswordRequest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendResetLink = async (e) => {
    e.preventDefault();
            
    Swal.fire({
      title: "Requesting Reset Link",
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
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/password/reset/', { email });
      if(response.data.success){
        Swal.close();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        Swal.close();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred');
      Swal.close();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="svg-part"></div>
      <div className="form-part">
        <Form aria-label="request-form" className="request-form" onSubmit={sendResetLink}>
          <Heading style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', fontSize: '20px' }}>
            Reset your Password
          </Heading>
          <TextInput
            id="email"
            type="email"
            className="inputs"
            labelText="Enter your Address"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button size="sm" type="submit" className="btns" disabled={isLoading}>
            {isLoading ? (
              <>
                {/* <Loading inline /> */}
        
                <span style={{ marginLeft: "8px" }}>Sending...</span>
              </>
            ) : (
              "Get Reset Link"
            )}
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
}

export default PasswordRequest;