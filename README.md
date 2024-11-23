# Recipe-Sharing Platform

## Description

The Recipe-Sharing Platform is a web application that allows users to create and share their favorite recipes. Users can view, review, and rate recipes shared by others, but they are not allowed to rate or review their own recipes. This application aims to create a community of cooking enthusiasts who can share their culinary expertise and learn from each other.

## Features

- **Create Recipes**: Users can create new recipes by providing details such as recipe title, description, ingredients, instructions, and cooking times.
- **View Recipes**: Browse a list of recipes shared by others, including their ratings, reviews, and details.
- **Rate Recipes**: Users can rate recipes on a scale of 1-5.
- **Leave Reviews**: Users can leave reviews on recipes they have tried, sharing their experience and feedback.
- **Image Upload**: Users can upload an image for each recipe.
- **User Authentication**: Users can register and log in to manage their recipes, ratings, and reviews.

## Technologies Used

- **Frontend**: React, React Router, Material-UI (for UI components)
- **Backend**: Node.js, Express
- **Database**: MongoDB (for storing user data and recipes)
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication
- **State Management**: Redux (for managing global state)
- **Image Upload**: Multer for handling image uploads in the backend

## Installation

### 1. Clone the repository:

```bash
https://github.com/akash-mindfire/frontend-recipe-sharing-platform

## 2. Install Dependencies:
Navigate to the project directory and run: "npm install"
## 3. Start the Application:
To run the application, use the following command:"npm run dev"

This will start both the frontend and backend servers in development mode.

The frontend will be accessible at http://localhost:3000, and the backend API will be accessible at http://localhost:5000.

##Usage
Create an account: Register by providing a username, email, and password.
Log in: Log in using your credentials to access your personal dashboard.
Create a recipe: Add a recipe by providing the necessary information, including ingredients and instructions.
Browse recipes: Explore recipes shared by other users, view their ratings, and read reviews.
Rate and review: Rate recipes you have tried and leave a review sharing your experience.
Image upload: Upload an image to accompany your recipe to make it more appealing.

##Limitations
Self Rating/Review: Users are not allowed to rate or review their own recipes.
No Direct Message: Currently, the platform does not support direct messaging between users.

##Future Enhancements
Recipe Search: Implement search functionality to allow users to find recipes based on ingredients or titles.
User Profiles: Allow users to customize their profiles with images and bio.
Social Sharing: Enable sharing of recipes on social media platforms.
```
