import React from "react";
import toast from "react-hot-toast";

const DonateForm = () => {
  const handleForm =(e) =>{
      e.preventDefault()
      e.target.reset()
      toast.success('Thank you ! We will reach your destination soon.🎁💝')
  }
  return (
    <div onSubmit={handleForm}>
      <form className="card-body pt-4 pb-8">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity of items</span>
          </label>
          <input
            type="text"
            placeholder="Ex: 2 jackets, 3 blankets"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Item type</span>
          </label>
          <input
            type="text"
            placeholder="Ex: blanket, jacket, sweater"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pickup location</span>
          </label>
          <input
            type="text"
            placeholder="Ex: House 12, Road 5, Dhanmondi, Dhaka"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-ghost bg-sky-500">Donate</button>
        </div>
      </form>
    </div>
  );
};

export default DonateForm;
