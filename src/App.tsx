import React from 'react';
import { Header } from './components/Header';
import { WorkerStatus } from './components/WorkerStatus';
import { DailyReportCard } from './components/DailyReportCard';
import { useWorkers } from './hooks/useWorkers';
import { useReports } from './hooks/useReports';
import { Toaster } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

function App() {
  const { workers, loading: workersLoading, error: workersError, updateWorkerStatus } = useWorkers();
  const { reports, loading: reportsLoading, error: reportsError } = useReports();

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5 text-red-500" />
      <p className="text-red-700">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Workers</h2>
            {workersError && <ErrorMessage message={workersError.message} />}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workersLoading ? (
                <div className="col-span-full text-center py-8">Loading workers...</div>
              ) : workers.map(worker => (
                <WorkerStatus
                  key={worker.id}
                  worker={worker}
                  onStatusChange={updateWorkerStatus}
                />
              ))}
            </div>
          </div>

          <div className="col-span-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Reports</h2>
            {reportsError && <ErrorMessage message={reportsError.message} />}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reportsLoading ? (
                <div className="col-span-full text-center py-8">Loading reports...</div>
              ) : reports.map(report => (
                <DailyReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;