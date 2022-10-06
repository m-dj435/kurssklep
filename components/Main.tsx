interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="max-w-md grid mx-auto p-6 gap-6 sm:grid-cols-2 bg-teal-100">
      {children}
    </main>
  );
};

export default Main;
