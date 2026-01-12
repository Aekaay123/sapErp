import React from 'react'
import { Hero } from '../components/hero'
import { Features } from '../components/features'
import { BusinessPartners } from './BussinessPartner/Bussiness-Partner'
import { CTA } from '../components/cta'

const Home = () => {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <Features />
            <BusinessPartners />
            <CTA />
        </div>
    )
}

export default Home