import React from 'react';

interface MarqueeProps {
  items: string[]; // List of items to display in the marquee
}

const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  // If there aren't enough items, duplicate them
  const adjustedItems = items.length === 1 ? [...items, ...items] : items;

  return (
    <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div
        style={{
          display: 'inline-flex',
          animation: 'scroll 10s linear infinite',
        }}
      >
        {/* Render the content twice for seamless looping */}
        {adjustedItems.map((item, index) => (
          <div key={index} style={{ padding: '0 20px' }}>
            {item}
          </div>
        ))}
        {adjustedItems.map((item, index) => (
          <div key={index + adjustedItems.length} style={{ padding: '0 20px' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;




// 'use client'
// import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
// import styles from './marquee.module.css';
// import {motion} from 'framer-motion';
// type Props = {
//     children: React.ReactNode;
// }
// const Marquee = ({children}: Props) => {
//     const [isMounted, setIsMounted] = useState(false);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const marqueeRef = useRef<HTMLDivElement>(null);
//     const [multiplier,setMultiplier] = useState(1);
//     const calculateMultiplier = useCallback(()=>{
//         if(!containerRef.current || !marqueeRef.current) return;
//         const containerRect =containerRef.current.getBoundingClientRect();
//         const marqueeRect = marqueeRef.current.getBoundingClientRect();

//         const containerWidth = containerRect.width;
//         const marqueeWidth = marqueeRect.width;

//         if(marqueeWidth<containerWidth) {
//             setMultiplier(Math.ceil(containerWidth/marqueeWidth));
//         } else{
//         setMultiplier(1);}
//     },[])
//     useEffect(()=>{
//         setIsMounted(true);
//     },[]);
//     useEffect(()=>{
//         if(!isMounted) return;
//         calculateMultiplier();
//         if (marqueeRef.current && containerRef.current) {
//             const resizeObserver = new ResizeObserver(()=> calculateMultiplier());
//             resizeObserver.observe(marqueeRef.current);
//             resizeObserver.observe(containerRef.current);
//             return () => {
//                 resizeObserver.disconnect();
//             }
//         }
//     },[calculateMultiplier, isMounted]);

//     const multiplyChildren = useCallback((multiplier: number)=>{
//         const arraySize = multiplier>= 0? multiplier: 0;
//         return [ ...Array(arraySize)].map((_,i)=>
//         <Fragment key={i}>{children}</Fragment>
//         );
            
//     },[children])
// const marqueeAnimation = {
//     x:['0%','-100%'],
//     transition: {
//         duration: 20,
//         ease: 'linear',
//         repeat: Infinity,
//     }
// }
// if(!isMounted) return null;
// return <div className={styles.container} ref={containerRef}>
//     <motion.div
//     animate={marqueeAnimation} className={styles.marquee}>
//         <div ref={marqueeRef} className={styles.firstMarquee}>
//         {children}
//         </div>
//         {multiplyChildren(multiplier-1)}
//         </motion.div>
//     {multiplier>1 && (<motion.div
//     animate={marqueeAnimation} className={styles.marquee}>
//         {multiplyChildren(multiplier - 1)}
//         </motion.div>)}
    
    
//     </div>
// };

// export {Marquee};