# 🌿 GreenNest - Indoor Plant Shop

A modern, responsive e-commerce web application for indoor plants built with React and Firebase. Browse beautiful plants, get expert care tips, and find the perfect green companion for your space.

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-12.4-FFCA28?style=flat-square&logo=firebase)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.3-5A0EF8?style=flat-square&logo=daisyui)

## 🌐 Live Demo

🔗 **[Visit GreenNest](https://green-nest-abbas.web.app)**

## ✨ Features

### 🏠 Home Page
- **Hero Carousel** - Beautiful image slider with 3 slides showcasing plant collections
- **Top Rated Plants** - Featured plants with ratings above 4.7
- **Plant Care Tips** - Expert advice on watering, sunlight, fertilizing & humidity
- **Meet Our Experts** - Team section with plant specialists
- **Plant of the Week** - Featured plant highlight
- **Newsletter Signup** - Email subscription for weekly tips
- **FAQ Section** - Common questions answered

### 🌱 Plants Page
- **Browse All Plants** - Complete plant catalog with card layout
- **Search** - Find plants by name or scientific name
- **Filter By:**
  - Category (Indoor, Outdoor, Succulents, etc.)
  - Difficulty (Easy, Medium, Expert)
  - Light Requirements (Low, Medium, Bright)
- **Sort By Price** - Ascending or descending order
- **Responsive Grid** - 4 cards per row on desktop, adaptive on mobile

### 🔍 Plant Details
- Detailed plant information
- Care requirements (watering, sunlight, difficulty)
- Price and availability
- Consultation booking form
- **Public access** - No login required to view

### 👤 User Authentication
- **Login/Register** with email & password
- **Google Sign-In** integration
- **Password Recovery** via email
- **Protected Profile** - Only accessible when logged in

### 📄 Other Pages
- **About Us** - Company story, values, and team
- **My Profile** - User information display
- **404 Error Page** - Professional error handling

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, React Router 7 |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS 3.4, DaisyUI 5 |
| **Animation** | Framer Motion |
| **Icons** | React Icons, Lucide React |
| **Carousel** | Swiper.js |
| **Backend** | Firebase Authentication |
| **Hosting** | Firebase Hosting |
| **Notifications** | React Toastify |

## 📁 Project Structure

```
green-nest-abbas/
├── public/
│   └── assets/
│       ├── hero_images/      # Carousel images
│       ├── plant_experts/    # Team photos
│       └── plant_images/     # Plant catalog images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation with mobile menu
│   │   └── Footer.jsx        # Site footer with links
│   ├── context/
│   │   └── AuthProvider.jsx  # Firebase auth context
│   ├── data/
│   │   └── plants.json       # Plant catalog data
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── layouts/
│   │   └── MainLayout.jsx    # Page layout wrapper
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Plants.jsx
│   │   ├── PlantDetails.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── MyProfile.jsx
│   │   └── ErrorPage.jsx
│   └── routes/
│       ├── router.jsx        # Route definitions
│       └── PrivateRoute.jsx  # Auth protection
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── firebase.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abbasyasin1n2/green-earth-abbas.git
   cd green-nest-abbas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password & Google)
   - Copy your config to `src/firebase/firebase.config.js`

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

6. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 📱 Responsive Design

- **Mobile** (< 768px) - Single column layout, hamburger menu
- **Tablet** (768px - 1024px) - 2-3 column grids
- **Desktop** (> 1024px) - Full 4-column layout, expanded navigation

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#2F5233` | Headers, buttons |
| Accent Green | `#4A7C59` | Links, highlights |
| Sage Green | `#8B9D83` | Secondary elements |
| Cream | `#F5F1E8` | Backgrounds |

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**Abbas Yasin**

- GitHub: [@abbasyasin1n2](https://github.com/abbasyasin1n2)

---

<p align="center">Made with 💚 for plant lovers</p>
