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
    <div className="tidepool-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-50 rounded-xl">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Security Monitor</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
            <span className="text-gray-700">{activeThreatCount} Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            <span className="text-gray-700">{blockedThreatCount} Blocked</span>
          </div>
        </div>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-800">System Status</p>
          </div>
          <p className="text-xl font-bold text-green-600 tracking-tight">Secure</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-blue-800">ML Detection</p>
          </div>
          <p className="text-xl font-bold text-blue-600 tracking-tight">Active</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-semibold text-purple-800">Last Scan</p>
          </div>
          <p className="text-xl font-bold text-purple-600 tracking-tight">2m ago</p>
        </div>
      </div>

      {/* Threat Log */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Recent Threats</h3>
        
        {threats.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No security threats detected</p>
          </div>
        ) : (
          threats.map((threat) => (
            <div 
              key={threat.id}
              className={`border rounded-xl p-5 ${getSeverityColor(threat.severity)} transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(threat.status)}
                    <h4 className="font-bold text-gray-900 text-lg">
                      {getThreatTypeLabel(threat.type)}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      threat.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      threat.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 font-medium">{threat.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 font-medium">
                    <span>{formatDate(threat.timestamp)}</span>
                    {threat.source && <span>Source: {threat.source}</span>}
                    <span className="capitalize">Status: {threat.status}</span>
                  </div>
                </div>
                
                {threat.status === 'active' && (
                  <button
                    onClick={() => onBlockThreat(threat.id)}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
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
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <h4 className="font-bold text-blue-800 text-lg">AI Security System</h4>
        </div>
        <p className="text-sm font-medium text-blue-700 mb-3">
          TensorFlow Lite model actively monitoring for IoMT threats using CIC Dataset patterns
        </p>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <span className="text-blue-600">✓ Replay Attack Detection</span>
          <span className="text-blue-600">✓ Bluetooth Monitoring</span>
          <span className="text-blue-600">✓ Command Validation</span>
        </div>
      </div>
    </div>
  );
};