export interface Worker {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'alert';
  location: string;
  lastCheckIn: Date;
  nextCheckIn: Date;
}

export interface DailyReport {
  id: string;
  date: Date;
  workerId: string;
  workerName: string;
  checkIns: number;
  incidents: number;
  hoursWorked: number;
  locations: string[];
}