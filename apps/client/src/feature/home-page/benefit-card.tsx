type BenefitCardProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

function BenefitCard({ children, title, description }: BenefitCardProps) {
  return (
    <article
      className="px-4 py-6 basis-1/3 flex flex-col justify-center items-center 
      max-w-xs max-h-72 h-72"
    >
      <div className="basis-2/5 mx-auto">{children}</div>
      <h3
        className="basis-1/5 font-semibold tracking-tight 
        text-3xl text-center py-2.5"
      >
        {title}
      </h3>
      <p
        className="flex justify-center items-center  basis-2/5 text-sm
     text-grey-sub-text text-center"
      >
        {description}
      </p>
    </article>
  );
}

export default BenefitCard;
