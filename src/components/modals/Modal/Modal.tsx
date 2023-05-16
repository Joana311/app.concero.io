import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from './Modal.module.pcss'
import { ModalHeader } from './ModalHeader'
import { fadeAnimation, fadeUpAnimation } from '../../../constants/animations'

export interface ModalProps {
  title: string
  show: boolean
  setShow: (show: boolean) => void
  children?: React.ReactNode
  size: {
    width: number
    height: number
    maxWidth: number
    maxHeight: number
  }
}

export const Modal: FC<ModalProps> = ({ title, show, setShow, size, children }) => (
  <AnimatePresence>
    {show && (
      <motion.div {...fadeAnimation} className={classNames.overlay}>
        <motion.div {...fadeUpAnimation} className={classNames.container} style={{ ...size }}>
          <ModalHeader title={title} onClick={() => setShow(false)} />
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)
