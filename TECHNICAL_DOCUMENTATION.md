# SehaTalk Technical Documentation

**A Comprehensive Guide to System Architecture, Pages, and Components**

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Pages & Routes](#pages--routes)
6. [API Endpoints](#api-endpoints)
7. [Database Models](#database-models)
8. [Authentication System](#authentication-system)
9. [Internationalization (i18n)](#internationalization-i18n)
10. [Key Components](#key-components)
11. [Development Guide](#development-guide)
12. [Deployment](#deployment)

---

## System Overview

**SehaTalk** is a modern, bilingual (Arabic/English) medical consultation platform built on Next.js. The system enables:

- **Patients** to ask medical questions, browse answers, and manage health profiles
- **Doctors** to provide expert responses, build professional reputations, and verify credentials
- **Admins** to manage users, verify doctors, and moderate content

The platform emphasizes security, accessibility, and a seamless bilingual experience with RTL/LTR support.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
│  (React Components, Pages, Client/Server Components)    │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│         API Routes (Next.js App Router)                 │
│  (/api/auth, /api/questions, /api/doctors, etc.)        │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│            MongoDB Database (Mongoose ORM)              │
│  (Collections: Users, Questions, Answers, Categories)   │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

1. **Client Request** → Next.js Server Component or API Route
2. **Authentication** → JWT verification from auth_token cookie
3. **Database Query** → Mongoose model operations
4. **Response** → JSON payload back to client
5. **UI Render** → Client-side or server-side rendering

---

## Technology Stack

### Frontend
- **Next.js 16.0.7** - React framework with App Router (SSR/SSG)
- **React 19.2.0** - Modern UI library with functional components
- **TypeScript/JavaScript** - Type safety and modern syntax
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (Select, Avatar, Dialog)
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose 9.0.0** - ODM for MongoDB
- **JSON Web Token (JWT)** - Authentication tokens
- **bcryptjs** - Password hashing

### Utilities
- **dotenv** - Environment variable management
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## Project Structure

```
sehatalk/
├── app/                           # Next.js App Router
│   ├── api/                       # API routes
│   │   ├── auth/
│   │   │   ├── login/            # Login endpoint
│   │   │   ├── signup/           # Signup endpoint
│   │   │   └── logout/           # Logout endpoint
│   │   ├── questions/            # Question CRUD
│   │   │   ├── route.js          # GET/POST questions
│   │   │   ├── [id]/             # Single question
│   │   │   │   ├── route.js      # GET single question
│   │   │   │   └── replies/      # Doctor replies/comments
│   │   │   └── [id]/upvote/      # Question upvotes
│   │   ├── doctors/              # Doctor operations
│   │   │   ├── route.js          # GET doctors list
│   │   │   └── [id]/             # Single doctor details
│   │   ├── categories/           # Medical categories
│   │   ├── profile/              # User profiles
│   │   ├── admin-stats/          # Admin dashboard stats
│   │   ├── pending-doctors/      # Doctor verification queue
│   │   └── answers/              # Legacy answers (deprecated)
│   │
│   ├── auth/                      # Auth pages
│   │   ├── page.js               # Auth options (Patient/Doctor choice)
│   │   ├── login/
│   │   │   └── page.js           # Login form
│   │   ├── patient/
│   │   │   └── page.js           # Patient signup form
│   │   └── doctor/
│   │       └── page.js           # Doctor signup form
│   │
│   ├── admin-dashboard/          # Admin control panel
│   │   ├── page.jsx              # Dashboard overview
│   │   └── doctors/
│   │       ├── page.jsx          # Doctor verification table
│   │       ├── DoctorVerificationTable.jsx
│   │       ├── AdminStats.jsx
│   │       └── DoctorRow.jsx
│   │
│   ├── ask-question/             # Ask question page
│   │   ├── page.js               # Question form
│   │   └── AskQuestionForm.jsx   # Form component
│   │
│   ├── explore/                  # Browse questions
│   │   └── page.js               # Explore page
│   │
│   ├── categories/               # Browse categories
│   │   └── page.js               # Categories listing
│   │
│   ├── doctors/                  # Browse doctors
│   │   └── page.js               # Doctors listing
│   │
│   ├── profile/
│   │   ├── patient/              # Patient dashboard
│   │   │   ├── page.js
│   │   │   └── PatientDashboardContent.jsx
│   │   └── doctor/               # Doctor dashboard
│   │       ├── page.js
│   │       └── DoctorDashboardContent.jsx
│   │
│   ├── post/
│   │   └── [id]/                 # Question detail page
│   │       └── page.js
│   │
│   ├── about/                    # About page
│   │   └── page.js
│   │
│   ├── support/                  # Support/Help page
│   │   └── page.jsx
│   │
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│   ├── globals.css               # Global styles
│   └── not-found.js              # 404 page
│
├── components/                    # React components
│   ├── pages/                    # Full-page components
│   │   ├── LandingPage.jsx       # Homepage
│   │   ├── ExplorePage.jsx       # Browse questions
│   │   ├── CategoriesContent.jsx # Categories page
│   │   ├── DoctorsContent.jsx    # Doctors listing
│   │   ├── AboutContent.jsx      # About page
│   │   └── DetailsDescription.jsx
│   │
│   ├── forms/                    # Form components
│   │   ├── CategorySelector.jsx  # Medical category select
│   │   ├── DetailedDescription.jsx
│   │   ├── FileUpload.jsx        # File upload handler
│   │   ├── PatientProfileSummary.jsx
│   │   ├── QuestionTitleInput.jsx
│   │   └── SubmitSection.jsx
│   │
│   ├── ui/                       # Base UI components
│   │   ├── avatar.jsx            # Avatar component
│   │   ├── badge.jsx             # Badge component
│   │   ├── button.jsx            # Button component
│   │   ├── card.jsx              # Card component
│   │   ├── input.jsx             # Input field
│   │   ├── label.jsx             # Form label
│   │   ├── select.jsx            # Dropdown select
│   │   ├── SimpleModal.jsx       # Modal dialog
│   │   ├── Toast.jsx             # Toast notifications
│   │   ├── use-mobile.js         # Mobile breakpoint hook
│   │   └── utils.js              # UI utilities
│   │
│   ├── figma/
│   │   └── ImageWithFallback.jsx # Image with fallback
│   │
│   ├── Navbar.jsx                # Navigation bar
│   ├── LanguageSwitcher.jsx      # i18n language toggle
│   ├── DocumentDirection.jsx     # Direction provider
│   ├── VerifiedBadge.jsx         # Doctor verification badge
│   ├── SearchFilterBar.jsx       # Search & filter component
│   └── MedicalSpinner.jsx        # Loading spinner
│
├── lib/                          # Utilities & helpers
│   ├── i18n/
│   │   ├── LanguageProvider.jsx  # i18n context provider
│   │   ├── translations_safe.js  # Complete translation keys
│   │   ├── translations_clean.js # (Alternative translations)
│   │   └── translations.js       # (Legacy translations)
│   │
│   ├── utils/
│   │   ├── authClient.js         # Client-side auth helpers
│   │   ├── doctorTranslations.js # Doctor specialty translations
│   │   ├── questionUtils.js      # Question validation & helpers
│   │   ├── specialtyTranslations.js # Specialty translations
│   │   └── translateService.js   # Text translation service
│   │
│   ├── validation/
│   │   └── patientForm.js        # Patient form validation rules
│   │
│   ├── db/
│   │   └── helpers.js            # Database query helpers
│   │
│   ├── data/
│   │   └── doctors.js            # Mock doctor data
│   │
│   ├── constants.js              # App constants
│   ├── lang.js                   # Language utilities
│   └── mongodb.js                # MongoDB connection setup
│
├── models/                        # Mongoose schemas
│   ├── Doctor.js                 # Doctor user model
│   ├── Patient.js                # Patient user model
│   ├── Admin.js                  # Admin user model
│   ├── Question.js               # Medical question model
│   ├── Answer.js                 # Question answer (legacy)
│   ├── Category.js               # Medical category model
│   ├── PostUpvote.js             # Question upvote tracking
│   ├── PostComment.js            # Doctor comment/reply model
│   └── PendingDoctor.js          # Doctor verification queue
│
├── public/                        # Static assets
│   ├── avatars/                  # User avatars
│   └── flat-woman-online-counseling-with-psychologist/
│
├── scripts/                       # Utility scripts
│   ├── seed.js                   # Database seeding
│   └── populateDoctors.js        # Doctor data population
│
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.mjs            # PostCSS configuration
├── jsconfig.json                 # JavaScript configuration
├── eslint.config.mjs             # ESLint rules
├── LICENSE                       # MIT License
└── README.md                     # User documentation
```

---

## Pages & Routes

### Public Pages

| Route | Purpose | Component | Auth Required |
|-------|---------|-----------|---------------|
| `/` | Homepage/Landing | `LandingPage` | No |
| `/auth` | Auth options (Patient/Doctor) | `AuthOptionsContent` | No |
| `/auth/login` | Login form | `SignInForm` | No |
| `/auth/patient` | Patient registration | `PatientRegistrationForm` | No |
| `/auth/doctor` | Doctor registration | `DoctorRegistrationForm` | No |
| `/explore` | Browse questions | `ExplorePage` | No |
| `/categories` | Medical categories | `CategoriesContent` | No |
| `/doctors` | Doctor directory | `DoctorsContent` | No |
| `/about` | About platform | `AboutContent` | No |
| `/support` | Help & support | `Support page` | No |

### Protected Pages

| Route | Purpose | Auth Required | Role |
|-------|---------|---------------|------|
| `/ask-question` | Ask medical question | Yes | Patient |
| `/profile/patient` | Patient dashboard | Yes | Patient |
| `/profile/doctor` | Doctor dashboard | Yes | Doctor |
| `/post/[id]` | Question detail page | No | Any |
| `/admin-dashboard/doctors` | Doctor verification | Yes | Admin |
| `/appointments/new` | Book appointment | Yes | Patient |

---

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/signup`
**Register a new user**
- Request Body:
  ```json
  {
    "role": "patient|doctor",
    "email": "user@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe",
    ... (additional fields per role)
  }
  ```
- Response: JWT token in httpOnly cookie + user data

#### POST `/api/auth/login`
**Authenticate user**
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password",
    "role": "patient|doctor"
  }
  ```
- Response: JWT token in httpOnly cookie + user data
- Status: 401 if invalid credentials

#### GET `/api/auth/logout`
**Invalidate user session**
- Returns: Redirect to homepage
- Clears: auth_token cookie

### Question Endpoints

#### GET `/api/questions`
**Fetch questions with filters**
- Query Parameters:
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)
  - `category` - Filter by category slug/ID
  - `search` - Search keywords in title/description
  - `sortBy` - Sort order (newest, mostViewed, trending)
  - `completed` - Filter by completion status
- Response: Array of questions with pagination metadata

#### POST `/api/questions`
**Create new question (Patient only)**
- Auth Required: Yes (Patient)
- Request Body:
  ```json
  {
    "title": "Question title",
    "description": "Detailed description",
    "category": "categoryId",
    "attachments": []
  }
  ```
- Response: Created question object

#### GET `/api/questions/[id]`
**Fetch single question details**
- Response: Question with patient info, category, and all replies
- Increments view count automatically

#### POST `/api/questions/[id]/replies`
**Add doctor reply (Doctor only)**
- Auth Required: Yes (Doctor)
- Request Body:
  ```json
  {
    "content": "Doctor's response text"
  }
  ```
- Response: Created PostComment object

#### GET `/api/questions/[id]/replies`
**Fetch replies for a question (Public)**
- Response: Array of PostComment objects with doctor info

### Upvote Endpoints

#### POST `/api/questions/[id]/upvote`
**Upvote a question (Signed-in users only)**
- Auth Required: Yes
- Response: 201 on success, 409 if already upvoted
- Toast notification on duplicate upvote

#### GET `/api/questions/[id]/upvote/count`
**Get upvote count for question**
- Response: `{ count: number }`

### Doctor Endpoints

#### GET `/api/doctors`
**Fetch list of doctors**
- Query Parameters:
  - `specialty` - Filter by medical specialty
  - `verified` - Filter by verification status
- Response: Array of doctors

#### GET `/api/doctors/[id]`
**Fetch single doctor profile**
- Response: Doctor details with statistics (answers, rating)

#### POST `/api/doctors/verify`
**Verify pending doctor (Admin only)**
- Auth Required: Yes (Admin)
- Request Body: `{ doctorId, credentialsFile }`

### Category Endpoints

#### GET `/api/categories`
**Fetch all medical categories**
- Response: Array of categories with question counts

#### GET `/api/categories/[slug]`
**Fetch category details**
- Response: Category with recent questions

### Profile Endpoints

#### GET `/api/profile/me`
**Fetch current authenticated user profile**
- Auth Required: Yes
- Response: User object (Doctor/Patient/Admin)

#### PATCH `/api/profile/me`
**Update user profile**
- Auth Required: Yes
- Request Body: Profile fields to update

### Admin Endpoints

#### GET `/api/admin-stats`
**Fetch platform statistics (Admin only)**
- Auth Required: Yes (Admin)
- Response: User counts, question stats, verification queue

#### GET `/api/pending-doctors`
**Fetch doctors awaiting verification (Admin only)**
- Response: Array of PendingDoctor objects

---

## Database Models

### User Models

#### Doctor
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  specialty: String,
  yearsExperience: String,
  bio: String,
  avatarUrl: String,
  licenseNumber: String,
  credentials: [FileObject],
  verified: Boolean,
  verificationDate: Date,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Patient
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  dateOfBirth: Date,
  gender: String (male/female),
  bloodType: String,
  medicalHistory: [String],
  allergies: [String],
  currentMedications: [String],
  avatarUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: String ("admin"),
  createdAt: Date
}
```

### Content Models

#### Question
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  patient: ObjectId (ref: Patient),
  category: ObjectId (ref: Category),
  attachments: [FileObject],
  replies: [ObjectId] (ref: PostComment),
  viewsCount: Number (default: 0),
  completed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### PostComment
```javascript
{
  _id: ObjectId,
  question: ObjectId (ref: Question),
  doctor: ObjectId (ref: Doctor),
  content: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### PostUpvote
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: Doctor|Patient|Admin),
  post: ObjectId (ref: Question),
  createdAt: Date,
  __v: 0,
  // Unique Index: (user, post)
}
```

#### Category
```javascript
{
  _id: ObjectId,
  name: String (Arabic name),
  slug: String (unique, lowercase),
  description: String,
  icon: String,
  color: String,
  questionCount: Number,
  createdAt: Date
}
```

#### Answer (Legacy)
```javascript
{
  _id: ObjectId,
  question: ObjectId (ref: Question),
  doctor: ObjectId (ref: Doctor),
  content: String,
  attachments: [FileObject],
  helpful: Number (upvote count),
  createdAt: Date
}
```

#### PendingDoctor
```javascript
{
  _id: ObjectId,
  email: String,
  firstName: String,
  lastName: String,
  specialty: String,
  credentials: [FileObject],
  status: String (pending|approved|rejected),
  submittedAt: Date,
  reviewedAt: Date
}
```

---

## Authentication System

### JWT Architecture

**Token Structure:**
```
Header: { alg: "HS256", typ: "JWT" }
Payload: { 
  sub: userId,        // User ID
  role: "doctor|patient|admin",
  iat: timestamp,     // Issued at
  exp: timestamp      // Expires in 7 days
}
Signature: HMAC-SHA256(secret)
```

**Storage:**
- Method: HttpOnly Cookie (`auth_token`)
- Scope: All API requests
- Duration: 7 days
- Security: HTTPS in production, no JavaScript access

### Login Flow

1. **User Submits Credentials** → Client sends POST `/api/auth/login`
2. **Server Validates**:
   - Email existence
   - Password hash match (bcryptjs.compare)
   - Role matches (patient/doctor)
3. **Token Generation**:
   - Create JWT with user ID & role
   - Set HttpOnly cookie with token
4. **Response**: Redirect to role-specific dashboard

### Protected Routes

**Server-side Protection:**
```javascript
// In API routes
const token = request.cookies.get("auth_token")?.value;
const payload = jwt.verify(token, JWT_SECRET);
if (payload.role !== "doctor") {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}
```

**Client-side Protection:**
- Doctor replies POST: Only doctors can comment
- Upvote POST: Only authenticated users can upvote
- Question POST: Only patients can ask

---

## Internationalization (i18n)

### Language Support

- **Arabic (ar)** - Default, RTL layout
- **English (en)** - LTR layout
- **Storage**: localStorage (`lang` key)
- **Context**: `LanguageProvider` (React Context API)

### Translation Structure

**File**: `lib/i18n/translations_safe.js`

```javascript
{
  ar: {
    nav: {
      home: "الصفحة الرئيسية",
      doctors: "الأطباء",
      categories: "التصنيفات",
      ...
    },
    auth: {
      patientForm: {
        firstNamePlaceholder: "الاسم الأول",
        smokingUnknown: "غير معروف",
        creatingAccount: "إنشاء حساب",
        ...
      },
      doctorForm: {
        male: "ذكر",
        female: "أنثى",
        ...
      }
    },
    ...
  },
  en: { ... }
}
```

### Direction Handling

**CSS Variables:**
```css
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

**React Usage:**
```javascript
const { t, isRTL, lang } = useLanguage();

// In JSX
<div dir={isRTL ? 'rtl' : 'ltr'}>
  <p>{t('nav.home')}</p>
</div>
```

### Adding New Translations

1. Open `lib/i18n/translations_safe.js`
2. Add key to Arabic (`ar`) and English (`en`) objects
3. Use: `t('path.to.key')`
4. Test both languages

---

## Key Components

### Navbar
**File**: `components/Navbar.jsx`
- Responsive navigation
- Language switcher
- Auth status display (shows username if signed in)
- Mobile hamburger menu
- RTL/LTR support

### ExplorePage
**File**: `components/pages/ExplorePage.jsx`
- Browse questions
- Search & filter by category
- Server-backed upvote counts
- Doctor replies modal
- Pagination support

### PatientRegistrationForm
**File**: `app/auth/patient/PatientRegistrationForm.jsx`
- 3-step signup process
- Client-side validation
- Vibration feedback on errors
- RTL/LTR placeholder alignment
- Terms acceptance checkbox

### DoctorRegistrationForm
**File**: `app/auth/doctor/DoctorRegistrationForm.jsx`
- 4-step signup with document upload
- Specialty selection
- Years of experience
- Client validation across steps
- Shake animation on validation error

### DoctorsContent
**File**: `components/pages/DoctorsContent.jsx`
- Display doctor cards with images
- Specialty filter
- Verified badge
- Responsive grid

### SimpleModal
**File**: `components/ui/SimpleModal.jsx`
- Reusable dialog component
- Doctor replies display
- Doctor profile preview
- Close handlers

---

## Development Guide

### Setup Development Environment

1. **Clone Repository**
   ```bash
   git clone https://github.com/AdhamAhmed2005/SehaTalk.git
   cd sehatalk
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy .env.local.example to .env.local
   cp .env.local.example .env.local
   
   # Edit .env.local with your MongoDB URI and JWT secret
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sehatalk
   JWT_SECRET=your-super-secret-key-min-32-chars
   ```

4. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Navigate to http://localhost:3000

### Running Tests

**Lint Code:**
```bash
npm run lint
```

**Manual Testing Checklist:**
- [ ] Patient signup flow (3 steps)
- [ ] Doctor signup flow (4 steps) + document upload
- [ ] Login as patient and doctor
- [ ] Ask a question (patient only)
- [ ] Post a doctor reply (doctor only)
- [ ] Upvote question (signed-in users)
- [ ] Browse explore page with filters
- [ ] Language switching (Arabic/English)
- [ ] Mobile responsiveness
- [ ] Doctor verification (admin)

### Adding a New Page

1. **Create Page Directory**
   ```bash
   mkdir -p app/new-page
   ```

2. **Create page.js**
   ```javascript
   // app/new-page/page.js
   import NewPageContent from '@/components/pages/NewPageContent';
   
   export const metadata = {
     title: "Page Title",
     description: "Page description"
   };
   
   export default function NewPage() {
     return <NewPageContent />;
   }
   ```

3. **Create Component**
   ```javascript
   // components/pages/NewPageContent.jsx
   import { useLanguage } from '@/lib/i18n/LanguageProvider';
   
   export default function NewPageContent() {
     const { t, isRTL } = useLanguage();
     
     return (
       <div dir={isRTL ? 'rtl' : 'ltr'}>
         <h1>{t('newPage.title')}</h1>
       </div>
     );
   }
   ```

4. **Add i18n Keys**
   ```javascript
   // lib/i18n/translations_safe.js
   {
     ar: { newPage: { title: "عنوان الصفحة الجديدة" } },
     en: { newPage: { title: "New Page Title" } }
   }
   ```

### Adding a New API Endpoint

1. **Create Route File**
   ```bash
   mkdir -p app/api/resource
   touch app/api/resource/route.js
   ```

2. **Implement Handler**
   ```javascript
   import { NextResponse } from 'next/server';
   import { connectDB } from '@/lib/mongodb';
   import jwt from 'jsonwebtoken';
   
   export async function GET(request) {
     try {
       await connectDB();
       // Your logic here
       return NextResponse.json({ success: true, data: [] });
     } catch (error) {
       return NextResponse.json(
         { error: error.message },
         { status: 500 }
       );
     }
   }
   ```

3. **Add Authentication** (if protected)
   ```javascript
   const token = request.cookies.get("auth_token")?.value;
   if (!token) {
     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
   const payload = jwt.verify(token, process.env.JWT_SECRET);
   ```

---

## Deployment

### Vercel Deployment

**Recommended**: SehaTalk is optimized for Vercel hosting.

1. **Connect GitHub Repository**
   - Push code to GitHub
   - Sign in to Vercel.com
   - Import repository

2. **Configure Environment Variables**
   - Add `MONGODB_URI`
   - Add `JWT_SECRET`
   - Add `NEXTAUTH_SECRET` (if using NextAuth)

3. **Deploy**
   ```bash
   # Automatic on push to main branch
   # Manual deployment in Vercel dashboard
   ```

### Self-Hosted Deployment

**Requirements:**
- Node.js 18+
- MongoDB Atlas (or local MongoDB)
- Reverse proxy (Nginx/Apache)

**Steps:**
1. Build: `npm run build`
2. Start: `npm run start`
3. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name "sehatalk"
   pm2 startup
   pm2 save
   ```

### Environment Variables (Production)

```
NODE_ENV=production
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<strong-secret-min-32-chars>
NEXTAUTH_SECRET=<nextauth-secret>
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Performance Optimization

### Caching Strategies

- **Static Generation**: Categories, doctors listing
- **Revalidation**: `revalidate: 3600` (1 hour)
- **Client Cache**: Upvote counts (in-memory)
- **Database Indexes**: email (unique), specialty, slug

### Image Optimization

- **Avatar Source**: randomuser.me API for doctor mock images
- **Next.js Image**: Built-in optimization
- **Fallback**: Placeholder images for broken URLs

### Database Optimization

- **Lean Queries**: `.lean()` for read-only data
- **Indexing**: Unique indexes on email, PostUpvote (user, post)
- **Population**: Selective field selection in `populate()`

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "MongoDB connection failed" | Verify MONGODB_URI, whitelist IP in MongoDB Atlas |
| "JWT verify error" | Check JWT_SECRET matches server & client |
| "400 Bad Request on signup" | Ensure all required fields filled, validate form |
| "404 on doctor image" | Fallback to ImageWithFallback component |
| "RTL/LTR not working" | Verify LanguageProvider wraps app, dir attribute set |
| "Placeholder misaligned" | Check input has `text-left`/`text-right` class |

### Debug Mode

Set in development:
```javascript
// lib/mongodb.js
mongoose.set('debug', true); // See all DB queries
```

---

## Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

---

## Security Considerations

1. **Password Hashing**: bcryptjs with salt rounds = 10
2. **JWT Secrets**: Min 32 characters, strong randomness
3. **HttpOnly Cookies**: No JavaScript access to auth tokens
4. **CSRF Protection**: Next.js handles via SameSite cookies
5. **Rate Limiting**: Implement on auth endpoints
6. **Input Validation**: Server-side validation on all endpoints
7. **SQL Injection**: MongoDB/Mongoose prevents via ORM
8. **XSS Prevention**: React escapes content by default

---

## Monitoring & Analytics

- **Error Tracking**: Integrate Sentry or similar
- **Performance**: Use Vercel Analytics
- **Database**: MongoDB Atlas monitoring
- **Logs**: Structure logs with timestamps and context

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**License**: MIT
