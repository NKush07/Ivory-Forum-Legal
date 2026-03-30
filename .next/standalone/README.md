# Law Professional Website - Local Setup Guide

A modern, responsive website for law professionals built with Next.js, MongoDB, and Tailwind CSS. Features include portfolio showcase, practice areas, contact form, blog section, and code download functionality.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Accessing the Website](#accessing-the-website)
- [Features Overview](#features-overview)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Technologies Used](#technologies-used)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18.x or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Yarn Package Manager** (v1.22.x or higher)
   - Install globally:
     ```bash
     npm install -g yarn
     ```
   - Verify installation:
     ```bash
     yarn --version
     ```

3. **SMTP Email Server** (for contact form delivery)
   - Use an SMTP provider (SendGrid, Mailgun, SMTP2GO, Gmail SMTP, etc.)
   - You must define SMTP credentials in `.env` as described below.
   - Example provider docs:
     - SendGrid: https://docs.sendgrid.com/
     - Mailgun: https://documentation.mailgun.com/
   

4. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

---

## 📥 Installation Steps

### Step 1: Extract/Clone the Project

If you downloaded the ZIP file:
```bash
# Extract the ZIP file to your desired location
unzip law-website-code.zip
cd law-website-code
```

If cloning from repository:
```bash
git clone <repository-url>
cd law-website-code
```

### Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
# Install all dependencies using Yarn
yarn install
```

This will install all packages listed in `package.json`, including:
- Next.js
- React
- MongoDB driver
- Tailwind CSS
- shadcn/ui components
- And all other dependencies

**Expected Output:**
```
✨ Done in XX.XXs
```

---

## ⚙️ Environment Configuration

### Step 1: Create Environment File

Create a `.env` file in the root directory of the project:

```bash
# For Windows
copy .env.example .env

# For macOS/Linux
cp .env.example .env
```

Or create manually with a text editor.

### Step 2: Configure Environment Variables

Open the `.env` file and configure the following variables:

```env
# Email SMTP configuration (required for contact form delivery)
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_SECURE=false # true for 465, false for 587
EMAIL_USER=your-smtp-username
EMAIL_PASS=your-smtp-password
EMAIL_FROM="Law Website <no-reply@yourdomain.com>"
CONTACT_RECEIVER_EMAIL=sarah.mitchell@lawfirm.com

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# CORS Settings
CORS_ORIGINS=*
```

#### Configuration Notes:

- Ensure SMTP credentials are valid and your outbound IP is allowed by provider.
- For local testing, you can use a tool like [MailHog](https://github.com/mailhog/MailHog), [Mailtrap](https://mailtrap.io/), or a free SendGrid account.

### Step 3: Run the Application

Before running the application, ensure MongoDB is running:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**macOS:**
```bash
# Start MongoDB
brew services start mongodb-community
```

**Linux:**
```bash
# Start MongoDB
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
# Connect to MongoDB shell
mongosh
# or for older versions
mongo
```

If connected successfully, you'll see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

Type `exit` to leave the MongoDB shell.

---

## 🚀 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
yarn dev
```

**Expected Output:**
```
yarn run v1.22.22
$ NODE_OPTIONS='--max-old-space-size=512' next dev --hostname 0.0.0.0 --port 3000
  ▲ Next.js 14.2.3
  - Local:        http://localhost:3000
  - Network:      http://0.0.0.0:3000

 ✓ Ready in 2.1s
```

### Production Mode

For production build and deployment:

```bash
# Build the application
yarn build

# Start production server
yarn start
```

---

## 🌐 Accessing the Website

Once the server is running, open your web browser and navigate to:

### Main Pages:
- **Home Page:** http://localhost:3000
- **Blog Listing:** http://localhost:3000/blog
- **Individual Blog Post:** http://localhost:3000/blog/understanding-contract-law-basics

### API Endpoints:
- **Health Check:** http://localhost:3000/api/
- **Get All Blogs:** http://localhost:3000/api/blogs
- **Get All Contacts:** http://localhost:3000/api/contacts
- **Download Code:** http://localhost:3000/api/download-code

---

## ✨ Features Overview

### 🏠 Main Website Features

1. **Hero Section**
   - Professional introduction
   - Key statistics (500+ cases won, 20+ years experience, 98% success rate)
   - Call-to-action buttons

2. **About Section**
   - Attorney biography
   - Education credentials (Harvard Law School)
   - Certifications and professional memberships
   - Awards and achievements

3. **Practice Areas**
   - Business Law
   - Family Law
   - Civil Litigation
   - Estate Planning
   - Real Estate Law
   - Criminal Defense
   - Detailed service descriptions for each area

4. **Client Testimonials**
   - Real client reviews
   - 5-star ratings
   - Social proof elements

5. **Contact Form**
   - Name, email, phone fields
   - Case type selection
   - Message textarea
   - Form validation
   - Success/error notifications
   - MongoDB integration for storing inquiries

6. **Responsive Navigation**
   - Desktop horizontal menu
   - Mobile hamburger menu
   - Smooth scroll to sections
   - Fixed header on scroll

### 📝 Blog Features

1. **Blog Listing Page**
   - Display all published blog posts
   - Publication date and read time
   - Category tags
   - Excerpt preview
   - Search and filter capabilities

2. **Individual Blog Posts**
   - Full article content
   - Professional formatting
   - Author information
   - Related posts suggestions
   - Call-to-action for consultation

3. **Sample Blog Topics**
   - Understanding Contract Law Basics
   - Navigating Divorce Proceedings
   - Estate Planning Essentials
   - Real Estate Transactions Guide
   - Personal Injury Claims Process

### 📥 Download Feature

- **Download Website Code Button**
  - Located in footer
  - Downloads complete source code as ZIP
  - Includes all necessary files
  - Excludes node_modules and build files
  - Automatic .env.example generation

---

## 📁 Project Structure

```
law-website-code/
├── app/                          # Next.js App Directory
│   ├── api/                      # API Routes
│   │   └── [[...path]]/
│   │       └── route.js          # Main API handler
│   ├── blog/                     # Blog Pages
│   │   ├── [slug]/
│   │   │   └── page.js           # Individual blog post
│   │   └── page.js               # Blog listing
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   └── globals.css               # Global styles
├── components/                   # React Components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility functions
│   └── utils/                    # Helper utilities
├── public/                       # Static files
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── package.json                  # Project dependencies
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

### Key Files:

- **`app/page.js`** - Main homepage with all sections
- **`app/api/[[...path]]/route.js`** - Backend API with all endpoints
- **`app/blog/page.js`** - Blog listing page
- **`app/blog/[slug]/page.js`** - Dynamic blog post pages
- **`.env`** - Environment configuration (you create this)

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Port 3000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 yarn dev
```

#### 2. MongoDB Connection Error

**Error:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   # Check MongoDB status
   # Windows:
   sc query MongoDB
   
   # macOS:
   brew services list
   
   # Linux:
   sudo systemctl status mongod
   ```

2. Start MongoDB if not running (see Step 3 in Environment Configuration)

3. Verify connection string in `.env` file

4. If using MongoDB Atlas, check:
   - Credentials are correct
   - IP whitelist includes your IP (or use 0.0.0.0/0 for testing)
   - Network access is configured

#### 3. Dependencies Installation Fails

**Error:**
```
error An unexpected error occurred: "ENOENT: no such file or directory"
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm yarn.lock
yarn cache clean
yarn install
```

#### 4. Module Not Found Errors

**Error:**
```
Module not found: Can't resolve '@/components/ui/button'
```

**Solution:**
```bash
# Reinstall dependencies
yarn install

# Restart development server
yarn dev
```

#### 5. Environment Variables Not Loading

**Error:**
```
Missing SMTP email configuration
```

**Solution:**
1. Ensure `.env` file exists in root directory
2. Check SMTP variable names in `.env`:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `CONTACT_RECEIVER_EMAIL`
3. Restart the development server after editing `.env`
4. For `NEXT_PUBLIC_*` variables, rebuild the app:
   ```bash
   yarn build
   yarn dev
   ```

#### 6. Styles Not Loading

**Error:**
Tailwind CSS classes not applying

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart server
yarn dev
```

#### 7. Blog Posts Not Showing

**Issue:**
Blog page shows "No blog posts available"

**Solution:**
1. The `/api/blogs` endpoint now serves static sample blog data directly
2. Try accessing: http://localhost:3000/api/blogs directly
3. If you see an error, check server logs for API route or JSON parsing errors

#### 8. Download Button Not Working

**Issue:**
ZIP file download fails

**Solution:**
1. Check browser console for errors
2. Ensure `archiver` package is installed:
   ```bash
   yarn add archiver
   ```
3. Clear browser cache
4. Try different browser

---

## 🛠️ Technologies Used

### Frontend
- **Next.js 14.2.3** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Nodemailer** - SMTP email delivery for contact form submissions
- **Archiver 7.0.1** - ZIP file creation

### Development Tools
- **Yarn 1.22.22** - Package manager
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📝 Additional Information

### Contact and Blog Data

- Contact submissions are now sent by email to the address configured in `CONTACT_RECEIVER_EMAIL`; no database persistence is required.
- Blog posts are served from static data embedded in the API route (`/api/blogs` and `/api/blogs/[slug]`) so no database is required.

### Code Quality

- **ESLint** - Code linting (run with `yarn lint`)
- **Prettier** - Code formatting
- **TypeScript Ready** - Can be migrated to TypeScript

---

## 🚀 Deployment

For production deployment:

1. **Build the application:**
   ```bash
   yarn build
   ```

2. **Test production build locally:**
   ```bash
   yarn start
   ```

3. **Deploy to platforms:**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - DigitalOcean
   - Any Node.js hosting

### Environment Variables for Production

Ensure all environment variables are configured in your hosting platform:
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_SECURE` - `true` or `false`
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `EMAIL_FROM` - sender address for automated contact emails
- `CONTACT_RECEIVER_EMAIL` - destination email for form submissions
- `NEXT_PUBLIC_BASE_URL` - Production URL
- `CORS_ORIGINS` - Allowed origins (comma-separated)

---

## 📞 Support

If you encounter any issues not covered in this guide:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check the [MongoDB Documentation](https://docs.mongodb.com/)
3. Review error messages in:
   - Browser console (F12)
   - Terminal/command prompt
   - MongoDB logs

---

## 📄 License

This project is provided as-is for personal or commercial use.

---

## 🎉 You're All Set!

Your law professional website should now be running locally. Enjoy building and customizing!

**Quick Start Commands:**
```bash
# Install dependencies
yarn install

# Create .env file and configure
# (See Environment Configuration section)

# Start development server
yarn dev

# Open http://localhost:3000 in your browser
```

**Happy Coding! ⚖️**
