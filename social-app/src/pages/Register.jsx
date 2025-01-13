import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 lg:w-2/3 mx-4">
        <div className="hidden md:block md:w-1/2 h-[80vh] rounded-xl">
          <img
            src="/images/register.jpg"
            alt="Login background"
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
          <form className="flex flex-col gap-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="border border-gray-600 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
                bg-transparent"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="border border-gray-600 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
                bg-transparent"
            />
            <input
              type="password"
              id="pass"
              placeholder="Enter your Password"
              className="border border-gray-600 text-white p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none
                bg-transparent"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-[8px] p-2 self-center w-full focus:ring-4 focus:ring-blue-300
                focus:outline-none mt-8"
            >
              Create account
            </button>
          </form>
        </section>

        {/* Image Section */}
      </div>
    </div>
  );
}

export default Register;
