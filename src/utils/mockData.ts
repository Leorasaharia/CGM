import { GlucoseReading, InsulinPumpStatus, SecurityThreat, Alert } from '../types';

// Generate mock glucose readings for the last 24 hours
export const generateGlucoseData = (hours: number = 24): GlucoseReading[] => {
  const data: GlucoseReading[] = [];
  const now = new Date();
  
  for (let i = hours * 12; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // 5-minute intervals
    
    // Simulate realistic glucose patterns
    const baseValue = 120 + Math.sin((i / 12) * Math.PI) * 30; // Daily cycle
    const noise = (Math.random() - 0.5) * 20;
    const value = Math.max(50, Math.min(400, baseValue + noise));
    
    // Determine trend
    let trend: 'rising' | 'stable' | 'falling' = 'stable';
    if (data.length > 0) {
      const diff = value - data[data.length - 1].value;
      if (diff > 5) trend = 'rising';
      else if (diff < -5) trend = 'falling';
    }
    
    data.push({
      timestamp,
      value: Math.round(value),
      trend
    });
  }
  
  return data.reverse();
};

export const mockInsulinPumpStatus: InsulinPumpStatus = {
  batteryLevel: 78,
  activeInsulin: 2.4,
  reservoirLevel: 156,
  connectionStatus: 'connected',
  lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  isDelivering: true
};

export const mockSecurityThreats: SecurityThreat[] = [
  {
    id: '1',
    type: 'replay_attack',
    severity: 'critical',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    description: 'Malicious packet detected: Insulin delivery command blocked',
    status: 'blocked',
    source: '192.168.1.105'
  },
  {
    id: '2',
    type: 'bluetooth_spoofing',
    severity: 'warning',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    description: 'Unusual Bluetooth activity from unknown device',
    status: 'resolved',
    source: 'Unknown MAC: AA:BB:CC:DD:EE:FF'
  },
  {
    id: '3',
    type: 'unauthorized_bolus',
    severity: 'critical',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: 'Unauthorized bolus command attempt blocked',
    status: 'blocked'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'glucose',
    severity: 'critical',
    title: 'Low Glucose Alert',
    message: 'Current glucose: 65 mg/dL - Take action immediately',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    dismissed: false
  },
  {
    id: '2',
    type: 'security',
    severity: 'critical',
    title: 'Security Threat Blocked',
    message: 'Malicious insulin command blocked by security system',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    dismissed: false
  },
  {
    id: '3',
    type: 'device',
    severity: 'warning',
    title: 'Low Battery Warning',
    message: 'Insulin pump battery at 20% - Consider charging soon',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    dismissed: true
  }
];