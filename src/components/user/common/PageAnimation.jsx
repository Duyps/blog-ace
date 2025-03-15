import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
function PageAnimation({children, initial = {opacity: 0}, animate = {opacity: 1}}) {
  return (
    <>
    <motion.div
        initial={initial}
        animate={animate}
    >
        {children}
    </motion.div>
    </>
  )
}

export default PageAnimation