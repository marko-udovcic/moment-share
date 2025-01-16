import { Link } from "react-router-dom";
import "../styles/styles.css";
import { useForm } from "react-hook-form";
import AuthError from "../components/ui/AuthError";
import { useLogin } from "../features/auth/hooks/useLogin";

function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const { username } = user.user_metadata;
  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 lg:w-2/3 mx-4">
        <section className="md:w-1/2 p-5 shadow-lg rounded-lg lg:mr-10 w-full flex flex-col justify-between">
          <div className="flex flex-col mt-6">
            <h2 className="text-center text-4xl font-bold mb-2">Welcome Back </h2>
            <p className="text-center mb-6">Enter your email and password to access your account</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              Sign in
            </button>
          </form>
          <Link to="/register">
            <h3 className="mt-5 text-center">
              Don&apos;t have an account? <strong className="text-blue-400">Sign up</strong>
            </h3>
          </Link>
        </section>

        <div className="hidden md:block md:w-1/2 h-[80vh] rounded-xl">
          <img
            src="/images/login.jpg"
            alt="Login background"
            className="object-cover w-full h-[80vh] rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
