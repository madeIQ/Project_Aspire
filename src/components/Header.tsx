import React from 'react';
import { Shield, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Aspire Security Ltd</h1>
              <p className="text-sm text-indigo-200">Lone Worker Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-indigo-800">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-indigo-900"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                <span className="text-sm font-medium">AS</span>
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}