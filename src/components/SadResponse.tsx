
import React from 'react';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';

const SadResponse: React.FC = () => {
  return (
    <motion.div 
      className="romantic-card p-8 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Frown className="text-gray-500 w-16 h-16 mx-auto mb-6" />
      <h2 className="text-3xl mb-4 font-dancing text-gray-700">Oh no...</h2>
      <p className="text-gray-600 mb-6">
        I understand. Thank you for being honest. I'll always cherish our friendship.
      </p>
      {/* Button removed as requested */}
    </motion.div>
  );
};

export default SadResponse;
