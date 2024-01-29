type SocialButtonProps = {
  value?: string;
  children?: React.ReactNode;
  href?: string;
};

function SocialButton({ value, children, href }: SocialButtonProps) {
  return (
    <a
      className="flex cursor-pointer items-center justify-center rounded-lg 
      border border-gray-300 py-2 text-sm shadow-md "
      href={href}
    >
      {children}
      <span className="ml-3">{value}</span>
    </a>
  );
}

export default SocialButton;
