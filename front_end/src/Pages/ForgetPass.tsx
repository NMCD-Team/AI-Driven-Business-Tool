import React, { useContext, FormEvent } from "react";
import { AuthContext } from "../Provider/Provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define the interface for what we're using from AuthContext
interface AuthContextType {
  userForgePassword: (email: string) => Promise<any>;
  email?: string;
}

const ForgetPass: React.FC = () => {
  const { userForgePassword, email } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const handleForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('inputEmail') as HTMLInputElement;
    const emailValue = emailInput.value;

    userForgePassword(emailValue)
      .then(() => {
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        form.reset();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h2 className="text-2xl my-10 font-semibold text-center">
        Forget Your Password
      </h2>
      <div className="card mx-auto my-4 border bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleForm} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="inputEmail"
              placeholder="email"
              defaultValue={email}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;