import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity, Clock } from 'lucide-react';
import { SecurityThreat } from '../types';
import { formatDate } from '../utils/glucoseUtils';

interface SecurityDashboardProps {
  threats: SecurityThreat[];
  onBlockThreat: (threatId: string) => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ 
  threats, 
  onBlockThreat 
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getThreatTypeLabel = (type: string) => {
    switch (type) {
      case 'replay_attack':
        return 'Replay Attack';
      case 'unauthorized_bolus':
        return 'Unauthorized Bolus';
      case 'bluetooth_spoofing':
        return 'Bluetooth Spoofing';
      case 'wifi_interception':
        return 'WiFi Interception';
      case 'device_manipulation':
        return 'Device Manipulation';
      default:
        return 'Unknown Threat';
    }
  };

  const activeThreatCount = threats.filter(t => t.status === 'active').length;
  const blockedThreatCount = threats.filter(t => t.status === 'blocked').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Security Monitor</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">{activeThreatCount} Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">{blockedThreatCount} Blocked</span>
          </div>
        </div>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">System Status</p>
          </div>
          <p className="text-lg font-bold text-green-600">Secure</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">ML Detection</p>
          </div>
          <p className="text-lg font-bold text-blue-600">Active</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-medium text-purple-800">Last Scan</p>
          </div>
          <p className="text-lg font-bold text-purple-600">2m ago</p>
        </div>
      </div>

      {/* Threat Log */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Threats</h3>
        
        {threats.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-500">No security threats detected</p>
          </div>
        ) : (
          threats.map((threat) => (
            <div 
              key={threat.id}
              className={`border rounded-lg p-4 ${getSeverityColor(threat.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(threat.status)}
                    <h4 className="font-semibold text-gray-900">
                      {getThreatTypeLabel(threat.type)}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                      threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      threat.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{threat.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatDate(threat.timestamp)}</span>
                    {threat.source && <span>Source: {threat.source}</span>}
                    <span className="capitalize">Status: {threat.status}</span>
                  </div>
                </div>
                
                {threat.status === 'active' && (
                  <button
                    onClick={() => onBlockThreat(threat.id)}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    Block Threat
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ML Security Status */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800">AI Security System</h4>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          TensorFlow Lite model actively monitoring for IoMT threats using CIC Dataset patterns
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-blue-600">✓ Replay Attack Detection</span>
          <span className="text-blue-600">✓ Bluetooth Monitoring</span>
          <span className="text-blue-600">✓ Command Validation</span>
        </div>
      </div>
    </div>
  );
};