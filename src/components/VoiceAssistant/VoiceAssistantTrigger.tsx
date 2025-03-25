
import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface VoiceAssistantTriggerProps {
  onClick: () => void;
}

const VoiceAssistantTrigger: React.FC<VoiceAssistantTriggerProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-4 z-30 p-3 rounded-full bg-sangam-500 text-white shadow-lg"
      onClick={onClick}
      aria-label="Voice Assistant"
    >
      <Mic className="h-5 w-5" />
    </motion.button>
  );
};

export default VoiceAssistantTrigger;
