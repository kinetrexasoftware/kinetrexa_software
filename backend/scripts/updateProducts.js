const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../src/models/Product');

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const productsData = [
    {
        name: "HomeSarthi",
        tagline: "Your trusted home service partner.",
        shortDescription: "A comprehensive platform for booking home services like cleaning, repairs, and more.",
        longDescription: "HomeSarthi connects you with verified professionals for all your home service needs. From plumbing to electrical work, get it done with a tap.",
        logo: "Home",
        status: "Live",
        category: "Service Platform",
        gradientTheme: "from-blue-600 to-cyan-500",
        websiteLink: "https://admin.homesarthi.com", // Placeholder for web admin
        androidLink: "https://play.google.com/store/apps/details?id=com.homesarthi", // Placeholder
        iosLink: "",
        features: ["Verified Professionals", "Instant Booking", "Transparent Pricing", "Secure Payments"],
        isFeatured: true,
        isActive: true,
        order: 0
    },
    {
        name: "KineFlow",
        tagline: "Intelligent workflow automation.",
        shortDescription: "Streamline your business processes with AI-driven automation.",
        longDescription: "KineFlow helps businesses automate repetitive tasks and optimize workflows using advanced AI algorithms.",
        logo: "Box",
        status: "Coming Soon",
        category: "SaaS",
        gradientTheme: "from-indigo-600 to-blue-700",
        features: ["Workflow Automation", "AI Integration", "Analytics Dashboard"],
        isFeatured: true,
        isActive: true,
        order: 1
    },
    {
        name: "EduMate",
        tagline: "Smart education management.",
        shortDescription: "Complete solution for schools and educational institutions.",
        longDescription: "Manage students, teachers, exams, and attendance all in one place with EduMate.",
        logo: "BookOpen", // Using generic or available icon
        status: "Coming Soon",
        category: "EdTech",
        gradientTheme: "from-emerald-600 to-teal-500",
        features: ["Student Management", "Online Exams", "Fee Collection"],
        isFeatured: true,
        isActive: true,
        order: 2
    }
];

const updateProducts = async () => {
    await connectDB();

    try {
        // Clear existing products to ensure clean slate or update smartly
        // For this task, I'll update if exists or create new

        for (const product of productsData) {
            console.log(`Updating/Creating ${product.name}...`);
            await Product.findOneAndUpdate(
                { name: product.name },
                { $set: product },
                { upsert: true, new: true }
            );
        }

        console.log('Products updated successfully');
        process.exit();
    } catch (error) {
        console.error(`Error updating products: ${error.message}`);
        process.exit(1);
    }
};

updateProducts();
