import { ArrowDown } from 'lucide-react';
import Xtwitter from '../../assets/icon/Xtwitter';
import Facebook from '../../assets/icon/Facebook';
import Insta from '../../assets/icon/Insta';
import BenefitCard from './benefit-card';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <main>
      <section className="h-screen bg-home-page-gradient">
        <header className="h-20 py-5 px-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm md:text-md lg:text-2xl text-dark">
              Skill<span className="text-primary-100">coop</span>
            </p>
          </div>
          <div className="text-sm flex items-center gap-x-2">
            <Link to="/login" className="text-grey-sub-text">
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2  bg-primary-200 font-semibold text-primary-100 
              border border-primary-100 rounded-full"
            >
              Join us
            </Link>
          </div>
        </header>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1
              className="bg-clip-text bg-title my-1.5 
              text-5xl/[1.07] text-transparent font-bold tracking-tight"
            >
              Play.
            </h1>
            <h1 className="pl-4 text-5xl/[1.07] font-bold tracking-tight">
              <span className="text-primary-1100">Not</span>
              <span className="bg-clip-text bg-title text-transparent">
                Plan.
              </span>
            </h1>
            <h2
              className="bg-clip-text bg-subtitle text-transparent text-2xl 
              font-semibold  py-1.5 tracking-tighter"
            >
              Save your Effort for the field
            </h2>
            <p className="mx-auto max-w-3xl text-center font-medium  mt-6 text-grey-sub-text">
              Effortless event managment from kickoff to victory, our app
              ensures your focus stays one the game by providing you all the
              tools you need.
            </p>
            <div
              className="w-fit mx-auto py-1.5 bg-primary-20 bg-opacity-20
              rounded-full flex justify-between items-center px-2 
              my-6 border border-opacity-10 border-primary-400"
            >
              <Link
                to="/register"
                className="bg-primary-700 px-2 py-1 
                rounded-full text-base-light text-sm hover:animate-pulse"
              >
                Start
              </Link>
              <p className="text-sm px-2.5 text-grey-sub-text">
                organize your first event
              </p>
            </div>
            <div
              className="flex flex-col justify-center items-center 
            text-grey-sub-text text-sm gap-y-1 mb-8"
            >
              <p>Learn more</p>
              <ArrowDown size={16} />
            </div>
            <img
              src="/images/upcoming-page.png"
              alt="incoming page event demo"
              className="mx-auto "
            />
          </div>
        </div>
      </section>
      <div className="py-10 bg-primary-gradient sm:pt-[35%]"></div>
      <section className="bg-primary-gradient mx-auto pt-14">
        <p
          className="flex justify-center items-center text-sm text-primary-100 
          font-semibold tracking-wider"
        >
          <img src="/images/before-title.svg" alt="prefix icon title" />
          <span>WHAT WE ARE OFFERING</span>
        </p>
        <h2 className="text-primary-1100 font-bold text-center text-3xl py-3 tracking-tighter">
          Our Features
        </h2>
        <p className="text-center px-6 text-primary-1100">
          Create and manage football event with our all in one app and improve
          your journey
        </p>
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-x-24
          items-center justify-center mx-auto max-w-7xl px-12 py-14
         "
        >
          <BenefitCard
            title="Simplify"
            description="Gather all the tools you need to create and manage events in one place."
          >
            <img
              src="/images/calendar-green.png"
              alt="feature 1"
              className="h-20 object-fill"
            />
          </BenefitCard>
          <BenefitCard
            title="Think Less"
            description="Skillcoop genrate balanced teams for you and keeps all
              participants informed of any changes, allowing you to focus on
              what matters."
          >
            <img
              src="/images/group-people-green.png"
              alt="feature 1"
              className="h-20 object-fill"
            />
          </BenefitCard>
          <BenefitCard
            title="Connect"
            description="Seamlessly communicate with participants through integrated chat
              features, enhancing your event management experience."
          >
            <img
              src="/images/chat-bubbles-green.png"
              alt="feature 1"
              className="h-20 object-fill"
            />
          </BenefitCard>
        </div>
      </section>
      <footer className="bg-dark py-12 px-12 lg:px-24 text-base-light w-full ">
        <ul className="flex flex-col lg:flex-row gap-x-4">
          <li>Home</li>
          <li>Our Product</li>
          <li>FAQ</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
        <div className="w-full py-3 flex ">
          <div className="flex flex-col w-full">
            <div className=" w-full basis-1/2 border-b border-b-grey-sub-text"></div>
            <div></div>
          </div>
          <ul
            className="bg-base-light basis-3/12 rounded-full min-w-fit max-w-[174px]
               flex items-center justify-center gap-x-5 px-5 py-2"
          >
            <li>
              <Xtwitter />
            </li>
            <li>
              <Facebook />
            </li>
            <li>
              <Insta />
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div>
            <p>Location</p>
            <p className="text-grey-sub-text">Paris, FR</p>
          </div>
          <div>
            <p>Contact</p>
            <p className="text-grey-sub-text">contact@skillcoop.fr</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
