require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Service = require('../models/Service');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kinetrexa';

const servicesData = [
    {
        title: "Custom Web Development",
        shortDescription: "High-performance, scalable web applications built with modern frameworks to drive your business growth.",
        detailedDescription: "Our web development service focuses on creating robust, secure, and highly interactive web applications. Whether you need a simple corporate site or a complex enterprise portal, we use the latest tech stacks to ensure your digital presence is cutting-edge. We emphasize performance optimization, responsive design, and seamless user experiences across all devices.",
        features: ["Modern UI/UX Design", "Progressive Web Apps (PWA)", "API Integration & Development", "SEO-Friendly Architecture", "Performance Optimization"],
        technologies: ["React.js", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        processSteps: ["Project Discovery", "Architecture Design", "Agile Development", "Quality Assurance", "Deployment & Support"],
        icon: "Globe",
        gradientTheme: "from-blue-600 to-cyan-500",
        isActive: true,
        order: 1
    },
    {
        title: "Mobile App Development",
        shortDescription: "Intuitive and powerful iOS and Android applications that provide seamless mobile experiences for your customers.",
        detailedDescription: "We specialize in developing native and cross-platform mobile applications that stand out in the App Store and Google Play. Our development process prioritizes user engagement, smooth animations, and platform-specific optimizations. We ensure your app is not only functional but also offers a premium feel that keeps users coming back.",
        features: ["Native iOS & Android", "Cross-Platform (React Native)", "Real-time Notifications", "Offline Functionality", "App Store Optimization"],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        processSteps: ["Requirement Analysis", "Prototyping", "Core Development", "Beta Testing", "App Store Submission"],
        icon: "Smartphone",
        gradientTheme: "from-purple-600 to-pink-500",
        isActive: true,
        order: 2
    },
    {
        title: "Cloud & DevOps Solutions",
        shortDescription: "Scale your infrastructure with reliability, security, and automated deployment pipelines.",
        detailedDescription: "Our Cloud and DevOps services help you modernize your infrastructure for maximum efficiency and uptime. We provide complete cloud migration, containerization, and continuous integration/deployment (CI/CD) setups. We focus on reducing technical debt and improving the speed of your delivery cycle through automation and cloud-native best practices.",
        features: ["Cloud Migration (AWS/Azure)", "CI/CD Pipeline Automation", "Containerization (Docker)", "Kubernetes Orchestration", "Security Audits"],
        technologies: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        processSteps: ["Infrastructure Audit", "Strategy Definition", "Migration/Setup", "Automation Implementation", "Scaling & Monitoring"],
        icon: "Cloud",
        gradientTheme: "from-teal-600 to-emerald-500",
        isActive: true,
        order: 3
    },
    {
        title: "UI/UX Design Studio",
        shortDescription: "User-centric designs that blend aesthetic brilliance with functional simplicity to boost user satisfaction.",
        detailedDescription: "Great design is more than just looks; it's about how things work. Our design studio creates interfaces that are intuitive, accessible, and delightful to use. We conduct thorough user research and usability testing to ensure every pixel serves a purpose. We help you build a consistent brand identity across all your digital touchpoints.",
        features: ["User Research", "Wireframing & Prototyping", "Visual Identity Design", "Interactive Mockups", "Usability Testing"],
        technologies: ["Figma", "Adobe XD", "Principle", "Framer", "Lottie"],
        processSteps: ["Discovery Phase", "User Flow Mapping", "Visual Designing", "Interactive Prototyping", "Design Handoff"],
        icon: "Layers",
        gradientTheme: "from-indigo-600 to-violet-500",
        isActive: true,
        order: 4
    },
    {
        title: "Digital Marketing & SEO",
        shortDescription: "Drive targeted traffic and increase conversions with our data-driven marketing and search engine optimization.",
        detailedDescription: "Our digital marketing services are designed to give your brand the visibility it deserves. We use advanced SEO techniques, content strategy, and data analytics to improve your search rankings and ROI. From technical SEO audits to social media management, we ensure your business reaches its target audience effectively and grows its online footprint.",
        features: ["Technical SEO Audits", "Content Strategy", "Social Media Management", "PPC Campaigns", "Analytics Tracking"],
        technologies: ["Google Analytics", "SEMRush", "Ahrefs", "Google Ads", "Meta Business"],
        processSteps: ["Platform Audit", "Competitor Analysis", "Campaign Strategy", "Implementation", "Growth Analysis"],
        icon: "Rocket",
        gradientTheme: "from-orange-600 to-red-500",
        isActive: true,
        order: 5
    },
    {
        title: "Enterprise SaaS Development",
        shortDescription: "Custom-built SaaS platforms and ERP solutions tailored to streamline your complex business workflows.",
        detailedDescription: "We build enterprise-grade software that solves complex business problems. Our SaaS development focuses on multi-tenancy architecture, high scalability, and seamless integration with existing enterprise tools. We provide end-to-end solutions from conceptualization to global rollout, ensuring your software grows with your business needs.",
        features: ["Multi-Tenant Architecture", "Custom ERP Solutions", "Enterprise Integration", "High Scalability", "Data Security"],
        technologies: ["Python", "Django", "Go", "AWS Lambda", "Redis"],
        processSteps: ["Core Requirements", "Architecture Planning", "Development Cycle", "Integration Testing", "Global Deployment"],
        icon: "Database",
        gradientTheme: "from-rose-600 to-orange-500",
        isActive: true,
        order: 6
    }
];

const seedServices = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Seeding Services');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        await Service.insertMany(servicesData);
        console.log('✅ 6 Premium Services Seeded Successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedServices();
