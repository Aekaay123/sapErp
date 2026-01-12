/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function Hero() {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background pointer-events-none" />

      {/* Animated circles background */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
              Welcome to the next generation of business management
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Manage Your{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Business
            </span>{' '}
            Effortlessly
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Create business partners, manage inventory, handle finances, and streamline your entire workflow with SAP Business One's powerful management platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold text-lg hover:bg-primary/5 transition-colors"
            >
              Log in
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
          >
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '50+', label: 'Countries' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-4"
              >
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
