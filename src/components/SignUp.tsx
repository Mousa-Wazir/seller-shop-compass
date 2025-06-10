
import { useState } from "react";
import { UserPlus, Mail, Lock, Eye, EyeOff, User, Store, Phone, Calendar, Users } from "lucide-react";

const SignUp = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("seller");
  const [signUpMethod, setSignUpMethod] = useState("email");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Sign up attempt:", { accountType, signUpMethod, formData });
    alert("Account created successfully!");
    onSignUpSuccess();
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider} as ${accountType}`);
    alert(`Account created with ${provider}!`);
    onSignUpSuccess();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-black">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-black">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our marketplace today
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sign up as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAccountType("seller")}
                className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-colors ${
                  accountType === "seller"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Store className="h-5 w-5 mr-2" />
                Seller
              </button>
              <button
                onClick={() => setAccountType("customer")}
                className={`flex items-center justify-center px-4 py-3 border rounded-lg transition-colors ${
                  accountType === "customer"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Customer
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Method Selection */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSignUpMethod("email")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                signUpMethod === "email"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Email & Details
            </button>
            <button
              onClick={() => setSignUpMethod("social")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                signUpMethod === "social"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Social Sign Up
            </button>
          </div>
        </div>

        {signUpMethod === "email" ? (
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                      placeholder="First name"
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                      placeholder="Last name"
                    />
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter phone number"
                  />
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    />
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Create password"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Confirm password"
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                Create {accountType} account
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-4">
            <h3 className="text-center text-lg font-medium text-gray-900 mb-6">
              Sign up with social account
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSocialSignUp("google")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <img
                  className="h-5 w-5 mr-3"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                />
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialSignUp("facebook")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  f
                </div>
                Continue with Facebook
              </button>

              <button
                onClick={() => handleSocialSignUp("twitter")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Continue with Twitter
              </button>

              <button
                onClick={() => handleSocialSignUp("tiktok")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Continue with TikTok
              </button>

              <button
                onClick={() => handleSocialSignUp("phone")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-3 text-gray-600" />
                Continue with Phone Number
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="font-medium text-black hover:text-gray-800">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
