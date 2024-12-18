import Header from "../header";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64 bg-gray-100 min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
