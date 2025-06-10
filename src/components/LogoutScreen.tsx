
import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, User, Store } from "lucide-react";

const LogoutScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("seller");
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", { accountType, loginMethod, formData });
    // Here you would handle the actual sign-in logic
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider} as ${accountType}`);
    // Here you would handle social sign-in
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-black">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-black">
            You have been logged out
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in again to continue
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sign in as:
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

        {/* Login Method Selection */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                loginMethod === "email"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setLoginMethod("social")}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                loginMethod === "social"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Social Login
            </button>
          </div>
        </div>

        {loginMethod === "email" ? (
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-4">
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-gray-800">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                Sign in as {accountType}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-4">
            <h3 className="text-center text-lg font-medium text-gray-900 mb-6">
              Sign in with social account
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSocialSignIn("google")}
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
                onClick={() => handleSocialSignIn("facebook")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  f
                </div>
                Continue with Facebook
              </button>

              <button
                onClick={() => handleSocialSignIn("twitter")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Continue with Twitter
              </button>

              <button
                onClick={() => handleSocialSignIn("tiktok")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="h-5 w-5 mr-3 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Continue with TikTok
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-black hover:text-gray-800">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutScreen;
