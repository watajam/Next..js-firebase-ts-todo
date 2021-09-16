export const Layout = (props) => {
  return (
    <div className="flex flex-col items-center max-w-2xl min-h-screen px-2 mx-auto">
      {props.children}
    </div>
  );
};
