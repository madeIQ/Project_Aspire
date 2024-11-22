import React from 'react';
import { FileText, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { DailyReport } from '../types';
import { format } from 'date-fns';

interface DailyReportCardProps {
  report: DailyReport;
}

export const DailyReportCard: React.FC<DailyReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {format(report.date, 'MMMM d, yyyy')}
            </h3>
            <p className="text-sm text-gray-600">{report.workerName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Hours Worked</p>
            <p className="font-semibold">{report.hoursWorked}h</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Locations</p>
            <p className="font-semibold">{report.locations.length}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Incidents</p>
            <p className="font-semibold">{report.incidents}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
          View Full Report
        </button>
      </div>
    </div>
  );
}