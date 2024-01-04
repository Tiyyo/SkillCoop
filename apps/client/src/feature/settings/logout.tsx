import { LogOut } from 'lucide-react';

function Logout() {
  return (
    <button
      className="flex items-center justify-center py-3.5
        hover:bg-primary-210 duration-300 rounded-lg px-1.5 
          cursor-pointer w-full"
    >
      <span className="px-2.5">
        <LogOut size={18} />
      </span>
      Logout
    </button>
  );
}

export default Logout;
