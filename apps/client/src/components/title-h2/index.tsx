function TitleH2({ title, legend }: { title?: string; legend?: string }) {
  return (
    <div className="flex h-14 w-fit gap-4">
      <div
        className="w-[6px] min-w-[6px] flex-shrink-0
       rounded-full bg-primary-100"
      ></div>
      <div className="flex flex-col justify-evenly">
        <h2 className="text-sm font-semibold lg:text-lg">{title}</h2>
        <legend className="text-xs font-normal text-light">{legend}</legend>
      </div>
    </div>
  );
}

export default TitleH2;
