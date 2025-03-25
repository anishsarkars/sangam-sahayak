
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background to-sangam-50/50 dark:from-background dark:to-sangam-950/30"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="w-32 h-32 rounded-3xl glass flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-24 h-24"
            >
              <img 
                src="/lovable-uploads/87426195-50c3-4941-a99e-fd22bb0635b7.png" 
                alt="Sangam Sahayak" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold text-sangam-900 dark:text-sangam-100 mb-2"
        >
          संगम सहायक
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="h-1 bg-gradient-to-r from-sangam-400 to-sangam-600 rounded-full"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 text-sm text-sangam-600 dark:text-sangam-300"
        >
          महाकुंभ 2028
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-1 text-[10px] text-sangam-400 dark:text-sangam-500"
        >
          Designed by @Anish
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
