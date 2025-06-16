import React, { useState } from 'react';
import { 
  Battery, 
  Bluetooth, 
  Wifi, 
  Activity, 
  Pause, 
  Play, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { InsulinPumpStatus } from '../types';
import { formatTime } from '../utils/glucoseUtils';

interface InsulinPumpProps {
  status: InsulinPumpStatus;
  onSuspendDelivery: () => void;
  onResumeDelivery: () => void;
}

export const InsulinPump: React.FC<InsulinPumpProps> = ({ 
  status, 
  onSuspendDelivery, 
  onResumeDelivery 
}) => {
  const [showConfirmSuspend, setShowConfirmSuspend] = useState(false);

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConnectionIcon = (connectionStatus: string) => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'weak':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleSuspendClick = () => {
    if (status.isDelivering) {
      setShowConfirmSuspend(true);
    } else {
      onResumeDelivery();
    }
  };

  const confirmSuspend = () => {
    onSuspendDelivery();
    setShowConfirmSuspend(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Insulin Pump</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          status.isDelivering ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status.isDelivering ? 'Active' : 'Suspended'}
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Battery Level</p>
            <Battery className={`h-5 w-5 ${getBatteryColor(status.batteryLevel)}`} />
          </div>
          <p className={`text-2xl font-bold ${getBatteryColor(status.batteryLevel)}`}>
            {status.batteryLevel}%
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Active Insulin</p>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {status.activeInsulin} U
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Reservoir</p>
            <div className="w-5 h-5 bg-blue-200 rounded border-2 border-blue-400"></div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {status.reservoirLevel} U
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Connection</p>
            {getConnectionIcon(status.connectionStatus)}
          </div>
          <p className="text-sm font-medium text-gray-900 capitalize">
            {status.connectionStatus}
          </p>
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Bluetooth className="h-5 w-5 text-blue-600" />
          <Wifi className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Device Connected</span>
        </div>
        <p className="text-sm text-blue-700">
          Last sync: {formatTime(status.lastSync)}
        </p>
      </div>

      {/* Emergency Controls */}
      <div className="border-2 border-red-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 mb-3">Emergency Control</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use this control to immediately suspend insulin delivery in case of security threats or medical emergencies.
        </p>
        
        {!showConfirmSuspend ? (
          <button
            onClick={handleSuspendClick}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              status.isDelivering
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {status.isDelivering ? (
              <>
                <Pause className="h-5 w-5" />
                <span>Suspend Delivery</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Resume Delivery</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="bg-red-100 border border-red-300 rounded-lg p-3">
              <p className="text-sm font-medium text-red-800">
                Are you sure you want to suspend insulin delivery?
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={confirmSuspend}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Yes, Suspend
              </button>
              <button
                onClick={() => setShowConfirmSuspend(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};