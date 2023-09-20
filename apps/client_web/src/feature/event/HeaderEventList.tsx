function HeaderEventList({title} : {title: string}) {
  return (
    <div className="flex justify-between pt-6 pb-2 px-3">
      <h2 className="text-sm">{title}</h2>
      <div className="text-xs text-light">See more</div>
    </div>
  );
}

export default HeaderEventList;
