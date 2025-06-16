import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Bluetooth, 
  Wifi, 
  Battery, 
  Shield, 
  Activity, 
  Zap,
  Brain,
  Network,
  ChevronRight,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenThreatAnalysis: () => void;
}

interface BioMEMSSettings {
  deviceId: string;
  firmwareVersion: string;
  batteryOptimization: boolean;
  dataTransmissionRate: number;
  encryptionLevel: 'standard' | 'high' | 'military';
  autoCalibration: boolean;
  emergencyMode: boolean;
  bluetoothPower: number;
  wifiPower: number;
  sensorSensitivity: number;
  dataRetention: number;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  onOpenThreatAnalysis
}) => {
  const [activeTab, setActiveTab] = useState<'device' | 'security' | 'network' | 'advanced'>('device');
  const [bioMEMSSettings, setBioMEMSSettings] = useState<BioMEMSSettings>({
    deviceId: 'BIOMEMS-CGM-2024-001',
    firmwareVersion: '4.2.1',
    batteryOptimization: true,
    dataTransmissionRate: 5, // minutes
    encryptionLevel: 'high',
    autoCalibration: true,
    emergencyMode: false,
    bluetoothPower: 75,
    wifiPower: 80,
    sensorSensitivity: 85,
    dataRetention: 90 // days
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  if (!isOpen) return null;

  const handleSettingChange = (key: keyof BioMEMSSettings, value: any) => {
    setBioMEMSSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    setTimeout(() => {
      setHasUnsavedChanges(false);
      // Show success notification
    }, 1000);
  };

  const tabs = [
    { id: 'device', label: 'BioMEMS Device', icon: Activity },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'advanced', label: 'Advanced', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6" />
              <h2 className="text-2xl font-bold">SecureGluco Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">Configure your BioMEMS device and security settings</p>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* AI Threat Analysis Button */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">AI Security</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                Advanced threat detection using neural network analysis
              </p>
              <button
                onClick={onOpenThreatAnalysis}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Open Threat Analysis</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'device' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">BioMEMS Device Configuration</h3>
                  
                  {/* Device Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Device Connected</h4>
                        <p className="text-sm text-green-700">BioMEMS CGM sensor is online and transmitting data</p>
                      </div>
                    </div>
                  </div>

                  {/* Device Information */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Device ID</label>
                      <input
                        type="text"
                        value={bioMEMSSettings.deviceId}
                        onChange={(e) => handleSettingChange('deviceId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        readOnly
                      />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Firmware Version</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={bioMEMSSettings.firmwareVersion}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white"
                          readOnly
                        />
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sensor Settings */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Sensor Configuration</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Transmission Rate (minutes)
                        </label>
                        <select
                          value={bioMEMSSettings.dataTransmissionRate}
                          onChange={(e) => handleSettingChange('dataTransmissionRate', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={1}>1 minute</option>
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                          <option value={15}>15 minutes</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sensor Sensitivity: {bioMEMSSettings.sensorSensitivity}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={bioMEMSSettings.sensorSensitivity}
                          onChange={(e) => handleSettingChange('sensorSensitivity', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">Auto Calibration</h5>
                        <p className="text-sm text-gray-600">Automatically calibrate sensor readings</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioMEMSSettings.autoCalibration}
                          onChange={(e) => handleSettingChange('autoCalibration', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <h5 className="font-medium text-red-900">Emergency Mode</h5>
                        <p className="text-sm text-red-700">Override normal operations in critical situations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioMEMSSettings.emergencyMode}
                          onChange={(e) => handleSettingChange('emergencyMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Configuration</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Security Status: Active</h4>
                        <p className="text-sm text-blue-700">All security protocols are enabled and functioning</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Encryption Level</label>
                      <select
                        value={bioMEMSSettings.encryptionLevel}
                        onChange={(e) => handleSettingChange('encryptionLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="standard">Standard (AES-128)</option>
                        <option value="high">High (AES-256)</option>
                        <option value="military">Military Grade (AES-256 + RSA)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Retention Period: {bioMEMSSettings.dataRetention} days
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="365"
                        value={bioMEMSSettings.dataRetention}
                        onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>30 days</span>
                        <span>1 year</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">Battery Optimization</h5>
                        <p className="text-sm text-gray-600">Optimize power consumption for extended battery life</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bioMEMSSettings.batteryOptimization}
                          onChange={(e) => handleSettingChange('batteryOptimization', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Configuration</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Bluetooth className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Bluetooth</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Signal Power: {bioMEMSSettings.bluetoothPower}%
                          </label>
                          <input
                            type="range"
                            min="25"
                            max="100"
                            value={bioMEMSSettings.bluetoothPower}
                            onChange={(e) => handleSettingChange('bluetoothPower', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Status: Connected</p>
                          <p>Range: ~10 meters</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Wifi className="h-6 w-6 text-green-600" />
                        <h4 className="font-semibold text-green-800">Wi-Fi</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Signal Power: {bioMEMSSettings.wifiPower}%
                          </label>
                          <input
                            type="range"
                            min="25"
                            max="100"
                            value={bioMEMSSettings.wifiPower}
                            onChange={(e) => handleSettingChange('wifiPower', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Status: Connected</p>
                          <p>Network: SecureGluco_5G</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Settings</h3>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      <div>
                        <h4 className="font-semibold text-yellow-800">Caution</h4>
                        <p className="text-sm text-yellow-700">Advanced settings may affect device performance. Modify with care.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Diagnostic Mode</h5>
                      <p className="text-sm text-gray-600 mb-3">Enable detailed logging for troubleshooting</p>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Enable Diagnostics
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Factory Reset</h5>
                      <p className="text-sm text-gray-600 mb-3">Reset all settings to factory defaults</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Factory Reset
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Firmware Update</h5>
                      <p className="text-sm text-gray-600 mb-3">Check for and install firmware updates</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Check for Updates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {hasUnsavedChanges && (
                <>
                  <Info className="h-4 w-4 text-blue-600" />
                  <span>You have unsaved changes</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={!hasUnsavedChanges}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};