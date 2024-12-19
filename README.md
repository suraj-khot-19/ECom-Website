# eCommerce Application

This is a full-stack eCommerce application built with **Spring Boot** on the backend and **React** on the frontend. The project showcases a basic eCommerce platform with essential features and an engaging user interface.

## Features

### Frontend (React)
- **Homepage**: Displays a list of products with a clean and intuitive design.
- **Search Feature**: Allows users to search for products by name or description.
- **Cart Management**: Add items to the cart, update quantities, and view cart details.
- **Category based Filter** : added functionality to sort/show only those products with their category 
- **CRUD Operations**:
  - **Add Product**: Enables the addition of new products to the store.
  - **Edit Product**: Provides the ability to update existing product details.
  - **Delete Product**: Allows the removal of products from the store.

### Backend (Spring Boot)
- RESTful APIs to handle frontend requests.
- Persistent storage for product and cart data.
- Efficient search and CRUD operations.

## Technologies Used

### Frontend
- **React**: Framework for building the UI.
- **React Router**: For handling navigation and routing.
- **Axios**: For API requests.
- **CSS**: To create a visually appealing and responsive design.

### Backend
- **Spring Boot**: Framework for developing the backend.
- **H2 Database**: In-memory database for development purposes.
- **Spring Data JPA**: For data persistence and interaction.
- **REST APIs**: To handle client requests.

## Project Structure
- ecom_backend
- ecom_frontend 

### Backend
- Controller
- model
- Repository
- Service

### Frontend 
- src
  - components
  - App.js
