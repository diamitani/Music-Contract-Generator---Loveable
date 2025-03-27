
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="glass-panel p-8 text-center max-w-md w-full animate-slide-in-up">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Oops! Page not found
          </p>
          <Link 
            to="/" 
            className="button-transition inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
