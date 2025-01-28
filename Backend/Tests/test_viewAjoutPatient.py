import pytest
from rest_framework.test import APIClient
from rest_framework import status
from DPI.models import CompteMedecin, Hopital, User, DPI, ComptePatient

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
        "doctor_traitant": medecin_traitant.email,
        "email": "patient@test.com",
        "mot_de_passe": "securepassword",  
        "num_securite_sociale": "3105010123454",
        "date_de_naissance": "1990-01-01",
        "adresse": "123 Rue Test",
        "num_telephone": "0612345678",
        "mutuelle": "Mutuelle Test",
        "personne_a_contacter": "0612345674",
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
