import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import axios from "axios";
import toast from "react-hot-toast";

const Modal = ({ id }) => {
  const { user } = useContext(AuthContext);

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1");
    if (modal) modal.close();
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const userEmail = user.email;
    const itemId = id;
    const status = "Successful"
    const isDelete = false;
    const donationData = {
      ...data,
      userEmail,
      itemId,
      status,
      isDelete
    };

    axios.post("https://backend-winter-aid.vercel.app/donation", donationData).then((res) => {
      toast.success('🎉 Thank You! Your donation was successful')
      closeModal()
    });
  };

  return (
    <div>
      <div>
        {/* Modal */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {/* Donate to {campaignName} */}
                Donate to
              </h2>
              <form onSubmit={handleDonate} className="space-y-6">
                {/* Donor Name */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="donorName"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    name="donorName"
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Donor Email */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="donorEmail"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    name="donorEmail"
                    placeholder="Enter your email"
                    className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Donation Amount */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="donationAmount"
                  >
                    Donation Amount (৳)
                  </label>
                  <input
                    type="number"
                    id="donationAmount"
                    name="donationAmount"
                    placeholder="Enter amount"
                    className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    min="1"
                  />
                </div>

                {/* Donation Message */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="donationMessage"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="donationMessage"
                    name="donationMessage"
                    placeholder="Write a message (optional)"
                    className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition duration-150"
                  >
                    Donate Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Modal;

{
  /* <form onSubmit={handleRecoveredFrom}>
<div className="grid grid-cols-1 gap-6"> */
}
{
  /* Recovered Location */
}
{
  /* <div>
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor="recovered_location"
    >
      Recovered Location
    </label>
    <input
      id="recovered_location"
      name="recovered_location"
      type="text"
      placeholder="Enter the location"
      className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div> */
}

{
  /* Recovery Date */
}
{
  /* <div>
    <label className="block text-sm font-medium text-gray-700">
      Date Recovered
    </label>
    <DatePicker
      className="mt-1 w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      selected={recoveryDate}
      onChange={(date) => setRecoveryDate(date)}
    />
  </div> */
}

{
  /* Recovered Person Info */
}
{
  /* <div>
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor="recovered_name"
    >
      Recovered Person Name
    </label>
    <input
      id="recovered_name"
      type="text"
      value={user?.displayName || "N/A"}
      readOnly
      className="mt-1 block w-full px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
    />
  </div>
  <div>
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor="recovered_email"
    >
      Recovered Person Email
    </label>
    <input
      id="recovered_email"
      type="email"
      value={user?.email || "N/A"}
      readOnly
      className="mt-1 block w-full px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
    />
  </div>
  <div>
    <label
      className="block text-sm font-medium text-gray-700"
      htmlFor="recovered_image"
    >
      Recovered Person Image
    </label>
    <div className="mt-2 flex items-center gap-4">
      <img
        src={user?.photoURL || "https://via.placeholder.com/50"}
        alt="Recovered Person"
        className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
      />
      <span className="text-sm text-gray-500">
        Image of the recovered person
      </span>
    </div>
  </div>
</div> */
}

{
  /* Submit Button */
}
{
  /* <div className="flex justify-end mt-6">
  <button
    type="submit"
    onClick={closeModal}
    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-150"
  >
    Submit
  </button>
</div>
</form> */
}
