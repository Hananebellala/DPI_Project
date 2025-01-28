from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from ..forms import AdminSignUpForm, AdminLoginForm
from django.contrib import messages
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from ..models import *
from ..serializers import *


# Admin Sign Up View
def admin_signup(request):
    """
    Handles the creation of a new admin account and logs the admin in automatically.

    This view processes both GET and POST requests:
    - On a GET request, it renders the admin sign-up form.
    - On a POST request, it validates the submitted form, creates an admin account 
      (marking the user as both staff and superuser), logs the admin in, and redirects 
      them to the admin dashboard upon success.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - On a GET request, renders the 'admin_signup.html' template with a form.
            - On a valid POST request, redirects to the 'admin_dashboard' view.
            - On an invalid POST request, re-renders the 'admin_signup.html' template with error messages.
    """
    if request.method == 'POST':
        form = AdminSignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_staff = True  # Mark as a staff member
            user.is_superuser = True  # Mark as a superuser (optional)
            user.save()

            login(request, user)  # Log the user in immediately after sign up
            messages.success(request, "Account created successfully!")  # Success message
            return redirect('admin_dashboard')  # Redirect to admin dashboard
    else:
        form = AdminSignUpForm()

    return render(request, 'admin_signup.html', {'form': form})

# Admin Login View
def admin_login(request):
    """
    Handles the login process for an admin member.

    This view processes both GET and POST requests:
    - On a GET request, it renders the admin login form for the user.
    - On a POST request, it validates the form data and attempts to authenticate the user.
      If the authentication is successful, the admin is logged in and redirected to the 
      admin dashboard. If authentication fails, an error message is displayed.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - On a GET request, renders the 'admin_login.html' template with a login form.
            - On a valid POST request with correct credentials, redirects to the 'admin_dashboard' view.
            - On an invalid POST request, re-renders the 'admin_login.html' template with error messages.
    """
    if request.method == 'POST':
        form = AdminLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('admin_dashboard')  # Redirect to admin dashboard
            else:
                form.add_error(None, "Invalid credentials")
    else: 
        form = AdminLoginForm()
    return render(request, 'admin_login.html', {'form': form})

# Admin Dashboard View
def admin_dashboard(request):
    """
    Renders the admin dashboard page.

    This views redirects the admin to its dashboard when the authentication is successful.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - Redirects to the 'admin_dashboard' view.
    """
    return render(request, 'admin_dashboard.html')  # Template for the admin dashboard

    
def homePage(request):
    """
    Renders the home page.

    This views redirects to the home page.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - Redirects to the 'home' view.
    """
    return render(request, 'home.html')


def registerPage(request):
    """
    Renders the registration page.

    This views redirects to the registration page.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - Redirects to the 'register' view.
    """
    return render(request, 'register.html')

def loginPage(request):
    """
    Renders the login page.

    This views redirects to the login page.

    Args:
        request (HttpRequest): The HTTP request object containing request data.

    Returns:
        HttpResponse: 
            - Redirects to the 'login' view.
    """
    return render(request, 'login.html')


class LoginView(APIView):
    """
    Handles the login process for non-admin members.

    This view verifies if the input data (email, password) correspond to any existing
    account and returns an authentication token along with the user's role and profile URL.
        - Handles missing data (email or password).
        - Searches for the user across multiple account tables.
        - Returns success or error response.

    Args:
        request (HttpRequest): The HTTP request object containing login data.

    Returns:
        Response:
            - On success: A JSON response with a success message, HTTP 200 status, and access token.
            - On failure: A JSON response with validation error details and HTTP 400 or 401 status.
    """
    def post(self, request, *args, **kwargs):
        """
        Handles the POST request to log in a user.

        This method checks the provided email and password, validates them against
        the user database, and returns an appropriate response. If the credentials
        are valid, it generates an access token and returns it with the user's role and profile URL.

        Args:
            request (HttpRequest): The HTTP request containing the email and password data.

        Returns:
            Response:
                - On success: JSON response with a success message, HTTP 200 status, and an access token.
                - On failure: JSON response with error messages such as invalid credentials, HTTP 400 or 401 status.
        """
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        profile_url = None
        try:
            # Search for the user in the relevant tables
            if CompteMedecin.objects.filter(email=email).exists():
                user = CompteMedecin.objects.get(email=email)
            elif CompteInfirmier.objects.filter(email=email).exists():
                user = CompteInfirmier.objects.get(email=email)
            elif ComptePersonnelAdministratif.objects.filter(email=email).exists():
                user = ComptePersonnelAdministratif.objects.get(email=email)
            elif CompteRadiologue.objects.filter(email=email).exists():
                user = CompteRadiologue.objects.get(email=email)
            elif CompteLaborantin.objects.filter(email=email).exists():
                user = CompteLaborantin.objects.get(email=email)
            elif ComptePharmacien.objects.filter(email=email).exists():
                user = ComptePharmacien.objects.get(email=email)
            elif ComptePatient.objects.filter(email=email).exists():
                user = ComptePatient.objects.get(email=email)

            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

           # Debugging: Log the retrieved user
            print(f"User found: {user}")
            print(f"password is found: {user.motDePasse}")

            # Hash the input password and compare it to the stored hash manually
            hashedPass= make_password(user.motDePasse) 

            # Check the password manually (using 'motDePasse' instead of 'password')
            if not check_password(password, hashedPass):  # Use 'motDePasse' here
                # Debugging: Log the password mismatch
                print(f"Password mismatch for user: {email}")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            # Determine the role based on the model
            role = "unknown"
            if isinstance(user, CompteMedecin):
                role = 'doctor'
            elif isinstance(user, CompteInfirmier):
                role = 'nurse'
            elif isinstance(user, ComptePersonnelAdministratif):
                role = 'admin'
            elif isinstance(user, CompteRadiologue):
                role = 'radiologist'
            elif isinstance(user, CompteLaborantin):
                role = 'lab technician'
            elif isinstance(user, ComptePharmacien):
                role = 'pharmacist'
            elif isinstance(user, ComptePatient):
                role = 'patient'
                profile_url = user.get_profile_url()
                
                
            print(f"Patient profile URL: {profile_url}")
            # Generate access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                "message": "Login successful",
                "role": role,
                "access_token": access_token,
                "profile_url": profile_url 
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def get_patient_profile_url(self, user):
        """
        Generates the URL for the patient profile based on the user's email.

        This method constructs a URL string for the patient's profile page by using the 
        patient's email address. The URL format is `/profile/{user_email}/`.

        Args:
            user (User): The user object containing the email of the patient.

        Returns:
            str: The generated URL for the patient's profile.
        """
        # Generate the URL for the patient profile, for example:
        return f"/profile/{user.email}/"