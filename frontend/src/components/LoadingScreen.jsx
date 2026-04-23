import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: '#030712',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                borderRadius: ["20%", "50%", "20%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#101828',
                border: '3px solid #432DD7',
                boxShadow: '0px 0px 20px rgba(67, 45, 215, 0.3)'
              }}
            />
            
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#432DD7',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              EI
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: '20px',
              color: '#FFFFFF',
              fontFamily: 'sans-serif',
              letterSpacing: '2px',
              fontSize: '14px',
              textAlign: 'center'
            }}
          >
            EasyInvoice...
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;