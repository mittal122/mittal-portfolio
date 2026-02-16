# Portfolio Website - Mittal Domadiya

A modern, minimal portfolio website built with React, Vite, and Tailwind CSS featuring a matte black/gray aesthetic.

## 🚀 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.1
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.0
- **Routing**: React Router DOM 6.22
- **Icons**: Lucide React

## 📁 Project Structure

```
portfolio-website/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── AnimatedBackground.jsx
│   │   ├── BackToTopButton.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Navigation.jsx
│   │   ├── ScrollProgressBar.jsx
│   │   └── ui/          # UI components
│   ├── pages/           # Page components
│   │   ├── AboutPage.jsx
│   │   ├── CertificationsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── HomePage.jsx
│   │   └── SkillsPage.jsx
│   ├── lib/             # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json          # Vercel deployment config
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

The `vercel.json` file is already configured for optimal deployment.

## 📝 Git Setup

1. **Initialize Git repository**
   ```bash
   git init
   ```

2. **Add all files**
   ```bash
   git add .
   ```

3. **Commit**
   ```bash
   git commit -m "Initial commit: Portfolio website"
   ```

4. **Add remote repository**
   ```bash
   git remote add origin <your-github-repo-url>
   ```

5. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 🎨 Features

- ✨ Modern matte black/gray minimal design
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive layout
- 🧭 Glassmorphism navigation
- 🎯 Project showcase with dynamic images
- 📧 Contact form integration
- 🎓 Education and certifications display
- 💼 Professional experience timeline
- 🛠️ Skills visualization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory if you need to add environment variables:

```env
VITE_API_URL=your_api_url
```

### Customization

- **Colors**: Update `tailwind.config.js`
- **Font**: Modify `src/index.css`
- **Content**: Edit page files in `src/pages/`

## 📦 Build Output

- **Development**: `npm run dev` runs on `http://localhost:5173`
- **Production**: `npm run build` outputs to `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Mittal Domadiya**
- DevOps Engineer | Cloud Architect | SRE Specialist

---

Built with ❤️ using React + Vite
