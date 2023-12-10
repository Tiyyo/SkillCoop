type SocialButtonProps = {
  value?: string;
  children?: React.ReactNode;
  href?: string;
};

function SocialButton({ value, children, href }: SocialButtonProps) {
  return (
    <a
      className="flex items-center justify-center rounded-lg border border-gray-300 cursor-pointer py-2 shadow-md text-sm "
      href={href}
    >
      {children}
      <span className="ml-3">{value}</span>
    </a>
  );
}

export default SocialButton;
