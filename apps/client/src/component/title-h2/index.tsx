function TitleH2({ title, legend }: { title?: string; legend?: string }) {
  return (
    <div className="flex h-14 gap-4 w-fit">
      <div
        className="flex-shrink-0 min-w-[6px] w-[6px]
       bg-primary-100 rounded-full"
      ></div>
      <div className="flex flex-col justify-evenly">
        <h2 className="font-semibold text-sm lg:text-lg">{title}</h2>
        <legend className="text-xs font-normal">{legend}</legend>
      </div>
    </div>
  );
}

export default TitleH2;
