/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'

export function BusinessPartners() {
  const partners = [
    {
      initials: 'AC',
      name: 'Acme Corp',
      type: 'Supplier',
      status: 'Active',
      color: 'from-blue-500 to-blue-600'
    },
    {
      initials: 'TB',
      name: 'Tech Builders',
      type: 'Customer',
      status: 'Active',
      color: 'from-purple-500 to-purple-600'
    },
    {
      initials: 'GM',
      name: 'Global Manufacturing',
      type: 'Partner',
      status: 'Active',
      color: 'from-green-500 to-green-600'
    },
    {
      initials: 'DB',
      name: 'Digital Systems',
      type: 'Supplier',
      status: 'Pending',
      color: 'from-orange-500 to-orange-600'
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Manage Business Partners with Ease
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create, track, and manage all your business relationships from one centralized location.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${partner.color} text-white font-bold text-xl flex items-center justify-center mb-4`}
              >
                {partner.initials}
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {partner.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{partner.type}</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${partner.status === 'Active'
                    ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                  }`}
              >
                {partner.status}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
          >
            View All Partners
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
