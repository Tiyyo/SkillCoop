function TitleH1({ title, legend }: { title: string; legend?: string }) {
  return (
    <div className="flex h-14 gap-4 w-fit">
      <div className="w-1.5 bg-primary-100 rounded-full"></div>
      <div className="flex flex-col justify-evenly">
        <h1 className="font-semibold text-xl">{title}</h1>
        <legend className="text-xs font-normal">{legend}</legend>
      </div>
    </div>
  );
}

export default TitleH1;
