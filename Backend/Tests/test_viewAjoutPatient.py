import pytest
from rest_framework.test import APIClient
from rest_framework import status
from DPI.models import CompteMedecin, Hopital, User, DPI, ComptePatient
import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '../TP.settings')

django.setup()

@pytest.mark.django_db
def test_create_patient_account_and_dpi_success():
    client = APIClient()

    # Créer un hopital factice
    hopital = Hopital.objects.create(
        nom="Hopital Test"
    )
    assert Hopital.objects.count() == 1
    # Créer un médecin traitant factice
    medecin_traitant = CompteMedecin.objects.create(
        email = "medecin@test.com",
        nomComplet= "Docteur Test",
        specialite= "Généraliste",
        idHopital_id= hopital.nom,
        motDePasse= "passwd"
    )
    assert CompteMedecin.objects.count() == 1

    # Préparer les données pour la requête
    payload = {
        "idMedecinTraitant": medecin_traitant.email,
        "email": "patient@test.com",
        "motDePasse": "securepassword",
        "numeroSecuriteSociale": "3105010123454",
        "dateDeNaissance": "1990-01-01",
        "adresse": "123 Rue Test",
        "telephone": "0612345678",
        "mutuelle": "Mutuelle Test",
        "personneAcontacter": "0612345674",
        "nomComplet": "Patient Test"
    }

    # Envoyer la requête POST
    response = client.post('http://127.0.0.1:8000/api/create-patient/', data=payload, format='json')

    print(response.content)

    # Assertions
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["message"] == "Compte patient et dossier créés avec succès."

    # Vérifier les données dans la base de données
    assert User.objects.filter(email=payload["email"]).exists()
    assert DPI.objects.filter(numeroSecuriteSociale=payload["num_securite_sociale"]).exists()
    assert ComptePatient.objects.filter(email=payload["email"]).exists()
"""
@pytest.mark.django_db
def test_create_patient_account_and_dpi_medecin_not_found():
    client = APIClient()

    # Préparer les données pour la requête
    payload = {
        "idMedecinTraitant": "nonexistent@test.com",  # Médecin inexistant
        "email": "patient@test.com",
        "motDePasse": "securepassword",
        "numeroSecuriteSociale": "3105010123454",
        "dateDeNaissance": "1990-01-01",
        "adresse": "123 Rue Test",
        "telephone": "0612345678",
        "mutuelle": "Mutuelle Test",
        "personneAcontacter": "Contact Test",
        "nomComplet": "0612345678"
    }

    # Envoyer la requête POST
    response = client.post('http://127.0.0.1:8000/api/create-patient/', data=payload, format='json')

    # Assertions
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data["error"] == "Médecin traitant non trouvé."

@pytest.mark.django_db
def test_create_patient_account_and_dpi_invalid_dpi():
    client = APIClient()

    # Créer un médecin traitant factice
    medecin_traitant = CompteMedecin.objects.create(
        email="medecin@test.com",
        nomComplet="Docteur Test"
    )

    # Préparer des données invalides pour le DPI
    payload = {
        "idMedecinTraitant": "nonexistent@test.com",  # Médecin inexistant
        "email": "patient@test.com",
        "motDePasse": "securepassword",
        "numeroSecuriteSociale": "",
        "dateDeNaissance": "1990-01-01",
        "adresse": "123 Rue Test",
        "telephone": "0612345678",
        "mutuelle": "Mutuelle Test",
        "personneAcontacter": "Contact Test",
        "nomComplet": "Patient Test"
    }

    # Envoyer la requête POST
    response = client.post('http://127.0.0.1:8000/api/create-patient/', data=payload, format='json')

    # Assertions
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "numeroSecuriteSociale" in response.data
"""