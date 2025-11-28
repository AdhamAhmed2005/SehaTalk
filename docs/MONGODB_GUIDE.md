# MongoDB Implementation Guide - SehaTalk

## Overview
This guide explains how to use MongoDB with Mongoose in your SehaTalk application.

## Prerequisites
- Node.js installed
- MongoDB installed locally OR MongoDB Atlas account
- All dependencies installed (`npm install`)

## Setup Steps

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your MongoDB connection string:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/sehatalk
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sehatalk?retryWrites=true&w=majority
```

### 2. Install MongoDB Locally (Optional)

If using local MongoDB:

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from https://www.mongodb.com/try/download/community

**Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### 3. Seed the Database

Run the seed script to populate initial data:

```bash
node scripts/seed.js
```

This will create:
- 8 Categories (General Health, Cardiology, Dermatology, etc.)
- 3 Sample Doctors
- 2 Sample Patients
- 1 Admin user
- Sample questions and answers

**Test Credentials:**
- Admin: `admin@sehatalk.com` / `Admin@123`
- Doctor: `ahmed.hassan@sehatalk.com` / `Doctor@123`
- Patient: `sarah.ahmed@example.com` / `Patient@123`

## Database Models

### 1. Patient Model
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  age: Number
  gender: String (enum: male/female/other)
  medicalHistory: [String]
  avatarUrl: String
  timestamps: true
}
```

### 2. Doctor Model
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  specialty: String (required)
  bio: String
  verified: Boolean (default: false)
  avatarUrl: String
  timestamps: true
}
```

### 3. Question Model
```javascript
{
  patient: ObjectId (ref: Patient, required)
  title: String (required)
  description: String (required)
  category: ObjectId (ref: Category)
  urgencyLevel: String (enum)
  previousTreatments: String
  attachments: [String]
  replies: [ObjectId] (ref: Answer)
  likesCount: Number (default: 0)
  viewsCount: Number (default: 0)
  timestamps: true
}
```

### 4. Answer Model
```javascript
{
  question: ObjectId (ref: Question, required)
  doctor: ObjectId (ref: Doctor, required)
  content: String (required)
  attachments: [String]
  isEdited: Boolean (default: false)
  timestamps: true
}
```

### 5. Category Model
```javascript
{
  name: String (required)
  slug: String (required, unique)
  description: String
  imageUrl: String
  timestamps: true
}
```

### 6. Admin Model
```javascript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  avatarUrl: String
  timestamps: true
}
```

## API Routes

### Questions

**GET /api/questions**
- Get all questions with pagination
- Query params: `page`, `limit`, `category`
- Returns: Array of questions with populated patient, category, and replies

**POST /api/questions**
- Create a new question
- Body: `{ patient, title, description, category, urgencyLevel, previousTreatments, attachments }`
- Returns: Created question

**GET /api/questions/[id]**
- Get a single question by ID
- Auto-increments view count
- Returns: Question with all populated references

**PATCH /api/questions/[id]**
- Update a question
- Body: Any question fields to update
- Returns: Updated question

**DELETE /api/questions/[id]**
- Delete a question
- Returns: Success message

### Categories

**GET /api/categories**
- Get all categories
- Returns: Array of all categories

**POST /api/categories**
- Create a new category
- Body: `{ name, slug, description, imageUrl }`
- Returns: Created category

### Doctors

**GET /api/doctors**
- Get all verified doctors (already implemented)

**POST /api/doctors**
- Register a new doctor (already implemented)

### Patients

**GET /api/patients**
- Get patient data (already implemented)

**POST /api/patients**
- Register a new patient (already implemented)

## Usage Examples

### Creating a Question

```javascript
const response = await fetch('/api/questions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    patient: patientId,
    title: 'How to manage diabetes?',
    description: 'I was recently diagnosed with type 2 diabetes...',
    category: categoryId,
    urgencyLevel: 'Medium Priority - Important Question',
    previousTreatments: 'None',
    attachments: []
  })
});

const data = await response.json();
```

### Fetching Questions with Pagination

```javascript
const response = await fetch('/api/questions?page=1&limit=10&category=cardiology');
const { data, pagination } = await response.json();

console.log(data); // Array of questions
console.log(pagination); // { page, limit, total, pages }
```

### Getting a Specific Question

```javascript
const response = await fetch(`/api/questions/${questionId}`);
const { data } = await response.json();

console.log(data.patient); // Populated patient data
console.log(data.replies); // Array of answers with doctor info
```

## Connection Management

The `connectDB` function in `lib/mongodb.js`:
- Uses connection caching to prevent multiple connections in development
- Automatically reconnects on disconnection
- Provides detailed error logging
- Optimized for Next.js serverless functions

## Best Practices

1. **Always connect before queries:**
   ```javascript
   await connectDB();
   const questions = await Question.find();
   ```

2. **Use populate for references:**
   ```javascript
   await Question.find()
     .populate('patient')
     .populate('category')
     .populate({
       path: 'replies',
       populate: { path: 'doctor' }
     });
   ```

3. **Handle errors properly:**
   ```javascript
   try {
     await connectDB();
     const data = await Model.find();
     return NextResponse.json({ success: true, data });
   } catch (error) {
     console.error(error);
     return NextResponse.json(
       { success: false, error: 'Failed' },
       { status: 500 }
     );
   }
   ```

4. **Use lean() for read-only operations:**
   ```javascript
   const questions = await Question.find().lean();
   // Returns plain JavaScript objects (faster)
   ```

5. **Index important fields:**
   Add indexes in your models for frequently queried fields:
   ```javascript
   CategorySchema.index({ slug: 1 });
   QuestionSchema.index({ patient: 1, createdAt: -1 });
   ```

## Troubleshooting

### Connection Issues
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify MONGODB_URI in .env.local
- Check network connectivity for MongoDB Atlas

### Seed Script Errors
- Ensure MongoDB is running
- Check if .env.local exists with MONGODB_URI
- Run: `npm install` to ensure all dependencies are installed

### API Route Errors
- Check server logs in terminal
- Verify model imports are correct
- Ensure connectDB() is called before database operations

## MongoDB Atlas Setup (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (Free tier available)
4. Add a database user (Database Access)
5. Whitelist your IP (Network Access) or allow access from anywhere (0.0.0.0/0)
6. Get your connection string (Connect > Connect your application)
7. Replace `<password>` with your database user password
8. Add to .env.local

## Monitoring

View your data:
- **Local**: Use MongoDB Compass (https://www.mongodb.com/products/compass)
- **Atlas**: Use built-in Atlas UI

## Next Steps

1. Add authentication middleware to protect routes
2. Implement answer creation API
3. Add like/vote functionality for questions
4. Implement search functionality
5. Add email notifications
6. Implement file upload for attachments

## Additional Resources

- Mongoose Documentation: https://mongoosejs.com/docs/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
