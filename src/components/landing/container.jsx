const Container = ({ children, className }) => {
  return (
    <div className={`max-w-screen-xl mx-auto p-5 ${className}`}>{children}</div>
  );
};

export default Container;
