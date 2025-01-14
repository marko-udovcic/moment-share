import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { useForm } from "react-hook-form";
import AuthError from "../components/ui/AuthError";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/apiUsers";
import { useQueryClient } from "@tanstack/react-query";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/login");
      // reset();
    },
  });

  console.log(errors);
  function onSubmit(data) {
    const { password, ...rest } = data;
    mutate({ ...rest, password_hash: password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 lg:w-2/3 mx-4">
        <div className="hidden md:block md:w-1/2 h-[80vh] rounded-xl">
          <img
            src="/images/register.jpg"
            alt="regoster bg"
            className="object-cover w-full h-[80vh] rounded-lg shadow-xl"
          />
        </div>
        <section className="md:w-1/2 p-5 shadow-lg rounded-lg lg:ml-10 w-full flex flex-col justify-between">
          <div className="flex flex-col mt-6">
            <h2 className="text-4xl font-bold mb-2">Create an account</h2>
            <Link to="/login">
              <h3 className="my-5">
                Already have an account? <strong className="text-blue-400 underline">Log in</strong>
              </h3>
            </Link>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {errors?.username?.message && <AuthError>{errors?.username?.message}</AuthError>}
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="border border-gray-600 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
                bg-transparent"
            />
            {errors?.email?.message && <AuthError>{errors?.email?.message}</AuthError>}
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="input-style"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.password?.message && <AuthError>{errors?.password?.message}</AuthError>}

            <input
              type="password"
              id="pass"
              placeholder="Enter your Password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-600 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
                bg-transparent"
            />

            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-[8px] p-2 self-center w-full focus:outline-none mt-8">
              Create account
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
