import { Link } from 'react-router-dom';
import Facebook from '../../assets/icon/Facebook';
import Insta from '../../assets/icon/Insta';
import Xtwitter from '../../assets/icon/Xtwitter';
import './homepage.css';
import Center from '../../layout/Center';

function HomePage() {
  return (
    <Center>
      <div className="homepage"></div>
      <div className="relative flex flex-col justify-between items-end px-10 py-12 h-screen lg:h-[90vh] w-full lg:w-[80%] max-w-[1600px] lg:border lg:border-opacity-50 border-gray-700 lg:shadow-xl rounded-2xl ">
        <p className="absolute bottom-12 -left-6 -rotate-90 font-normal text-light lg:text-white">
          SKILL<span className="text-primary-1000 font-bold">COOP</span>
        </p>
        <nav className="text-sm flex items-center gap-6 w-full justify-end font-semibold text-primary-1100">
          <p className="hover:text-primary-600 cursor-pointer">HOME</p>
          <p className="hover:text-primary-600 cursor-pointer">ABOUT US</p>
        </nav>
        <div className="flex flex-col items-end gap-1 max-w-[500px]">
          <p className="text-6xl text-primary-1000 font-paytone self-center lg:self-end">
            Create .
          </p>
          <p className="text-6xl text-primary-1000 font-paytone self-center lg:self-end">
            Play .
          </p>
          <p className="text-3xl text-primary-1100 text-right py-3 font-paytone">
            Enhance your skills together
          </p>
          <p className="text-center lg:text-right py-2 text-light">
            Unleash your sporting potential with our all-in-one app! Whether
            it's 5v5 soccer or any sport, score skills, rate friends, and
            organize events effortlessly. Our app forms fair teams, elects MVPs,
            and cultivates sportsmanship for an unmatched sporting community
            experience.
          </p>
          <div className="self-center flex gap-4 text-sm lg:text-lg py-4">
            <Link
              to="/register"
              className="bg-primary-300 py-2 px-4 lg:px-6 border border-primary-800 text-primary-1000 font-bold rounded-3xl cursor-pointer">
              Create an account
            </Link>
            <Link
              to="/login"
              className=" py-2 px-4 lg:px-6 border border-primary-600 text-primary-1000 font-bold rounded-3xl  cursor-pointer">
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex gap-3 text-primary-700 cursor-pointer">
          <Xtwitter />
          <Insta />
          <Facebook />
        </div>
      </div>
    </Center>
  );
}

export default HomePage;
