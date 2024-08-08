import React from "react";
import Layout from "./layout";
import WithAuthRedirect from "../onboarding/internals/sign-in/withAuthRedirect";
function page() {
  const HomeRedirects = WithAuthRedirect(
    <Layout defaSelected="Dashboard"></Layout>
  );
  return (
    <div>
      <HomeRedirects />
    </div>
  );
}

export default page;
