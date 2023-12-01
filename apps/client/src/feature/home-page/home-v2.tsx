import { ArrowDown } from 'lucide-react';

function HomePageV2() {
  return (
    <main>
      <section className="h-screen bg-home-page-gradient">
        <header className="h-20 py-5 px-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm text-dark">
              Skill<span className="text-primary-100">coop</span>
            </p>
          </div>
          <div className="text-sm flex gap-x-2">
            <button className="text-grey-sub-text">Login</button>
            <button
              className="px-4 py-2  bg-primary-200 font-semibold text-primary-100 
              border border-primary-100 rounded-full"
            >
              Join us
            </button>
          </div>
        </header>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1
              className=" my-1.5 text-5xl/[1.07] text-primary-100 font-bold tracking-tight
"
            >
              Play.
            </h1>
            <h1 className="pl-4 text-5xl/[1.07] text-primary-100 font-bold tracking-tight">
              <span className="text-primary-1100">Not</span> Plan.
            </h1>
            <h2 className="text-2xl font-semibold text-primary-1100 py-1.5">
              Save your{' '}
              <strong className="text-primary-1000 underline underline-offset-4">
                Effort
              </strong>{' '}
              for the field
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
              <button
                className="bg-primary-700 px-2 py-1 
                rounded-full text-base-light text-sm hover:animate-pulse"
              >
                Start
              </button>
              <p className="text-sm px-2.5 text-grey-sub-text">
                organize your first event
              </p>
            </div>
            <div
              className="flex flex-col justify-center items-center 
            text-grey-sub-text text-sm gap-y-1"
            >
              <p>Learn more</p>
              <ArrowDown size={16} />
            </div>
            <img
              src="/images/upcoming-page.png"
              alt="incoming page event demo"
              className="mx-auto -mb-[25%]"
            />
          </div>
        </div>
      </section>
      <div className=" sm:pt-[50%]"></div>
      <section className="bg-primary-gradient">
        <p>WHAT WE ARE OFFERING</p>
      </section>
    </main>
  );
}

export default HomePageV2;
