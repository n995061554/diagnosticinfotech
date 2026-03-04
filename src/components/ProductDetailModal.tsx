import React from 'react';
import { motion } from 'motion/react';
import { X, Download } from 'lucide-react';

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.9, y: 20 }}
        className="bg-carbon-dark border border-metal-dark rounded-3xl w-full max-w-4xl text-white relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-text-dim hover:text-white z-10">
          <X />
        </button>

        <div className="p-10">
          <h2 className="font-display text-4xl font-bold mb-4 text-glow-accent">{product.name}</h2>
          <p className="text-text-secondary mb-6">{product.longDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {product.pricing.map((plan, index) => (
              <div key={index} className="bg-carbon-light p-4 rounded-lg">
                <h4 className="font-bold text-accent text-lg">{plan.plan}</h4>
                <p className="text-2xl font-bold">{plan.price}</p>
                <ul className="text-xs text-text-secondary mt-2 space-y-1">
                  {plan.features.map((feature, fIndex) => <li key={fIndex}>{feature}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <button 
            onClick={() => {
              onClose();
              window.location.hash = '#billing';
            }}
            className="bg-accent text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-80 transition-all shadow-glow"
          >
            <Download />
            <span>Download & Purchase</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailModal;
