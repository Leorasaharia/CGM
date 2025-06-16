import React from 'react';
import { X, AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { Alert } from '../types';
import { formatDate } from '../utils/glucoseUtils';

interface AlertPanelProps {
  alerts: Alert[];
  isOpen: boolean;
  onClose: () => void;
  onDismissAlert: (alertId: string) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  isOpen,
  onClose,
  onDismissAlert
}) => {
  if (!isOpen) return null;

  const getAlertIcon = (type: string, severity: string) => {
    if (severity === 'critical') {
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
    if (severity === 'warning') {
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
    return <Info className="h-5 w-5 text-blue-600" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const dismissedAlerts = alerts.filter(alert => alert.dismissed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-xl overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Alerts & Notifications</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Active Alerts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Active Alerts ({activeAlerts.length})
            </h3>
            
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-500">No active alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getAlertIcon(alert.type, alert.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {alert.title}
                          </h4>
                          <p className="text-gray-700 text-sm mb-2">
                            {alert.message}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onDismissAlert(alert.id)}
                        className="ml-3 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dismissed Alerts */}
          {dismissedAlerts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Recent Alerts ({dismissedAlerts.length})
              </h3>
              <div className="space-y-3">
                {dismissedAlerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="border border-gray-200 p-4 rounded-lg bg-gray-50 opacity-75"
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type, alert.severity)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700 mb-1">
                          {alert.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {alert.message}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(alert.timestamp)}</span>
                          <span>• Dismissed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};