import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';

const CongratsModal = ({ points, show, onClose }) => {

    useEffect(() => {
        if(show){
            const timer = setTimeout(() => {onClose()}, 2000);
            return ()=> clearTimeout(timer);
        }
    }, [show, onClose]);

    const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    const modalVariants = {
        hidden: { scale: 0.8, opacity: 0},
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 200, damping: 15},
        },
    };

  return (
    <AnimatePresence>
        {show && (
        <motion.div 
            className='fixed inset-0 backdrop-blur-[10px] flex items-center justify-center z-50'
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden">
                <motion.div 
                    className='bg-white rounded-2xl p-8 text-center shadow-2xl w-[90%] max-w-md'
                    variants={modalVariants}>
                        <div className='text-4xl mb-2 animate-bounce'> 🎉</div>
                        <h2 className='text-2xl font-bold text-[#0e1f51]'>Congratulations!</h2>
                        <p className='text-lg mt-2 text-gray-600'>You got <span className='font-bold text-[#eb5888]'>{points} points</span></p>
                    </motion.div>

            </motion.div>
            )}

    </AnimatePresence>
  )
}

export default CongratsModal
