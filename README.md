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

folders:
- name: backend
  description: Django backend project
  content:
    - name: config
      description: Django project configuration
      content:
        - name: __init__.py
        - name: settings.py  # Main settings file (includes DB config for MySQL)
        - name: urls.py  # Root URL configuration
        - name: asgi.py  # ASGI entry point
        - name: wsgi.py  # WSGI entry point
    - name: apps
      description: Custom Django apps
      content:
        - name: users
          description: App for user management
          content:
            - name: migrations
              description: Database migrations for the app
              content:
                - name: __init__.py
            - name: __init__.py
            - name: admin.py  # Admin panel customization
            - name: apps.py  # App configuration
            - name: models.py  # Database models
            - name: serializers.py  # DRF serializers for API data
            - name: urls.py  # App-specific URLs
            - name: views.py  # Views for API endpoints
    - name: api
      description: REST API for interop
      content:
        - name: __init__.py
        - name: urls.py  # API endpoint routes
        - name: views.py  # Generic or shared API views
    - name: static
      description: Static files (CSS, JS, Images)
    - name: templates
      description: HTML templates if using Django templating
    - name: db
      description: Database-related files
      content:
        - name: schema.sql  # Optional: SQL schema definition for MySQL
    - name: manage.py  # Django's CLI utility
    - name: requirements.txt  # Python dependencies

## Frontend
Here’s your folder structure in the requested format:

```yaml
folders:
- name: backend
  description: Django backend project
  content:
    - name: config
      description: Django project configuration
      content:
        - name: __init__.py
        - name: settings.py  # Main settings file (includes DB config for MySQL)
        - name: urls.py  # Root URL configuration
        - name: asgi.py  # ASGI entry point
        - name: wsgi.py  # WSGI entry point
    - name: apps
      description: Custom Django apps
      content:
        - name: users
          description: App for user management
          content:
            - name: migrations
              description: Database migrations for the app
              content:
                - name: __init__.py
            - name: __init__.py
            - name: admin.py  # Admin panel customization
            - name: apps.py  # App configuration
            - name: models.py  # Database models
            - name: serializers.py  # DRF serializers for API data
            - name: urls.py  # App-specific URLs
            - name: views.py  # Views for API endpoints
    - name: api
      description: REST API for interop
      content:
        - name: __init__.py
        - name: urls.py  # API endpoint routes
        - name: views.py  # Generic or shared API views
    - name: static
      description: Static files (CSS, JS, Images)
    - name: templates
      description: HTML templates if using Django templating
    - name: db
      description: Database-related files
      content:
        - name: schema.sql  # Optional: SQL schema definition for MySQL
    - name: manage.py  # Django's CLI utility
    - name: requirements.txt  # Python dependencies
```

### Frontend

```yaml
folders:
- name: frontend
  description: Angular frontend project
  content:
    - name: src
      content:
        - name: app
          description: Main application logic
          content:
            - name: core
              description: Singleton services, guards, interceptors
            - name: shared
              description: Reusable components, pipes, directives, models
            - name: features
              description: Feature-specific modules (e.g., auth, dashboard)
            - name: app-routing.module.ts  # Application-wide routing
            - name: app.component.*  # Root component files
            - name: app.module.ts  # Root application module
        - name: assets
          description: Static assets like images and fonts
        - name: environments
          description: Environment-specific configurations
        - name: styles.scss  # Global styles
        - name: main.ts  # Application entry point
        - name: index.html  # Main HTML template
    - name: angular.json  # Angular CLI configuration
```

---

## Installation
