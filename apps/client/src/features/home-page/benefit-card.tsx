type BenefitCardProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

function BenefitCard({ children, title, description }: BenefitCardProps) {
  return (
    <article
      className="flex h-72 max-h-72 max-w-xs basis-1/3 flex-col items-center 
      justify-center px-4 py-6"
    >
      <div className="mx-auto basis-2/5">{children}</div>
      <h3
        className="basis-1/5 py-2.5 text-center 
        text-3xl font-semibold tracking-tight text-text-base"
      >
        {title}
      </h3>
      <p
        className="flex basis-2/5 items-center  justify-center text-center
     text-sm text-grey-sub-text"
      >
        {description}
      </p>
    </article>
  );
}

export default BenefitCard;
