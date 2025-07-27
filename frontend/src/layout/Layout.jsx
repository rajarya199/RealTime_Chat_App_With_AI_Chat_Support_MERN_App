import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    // bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
    <div className="flex flex-col min-h-screen transition-colors">
      <Navbar/>
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;