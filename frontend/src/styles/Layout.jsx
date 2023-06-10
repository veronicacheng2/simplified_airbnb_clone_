import Header from "../components/Header";

const Layout = ({ children }) => {
  return <div className="py-4 px-8 flex flex-col">{children}</div>;
};

export default Layout;
