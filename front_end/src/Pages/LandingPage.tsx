import React, { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import MultiStepForm, { FormStep } from "../components/MultiStepForm";
import InputField from "../components/InputField";
import * as yup from "yup";

// Validation schemas
const validationSchemaStep1 = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
});

const validationSchemaStep2 = yup.object({
  companyName: yup.string().required("Company Name is required"),
  industry: yup.string().required("Industry is required"),
  yearsInBusiness: yup.number().required("Years in business is required"),
  numberOfEmployees: yup.number().required("Number of employees is required"),
  annualRevenue: yup.number().required("Annual revenue is required"),
  geoLocation: yup.string().required("Geographic location is required"),
});

const validationSchemaStep3 = yup.object({
  productCount: yup.string().required("Product/Service description is required"),
  performanceDetails: yup.string().required("Performance description is required"),
  challenges: yup.string().required("Challenges are required"),
  vision: yup.string().required("Vision is required"),
  goals: yup.string().required("Goals are required"),
  achievements: yup.string().required("Achievements are required"),
});

const LandingPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="md:text-4xl text-2xl text-slate-700 font-bold py-10">
        Welcome, {user ? user.name : "Test User"}
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
        {/* Step 1: Personal Info */}
        <FormStep
          stepName="Personal Info"
          validationSchema={validationSchemaStep1}
        >
          <div style={{ padding: '80px' }}>
            <InputField name="name" label="Full Name" variant={"outlined"} />
            <InputField name="email" label="Email Address" variant={"outlined"} />
            <InputField name="phone" label="Phone Number" variant={"outlined"} />
          </div>
        </FormStep>

        {/* Step 2: Business Info */}
        <FormStep
          stepName="Business Info"
          validationSchema={validationSchemaStep2}
        >
          <InputField name="companyName" label="Company Name" variant="outlined" />
          <InputField name="industry" label="Industry/Niche" variant="outlined" />
          <InputField name="yearsInBusiness" label="Years in Business" variant="outlined" />
          <InputField name="numberOfEmployees" label="Number of Employees" variant={"outlined"} />
          <InputField name="annualRevenue" label="Annual Revenue" variant={"outlined"} />
          <InputField name="geoLocation" label="Geographic Location" variant={"outlined"} />
        </FormStep>

        {/* Step 3: Business Questionnaire */}
        <FormStep
          stepName="Business Questionnaire"
          validationSchema={validationSchemaStep3}
        >
          <InputField name="productCount" label="Main products/services offered" variant={"outlined"} />
          <InputField name="performanceDetails" label="Current performance and profitability" variant={"outlined"} />
          <InputField name="challenges" label="Biggest challenges faced" variant={"outlined"} />
          <InputField name="vision" label="Vision for the future" variant={"outlined"} />
          <InputField name="goals" label="Short-term and long-term goals" variant={"outlined"} />
          <InputField name="achievements" label="Specific outcomes or achievements for success" variant={"outlined"} />
        </FormStep>
      </MultiStepForm>
    </div>
  );
};

export default LandingPage;
