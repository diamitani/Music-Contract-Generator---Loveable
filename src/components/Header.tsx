
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <Link 
        to="/" 
        className="text-xl font-medium relative overflow-hidden group"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Melody</span>
        <span className="inline-block absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">Melody</span>
      </Link>
      <nav className="hidden md:flex space-x-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/generate">Create Contract</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Link 
        to="/generate" 
        className="button-transition bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80"
      >
        Start Now
      </Link>
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link
      to={to}
      className="relative text-sm text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current hover:after:w-full after:transition-all after:duration-300"
    >
      {children}
    </Link>
  );
};

export default Header;
