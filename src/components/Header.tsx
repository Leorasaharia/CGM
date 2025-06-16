import React from 'react';
import { Shield, Activity, Settings, Bell } from 'lucide-react';

interface HeaderProps {
  activeAlerts: number;
  onSettingsClick: () => void;
  onAlertsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeAlerts, onSettingsClick, onAlertsClick }) => {
  const handleSettingsClick = () => {
    console.log('Header settings button clicked'); // Debug log
    onSettingsClick();
  };

  const handleAlertsClick = () => {
    console.log('Header alerts button clicked'); // Debug log
    onAlertsClick();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SecureGluco</h1>
              <p className="text-sm text-gray-500">Diabetes Management Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAlertsClick}
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
            >
              <Bell className="h-6 w-6" />
              {activeAlerts > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeAlerts}
                </span>
              )}
            </button>
            
            <button
              onClick={handleSettingsClick}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Patient Dashboard</p>
                <p className="text-xs text-gray-500">Last sync: 2 min ago</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};