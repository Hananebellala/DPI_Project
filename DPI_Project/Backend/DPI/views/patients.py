from django.contrib.auth.models import User
from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import qrcode
import qrcode.image.svg
from io import BytesIO
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework import viewsets
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


#----------CREATION DU COMPTE PATIENT & D'UN DOSSIER PATIENT INFORMATISE ASSOCIE----------
class CreatePatientAccountAndDossierAPIView(APIView):
    """
    API View to handle the creation of a patient account and associated medical file (DPI).

    This view processes a POST request to create a new patient account along with their medical file (Dossier Patient Informatique - DPI).
    The process involves:
    - Verifying the existence of a treating doctor (`medecin_traitant`) by email.
    - Creating a user for the patient using their email and password.
    - Creating a DPI with relevant information such as social security number, birth date, address, etc.
    - Creating a `ComptePatient` (patient account) with the user and DPI details.

    If any step fails, appropriate error handling is performed, and the created resources (user or DPI) are deleted to ensure data integrity.

    Args:
        request (Request): The HTTP request object containing the patient data in JSON format.

    Returns:
        Response:
            - On success: A JSON response with a success message and HTTP 201 status.
            - On failure:
                - If the treating doctor is not found: A JSON response with an error message and HTTP 404 status.
                - If the DPI is invalid: A JSON response with the validation errors and HTTP 400 status.
                - If the patient account creation fails: A JSON response with validation errors and HTTP 400 status.
                - On unexpected errors: A JSON response with the error message and HTTP 500 status.
    """
    def post(self, request):
        # Extraire les données du formulaire JSON
        data = request.data

        try:
            # Vérifier si le médecin traitant existe
            medecin_traitant = CompteMedecin.objects.get(email=data.get('doctor_traitant'))
        except CompteMedecin.DoesNotExist:
            return Response({"error": "Médecin traitant non trouvé."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Créer l'utilisateur associé
            user = User.objects.create_user(
                username=data.get('email'),
                email=data.get('email'),
                password=data.get('mot_de_passe')
            )

            # Créer le dossier patient (DPI)
            dpi_data = {
                "numeroSecuriteSociale": data.get("num_securite_sociale"),
                "dateDeNaissance": data.get("date_de_naissance"),
                "adresse": data.get("adresse"),
                "telephone": data.get("num_telephone"),
                "mutuelle": data.get("mutuelle"),
                "idMedecinTraitant": medecin_traitant.email,
                "personneAcontacter": data.get("personne_a_contacter")
            }
            dpi_serializer = DPISerializer(data=dpi_data)

            if dpi_serializer.is_valid():
                dpi = dpi_serializer.save()

                # Créer le compte patient
                patient_data = {
                    "user": user.id,
                    "email": data.get("email"),
                    "nomComplet":data.get("nomComplet"),
                    "motDePasse": data.get("mot_de_passe"),
                    "dossierPatient": dpi.numeroSecuriteSociale
                }
                patient_serializer = ComptePatientSerializer(data=patient_data)

                if patient_serializer.is_valid():
                    patient_serializer.save()
                    return Response({"message": "Compte patient et dossier créés avec succès."}, status=status.HTTP_201_CREATED)
                else:
                    # Si le compte patient n'est pas valide, supprimer le DPI et l'utilisateur
                    dpi.delete()
                    user.delete()
                    return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Si le DPI n'est pas valide, supprimer l'utilisateur
                user.delete()
                return Response(dpi_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

#----------RECHERCHE D'UN DOSSIER PATIENT INFORMATISE PAR LE NUMERO DE SECURITE SOCIALE----------
class RecherchePatientView(APIView):
    """
    API View to search for a patient's medical file (Dossier Patient Informatisé - DPI) 
    using the patient's social security number (Numéro de Sécurité Sociale).

    This view processes a POST request where the user provides the patient's social security number, 
    and the system searches for the corresponding medical file and patient account in the database.

    The flow is as follows:
    1. Retrieve the patient's social security number from the request.
    2. Search for the DPI associated with that number.
    3. Search for the patient account linked to the found DPI.
    4. Return both the patient account and DPI details in the response.

    Args:
        request (Request): The HTTP request object containing the patient's social security number.

    Returns:
        Response:
            - On success: A JSON response containing both the patient and DPI data with HTTP 200 status (OK).
            - On failure:
                - If the social security number is not provided: A JSON response with an error message and HTTP 400 status (Bad Request).
                - If the DPI is not found: A JSON response with an error message and HTTP 404 status (Not Found).
                - If the patient account is not found: A JSON response with an error message and HTTP 404 status (Not Found).
    """
    def post(self, request):
        # Récupérer le numéro de sécurité sociale depuis le corps de la requête
        numero_securite_sociale = request.data.get('numero_securite_sociale')
        
        if not numero_securite_sociale:
            return Response({"error": "Le numéro de sécurité sociale est requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Recherche du dossier patient par numéro de sécurité sociale
            dpi = DPI.objects.get(numeroSecuriteSociale=numero_securite_sociale)
            
            # Recherche du compte patient associé
            compte_patient = ComptePatient.objects.get(dossierPatient=dpi)
            
            # Sérialisation des données
            patient_serializer = ComptePatientSerializer(compte_patient)
            dpi_serializer = DPISerializer(dpi)
            
            # Retour des données combinées
            return Response({
                "patient": patient_serializer.data,
                "dossier_patient": dpi_serializer.data
            }, status=status.HTTP_200_OK)
        
        except DPI.DoesNotExist:
            return Response({"error": "Dossier patient introuvable."}, status=status.HTTP_404_NOT_FOUND)
        except ComptePatient.DoesNotExist:
            return Response({"error": "Compte patient introuvable."}, status=status.HTTP_404_NOT_FOUND)
        
#----------RECHERCHE D'UN DOSSIER PATIENT INFORMATISE PAR QR CODE----------
class GenerateQRCodeView(View):
    """
    API view to generate a QR code containing the patient's medical file (Dossier Patient Informatique - DPI) 
    details based on the social security number (Numéro de Sécurité Sociale).

    This view processes a GET request where the user provides the patient's social security number, 
    and the system generates a QR code containing specific patient information.

    The flow is as follows:
    1. Retrieve the patient's DPI based on the provided social security number.
    2. Generate a QR code that includes the following patient information:
        - Dossier Patient number
        - Contact name (personneAcontacter)
        - Contact phone number (telephone)
    3. Return the generated QR code as an image.

    Args:
        request (Request): The HTTP request object.
        numero_securite_sociale (str): The social security number (Numéro de Sécurité Sociale) of the patient 
                                       to generate the QR code.

    Returns:
        HttpResponse:
            - On success: The generated QR code image in PNG format with HTTP 200 status.
            - On failure: 
                - If the DPI corresponding to the provided social security number is not found, an HTTP 404 error is returned.
    """
    def get(self, request, numero_securite_sociale):
        # Récupération du DPI correspondant
        dpi = get_object_or_404(DPI, numeroSecuriteSociale=numero_securite_sociale)
        
        # Génération du contenu pour le QR code
        qr_content = f"Dossier Patient: {dpi.numeroSecuriteSociale}, Nom: {dpi.personneAcontacter}, Téléphone: {dpi.telephone}"

        # Génération du QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_content)
        qr.make(fit=True)

        # Génération de l'image
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)

        # Retourne l'image en réponse HTTP
        return HttpResponse(buffer, content_type="image/png")
    
#----------RECUPERATION DU NOM DU MEDECIN TRAITANT A PARTIR DU NSS PATIENT----------
class MedecinTraitantAPIView(APIView):
    """
    API view to retrieve the treating doctor (Médecin Traitant) associated with a given social security number (NSS).

    This view processes a GET request where the user provides the patient's social security number (NSS),
    and the system retrieves the treating doctor associated with that number from the patient’s medical file (Dossier Patient Informatique - DPI).

    The flow is as follows:
    1. Retrieve the DPI (patient’s medical file) based on the provided social security number (NSS).
    2. Retrieve the treating doctor (Médecin Traitant) associated with the DPI.
    3. Return the treating doctor's details including:
        - First name (prenom)
        - Last name (nom)
        - Email address (email)
        - Specialty (specialite)

    Args:
        request (Request): The HTTP request object.
        nss (str): The social security number (Numéro de Sécurité Sociale) of the patient whose treating doctor is to be fetched.

    Returns:
        Response:
            - On success: A JSON object with the treating doctor's details, HTTP 200 status.
            - On failure:
                - If no DPI is found for the provided NSS: HTTP 404 status with an error message.
                - If no treating doctor is associated with the patient: HTTP 404 status with an error message.
    """
    def get(self, request, nss):
        try:
            # Rechercher le DPI correspondant au NSS
            dpi = DPI.objects.get(numeroSecuriteSociale=nss)
            
            # Récupérer l'email du médecin traitant associé
            medecin_traitant_email = dpi.idMedecinTraitant
            
            # Vérifier si un email de médecin est fourni
            if medecin_traitant_email:
                try:
                    # Rechercher le médecin avec l'email dans le modèle Medecin
                    medecin_traitant = CompteMedecin.objects.get(email=medecin_traitant_email)
                    
                    # Préparer les données du médecin traitant
                    data = {
                        "nomComplet":medecin_traitant.nomComplet,
                        "email": medecin_traitant.email,
                        "specialite": medecin_traitant.specialite,
                    }
                    return Response(data, status=status.HTTP_200_OK)
                except CompteMedecin.DoesNotExist:
                    # Si le médecin n'existe pas dans la base de données
                    return Response({"detail": "Médecin traitant introuvable."}, status=status.HTTP_404_NOT_FOUND)
            
            else:
                return Response({"detail": "Aucun médecin traitant associé."}, status=status.HTTP_404_NOT_FOUND)
        
        except DPI.DoesNotExist:
            # Si le DPI pour le NSS n'existe pas
            return Response({"detail": "Dossier patient introuvable pour ce NSS."}, status=status.HTTP_404_NOT_FOUND)


class DPIViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `DPI` (Dossier Patient Informatique) instances.

    This viewset provides the standard actions for managing `DPI` records, including:
    - Listing all DPI records.
    - Retrieving a specific DPI record by its ID.
    - Creating new DPI records.
    - Updating existing DPI records.
    - Deleting DPI records.

    The `DPIViewSet` utilizes the `DPISerializer` to serialize and deserialize data for the `DPI` model.

    Args:
        queryset (QuerySet): A queryset representing all `DPI` instances (`DPI.objects.all()`).
        serializer_class (Serializer): The serializer class used for the `DPI` model (`DPISerializer`).

    Returns:
        Response:
            - GET request: Returns a list of `DPI` records or a single `DPI` record in detail.
            - POST request: Creates a new `DPI` record.
            - PUT/PATCH request: Updates an existing `DPI` record.
            - DELETE request: Deletes a `DPI` record.
    """
    queryset = DPI.objects.all()
    serializer_class = DPISerializer


class ProfileView(APIView):
    """
    Handles requests related to a patient's profile and hospitalizations.

    This API view allows authenticated users to:
    - Retrieve detailed information about a patient's profile.
    - Fetch the patient's hospitalization history (sejours).
    - Generate a PDF certificate for a specific hospitalization if requested.

    Permissions:
        - Requires the user to be authenticated (`IsAuthenticated`).

    Methods:
        - `get(request, email, *args, **kwargs)`: Handles GET requests to retrieve the patient's profile and sejour information.
        - `generate_certificate(patient, sejours)`: Generates a PDF certificate for a patient's hospitalization.

    Args:
        request (Request): The HTTP request object.
        email (str): The email address of the patient whose profile is being accessed.

    Returns:
        Response:
            - On success: A JSON object containing patient details, hospitalization history, and an optional PDF certificate.
            - On failure: A JSON object with an error message and appropriate HTTP status.
    """
    permission_classes = [IsAuthenticated]
    def get(self, request, email, *args, **kwargs):
        """
        Retrieves the profile and hospitalization details of a patient based on their email.

        The profile includes general patient information, such as:
        - Date of birth
        - Status (active or not active)
        - Mutuelle (insurance)
        - Address
        - Social Security Number
        - Contact person details
        - List of hospitalizations (sejours)

        If the `generate_certificate` query parameter is set to `true`, a PDF certificate for the most recent hospitalization is generated.

        Args:
            request (Request): The HTTP request object.
            email (str): The email address of the patient.

        Returns:
            Response:
                - On success: A JSON object containing the patient's profile and sejour details.
                - On failure: A JSON object with an error message and an appropriate HTTP status code.
        """
        try:
            # Retrieve the logged-in user (patient)
            patient = ComptePatient.objects.get(email=email)
            # Fetch all sejours (hospitalizations) for the patient
            sejours = Sejour.objects.filter(idDossierPatient=patient.dossierPatient.numeroSecuriteSociale)

            # Prepare patient profile data
            general_info = {
                "date-of-birth": patient.dossierPatient.dateDeNaissance,
                "status": "not active",
                "mutuelle":patient.dossierPatient.mutuelle,
                "address": patient.dossierPatient.adresse,
                "Social-Security-Number": patient.dossierPatient.numeroSecuriteSociale,  
                "sejours": [],
                "phone_number": patient.dossierPatient.telephone,
                "contact_person": patient.dossierPatient.personneAcontacter
            }

            # Add details about each sejour (stay)
            for sejour in sejours:
                sejour_info = {
                    "id": sejour.id,
                    "start_date": sejour.dateDebutSejour,
                    "end_date": sejour.dateFinSejour,
                    "motifAdmission": sejour.motifAdmission,
                }

                if sejour.dateDebutSejour <= datetime.now().date() <= sejour.dateFinSejour:
                    general_info["status"] = "active"  

                general_info["sejours"].append(sejour_info)

                if request.GET.get('generate_certificate') == 'true':  # If the button is clicked
               
                  return self.generate_certificate(patient, sejours)
            return Response(general_info, status=status.HTTP_200_OK)

        except ComptePatient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def generate_certificate(self, patient, sejours):
        # Generate the PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="certificate.pdf"'

        p = canvas.Canvas(response, pagesize=letter)

        p.drawString(100, 750, f"Certificate of Hospitalization for {patient.nom} {patient.prenom}")
        p.drawString(100, 730, f"Date of Birth: {patient.dossierPatient.dateDeNaissance}")
        p.drawString(100, 710, f"Mutuelle: {patient.dossierPatient.mutuelle}")

        # Assuming the first sejour is the most recent
        sejour = sejours.first()
        p.drawString(100, 690, f"Hospitalization Start Date: {sejour.dateDebutSejour}")
        p.drawString(100, 670, f"Hospitalization End Date: {sejour.dateFinSejour}")
        p.drawString(100, 650, f"Hospitalization Reason: {sejour.motifAdmission}")

        p.showPage()
        p.save()

        return response

@csrf_exempt
def get_patient_by_email(request):
    """
    Retrieve patient information based on the provided email address.

    This view accepts a GET request with an `email` parameter and returns the corresponding 
    patient's details, including personal and contact information. It fetches data from 
    the `ComptePatient` and related `DPI` models.

    Attributes:
        request (HttpRequest): The HTTP request object, expected to contain an `email` parameter.

    Returns:
        JsonResponse: A JSON response containing patient details if the email exists.
        If the email is not provided or the patient is not found, an error response is returned.

    Example Usage:
        GET /get_patient_by_email?email=<email>

    Data Structure:
        - nomComplet (str): The full name of the patient.
        - dateDeNaissance (date): The date of birth of the patient.
        - adresse (str): The address of the patient.
        - telephone (str): The phone number of the patient.
        - numeroSecuriteSociale (str): The social security number of the patient.
        - personneAcontacter (str): The emergency contact person for the patient.

    Error Responses:
        - 400: When the `email` parameter is not provided.
        - 404: When no patient account is found for the provided email.
    """
    email = request.GET.get('email')
    if email:
        try:
            # Fetch patient account by email
            patient_account = ComptePatient.objects.get(email=email)
            # Fetch the related DPI record
            patient_dpi = patient_account.dossierPatient
            
            # Prepare data
            data = {
                "nomComplet": patient_account.nomComplet,
                "dateDeNaissance": patient_dpi.dateDeNaissance,
                "adresse": patient_dpi.adresse,
                "telephone": str(patient_dpi.telephone),
                "numeroSecuriteSociale": patient_dpi.numeroSecuriteSociale,
                "personneAcontacter": patient_dpi.personneAcontacter,
            }
            return JsonResponse(data, safe=False)
        except ComptePatient.DoesNotExist:
            return JsonResponse({"error": "Patient not found"}, status=404)
    return JsonResponse({"error": "Email is required"}, status=400)

    

