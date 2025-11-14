# SehaTalk 🏥

**منصتك الطبية الموثوقة في مصر للاستشارات الصحية**  
*Your Trusted Medical Platform in Egypt for Health Consultations*

SehaTalk is a bilingual (Arabic/English) medical consultation platform that connects patients with verified Egyptian doctors through a trusted community-driven Q&A system.

## ✨ Features

### 🌐 Bilingual Support
- **Native Arabic Support** with RTL layout
- **English Interface** with LTR layout  
- **Seamless Language Switching** with localStorage persistence
- **SEO Optimized** with Arabic-first default

### 👥 User Roles
- **Patients**: Ask medical questions, browse answers, manage health profiles
- **Doctors**: Provide expert answers, build professional reputation, verify credentials
- **Admin**: Manage users, verify doctors, moderate content

### 🔐 Authentication System
- **Role-based Registration** (Patient/Doctor)
- **Secure Login** with form validation
- **Doctor Verification** process with credentials review
- **Profile Management** with medical specializations

### 🏥 Medical Features
- **Categorized Questions** by medical specialty
- **Verified Doctor Badges** for trusted responses
- **Medical Community** with professional discussions
- **Health Categories** (Cardiology, Dermatology, Pediatrics, etc.)
- **Expert Consultations** from certified Egyptian doctors

### 🎨 Modern UI/UX
- **Responsive Design** optimized for all devices
- **Medical Theme** with healthcare-focused styling
- **Accessibility** compliant interface
- **Smooth Animations** and transitions
- **Professional Cards** and layouts

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### UI Components
- **Custom UI Library** with medical-themed components
- **Form Components** with validation
- **Card Layouts** for medical content
- **Navigation Components** with language switching
- **Loading States** and error handling

### Internationalization
- **Custom i18n System** with React Context
- **Translation Management** with nested key structure
- **RTL/LTR Layout Support** with CSS direction handling
- **Language Persistence** with localStorage

## 📁 Project Structure

```
sehatalk/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── patient/       # Patient signup
│   │   └── doctor/        # Doctor signup
│   ├── categories/        # Medical categories page
│   └── explore/           # Explore questions page
├── components/            # React components
│   ├── pages/            # Page-specific components
│   ├── ui/               # Reusable UI components
│   └── figma/            # Design system components
├── lib/                  # Utilities and configurations
│   ├── i18n/            # Internationalization system
│   └── lang.js          # Language helper functions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdhamAhmed2005/SehaTalk.git
   cd sehatalk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Default language: Arabic (العربية)
   - Switch to English: [http://localhost:3000?lang=en](http://localhost:3000?lang=en)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🌍 Language Support

### Arabic (العربية) - Default
- Complete RTL layout support
- Arabic medical terminology
- Egyptian cultural context
- Arabic typography and fonts

### English - Secondary  
- Professional medical English
- International medical standards
- LTR layout optimization
- Accessible to global users

### Language Switching
- Navbar language toggle
- URL parameter support (`?lang=en`)
- Persistent user preference
- Real-time UI updates

## 🏥 Medical Categories

- **طب القلب / Cardiology** - Heart and cardiovascular health
- **الأمراض الجلدية / Dermatology** - Skin conditions and treatments  
- **طب الأطفال / Pediatrics** - Children's health and development
- **طب النساء / Gynecology** - Women's health and reproductive care
- **الطب النفسي / Psychiatry** - Mental health and wellbeing
- **جراحة عامة / General Surgery** - Surgical consultations
- **طب الأسرة / Family Medicine** - General practice and wellness

## 👨‍⚕️ Doctor Verification

- **Medical License Verification** - Egyptian medical board credentials
- **Specialization Certificates** - Verified medical specializations  
- **Professional Profile** - Detailed doctor information
- **Badge System** - Visual verification indicators
- **Reputation Management** - Community-driven trust scores

## 🔒 Security & Privacy

- **HIPAA-Compliant** design principles
- **Data Protection** following Egyptian privacy laws
- **Secure Authentication** with modern practices
- **Content Moderation** for medical accuracy
- **Privacy Controls** for sensitive health information

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy with automatic previews

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add translations for new features (Arabic + English)
- Test RTL layout compatibility
- Ensure mobile responsiveness
- Add proper TypeScript types

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, questions, or medical emergencies:
- **Non-Emergency**: Use the platform's Q&A system
- **Technical Issues**: Open a GitHub issue
- **Medical Emergencies**: Contact local emergency services immediately

---

**SehaTalk** - Connecting Egyptian patients with trusted medical professionals through technology. 🏥💚

*Built with ❤️ for the Egyptian healthcare community*
