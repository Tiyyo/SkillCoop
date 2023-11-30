import './homepage.css';
import { useHealthCheckServer } from '../../hooks/useHealthCheckServer';
import { Link } from 'react-router-dom';
import Xtwitter from '../../assets/icon/Xtwitter';
import Facebook from '../../assets/icon/Facebook';
import Insta from '../../assets/icon/Insta';
import Hamburger from '../../component/hamburger';
import { useState } from 'react';

function HomePage() {
  useHealthCheckServer();
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const getOpenStateHamburger = (state: boolean) => {
    setMobileNavIsOpen(state);
  };
  return (
    //TODO: end this landing page
    <main className="min-h-screen overflow-x-hidden w-full">
      <section
        className="w-full  
               bg-home bg-cover h-screen bg-center"
      >
        <header className="flex justify-between items-center py-8 px-8 md:px-12 lg:px-24">
          <div>
            <Hamburger getOpenState={getOpenStateHamburger} />
          </div>
          <img
            src="/images/home-logo.png"
            alt="logo"
            className="h-6 md:h-10 lg:h-14"
          />
          <ul className="text-base-light lg:flex gap-x-5 hidden ">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Features</li>
            <li className="cursor-pointer">Our Product</li>
            <li className="cursor-pointer">FAQ</li>
          </ul>
          <div className="hidden lg:flex items-center gap-x-5">
            <Link
              to="/login"
              className="text-base-light hover:border hover:border-primary-20 h-12 w-32 flex 
              items-center justify-center rounded-lg hover:shadow-inner tracking-wide 
             hover:animate-pulse"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center h-12 w-32 border-2 border-primary-100
               text-primary-100 font-medium rounded-lg shadow shadow-primary-100 shadow-opacity-10
               hover:bg-primary-100 hover:border-dark duration-300 hover:text-dark hover:scale-95"
            >
              Sign up
            </Link>
          </div>
        </header>
        <div className="mx-auto flex flex-col justify-center max-w-xl pt-12 lg:pt-14">
          {/* <div className="w-3/4 h-12 rounded-xl">
            <div className="rounded-xl">Start</div>
            <p>Enhance your skills together</p>
          </div> */}
          <h1
            className="font-paytone text-4xl py-6 px-1 lg:text-5xl text-center text-base-light 
          tracking-wide leading-10"
          >
            Unleash your Sporting Potential with our all-in-one app
          </h1>
          <p className="text-grey-light text-center py-6 text-sm px-5">
            Whether it's 5v5 soccer or any sport, score skills, rate friends,
            and organize events effortlessly. Our app forms fair teams, elects
            MVPs, and cultivates sportsmanship for an unmatched sporting
            community experience.
          </p>
          <div className="mx-auto py-4 flex items-center gap-x-4">
            {/* <button className="bg-primary-100 text-lg text-base-light px-4 py-3 rounded-xl">
              Get Started
            </button>
            <a className="text-base-light underline underline-offset-4">
              Learn more
            </a> */}
            <div className="flex items-center gap-x-4 ">
              <Link
                to="/register"
                className=" py-2 px-4 lg:px-6 border text-base-light bg-primary-100
              border-primary-600 font-bold rounded-lg  cursor-pointer shadow-md "
              >
                Get Started
              </Link>
              <a className="text-base-light text-xs lg:text-sm underline underline-offset-4">
                Learn more
              </a>
            </div>
          </div>

          <div>
            <img src="" alt="" />
          </div>
        </div>
      </section>
      <img
        src="/images/incoming-page.svg"
        alt="incoming page event demo"
        className="mx-auto relative -top-32 md sm:-top-60 lg:-top-64"
      />
      {/* <section className="bg-primary-300 h-fit p-24 relative -top-80 ">
        <p className="text-xs font-medium text-center text-primary-100">
          <span></span>
          WHAT WE ARE OFFERING
        </p>
        <h2 className="font-paytone text-4xl text-dark text-center py-2">
          Our Features
        </h2>
        <p className="text-center max-w-2xl mx-auto text-grey-sub-text py-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab natus
          distinctio reiciendis quaerat unde laudantium quisquam asperiores
          dolore ratione tenetur?
        </p>
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <article className="bg-base-light p-5 flex flex-col gap-y-1 rounded-xl">
            <div>Icon</div>
            <strong className="text-dark text-lg font-bold">
              Feature name
            </strong>
            <p className="text-grey-sub-text text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis cum cumque ea nostrum ullam labore.
            </p>
          </article>
          <article className="bg-base-light p-5 flex flex-col gap-y-1 rounded-xl">
            <div>Icon</div>
            <strong className="text-dark text-lg font-bold">
              Feature name
            </strong>
            <p className="text-grey-sub-text text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis cum cumque ea nostrum ullam labore.
            </p>
          </article>
          <article className="bg-base-light p-5 flex flex-col gap-y-1 rounded-xl">
            <div>Icon</div>
            <strong className="text-dark text-lg font-bold">
              Feature name
            </strong>
            <p className="text-grey-sub-text text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis cum cumque ea nostrum ullam labore.
            </p>
          </article>
          <article className="bg-base-light p-5 flex flex-col gap-y-1 rounded-xl">
            <div>Icon</div>
            <strong className="text-dark text-lg font-bold">
              Feature name
            </strong>
            <p className="text-grey-sub-text text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis cum cumque ea nostrum ullam labore.
            </p>
          </article>
        </div>
      </section> */}
      <section></section>
      <section></section>
      <footer className="bg-dark py-12 px-12 lg:px-24 text-base-light w-full ">
        <ul className="flex flex-col lg:flex-row gap-x-4">
          <li>Home</li>
          <li>Features</li>
          <li>Our Product</li>
          <li>About us</li>
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
    //   <div className="homepage"></div>
    //   <div
    //     className="relative flex flex-col justify-between items-end px-10 py-12 h-screen
    //        lg:h-[90vh] w-full lg:w-[80%] max-w-[1600px] lg:border lg:border-opacity-50
    //      border-gray-700 lg:shadow-xl rounded-2xl "
    //   >
    //     <p className="absolute bottom-12 -left-6 -rotate-90 font-normal text-light lg:text-white">
    //       SKILL<span className="text-primary-1000 font-bold">COOP</span>
    //     </p>
    //     <nav
    //       className="text-sm flex items-center gap-6 w-full justify-end font-semibold
    //          text-primary-1100"
    //     >
    //       <p className="hover:text-primary-600 cursor-pointer">HOME</p>
    //       <p className="hover:text-primary-600 cursor-pointer">ABOUT US</p>
    //     </nav>
    //     <div className="flex flex-col items-end gap-1 max-w-[500px]">
    //       <p className="text-6xl text-primary-1000 font-paytone self-center lg:self-end">
    //         Create .
    //       </p>
    //       <p className="text-6xl text-primary-1000 font-paytone self-center lg:self-end">
    //         Play .
    //       </p>
    //       <p className="text-3xl text-primary-1100 text-right py-3 font-paytone">
    //         Enhance your skills together
    //       </p>
    //       <p className="text-center lg:text-right py-2 text-light">
    //         Unleash your sporting potential with our all-in-one app! Whether
    //         it's 5v5 soccer or any sport, score skills, rate friends, and
    //         organize events effortlessly. Our app forms fair teams, elects MVPs,
    //         and cultivates sportsmanship for an unmatched sporting community
    //         experience.
    //       </p>
    //       <div className="self-center flex gap-4 text-sm lg:text-lg py-4">
    //         <Link
    //           to="/register"
    //           className="bg-primary-300 py-2 px-4 lg:px-6 border border-primary-800
    //              text-primary-1000 font-bold rounded-lg cursor-pointer shadow-md
    //               hover:bg-transparent duration-300 hover:border-primary-800"
    //         >
    //           Create an account
    //         </Link>
    //         <Link
    //           to="/login"
    //           className=" py-2 px-4 lg:px-6 border border-primary-600 text-primary-1000 font-bold
    //             rounded-lg  cursor-pointer shadow-md hover:bg-primary-600
    //             duration-300 hover:text-white "
    //         >
    //           Sign in
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex gap-3 text-primary-700 cursor-pointer">
    //       <Xtwitter />
    //       <Insta />
    //       <Facebook />
    //     </div>
    //   </div>
    // </Center>
  );
}

export default HomePage;
