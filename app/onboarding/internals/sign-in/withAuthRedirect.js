"use client";
import { useRouter } from "next/navigation";
import { React, useEffect } from "react";

function WithAuthRedirect({ children }) {
  const router = useRouter();
  useEffect(() => {
    const verifySession = async () => {
      try {
        const sessionId = sessionStorage.getItem("sessionId");
        console.log("Session ID:", sessionId); // Debugging line

        if (!sessionId) {
          console.log("No session ID found, redirecting to sign-in"); // Debugging line
          router.push("../../welcome-to-medlink/auth/sign-in");
        } else {
          const response = await axios.post(
            "http://127.0.0.1:8000/auth/verify-session/",
            { sessionId }
          );
          console.log("Verification response:", response.data); // Debugging line

          if (response.data.valid) {
            console.log("Session is valid, redirecting to home"); // Debugging line
            router.push("/home");
          } else {
            console.log("Invalid session, redirecting to sign-in"); // Debugging line
            // sessionStorage.removeItem("sessionId");
            // router.push("../../welcome-to-medlink/auth/sign-in");
          }
        }
      } catch (error) {
        console.error("Error verifying session:", error);
        // sessionStorage.removeItem("sessionId");
        // router.push("../../welcome-to-medlink/auth/sign-in");
      }
    };

    verifySession();
  }, [router]);

  return <div>{children}</div>;
}

export default WithAuthRedirect;
