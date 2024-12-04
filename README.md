# Electronic Health Record
## Description
This project is a web application designed to provide a functional solution for managing the Electronic Health Record. The application centralizes all patient-related information in a digital format, ensuring efficient healthcare data management.

---

## Table of Content
1. [Technologies](#Technologies)
2. [Contribution](#Contribution)
3. [Folder Structure](#Folder-Structure)
4. [Installation](#Installation)

---

## Technologies

### Frontend:
1. Angular JavaScript framework.
2. Styling: TailwindCSS.

### Backend:
1. Framework: Django (Python)
2. Database: MySQL, designed to ensure efficient data storage and retrieval.
3. API: REST API for interoperability and seamless integration with external systems.

---

## Contribution

### - Create a branch for each task or feature  
Branches should be created to work on specific tasks or features, keeping development modular and organized.  

### - Follow the branch naming convention `<member name>/<feature or task name>`  

```
Example: hanane/user-profile
```

### - Write clear and meaningful commit messages  
Commit messages should explain the changes made to make reviewing and tracking easier.  

```
Example: implemented the backend logic for profile updates
```

### - Open a Pull Request after completing your task or feature  
Ensure your code is reviewed and tested before merging into the main branch.  

---

## Folder Structure

### Backend

backend/
├── config/                   # Configuration for the Django project
│   ├── __init__.py
│   ├── settings.py           # Main settings file (includes DB config for MySQL)
│   ├── urls.py               # Root URL configuration
│   ├── asgi.py               # ASGI entry point
│   └── wsgi.py               # WSGI entry point
├── apps/                     # Custom Django apps
│   ├── __init__.py
│   ├── users/                # Example app for user management
│   │   ├── migrations/       # Database migrations for the app
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py          # Admin panel customization
│   │   ├── apps.py           # App configuration
│   │   ├── models.py         # Database models
│   │   ├── serializers.py    # DRF serializers for API data
│   │   ├── urls.py           # App-specific URLs
│   │   └── views.py          # Views for API endpoints
│   └── ...                   # Additional apps (e.g., profiles, records, etc.)
├── api/                      # API for interop using REST
│   ├── __init__.py
│   ├── urls.py               # API endpoint routes
│   └── views.py              # Generic or shared API views
├── static/                   # Static files (CSS, JS, Images)
├── templates/                # HTML templates if using Django templating
├── db/                       # Database-related files
│   ├── schema.sql            # Optional: SQL schema definition for MySQL
├── manage.py                 # Django's CLI utility
└── requirements.txt          # Python dependencies

### Frontend

src/
├── app/                        # Main application logic
│   ├── core/                   # Singleton services, guards, interceptors
│   ├── shared/                 # Reusable components, pipes, directives, models
│   ├── features/               # Feature-specific modules (e.g., auth, dashboard)
│   ├── app-routing.module.ts   # Application-wide routing
│   ├── app.component.*         # Root component files
│   └── app.module.ts           # Root application module
├── assets/                     # Static assets like images and fonts
├── environments/               # Environment-specific configurations
├── styles.scss                 # Global styles
├── main.ts                     # Application entry point
├── index.html                  # Main HTML template
└── angular.json                # Angular CLI configuration

---

## Installation
