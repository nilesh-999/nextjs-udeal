'use client'
import { Fragment, use, useCallback, useEffect, useRef, useState } from 'react';
import styles from './marquee.module.css';
import {motion} from 'framer-motion';
type Props = {
    children: React.ReactNode;
}
const Marquee = ({children}: Props) => {
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [multiplier,setMultiplier] = useState(1);
    const calculateMultiplier = useCallback(()=>{
        if(!containerRef.current || !marqueeRef.current) return;
        const containerRect =containerRef.current.getBoundingClientRect();
        const marqueeRect = marqueeRef.current.getBoundingClientRect();

        const containerWidth = containerRect.width;
        const marqueeWidth = marqueeRect.width;

        if(marqueeWidth<containerWidth) {
            setMultiplier(Math.ceil(containerWidth/marqueeWidth));
        } else{
        setMultiplier(1);}
    },[])
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    useEffect(()=>{
        if(!isMounted) return;
        calculateMultiplier();
        if (marqueeRef.current && containerRef.current) {
            const resizeObserver = new ResizeObserver(()=> calculateMultiplier());
            resizeObserver.observe(marqueeRef.current);
            resizeObserver.observe(containerRef.current);
            return () => {
                resizeObserver.disconnect();
            }
        }
    },[calculateMultiplier, isMounted]);

    const multiplyChildren = useCallback((multiplier: number)=>{
        const arraySize = multiplier>= 0? multiplier: 0;
        return [ ...Array(arraySize)].map((_,i)=>
        <Fragment key={i}>{children}</Fragment>
        );
            
    },[children])
const marqueeAnimation = {
    x:['0%','-100%'],
    transition: {
        duration: 6,
        ease: 'linear',
        repeat: Infinity,
    }
}
if(!isMounted) return null;
return <div className={styles.container} ref={containerRef}>
    <motion.div
    animate={marqueeAnimation} className={styles.marquee}>
        <div ref={marqueeRef} className={styles.firstMarquee}>
        {children}
        </div>
        {multiplyChildren(multiplier-1)}
        </motion.div>
    <motion.div
    animate={marqueeAnimation} className={styles.marquee}>
        {multiplyChildren(multiplier)}
        </motion.div>
    
    
    </div>
};

export {Marquee};