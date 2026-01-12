'use client'

import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-64 h-64 border border-primary/20 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 left-20 w-80 h-80 border border-accent/20 rounded-full pointer-events-none"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using SAP Business One to streamline operations and boost growth. Start your free trial today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start Your Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold text-lg hover:bg-primary/5 transition-colors"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground mt-8"
          >
            No credit card required. 14-day free trial included.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
