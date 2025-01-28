"""import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.hashers import make_password
from DPI.models import (
    CompteMedecin,
    Hopital
)

@pytest.mark.django_db
def test_login_view():
    client = APIClient()

    # Create a Hopital instance
    hopital = Hopital.objects.create(nom="Hopital Test")
    
     # Créer un médecin traitant factice
    medecin_traitant = CompteMedecin.objects.create(
        email = "testdoctor@example.com",
        nomComplet= "Docteur Test",
        specialite= "Généraliste",
        idHopital_id= hopital.nom,
        motDePasse= "password123"
    )

    # Test 1: Successful login
    response = client.post('http://127.0.0.1:8000/login/', {
        "email": "testdoctor@example.com",
        "password": "password123"
    }, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.data
    assert response.data["role"] == "doctor"

    # Test 2: Missing email
    response = client.post('http://127.0.0.1:8000/login/', {
        "password": "password123"
    }, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["error"] == "Email and password are required"

    # Test 3: Missing password
    response = client.post('http://127.0.0.1:8000/login/', {
        "email": "testdoctor@example.com"
    }, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["error"] == "Email and password are required"

    # Test 4: User not found
    response = client.post('http://127.0.0.1:8000/login/', {
        "email": "nonexistent@example.com",
        "password": "password123"
    }, format='json')
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data["error"] == "User not found"

    # Test 5: Invalid password
    response = client.post('http://127.0.0.1:8000/login/', {
        "email": "testdoctor@example.com",
        "password": "wrongpassword"
    }, format='json')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.data["error"] == "Invalid credentials"
"""