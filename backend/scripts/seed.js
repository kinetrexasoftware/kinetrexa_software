const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../src/models/Admin');
const Content = require('../src/models/Content');
const Internship = require('../src/models/Internship');
const Product = require('../src/models/Product');
const Service = require('../src/models/Service');
const Training = require('../src/models/Training');
const Career = require('../src/models/Career');
const Settings = require('../src/models/Settings');

// Load env vars
dotenv.config({ path: '.env' });

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Seed data
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...');

    // Clear existing data (CAUTION: This deletes all data)
    await Admin.deleteMany({});
    await Content.deleteMany({});
    await Internship.deleteMany({});
    await Product.deleteMany({});
    await Service.deleteMany({});
    await Training.deleteMany({});
    await Career.deleteMany({});
    await Settings.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Super Admin
    const superAdmin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@kinetrexa.com',
      password: 'Admin@123',
      role: 'super_admin'
    });
    console.log('👤 Super Admin created:', superAdmin.email);

    // Create Settings
    await Settings.create({
      general: { name: 'KineTrexa', logo: '/logo.png', currency: 'USD' },
      contact: { email: 'contact@kinetrexa.com', phone: '+1 (555) 123-4567', address: '123 Tech Blvd, Innovation City' },
      social: {
        facebook: 'https://facebook.com/kinetrexa',
        twitter: 'https://twitter.com/kinetrexa',
        linkedin: 'https://linkedin.com/company/kinetrexa',
        instagram: 'https://instagram.com/kinetrexa'
      },
      seo: { title: 'KineTrexa - Digital Solutions', description: 'Empowering businesses with cutting-edge web and mobile applications.', keywords: 'software, development, ai, web, mobile' }
    });
    console.log('⚙️  Global Settings created');

    // Create Services
    await Service.create([
      { title: 'Web Development', category: 'Software', price: 'Starts @ $2000', icon: 'Globe', description: 'Custom websites and web apps.', active: true },
      { title: 'Mobile Applications', category: 'Software', price: 'Starts @ $3000', icon: 'Smartphone', description: 'iOS and Android apps.', active: true },
      { title: 'Digital Marketing', category: 'Marketing', price: 'Starts @ $500', icon: 'Megaphone', description: 'SEO and Social Media.', active: true },
      { title: 'UI/UX Design', category: 'Design', price: 'Starts @ $1500', icon: 'PenTool', description: 'User interface design.', active: true },
      { title: 'Cloud Solutions', category: 'Infrastructure', price: 'Custom Quote', icon: 'Cloud', description: 'AWS and Azure migrations.', active: true }
    ]);
    console.log('🛠️  Services created');

    // Create Products
    await Product.create([
      { name: 'KineCRM', tagline: 'Manage leads effectively', description: 'A powerful CRM for small businesses.', category: 'SaaS', status: 'Live', active: true },
      { name: 'TrexAnalytics', tagline: 'Data insights', description: 'Analytics dashboard for enterprise.', category: 'Tool', status: 'Beta', active: true },
      { name: 'CloudKeeper', tagline: 'Server management', description: 'Automated server scaling tool.', category: 'Infrastructure', status: 'Coming Soon', active: true }
    ]);
    console.log('📦 Products created');

    // Create Training
    await Training.create([
      { name: 'Full Stack Web Dev', duration: '6 Months', students: 45, status: 'Open', mode: 'Hybrid', price: '$499', description: 'Complete MERN stack course.' },
      { name: 'Data Science with Python', duration: '4 Months', students: 30, status: 'Closing Soon', mode: 'Online', price: '$399', description: 'Learn data analysis and ML.' },
      { name: 'UI/UX Masterclass', duration: '3 Months', students: 25, status: 'Closed', mode: 'Online', price: '$299', description: 'Design thinking and Figma.' },
      { name: 'DevOps Engineering', duration: '5 Months', students: 12, status: 'Open', mode: 'Online', price: '$599', description: 'CI/CD, Docker, Kubernetes.' }
    ]);
    console.log('🎓 Training Programs created');

    // Create Careers
    await Career.create([
      { role: 'Senior React Developer', type: 'Full-time', location: 'Remote', applicantsCount: 45, status: 'Active', description: 'Lead React developer needed.' },
      { role: 'UX Designer', type: 'Contract', location: 'New York, USA', applicantsCount: 12, status: 'Active', description: 'Contract UX role.' },
      { role: 'Marketing Manager', type: 'Full-time', location: 'London, UK', applicantsCount: 89, status: 'Closed', description: 'Head of marketing.' },
    ]);
    console.log('💼 Careers created');
    await Internship.create([
      {
        title: 'Frontend Developer Intern',
        description: 'Assist in building responsive web interfaces.',
        duration: '3 Months',
        type: 'internship',
        mode: 'remote',
        stipend: { amount: 5000, currency: 'INR', isPaid: true },
        technologies: ['React', 'Tailwind', 'JavaScript'],
        requirements: ['Basic HTML/CSS', 'Knowledge of React'],
        responsibilities: ['Build UI components', 'Fix bugs'],
        slots: { total: 5, filled: 0 },
        startDate: new Date('2026-06-01'),
        deadline: new Date('2026-05-20'),
        isActive: true,
        createdBy: superAdmin._id
      },
      {
        title: 'Backend Developer Intern',
        description: 'Work on API development and database management.',
        duration: '6 Months',
        type: 'internship',
        mode: 'hybrid',
        stipend: { amount: 8000, currency: 'INR', isPaid: true },
        technologies: ['Node.js', 'MongoDB', 'Express'],
        requirements: ['Basic JS', 'Understand REST APIs'],
        responsibilities: ['Create APIs', 'Optimize queries'],
        slots: { total: 3, filled: 0 },
        startDate: new Date('2026-06-15'),
        deadline: new Date('2026-06-01'),
        isActive: true,
        createdBy: superAdmin._id
      },
      {
        title: 'UI/UX Design Intern',
        description: 'Design user flows and wireframes.',
        duration: '3 Months',
        type: 'internship',
        mode: 'remote',
        stipend: { amount: 0, currency: 'INR', isPaid: false },
        technologies: ['Figma', 'Adobe XD'],
        requirements: ['Design sense', 'Portfolio'],
        responsibilities: ['Create mockups', 'User research'],
        slots: { total: 2, filled: 0 },
        startDate: new Date('2026-05-01'),
        deadline: new Date('2026-04-20'),
        isActive: true,
        createdBy: superAdmin._id
      }
    ]);
    console.log('🎓 Internships created');

    // Create Content (Using existing format but ensuring sections exist)
    await Content.create({
      section: 'home',
      content: {
        heroTitle: 'Innovating Digital Solutions for the Future',
        heroSubtitle: 'We build scalable web and mobile applications.',
        featuresEnabled: true,
        ctaText: 'Start Your Project'
      },
      isPublished: true,
      updatedBy: superAdmin._id
    });
    console.log('📄 Content created');

    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📝 Login Credentials:');
    console.log('   Email: admin@kinetrexa.com');
    console.log('   Password: Admin@123');
    console.log('');
    console.log('⚠️  Please change the admin password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();