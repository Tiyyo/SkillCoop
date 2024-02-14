import './loading-skillcoop.css';

function SkillcoopLoadingPage() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-grow items-center 
      justify-center gap-2 bg-base-light"
    >
      <p
        className="relative -top-10 text-sm font-semibold 
        tracking-wide text-text-base md:text-md lg:text-2xl"
      >
        Skill<span className="text-primary-100">coop</span>
      </p>
      <div className="skillcoop-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default SkillcoopLoadingPage;
