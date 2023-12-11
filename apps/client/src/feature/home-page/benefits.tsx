import BenefitCard from './benefit-card';

function Benefits() {
  return (
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
  );
}

export default Benefits;
