require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Content = require('../models/Content');
const connectDB = require('../config/database');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kinetrexa';

const seedAboutContent = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Seeding About Content');

        const aboutContent = {
            mission: "Our mission is to bridge the gap between academic learning and industry demands while delivering world-class digital solutions to our clients.",
            vision: "To be the leading platform for empowering the next generation of tech leaders and building innovative digital products.",
            whatMakesUsDifferent: {
                title: "What Makes Us Different",
                subtitle: "In a sea of tech companies, here's why KineTrexa stands out.",
                items: [
                    { title: "Product-Driven Mindset", desc: "We don't just follow specs; we think about the end-user and business goals.", icon: "Zap" },
                    { title: "Community & Mentorship", desc: "We believe in growing together. Our senior developers actively mentor interns.", icon: "Users" },
                    { title: "Transparent & Honest", desc: "No hidden costs, no fake promises. We value long-term relationships.", icon: "Shield" },
                    { title: "Quality Over Quantity", desc: "We take on fewer projects to ensure every line of code meets our high standards.", icon: "Check" }
                ]
            },
            ourProcess: {
                title: "Our Process",
                subtitle: "A systematic approach to delivering excellence.",
                steps: [
                    { number: "01", title: "Understand", desc: "We dive deep into your problem, asking the right questions." },
                    { number: "02", title: "Plan & Design", desc: "We architect a robust solution and design intuitive interfaces." },
                    { number: "03", title: "Build & Test", desc: "Our engineers build the solution using modern tech stacks." },
                    { number: "04", title: "Deliver & Grow", desc: "We launch your product and provide ongoing support." }
                ]
            },
            trainingPhilosophy: {
                title: "Empowering Future Tech Leaders",
                paragraphs: [
                    "At KineTrexa, we believe that the best way to learn is by doing. Our training and internship programs are designed not just to teach syntax, but to teach engineering.",
                    "We don't settle for 'Hello World.' Our interns work on live production code, tackle real architectural challenges, and learn the soft skills necessary to thrive in a modern agile team."
                ]
            },
            ourValues: {
                title: "Our Core Values",
                subtitle: "The principles that guide everything we do.",
                values: [
                    { name: "Quality", icon: "ShieldCheck", desc: "We never compromise on the standard of our work." },
                    { name: "Innovation", icon: "Lightbulb", desc: "We constantly explore new better ways to solve problems." },
                    { name: "Integrity", icon: "Heart", desc: "We are honest, transparent, and ethical in all our dealings." },
                    { name: "Growth", icon: "TrendingUp", desc: "We are committed to the continuous growth of our team and clients." },
                    { name: "Collaboration", icon: "Users", desc: "We believe great things are built together, not alone." }
                ]
            }
        };

        const section = 'about';

        let content = await Content.findOne({ section });

        if (content) {
            console.log('About content already exists. Updating...');
            content.content = { ...content.content, ...aboutContent };
            await content.save();
        } else {
            console.log('Creating new About content...');
            await Content.create({
                section,
                content: aboutContent,
                isPublished: true
            });
        }

        console.log('✅ About Content Seeded Successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedAboutContent();
