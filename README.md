# Test Management Setup

# 1. Clone the repository

git clone https://github.com/Amallvp/TestManagement.git

# FRONTEND :-  This project uses React, Tailwind CSS, and Ant Design.

# 2. Navigate into the project folder

cd client

# 3. Install dependencies

npm install

# 4. Start the development server

npm run dev

# 5. Open the application in your browser:

http://localhost:5173



# Backend :-  This project uses Nodejs,Express and MongoDB

# 2. Navigate into the project folder

cd server

# 3. Install dependencies

npm install

# Since registeration of the admin was given as optional  i used the admin seed function so that once we call the function , admin credentials stored in the database


# 4. Admin Seed Call 

node seed/adminSeed.js

# once admin credentials are created we can start the server


# 5. Start the development server

npm run dev

# 6. Open the application in your browser:

http://localhost:5000


✅ Notes

######  Make sure you have Node.js v16+ installed.
###### Ensure MongoDB is running locally or update your .env configuration.
###### Once the admin is seeded, you can log in using the credentials generated in the database.



# .env Details 

PORT=
MONGO_URI=
JWT_SECRET=




