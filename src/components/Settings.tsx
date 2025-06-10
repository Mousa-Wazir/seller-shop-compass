
import { useState } from "react";
import { Bell, Globe, Shield, Eye, EyeOff, Save, Moon, Sun, Trash2, Store } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    reviewNotifications: true,
    chatNotifications: true,
    promotionalEmails: false,
    
    // Privacy Settings
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    dataSharing: false,
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Display Settings
    darkMode: false,
    language: "english",
    currency: "USD",
    
    // Business Settings
    autoReplyChat: false,
    vacationMode: false,
    instantBooking: true,
    requireApproval: false
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Password changed");
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteStore = () => {
    if (confirm("Are you sure you want to delete your store? This will remove all your products, reviews, and rental history. This action cannot be undone.")) {
      console.log("Store deletion requested");
      alert("Store deletion request submitted. You will receive a confirmation email.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings.</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-6 w-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Communication Preferences</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">SMS Notifications</label>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange("smsNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-3">Activity Notifications</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Order Updates</label>
              <input
                type="checkbox"
                checked={settings.orderNotifications}
                onChange={(e) => handleSettingChange("orderNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">New Reviews</label>
              <input
                type="checkbox"
                checked={settings.reviewNotifications}
                onChange={(e) => handleSettingChange("reviewNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Chat Messages</label>
              <input
                type="checkbox"
                checked={settings.chatNotifications}
                onChange={(e) => handleSettingChange("chatNotifications", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="customers">Customers Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Show Email Address</label>
              <input
                type="checkbox"
                checked={settings.showEmail}
                onChange={(e) => handleSettingChange("showEmail", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Show Phone Number</label>
              <input
                type="checkbox"
                checked={settings.showPhone}
                onChange={(e) => handleSettingChange("showPhone", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Display Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="urdu">Urdu</option>
              <option value="arabic">Arabic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange("currency", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="PKR">PKR (₨)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.darkMode ? <Moon className="h-5 w-5 text-gray-700" /> : <Sun className="h-5 w-5 text-gray-700" />}
              <label className="text-sm text-gray-700">Dark Mode</label>
            </div>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Two-Factor Authentication</label>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Login Alerts</label>
              <input
                type="checkbox"
                checked={settings.loginAlerts}
                onChange={(e) => handleSettingChange("loginAlerts", e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* Store Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Store className="h-6 w-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900">Store Management</h2>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-900 mb-2">Delete Store</h3>
          <p className="text-sm text-red-700 mb-4">
            Once you delete your store, there is no going back. This will permanently delete all your products, rental history, reviews, and customer data.
          </p>
          <button
            onClick={handleDeleteStore}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 size={18} />
            <span>Delete Store</span>
          </button>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <Save size={18} />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
