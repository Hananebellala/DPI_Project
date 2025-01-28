"""import pytest
from rest_framework import status
from rest_framework.test import APIClient
from DPI.models import DPI, CompteMedecin, ComptePatient, Hopital


# Test cas 1 : Numéro de sécurité sociale valide, DPI et compte patient trouvés
@pytest.mark.django_db
def test_recherche_patient_view_valid_case(api_client, valid_patient_data):
    client = APIClient()

    hopital = Hopital.objects.create(nom="Hopital Test")

    medecin_traitant = CompteMedecin.objects.create(
        email = "medecin@test.com",
        nomComplet= "Docteur Test",
        specialite= "Généraliste",
        idHopital_id= hopital.nom,
        motDePasse= "passwd"
    )

    dpi = DPI.objects.create(
        numeroSecuriteSociale="3105010123456",
        idMedecinTraitant= medecin_traitant.email,
        dateDeNaissance= "1990-01-01",
        adresse= "123 Rue Test",
        telephone= "0612345678",
        mutuelle= "Mutuelle Test",
        personneAcontacter= "0612345674",
    )

    patient = ComptePatient.objects.create(
        email = "patient@test.com",
        nomComplet= "Patient Test",
        motDePasse= "passwd",
        dossierPatient= dpi.numeroSecuriteSociale
    )
    
    response = client.post(f'/api/medecin-traitant/{dpi.numeroSecuriteSociale}/', {}, format='json')
    
    assert response.status_code == status.HTTP_200_OK
    assert "patient" in response.data
    assert "dossier_patient" in response.data
    assert response.data["patient"]["id"] == patient.email
    assert response.data["dossier_patient"]["numeroSecuriteSociale"] == dpi.numeroSecuriteSociale
# Test cas 2 : Numéro de sécurité sociale manquant
def test_recherche_patient_view_missing_ssn(api_client):
    response = api_client.post('/api/medecin-traitant//', {}, format='json')
    
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data == {"error": "Le numéro de sécurité sociale est requis."}

# Test cas 3 : DPI non trouvé
def test_recherche_patient_view_dpi_not_found(api_client):
    response = api_client.post('/api/medecin-traitant/0000000000000/', {}, format='json')
    
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data == {"error": "Dossier patient introuvable."}

# Test cas 4 : Compte patient non trouvé
def test_recherche_patient_view_compte_patient_not_found(api_client):
    dpi = DPI.objects.create(numeroSecuriteSociale="9876543210987")
    
    response = api_client.post(f'/api/medecin-traitant/{dpi.numeroSecuriteSociale}/', {}, format='json')
    
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.data == {"error": "Compte patient introuvable."}
"""