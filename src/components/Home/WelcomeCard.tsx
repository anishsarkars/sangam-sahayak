
import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeCardProps {
  userName?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6 mb-8"
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary mb-3">
            Ujjain Maha Kumbh 2028
          </div>
          <h2 className="text-xl font-medium text-foreground mb-2">
            {userName ? `नमस्ते, ${userName}` : 'नमस्ते, यात्री'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Welcome to Sangam Sahayak, your companion for a safe and smooth pilgrimage experience at the Maha Kumbh.
          </p>
          
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Services operational</span>
          </div>
        </div>
        
        <div className="ml-4">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sangam-500 to-sangam-700 flex items-center justify-center"
          >
            <span className="text-white text-lg font-bold">संगम</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
