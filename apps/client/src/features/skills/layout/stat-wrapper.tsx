import React from 'react';

type StatWrapperProps = {
  icon: string;
  children: React.ReactNode;
};

function StatWrapper({ icon, children }: StatWrapperProps) {
  return (
    <div className="flex items-center gap-x-2">
      <img src={icon} className="h-8 rounded-lg bg-primary-100 p-1" />
      {children}
    </div>
  );
}

export default StatWrapper;
