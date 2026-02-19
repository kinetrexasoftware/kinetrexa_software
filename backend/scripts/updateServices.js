const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('../src/models/Service');

// Load env vars
dotenv.config(); // Defaults to .env in current directory

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const servicesData = [
    {
        title: "Web Development",
        description: "We build high-performance, scalable web applications using the latest technologies like React, Next.js, and Node.js. Our solutions are tailored to meet your specific business needs, ensuring a seamless user experience and robust functionality.",
        coverImage: "/services/web-development.png", // Path relative to public folder
        features: ["Custom Web Applications", "E-commerce Solutions", "CMS Development", "API Integration", "Performance Optimization"],
        technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
        processSteps: ["Requirement Analysis", "Design & Prototyping", "Development", "Testing & QA", "Deployment & Support"]
    },
    {
        title: "Mobile Applications",
        description: "Create continuous and seamless mobile experiences for both iOS and Android platforms. Our mobile app development services focus on performance, usability, and cutting-edge features to keep your users engaged.",
        coverImage: "/services/mobile-applications.png",
        features: ["Native iOS/Android Apps", "Cross-Platform Development", "UI/UX Design", "App Store Optimization", "Maintenance & Support"],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        processSteps: ["Ideation", "Wireframing", "Development", "Testing", "Launch"]
    },
    {
        title: "Digital Marketing",
        description: "Boost your online presence and reach your target audience with our data-driven digital marketing strategies. From SEO to social media management, we help you grow your brand and increase conversions.",
        coverImage: "/services/digital-marketing.png",
        features: ["Search Engine Optimization (SEO)", "Social Media Marketing", "Content Marketing", "Pay-Per-Click Advertising", "Email Marketing"],
        technologies: ["Google Analytics", "SEMrush", "Facebook Ads", "Mailchimp", "Hootsuite"],
        processSteps: ["Audit", "Strategy", "Execution", "Monitoring", "Optimization"]
    },
    {
        title: "Cloud Solutions",
        description: "Secure, scalable, and reliable cloud infrastructure solutions. We help you migrate, manage, and optimize your cloud environment ensuring high availability and cost-efficiency.",
        coverImage: "/services/cloud-solutions.png",
        features: ["Cloud Migration", "DevOps Implementation", "Infrastructure as Code", "Security Audits", "Managed Cloud Services"],
        technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
        processSteps: ["Assessment", "Planning", "Migration", "Optimization", "Management"]
    },
    {
        title: "UI/UX Design",
        description: "Crafting intuitive and visually stunning user interfaces. Our design process prioritizes user experience, ensuring that your digital products are not only beautiful but also easy to use and navigate.",
        coverImage: "/services/ui-ux-design.png",
        features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Interaction Design", "Usability Testing"],
        technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin"],
        processSteps: ["Research", "Design", "Prototype", "Test", "Iterate"]
    }
];

const updateServices = async () => {
    await connectDB();

    try {
        for (const service of servicesData) {
            console.log(`Updating ${service.title}...`);
            await Service.findOneAndUpdate(
                { title: service.title },
                {
                    $set: {
                        description: service.description,
                        shortDescription: service.description.substring(0, 150) + "...",
                        detailedDescription: service.description, // Ensure detailed desc is also set
                        coverImage: service.coverImage,
                        features: service.features,
                        technologies: service.technologies,
                        processSteps: service.processSteps
                    }
                },
                { new: true }
            );
        }
        console.log('All services updated successfully');
        process.exit();
    } catch (error) {
        console.error(`Error updating services: ${error.message}`);
        process.exit(1);
    }
};

updateServices();
