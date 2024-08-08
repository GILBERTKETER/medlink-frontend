import React from "react";
import SignIn from "./index.js";
import "./styles.scss";
import WithAuthRedirect from "@/app/onboarding/internals/sign-in/withAuthRedirect.js";
function page() {
  return (
    <div>
      <WithAuthRedirect>
        <SignIn />
      </WithAuthRedirect>
    </div>
  );
}

export default page;
