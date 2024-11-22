import React from 'react';
import { Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { Worker } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface WorkerStatusProps {
  worker: Worker;
  onStatusChange: (id: string, status: Worker['status']) => void;
}

export const WorkerStatus: React.FC<WorkerStatusProps> = ({ worker, onStatusChange }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    alert: 'bg-red-100 text-red-800 animate-pulse'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
          <p className="text-sm text-gray-600">{worker.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[worker.status]}`}>
          {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{worker.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Last check-in: {formatDistanceToNow(worker.lastCheckIn, { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        {worker.status !== 'active' && (
          <button
            onClick={() => onStatusChange(worker.id, 'active')}
            className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Mark Safe
          </button>
        )}
        {worker.status !== 'alert' && (
          <button
            onClick={() => onStatusChange(worker.id, 'alert')}
            className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            Raise Alert
          </button>
        )}
      </div>
    </div>
  );
}