'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Enterprise'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API', 'Community', 'Support'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Contact'],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer className="bg-card border-t border-border/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                SAP
              </div>
              <span className="font-semibold text-foreground">Business One</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering businesses worldwide with smart management solutions.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border/40 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SAP Business One. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
