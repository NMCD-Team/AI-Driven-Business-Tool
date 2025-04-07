import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import MultiStepForm, { FormStep } from "../components/MultiStepForm";
import InputField from "../components/InputField";
import * as yup from "yup";


const validationSchemaStep1 = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required")
});

const validationSchemaStep2 = yup.object({
  name: yup.string().required("Street is required"),
  email: yup.string().required("Country is required")
});

const LandingPage = () => {

  const { user } = useContext(AuthContext);
    


  return (
    <div className="flex flex-col items-center  min-h-screen">
        <h1 className="md:text-4xl text-2xl text-slate-700 font-bold py-10">
          Welcome, Test User<span className="text-sky-500">{user?.name}</span>
        </h1>

        <h1 className="md:text-4xl text-2xl text-slate-700 font-bold py-10">
          Let's get started with your business
        </h1>

        <MultiStepForm
        initialValues={{ name: "", email: "", street: "", country: "" }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <FormStep
          stepName="Personal Info"
          onSumbit={() => console.log("Step1 submit")}
          validationSchema={validationSchemaStep1}
        >
          <div style={{ padding: '80px'}}>
          <InputField style={{ padding: '5px'}} name="name" label="Full Name"  />
          <InputField style={{ padding: '5px'}} name="email" label="Email Address" />
          <InputField style={{ padding: '5px'}} name="phone" label="Phone Number" />
          </div>
        </FormStep>
        <FormStep
          stepName="Business Info"
          onSumbit={() => console.log("Step2 submit")}
          validationSchema={validationSchemaStep2}
        >
       <InputField style={{ padding: '5px' }} name="companyName" label="Company Name" />
          <InputField style={{ padding: '5px' }} name="industry" label="Enter Industry/Niche" />
          <InputField style={{ padding: '5px' }} name="yearsInBusiness" label="Years in Business" />
          <InputField style={{ padding: '5px' }} name="numberOfEmployees" label="Number of Employees" />
          <InputField style={{ padding: '5px' }} name="annualRevenue" label="Annual Revenue" />
          <InputField style={{ padding: '5px' }} name="geoLocation" label="Geographic Location" />
        </FormStep>

        <FormStep
          stepName="Business Questionaire"
          onSumbit={() => console.log("Step2 submit")}
          validationSchema={validationSchemaStep2}
        >
          <InputField style={{ padding: '5px' }} name="productCount" label="What are the main products/services offered by your business ?" />
          <InputField style={{ padding: '5px' }} name="performanceDetails" label="How would you describe the current performance and profitability of your business?" />
          <InputField style={{ padding: '5px' }} name="challenges" label="What are the biggest challenges or obstacles you currently face in your business?" />
          <InputField style={{ padding: '5px' }} name="vision" label="What is your vision for the future of your business? Where do you see your business in the next 1-3 years?" />
          <InputField style={{ padding: '5px' }} name="goals" label="What are your primary goals and objectives for your business in the short term (next 6-12 months) and long term (next 1-3 years)?" />
          <InputField style={{ padding: '5px' }} name="achievements" label="What specific outcomes or achievements would indicate success for your business?" />
        </FormStep>
      </MultiStepForm>

    </div>
  );
};

export default LandingPage;
