import React from "react";

const HowItIs: React.FC = () => {
  return (
    <div>
      <div className="mx-auto mt-6">
        <div className="divide-y divide-gray-100 space-y-2">
          <details
            className="group bg-base-200 p-3 rounded-lg"
            data-aos="fade-up"
            data-aos-duration="1500"
            open
          >
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500">
              Get Your Report in a Few Simple Steps
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="block h-5 w-5 group-open:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="hidden h-5 w-5 group-open:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-4 text-secondary-500">
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <h3 className="font-semibold text-lg text-gray-600">
                    Step 1: Sign Up or Log In
                  </h3>
                  <p className="text-gray-700">
                    Create an account or log in to access all features.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg text-gray-600">
                    Step 2: Complete the Questionnaire
                  </h3>
                  <p className="text-gray-700">
                    Provide the required details by answering a few simple
                    questions.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg text-gray-600">
                    Step 3: Submit and Receive Your Report
                  </h3>
                  <p className="text-gray-700">
                    Submit your responses to receive a customized analysis
                    report.
                  </p>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default HowItIs;
