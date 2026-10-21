# 🛍️ Product Management App

A responsive **Product Management App** built with React that helps users manage products and inventory efficiently. Users can register, log in, add products, view product details, search and filter products, sort records, and edit or delete products through a clean and user-friendly interface.

## 🌐 Live Demo

🚀 **Live Website:** https://product-management-app-react.vercel.app/

📂 **GitHub Repository:** https://github.com/Dabhi-Pratik/Product-Management-App-React

---

## 📸 Screenshots

### 🔐 Login Page

<img width="1919" height="949" alt="Screenshot 2026-10-21 215417" src="https://github.com/user-attachments/assets/0b646791-6302-4082-9c80-e35947ceabad" />

### Add Products
<img width="1904" height="992" alt="image" src="https://github.com/user-attachments/assets/c45e12e0-d42d-40f4-93db-6ea80489aca9" />

### 📊 Product Management Dashboard
<img width="1919" height="948" alt="Screenshot 2026-10-21 215353" src="https://github.com/user-attachments/assets/8b2991ae-aa31-4ef2-bfd0-0fdc44ca0d5a" />

---

## ✨ Features

- 🔐 **User Authentication** — Register, log in, and sign out.
- ➕ **Add Products** — Add new products to your inventory.
- ✏️ **Edit Products** — Update existing product information.
- 🗑️ **Delete Products** — Remove products from the inventory.
- 📦 **Inventory Management** — Manage product names, quantities, prices, categories, and images.
- 📈 **Dashboard Statistics** — View total products, inventory value, and low-stock products.
- 🔍 **Search Products** — Search for products by name.
- 🗂️ **Category Filtering** — Filter products by category.
- 🔃 **Sorting** — Sort products by name and available sorting options.
- 🖼️ **Product Images** — Display product images in the product list.
- 📱 **User-Friendly Interface** — Clean layout for convenient product management.
- ☁️ **Cloud Deployment** — Frontend hosted on Vercel and backend API hosted on Render.

---

## 🛠️ Technologies Used

The project uses the following technologies and services:

- **React.js** — Building the user interface
- **JavaScript** — Application logic
- **HTML5** — Page structure
- **CSS3** — Styling and layout
- **React Router** — Page navigation
- **Axios / Fetch API** — Communicating with the backend API
- **REST API** — Product data operations
- **Vite** — Frontend development and build tooling
- **Vercel** — Frontend deployment
- **Render** — Backend API hosting
- **Git & GitHub** — Version control and source code management

*Note: The technology list should match the packages and services actually used in your project.*

---

## 📋 Application Modules

| Module | Description |
|---|---|
| Login | Sign in to an existing account |
| Register | Create a new user account |
| Dashboard | View product and inventory statistics |
| Products | Display, search, filter, and sort products |
| Add Product | Create a new product |
| Edit Product | Update existing product details |
| Delete Product | Remove a product from the inventory |

---

## ⚙️ Installation and Setup

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Dabhi-Pratik/Product-Management-App-React.git
```

### 2. Navigate to the Project Directory

```bash
cd Product-Management-App-React
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory, where your `package.json` file is located.

Add the following environment variable:

```env
VITE_API_URL=https://product-management-api-lfbt.onrender.com
```

**Important:** Set `VITE_API_URL` to the API base URL without `/products` if your code appends the endpoint like this:

```javascript
const API = `${import.meta.env.VITE_API_URL}/products`;
```

The final API endpoint will be:

```text
https://product-management-api-lfbt.onrender.com/products
```

Do not commit your `.env` file or private credentials to GitHub. Make sure `.env` is included in your `.gitignore` file.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

### 6. Build for Production

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🚀 Deployment

### Frontend Deployment — Vercel

1. Push your project code to GitHub.
2. Import the repository into Vercel.
3. Open your Vercel project's **Settings → Environment Variables**.
4. Add the following variable:

   - **Name:** `VITE_API_URL`
   - **Value:** `https://product-management-api-lfbt.onrender.com`

5. Save the environment variable.
6. Redeploy the project.

### Backend Deployment — Render

The frontend communicates with the backend API hosted on Render.

Make sure that:

- The backend service is running.
- The API endpoints match the frontend requests.
- CORS allows requests from your Vercel deployment URL.
- The API base URL is correctly configured.

---

## 🧑‍💻 How to Use the Application

1. Open the live website.
2. Register a new account or log in.
3. Navigate to the Products dashboard.
4. Click **Add Product** to create a product.
5. Enter the product details and save them.
6. Search for products using the search field.
7. Filter products by category and use the sorting options.
8. Click **Edit** to update a product.
9. Click **Delete** to remove a product.
10. Sign out when you finish.

---

## 📁 Project Structure

The exact folder structure may vary depending on your implementation. A typical React and Vite project looks like this:

```text
Product-Management-App-React/
├── public/
├── screenshots/
│   ├── login-page.png
│   └── product-dashboard.png
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔧 Troubleshooting

### Products are not loading

- Check whether the backend API is running.
- Verify the `VITE_API_URL` value in your `.env` file.
- Check the browser's Developer Tools → Network tab.
- Make sure the API endpoint is correct.

### CORS errors

Configure the backend to allow requests from your local development URL and your deployed Vercel domain.

### Environment variable changes are not working

Restart the development server after modifying `.env`. If you change the environment variable in Vercel, redeploy the application.

### First API request is slow

Some hosting services may temporarily pause inactive services. If this applies to your backend host, the first request may take longer while the service starts.

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- Pagination for large product lists
- Advanced search and filtering
- Stock alerts and inventory reports
- Improved form validation
- Loading indicators and error handling
- Unit and integration testing
- Role-based access control
- Product analytics and reporting

---

## 👨‍💻 Author

**Pratik Dabhi**

- **GitHub:** https://github.com/Dabhi-Pratik
- **Project Repository:** https://github.com/Dabhi-Pratik/Product-Management-App-React
- **Live Project:** https://product-management-app-react.vercel.app/

---

⭐ If you find this project useful, consider giving the repository a star on GitHub!

**Thank you for checking out my Product Management App!**

<img width="1318" height="910" alt="Screenshot 2026-10-19 093221" src="https://github.com/user-attachments/assets/a8f3f2f1-a24d-4718-8d24-c0d8ab31e4cf" />
<img width="1327" height="876" alt="Screenshot 2026-10-19 093159" src="https://github.com/user-attachments/assets/aea70ae5-f604-4c06-9afc-6b4c433dd748" />
<img width="1317" height="271" alt="Screenshot 2026-10-19 093236" src="https://github.com/user-attachments/assets/627ac41f-0573-4203-92bb-e861f86ddca8" />

