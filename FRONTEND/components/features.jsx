'use client'

import { motion } from 'framer-motion'

export function Features() {
  const features = [
    {
      icon: '👥',
      title: 'Business Partner Management',
      description: 'Effortlessly create, manage, and organize your business partners with advanced filtering and search capabilities.'
    },
    {
      icon: '📦',
      title: 'Inventory Tracking',
      description: 'Real-time inventory management with automated stock levels, warehouse management, and supply chain optimization.'
    },
    {
      icon: '💰',
      title: 'Financial Management',
      description: 'Complete financial control with invoicing, payments, expense tracking, and comprehensive reporting.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Gain insights with powerful dashboards, custom reports, and data visualization tools.'
    },
    {
      icon: '⚙️',
      title: 'Automation',
      description: 'Automate repetitive tasks, workflows, and business processes to save time and reduce errors.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control, encryption, and compliance standards.'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your business efficiently in one integrated platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-5xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
