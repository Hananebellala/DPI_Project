import pytest
from rest_framework.test import APIClient
from rest_framework import status
from DPI.models import CompteMedecin, Hopital

import pytest
from rest_framework.test import APIClient
from rest_framework import status
from DPI.models import Hopital

@pytest.mark.django_db
def test_create_compte_medecin():
    # Create an instance of the APIClient
    client = APIClient()

    # Create a Hopital instance
    hopital = Hopital.objects.create(nom="Hopital Test")

    # Data to send in the POST request
    data = {
        "email": "medecin@test.com",
        "nomComplet": "Docteur Test",
        "specialite": "Généraliste",
        "idHopital": hopital.nom,
        "motDePasse": "passwd"
    }

    # Send a POST request to the viewset's endpoint
    response = client.post('http://127.0.0.1:8000/comptemedecin/', data, format='json')

    # Print response status and data
    print("Response status:", response.status_code)
    if response.status_code != 404:
        print("Response data:", response.data)

    # Check that the request was processed correctly
    assert response.status_code == status.HTTP_201_CREATED
