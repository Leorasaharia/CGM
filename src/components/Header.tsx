import { Activity, Bell, Settings, Shield } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  activeAlerts: number;
  onSettingsClick: () => void;
  onAlertsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeAlerts, onSettingsClick, onAlertsClick }) => {
  const handleSettingsClick = () => {
    console.log('Header settings button clicked');
    onSettingsClick();
  };

  const handleAlertsClick = () => {
    console.log('Header alerts button clicked');
    onAlertsClick();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        
          {/* Left logo/title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="p-2 bg-green-50 rounded-xl">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SecureGluco</h1>
              <p className="text-sm text-gray-600 font-medium">Diabetes Management Dashboard</p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            {/* Alerts */}
            <button
              onClick={handleAlertsClick}
              className="relative p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-all duration-200"
            >
              <Bell className="h-6 w-6" />
              {activeAlerts > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {activeAlerts}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={handleSettingsClick}
              className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-all duration-200"
            >
              <Settings className="h-6 w-6" />
            </button>

            {/* Threat Detection Link */}
            <a
              href="https://modelbackend.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="tidepool-button-primary text-sm">
                Threat Detection
              </button>
            </a>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Patient Dashboard</p>
                <p className="text-xs text-gray-600">Last sync: 2 min ago</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold text-white">P</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};
