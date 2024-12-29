<h1 align="center">Xpressive</h1>

<div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="nodejs"/>
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="daisy-ui"/>
    <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black" alt="react-router"/>
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongo-db"/>
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" alt="cloudinary"/>
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="jwt"/>
    <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white" alt="render"/>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🤸 [Local Setup](#setup)

### <a name="introduction">🤖 Introduction</a>

An app mimicking the twitter/X.

### <a name="tech-stack">⚙️ Tech Stack</a>

| **Category** | **Technologies**              |
| ------------ | ----------------------------- |
| Frontend     | React, Tailwind CSS, DaisyUI  |
| Backend      | Node.js, Express.js, Mongoose |
| Database     | MongoDB Atlas                 |
| Deployment   | Render                        |
| Encryption   | JWT, bcryptjs                 |

### <a name="setup">🤸 Local Setup</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites:**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Cloning the Repository:**

```
git clone https://github.com/aditya-narayan-sahoo/xpressive.git
```

**Navigate to the directory:**

```
cd xpressive
```

**Installation:**

Install & Build the project dependencies using npm:

```
npm run build
```

**Create a .env file in the root folder having these fields:**

```
PORT=port_number
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Running the Project:**

```
cd backend
npm run start
```

Open new terminal

```
cd frontend
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser to view the project.

### Credits

- This project was made with the help of this video : [YouTube Video](https://www.youtube.com/watch?v=MDZC8VDZnV8)
- You can checkout his channel for more such videos : [As A Programmer](https://www.youtube.com/@asaprogrammer_)
