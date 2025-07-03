"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Image as ImageIcon, Plus } from 'lucide-react'; // Using ImageIcon to avoid conflict

interface GalleryItemProps {
  imageUrl: string;
  altText: string;
  caption?: string;
  index: number;
}

const GalleryItemCard = ({ imageUrl, altText, caption, index }: GalleryItemProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)" }}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-lg font-semibold text-white">{caption}</h3>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
        <Plus size={18} className="text-white" />
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Updated galleryImages array with 9 local images
  const galleryImages = [
    { imageUrl: "/gallery/1.jpg", altText: "Gallery Image 1", caption: "Event Highlight 1", index: 0 },
    { imageUrl: "/gallery/2.jpg", altText: "Gallery Image 2", caption: "Event Highlight 2", index: 1 },
    { imageUrl: "/gallery/3.jpg", altText: "Gallery Image 3", caption: "Event Highlight 3", index: 2 },
    { imageUrl: "/gallery/4.jpg", altText: "Gallery Image 4", caption: "Event Highlight 4", index: 3 },
    { imageUrl: "/gallery/5.jpg", altText: "Gallery Image 5", caption: "Event Highlight 5", index: 4 },
    { imageUrl: "/gallery/6.jpg", altText: "Gallery Image 6", caption: "Event Highlight 6", index: 5 },
    { imageUrl: "/gallery/7.jpg", altText: "Gallery Image 7", caption: "Event Highlight 7", index: 6 },
    { imageUrl: "/gallery/8.jpg", altText: "Gallery Image 8", caption: "Event Highlight 8", index: 7 },
    { imageUrl: "/gallery/9.jpg", altText: "Gallery Image 9", caption: "Event Highlight 9", index: 8 },
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Subtle background decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-2xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-900/5 rounded-full filter blur-2xl"
      ></motion.div>
       <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 w-1/2 h-1/2"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17, 39, 53, 0.2) 0.5px, transparent 0.5px)', // #112735
          backgroundSize: '30px 30px',
        }}
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.span
            className="inline-block bg-yellow-400/10 text-yellow-500 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 border border-yellow-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Event Showcase
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#112735] mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Gallery of <span className="text-yellow-500">Moments</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 100 }}
            className="w-20 h-1 bg-yellow-500 mx-auto mb-6 rounded-full origin-center"
          />
          <motion.p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Relive the highlights and memorable moments from our impactful events and initiatives.
          </motion.p>
        </motion.div>

        {/* Grid layout lg:grid-cols-3 is suitable for 9 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((item) => ( // Removed index from map as it's now part of item
            <GalleryItemCard
              key={item.index} // Use item.index for key if it's unique and stable
              imageUrl={item.imageUrl}
              altText={item.altText}
              caption={item.caption}
              index={item.index} // Pass item.index to GalleryItemCard
            />
          ))}
        </div>

        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + galleryImages.length * 0.1 }}
        >
            <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -5px rgba(241, 194, 50, 0.4)"}} // #f1c232
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 bg-yellow-500 hover:bg-yellow-600 text-[#112735] px-7 py-3.5 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            onClick={() => window.open("https://www.facebook.com/share/p/1AqSwfrQ3J/", "_blank")}
            >
            <Camera size={20} />
            View Full Album
            </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
