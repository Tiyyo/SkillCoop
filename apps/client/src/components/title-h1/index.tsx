function TitleH1({ title, legend }: { title: string; legend?: string }) {
  return (
    <div className="flex h-14 w-fit gap-4 pr-4">
      <div className="w-1.5 min-w-[6px] rounded-full bg-primary-100"></div>
      <div className="flex flex-col justify-evenly">
        <h1 className="text-xl font-semibold">{title}</h1>
        <legend className="text-xs font-normal text-light">{legend}</legend>
      </div>
    </div>
  );
}

export default TitleH1;
