# 🌐 MongoDB Atlas Setup Guide

Since you already have MongoDB Atlas hosted, follow these steps to connect your application:

## Step 1: Get Your Connection String

1. Go to your MongoDB Atlas dashboard (https://cloud.mongodb.com)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver and **latest version**
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2: Update .env.local

Open the `.env.local` file I just created and replace the MONGODB_URI:

```bash
# Replace these values with your actual credentials:
# - username: Your database username
# - password: Your database user password  
# - cluster: Your cluster name (e.g., cluster0.xxxxx)
# - sehatalk: Database name (you can keep this)

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sehatalk?retryWrites=true&w=majority
```

**Example:**
```bash
MONGODB_URI=mongodb+srv://myuser:MyP@ssw0rd@cluster0.abc123.mongodb.net/sehatalk?retryWrites=true&w=majority
```

⚠️ **Important:** Replace `<password>` with your actual database password (remove the angle brackets!)

## Step 3: Verify Network Access

Make sure your IP is whitelisted in Atlas:

1. In Atlas dashboard, go to **"Network Access"**
2. Click **"Add IP Address"**
3. Either:
   - Click **"Add Current IP Address"** (for your current IP)
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0) for development
   
⚠️ For production, use specific IP addresses only!

## Step 4: Install dotenv Package

```bash
npm install dotenv
```

## Step 5: Test Connection

Run the seed script to test your connection and populate data:

```bash
npm run seed
```

Expected output:
```
🌱 Starting database seed...
✅ Connected to MongoDB
🗑️  Clearing existing data...
✅ Existing data cleared
📁 Seeding categories...
✅ Created 8 categories
👨‍⚕️ Seeding doctors...
✅ Created 3 doctors
🧑 Seeding patients...
✅ Created 2 patients
👤 Seeding admins...
✅ Created 1 admins
❓ Seeding questions...
✅ Created 2 questions
💬 Seeding answers...
✅ Created 2 answers

🎉 Database seeded successfully!
```

## Step 6: Start Your App

```bash
npm run dev
```

Visit http://localhost:3000 and your app should now be connected to MongoDB Atlas!

## 🔍 View Your Data in Atlas

1. Go to your Atlas dashboard
2. Click **"Browse Collections"** on your cluster
3. Select **"sehatalk"** database
4. You'll see all your collections: patients, doctors, questions, answers, categories, admins

## 🐛 Troubleshooting

### "MongoServerError: bad auth"
- ✅ Check your username and password in connection string
- ✅ Make sure you're using the **database user** password, not your Atlas account password
- ✅ Password special characters must be URL-encoded (e.g., `@` = `%40`)

### "ENOTFOUND" or "connection timeout"
- ✅ Check Network Access whitelist in Atlas
- ✅ Verify your internet connection
- ✅ Make sure cluster is not paused

### "Cannot read .env.local"
- ✅ Make sure `.env.local` is in the root directory
- ✅ Run `npm install dotenv`
- ✅ Restart your terminal/VS Code

### "Authentication failed"
- ✅ Create a new database user in Atlas (Database Access)
- ✅ Give user "Read and write to any database" permissions
- ✅ Use the new credentials

## 🔐 Security Best Practices

1. **Never commit .env.local** - It's already in .gitignore
2. **Use environment-specific connection strings**
   - Development: Different cluster/database
   - Production: Different credentials
3. **Rotate passwords regularly**
4. **Use IP whitelisting** instead of 0.0.0.0/0 in production
5. **Enable encryption at rest** in Atlas (free tier has this)

## 📊 Atlas Features

Your Atlas cluster includes:
- ✅ Automatic backups
- ✅ Performance monitoring
- ✅ Alerts
- ✅ Database triggers (serverless functions)
- ✅ Atlas Search (full-text search)
- ✅ Charts (data visualization)

## 🚀 Next Steps

1. ✅ Connection working
2. ✅ Database seeded with sample data
3. 🔜 Test API endpoints: `/api/questions`, `/api/doctors`, `/api/categories`
4. 🔜 Build authentication system
5. 🔜 Deploy to Vercel/Netlify

## 📝 Sample Test Credentials

After running `npm run seed`, you can use:

**Patient Login:**
- Email: `sarah.ahmed@example.com`
- Password: `Patient@123`

**Doctor Login:**
- Email: `ahmed.hassan@sehatalk.com`
- Password: `Doctor@123`

**Admin Login:**
- Email: `admin@sehatalk.com`
- Password: `Admin@123`

## 🆘 Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Connection String Help: https://docs.mongodb.com/manual/reference/connection-string/
- Mongoose Docs: https://mongoosejs.com/docs/

Your MongoDB Atlas database is ready to use! 🎉
