# 🚀 Quick Start - MongoDB Setup

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Environment Variables

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
MONGODB_URI=mongodb://localhost:27017/sehatalk
JWT_SECRET=your-secret-key-here
```

## Step 3: Start MongoDB

**macOS/Linux:**
```bash
# If using Homebrew
brew services start mongodb-community

# Or start manually
mongod --dbpath ~/data/db
```

**Windows:**
- Start MongoDB service from Services panel
- Or run `mongod.exe` from installation directory

**Using MongoDB Atlas (Cloud):**
- Use your Atlas connection string instead

## Step 4: Seed the Database
```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
✅ Existing data cleared
✅ Created 8 categories
✅ Created 3 doctors
✅ Created 2 patients
✅ Created 1 admins
✅ Created 2 questions
✅ Created 2 answers
🎉 Database seeded successfully!
```

## Step 5: Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 🧪 Test the API

### Get all questions:
```bash
curl http://localhost:3000/api/questions
```

### Get all categories:
```bash
curl http://localhost:3000/api/categories
```

### Get all doctors:
```bash
curl http://localhost:3000/api/doctors
```

### Create a question:
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "patient": "PATIENT_ID_HERE",
    "title": "Test Question",
    "description": "This is a test question",
    "urgencyLevel": "Low Priority - General Question"
  }'
```

## 🔐 Test Credentials

After seeding, you can use these credentials:

**Admin:**
- Email: `admin@sehatalk.com`
- Password: `Admin@123`

**Doctor:**
- Email: `ahmed.hassan@sehatalk.com`
- Password: `Doctor@123`

**Patient:**
- Email: `sarah.ahmed@example.com`
- Password: `Patient@123`

## 📊 View Your Data

**Option 1: MongoDB Compass (GUI)**
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `sehatalk`

**Option 2: Command Line**
```bash
mongosh
use sehatalk
db.questions.find().pretty()
db.doctors.find().pretty()
```

## 🐛 Troubleshooting

**"Cannot connect to MongoDB"**
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify MONGODB_URI in `.env.local`

**"Seed script fails"**
- Ensure MongoDB is running
- Check `.env.local` exists with correct MONGODB_URI
- Run `npm install` again

**"Module not found" errors**
- Run `npm install`
- Check import paths use `@/` alias

## 📝 Next Steps

1. ✅ MongoDB connected
2. ✅ Database seeded
3. ✅ API routes working
4. 🔜 Implement authentication
5. 🔜 Build UI components to display data
6. 🔜 Add file upload functionality

## 📚 Documentation

- Full MongoDB Guide: `docs/MONGODB_GUIDE.md`
- Model Documentation: See `models/` directory
- API Examples: See `app/api/` directory
- Helper Functions: See `lib/db/helpers.js`

## 🆘 Need Help?

Check the detailed documentation in `docs/MONGODB_GUIDE.md` for:
- Complete API reference
- Database schemas
- Usage examples
- Best practices
- MongoDB Atlas setup
