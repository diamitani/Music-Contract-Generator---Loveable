
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (circleRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Subtle movement - only 5% of the screen width/height
        const moveX = (x - 0.5) * 5;
        const moveY = (y - 0.5) * 5;
        
        circleRef.current.style.transform = `translate(${moveX}%, ${moveY}%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background decoration */}
      <div 
        ref={circleRef}
        className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 blur-3xl transition-transform duration-700 ease-out"
      />
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6 animate-slide-in-up">
        <span className="block">Music Contracts</span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300">
          Simplified.
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-center max-w-2xl text-gray-600 dark:text-gray-300 mb-10 animate-slide-in-up animation-delay-200">
        Create professional music industry contracts with ease. 
        No legal expertise required. Simple, fast, and reliable.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up animation-delay-300">
        <Link 
          to="/generate" 
          className="button-transition bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full text-base font-medium hover:scale-105 hover:shadow-lg"
        >
          Create Contract
        </Link>
        <Link 
          to="/about" 
          className="button-transition border border-gray-300 dark:border-gray-700 px-8 py-3 rounded-full text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-900 hover:scale-105"
        >
          Learn More
        </Link>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-4 animate-slide-in-up animation-delay-400">
        <FeatureCard 
          title="Intelligent Assistant" 
          description="Our AI guides you through creating the perfect contract for your specific needs."
        />
        <FeatureCard 
          title="Legal Framework" 
          description="All contracts follow industry standards and best practices for legal protection."
        />
        <FeatureCard 
          title="Instant Documents" 
          description="Download your completed contract immediately in PDF or Word format."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="glass-panel p-6 hover-scale">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default Hero;
