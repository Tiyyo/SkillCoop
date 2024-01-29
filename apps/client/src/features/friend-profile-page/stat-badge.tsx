type StatBadgeProps = {
  label: string;
  value?: string | number | null;
  icon?: string;
};

function StatBadge({ label, value, icon }: StatBadgeProps) {
  return (
    <div
      className="flex h-14 w-40 items-center gap-x-2 
              rounded-lg bg-base p-2 shadow-md"
    >
      <img src={icon} className="h-8 rounded-lg bg-primary-100 p-1" />
      <div>
        <p className="text-xs font-medium text-grey-sub-text ">{label}</p>
        <p className="text-sm font-semibold">{value ?? 0}</p>
      </div>
    </div>
  );
}

export default StatBadge;
