import { Bell, ChevronDown, Settings } from 'lucide-react';
import Avatar from '../component/avatar';

function TopBanner() {
  return (
    <div className="flex justify-between bg-base w-full h-20 lg:rounded-lg lg:mt-2 shadow-md p-5">
      <div className="flex flex-col justify-center">
        <p className="font-light">Welcome Back !</p>
        <p className="font-semibold">
          <span>Steeve</span> <span>Matou</span>
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <div
          className="flex justify-center items-center h-11 
          aspect-square rounded-full  bg-primary-210 text-primary-100"
        >
          <Settings size={20} />
        </div>
        <div
          className="flex justify-center items-center h-11 
        aspect-square rounded-full bg-primary-210 text-primary-100"
        >
          <Bell size={20} />
        </div>
        <div className="flex gap-x-2.5 items-center">
          <Avatar />
          <div className="hidden lg:flex flex-col justify-between">
            <p className="font-medium">Steeve Matou</p>
            <p className="font-light text-sm">steeve.matou@gmail.com</p>
          </div>
        </div>
        <div className="bg-primary-210 text-primary-100 p-1 rounded-sm">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
