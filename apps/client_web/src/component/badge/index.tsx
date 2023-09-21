interface BadgeProps {
  content: string;
}

function Badge({content} : BadgeProps) {
  return (
    <div className="uppercase text-xxs font-semibold border border-primary-600 py-0.5 px-1.5 bg-primary-300 rounded-lg">
      {content }
    </div>
  );
}

export default Badge;
