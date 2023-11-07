function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-base relative pb-8">
      {children}
    </div>
  );
}

export default Page;