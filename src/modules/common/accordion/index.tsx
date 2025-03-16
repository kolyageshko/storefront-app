"use client";

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
    title: string;
    children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mx-auto">
            <div className="border-b overflow-hidden">
                <div
                    className="py-2.5 cursor-pointer"
                    onClick={toggleAccordion}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <h2 className={`uppercase transition-colors duration-100 ${isOpen || isHovered ? 'text-black' : 'text-gray-400'}`} >{title}</h2>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { height: 'auto', transition: { duration: 0.4 } },
                                collapsed: { height: 0, transition: { duration: 0.4 } },
                            }}
                        >
                            <div className="pt-8 pb-12">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Accordion;
