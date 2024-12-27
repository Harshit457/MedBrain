import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ClipboardDocumentListIcon, BoltIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

const features = [
  {
    title: 'Smart Records',
    description: 'Secure digital storage of your complete medical history',
    Icon: ClipboardDocumentListIcon
  },
  {
    title: 'AI Companion',
    description: 'Instant health information powered by advanced AI',
    Icon: BoltIcon
  },
  {
    title: 'Health Insights',
    description: 'AI-powered preliminary health analysis and guidance',
    Icon: BeakerIcon
  }
];

// function Button({ children, variant = 'primary' }) {
//   const baseClasses = 'btn shadow-md hover:shadow-lg transition-all duration-200';
//   const variantClasses = {
//     primary: 'bg-medical-blue hover:bg-medical-blue/90 text-white border-none',
//     outline: 'btn-outline border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white'
//   };

//   return (
//     <button className={${baseClasses} ${variantClasses[variant]}}>
//       {children}
//     </button>
//   );
// }

function FeatureCard({ title, description, Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="card bg-white/50 backdrop-blur-sm border border-medical-blue/10 shadow-lg hover:shadow-xl"
    >
      <div className="card-body items-center text-center p-6">
        <div className="rounded-full bg-medical-blue/10 p-3 mb-4">
          <Icon className="h-8 w-8 text-medical-blue" />
        </div>
        <h3 className="card-title text-xl mb-2 text-medical-blue">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const GoToLogin = () => {
     navigate("/Login")
    };


  return (
    <section className="min-h-screen bg-gradient-to-br from-medical-light via-blue-50 to-green-50 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaBrain className="h-8 w-8 text-medical-blue animate-pulse" />
          <h1 className="text-5xl font-bold text-medical-blue">
            MedBrain
          </h1>
        </div>
        
        <div className="text-2xl text-medical-green mb-16">
          <Typewriter
            options={{
              strings: [
                'Your Intelligent Health Partner',
                'AI-Powered Medical Guidance',
                'Smart Health Records System'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30
            }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
        <button 
  onClick={GoToLogin} 
  className="px-6 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:shadow-lg hover:from-blue-500 hover:to-purple-500 transform hover:-translate-y-1 transition-all"
>
  Get Started
</button>

<button 
  className="px-6 py-3 text-blue-500 font-bold rounded-lg border-2 border-blue-500 bg-transparent hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
>
  Learn More
</button>
        </div>
      </motion.div>
      
    </section>
  );
}

export default LandingPage;