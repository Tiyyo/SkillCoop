function WrapperMain({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto flex w-full max-w-7xl flex-grow 
        animate-opacity-in flex-col bg-grey-off opacity-0 lg:h-screen lg:px-6"
    >
      {children}
    </div>
  );
}

export default WrapperMain;
