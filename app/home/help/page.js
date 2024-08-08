"use client";

import React from "react";
import Help from "./index";
import Layout from "../layout";
function page() {
  return (
    <div>
      <Layout defaultSelected={'Help'}>
        <Help />
      </Layout>
    </div>
  );
}

export default page;
