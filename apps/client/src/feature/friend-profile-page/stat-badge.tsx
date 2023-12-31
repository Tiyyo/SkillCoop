type StatBadgeProps = {
  label: string;
  value?: string | number | null;
  icon?: string;
};

function StatBadge({ label, value, icon }: StatBadgeProps) {
  return (
    <div
      className="flex gap-x-2 items-center p-2 bg-base 
              rounded-lg h-14 w-40 shadow-md"
    >
      <img src={icon} className="bg-primary-100 h-8 p-1 rounded-lg" />
      <div>
        <p className="text-xs font-medium text-grey-sub-text ">{label}</p>
        <p className="text-sm font-semibold">{value ?? 0}</p>
      </div>
    </div>
  );
}

export default StatBadge;
