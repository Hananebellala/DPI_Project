from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

# Signup Form for Admin

class AdminSignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2']
        

# Login Form for Admin
class AdminLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']