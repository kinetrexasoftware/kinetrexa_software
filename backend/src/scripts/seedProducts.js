const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: './.env' });

const products = [
    {
        name: "HomeSarthi",
        tagline: "Your AI-Powered Real Estate Companion",
        shortDescription: "A cutting-edge PropTech platform simplifying property management and discovery with intelligent insights.",
        longDescription: "HomeSarthi is a next-generation real estate platform that leverages artificial intelligence to bridge the gap between property owners, buyers, and tenants. It provides real-time market analytics, automated property valuation, and a seamless interface for managing diverse real estate portfolios.",
        features: [
            "AI-Driven Property Valuation",
            "Smart Search & Recommendations",
            "Automated Lease Management",
            "Virtual Property Tours",
            "Investor Analytics Dashboard"
        ],
        category: "PropTech Platform",
        status: "Beta",
        logo: "Home",
        gradientTheme: "from-blue-600 to-indigo-600",
        websiteLink: "https://homesarthi.com",
        isFeatured: true,
        isActive: true,
        order: 0
    },
    {
        name: "Kinetrexa Analytics",
        tagline: "Turn Data into Strategic Advantage",
        shortDescription: "Enterprise-grade data visualization and predictive analytics for modern businesses.",
        longDescription: "Kinetrexa Analytics is designed for enterprises that demand more from their data. Our platform processes millions of data points in real-time to provide actionable insights, predictive trends, and customizable dashboards that empower decision-makers at every level.",
        features: [
            "Real-time Data Processing",
            "Predictive ML Models",
            "Custom Visualization Widgets",
            "Multi-source Integration",
            "Enterprise-grade Security"
        ],
        category: "Enterprise SaaS",
        status: "Coming Soon",
        logo: "BarChart3",
        gradientTheme: "from-purple-600 to-violet-600",
        websiteLink: "https://analytics.kinetrexa.com",
        isFeatured: true,
        isActive: true,
        order: 1
    },
    {
        name: "Kinetrexa CRM",
        tagline: "Relationship Management Redefined",
        shortDescription: "A unified platform to manage leads, automate sales, and drive customer loyalty.",
        longDescription: "Kinetrexa CRM is more than just a customer database. It's a complete ecosystem for managing the entire customer lifecycle. From lead generation and nurturing to automated follow-ups and customer support, it streamlines every interaction to drive growth.",
        features: [
            "360-degree Customer View",
            "Automated Sales Pipelines",
            "Smart Lead Scoring",
            "Integrated Marketing Tools",
            "Advanced Reporting & Forecasting"
        ],
        category: "Business Platform",
        status: "Coming Soon",
        logo: "Users",
        gradientTheme: "from-amber-500 to-orange-600",
        websiteLink: "https://crm.kinetrexa.com",
        isFeatured: true,
        isActive: true,
        order: 2
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');

        // Clear existing products
        await Product.deleteMany();
        console.log('Old products removed.');

        // Insert new products
        await Product.create(products);
        console.log('Premium products seeded successfully!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedProducts();
