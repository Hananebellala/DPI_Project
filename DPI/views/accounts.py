from django.contrib.auth.models import User

from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.views.decorators.http import require_GET,require_http_methods
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.middleware.csrf import get_token
from django.http import JsonResponse

class CompteAdministrateurViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `CompteAdministrateur` instances.

    This viewset provides the standard actions for managing `CompteAdministrateur` records:
    - List all `CompteAdministrateur` accounts.
    - Retrieve details of a specific `CompteAdministrateur` account.
    - Create new `CompteAdministrateur` accounts.
    - Update existing `CompteAdministrateur` accounts.
    - Delete `CompteAdministrateur` accounts.

    It uses the `CompteAdministrateurSerializer` to serialize data and the `CompteAdministrateur` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `CompteAdministrateur` instances (`CompteAdministrateur.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `CompteAdministrateur` model
                                       (`CompteAdministrateurSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `CompteAdministrateur` records.
            - POST request: Creates a new `CompteAdministrateur` record.
            - PUT/PATCH request: Updates an existing `CompteAdministrateur` record.
            - DELETE request: Deletes a `CompteAdministrateur` record.
    """
    queryset = CompteAdministrateur.objects.all()
    serializer_class = CompteAdministrateurSerializer

class CompteMedecinViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `CompteMedecin` instances.

    This viewset provides the standard actions for managing `CompteMedecin` records:
    - List all `CompteMedecin` accounts.
    - Retrieve details of a specific `CompteMedecin` account.
    - Create new `CompteMedecin` accounts.
    - Update existing `CompteMedecin` accounts.
    - Delete `CompteMedecin` accounts.

    It uses the `CompteMedecinSerializer` to serialize data and the `CompteMedecin` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `CompteMedecin` instances (`CompteMedecin.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `CompteMedecin` model
                                    (`CompteMedecinSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `CompteMedecin` records.
            - POST request: Creates a new `CompteMedecin` record.
            - PUT/PATCH request: Updates an existing `CompteMedecin` record.
            - DELETE request: Deletes a `CompteMedecin` record.
    """
    queryset = CompteMedecin.objects.all()
    serializer_class = CompteMedecinSerializer

@api_view(['DELETE'])
def delete(request, email):
    """
    Deletes a `CompteMedecin` instance based on the provided email address.

    This view handles the deletion of a specific `CompteMedecin` account identified by the email provided in the request.
    - If the account exists, it is deleted and a success message is returned.
    - If the account does not exist, a 404 error is returned.

    Args:
        request (Request): The HTTP request object containing the email of the `CompteMedecin` to be deleted.
        email (str): The email address of the `CompteMedecin` account to be deleted.

    Returns:
        Response:
            - On success: A message confirming the deletion of the account with HTTP 204 status (No Content).
            - On failure: A JSON response with an error message and HTTP 404 status (Not Found) if the account is not found.
    """
    try:
        member = CompteMedecin.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteMedecin.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteInfirmierViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `CompteInfirmier` instances.

    This viewset provides the standard actions for managing `CompteInfirmier` records:
    - List all `CompteInfirmier` accounts.
    - Retrieve details of a specific `CompteInfirmier` account.
    - Create new `CompteInfirmier` accounts.
    - Update existing `CompteInfirmier` accounts.
    - Delete `CompteInfirmier` accounts.

    It uses the `CompteInfirmierSerializer` to serialize data and the `CompteInfirmier` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `CompteInfirmier` instances (`CompteInfirmier.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `CompteInfirmier` model
                                    (`CompteInfirmierSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `CompteInfirmier` records.
            - POST request: Creates a new `CompteInfirmier` record.
            - PUT/PATCH request: Updates an existing `CompteInfirmier` record.
            - DELETE request: Deletes a `CompteInfirmier` record.
    """
    queryset = CompteInfirmier.objects.all()
    serializer_class = CompteInfirmierSerializer

@api_view(['DELETE'])
def delete(request, email):
    """
    Deletes a `CompteInfirmier` instance based on the provided email address.

    This view handles the deletion of a specific `CompteInfirmier` account identified by the email provided in the request.
    - If the account exists, it is deleted and a success message is returned.
    - If the account does not exist, a 404 error is returned.

    Args:
        request (Request): The HTTP request object containing the email of the `CompteInfirmier` to be deleted.
        email (str): The email address of the `CompteInfirmier` account to be deleted.

    Returns:
        Response:
            - On success: A message confirming the deletion of the account with HTTP 204 status (No Content).
            - On failure: A JSON response with an error message and HTTP 404 status (Not Found) if the account is not found.
    """
    try:
        member = CompteInfirmier.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteInfirmier.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class ComptePersonnelAdministratifViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `ComptePersonnelAdministratif` instances.

    This viewset provides the standard actions for managing `ComptePersonnelAdministratif` records:
    - List all `ComptePersonnelAdministratif` accounts.
    - Retrieve details of a specific `ComptePersonnelAdministratif` account.
    - Create new `ComptePersonnelAdministratif` accounts.
    - Update existing `ComptePersonnelAdministratif` accounts.
    - Delete `ComptePersonnelAdministratif` accounts.

    It uses the `ComptePersonnelAdministratifSerializer` to serialize data and the `ComptePersonnelAdministratif` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `ComptePersonnelAdministratif` instances (`ComptePersonnelAdministratif.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `ComptePersonnelAdministratif` model
                                    (`ComptePersonnelAdministratifSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `ComptePersonnelAdministratif` records.
            - POST request: Creates a new `ComptePersonnelAdministratif` record.
            - PUT/PATCH request: Updates an existing `ComptePersonnelAdministratif` record.
            - DELETE request: Deletes a `ComptePersonnelAdministratif` record.
    """
    queryset = ComptePersonnelAdministratif.objects.all()
    serializer_class = ComptePersonnelAdministratifSerializer

@api_view(['DELETE'])
def delete(request, email):
    """
    Deletes a `ComptePersonnelAdministratif` instance based on the provided email address.

    This view handles the deletion of a specific `ComptePersonnelAdministratif` account identified by the email provided in the request.
    - If the account exists, it is deleted and a success message is returned.
    - If the account does not exist, a 404 error is returned.

    Args:
        request (Request): The HTTP request object containing the email of the `ComptePersonnelAdministratif` to be deleted.
        email (str): The email address of the `ComptePersonnelAdministratif` account to be deleted.

    Returns:
        Response:
            - On success: A message confirming the deletion of the account with HTTP 204 status (No Content).
            - On failure: A JSON response with an error message and HTTP 404 status (Not Found) if the account is not found.
    """
    try:
        member = ComptePersonnelAdministratif.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except ComptePersonnelAdministratif.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteRadiologueViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `CompteRadiologue` instances.

    This viewset provides the standard actions for managing `CompteRadiologue` records:
    - List all `CompteRadiologue` accounts.
    - Retrieve details of a specific `CompteRadiologue` account.
    - Create new `CompteRadiologue` accounts.
    - Update existing `CompteRadiologue` accounts.
    - Delete `CompteRadiologue` accounts.

    It uses the `CompteRadiologueSerializer` to serialize data and the `CompteRadiologue` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `CompteRadiologue` instances (`CompteRadiologue.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `CompteRadiologue` model
                                    (`CompteRadiologueSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `CompteRadiologue` records.
            - POST request: Creates a new `CompteRadiologue` record.
            - PUT/PATCH request: Updates an existing `CompteRadiologue` record.
            - DELETE request: Deletes a `CompteRadiologue` record.
    """
    queryset = CompteRadiologue.objects.all()
    serializer_class = CompteRadiologueSerializer

@api_view(['DELETE'])
def delete(request, email):
    """
    Deletes a `CompteRadiologue` instance based on the provided email address.

    This view handles the deletion of a specific `CompteRadiologue` account identified by the email provided in the request.
    - If the account exists, it is deleted and a success message is returned.
    - If the account does not exist, a 404 error is returned.

    Args:
        request (Request): The HTTP request object containing the email of the `CompteRadiologue` to be deleted.
        email (str): The email address of the `CompteRadiologue` account to be deleted.

    Returns:
        Response:
            - On success: A message confirming the deletion of the account with HTTP 204 status (No Content).
            - On failure: A JSON response with an error message and HTTP 404 status (Not Found) if the account is not found.
    """
    try:
        member = CompteRadiologue.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteRadiologue.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteLaborantinViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `CompteLaborantin` instances.

    This viewset provides the standard actions for managing `CompteLaborantin` records:
    - List all `CompteLaborantin` accounts.
    - Retrieve details of a specific `CompteLaborantin` account.
    - Create new `CompteLaborantin` accounts.
    - Update existing `CompteLaborantin` accounts.
    - Delete `CompteLaborantin` accounts.

    It uses the `CompteLaborantinSerializer` to serialize data and the `CompteLaborantin` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `CompteLaborantin` instances (`CompteLaborantin.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `CompteLaborantin` model
                                    (`CompteLaborantinSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `CompteLaborantin` records.
            - POST request: Creates a new `CompteLaborantin` record.
            - PUT/PATCH request: Updates an existing `CompteLaborantin` record.
            - DELETE request: Deletes a `CompteLaborantin` record.
    """
    queryset = CompteLaborantin.objects.all()
    serializer_class = CompteLaborantinSerializer

@api_view(['DELETE'])
def delete(request, email):
    """
    Deletes a `CompteLaborantin` instance based on the provided email address.

    This view handles the deletion of a specific `CompteLaborantin` account identified by the email provided in the request.
    - If the account exists, it is deleted and a success message is returned.
    - If the account does not exist, a 404 error is returned.

    Args:
        request (Request): The HTTP request object containing the email of the `CompteLaborantin` to be deleted.
        email (str): The email address of the `CompteLaborantin` account to be deleted.

    Returns:
        Response:
            - On success: A message confirming the deletion of the account with HTTP 204 status (No Content).
            - On failure: A JSON response with an error message and HTTP 404 status (Not Found) if the account is not found.
    """
    try:
        member = CompteLaborantin.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteLaborantin.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class ComptePatientViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing `ComptePatient` instances.

    This viewset provides the standard actions for managing `ComptePatient` records:
    - List all `ComptePatient` accounts.
    - Retrieve details of a specific `ComptePatient` account.
    - Create new `ComptePatient` accounts.
    - Update existing `ComptePatient` accounts.
    - Delete `ComptePatient` accounts.

    It uses the `ComptePatientSerializer` to serialize data and the `ComptePatient` model
    as the data source.

    Args:
        queryset (QuerySet): A set of all `ComptePatient` instances (`ComptePatient.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the `ComptePatient` model
                                        (`ComptePatientSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of `ComptePatient` records.
            - POST request: Creates a new `ComptePatient` record.
            - PUT/PATCH request: Updates an existing `ComptePatient` record.
            - DELETE request: Deletes a `ComptePatient` record.
    """
    queryset = ComptePatient.objects.all()
    serializer_class = ComptePatientSerializer


@require_GET  # Ensures that only GET requests are allowed
def check_mail(request):
    """
    Checks if an email exists in any of the account models.

    This view handles GET requests to verify whether a given email exists in any of the following account types:
    - `CompteMedecin`
    - `CompteInfirmier`
    - `CompteAdministrateur`
    - `ComptePersonnelAdministratif`
    - `CompteLaborantin`
    - `CompteRadiologue`

    The email is passed as a query parameter in the request. If the email is not provided, the function returns an error message.

    Args:
        request (HttpRequest): The HTTP request object, which contains the email query parameter to be checked.

    Returns:
        JsonResponse:
            - On success: A JSON response with a key `exists` indicating whether the email exists in any account models.
            - On failure (e.g. missing email): A JSON response with an error message indicating that the email is required.
    
    Example:
        GET /check_mail?email=test@example.com
        Response: {"exists": true}  # If email exists in any model
    """
    email = request.GET.get('email', '')
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)

    # Check if email exists in the database (pseudo code)
    email_exists = (
        CompteMedecin.objects.filter(email=email).exists() or
        CompteInfirmier.objects.filter(email=email).exists() or
        CompteAdministrateur.objects.filter(email=email).exists() or
        ComptePersonnelAdministratif.objects.filter(email=email).exists() or
        CompteLaborantin.objects.filter(email=email).exists() or
        CompteRadiologue.objects.filter(email=email).exists()
    )
    return JsonResponse({'exists': email_exists})

@csrf_exempt
@require_http_methods(["DELETE"])
def delete(request, email):
    """
    Deletes a member from the database based on the provided email address.

    This view handles DELETE requests to remove a user account from one of several account models. The email is passed
    in the URL to identify the user. If the user is found, the member is deleted from the corresponding model,
    and a success message is returned. If no user is found with the provided email, an error message is returned.

    The function checks the following account models:
    - `CompteMedecin`
    - `CompteInfirmier`
    - `CompteAdministrateur`
    - `ComptePersonnelAdministratif`
    - `CompteLaborantin`
    - `CompteRadiologue`

    Args:
        request (HttpRequest): The HTTP request object, which contains the `DELETE` method and email in the URL.
        email (str): The email address of the member to be deleted.

    Returns:
        JsonResponse:
            - On success: A JSON response confirming the deletion of the member with HTTP 200 status.
            - On failure: A JSON response with an error message if no member with the provided email is found, with HTTP 404 status.

    Example:
        DELETE /delete/test@example.com
        Response: {"message": "Member with email test@example.com deleted successfully"}

        DELETE /delete/nonexistent@example.com
        Response: {"error": "No member found with the provided email"}, 404
    """
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)
    
    deleted = False
    # Loop over each model and try to delete the member
    for model in [
        CompteMedecin,
        CompteInfirmier,
        CompteAdministrateur,
        ComptePersonnelAdministratif,
        CompteLaborantin,
        CompteRadiologue,
    ]:
        # Attempt to delete member from model
        deleted_count, _ = model.objects.filter(email=email).delete()
        if deleted_count > 0:
            deleted = True

    if deleted:
        return JsonResponse({'message': f'Member with email {email} deleted successfully'})
    else:
        return JsonResponse({'error': 'No member found with the provided email'}, status=404)

def provide_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_protect
def get_all_staff(request):
    """
    Retrieves all staff members from a specified hospital.

    This view handles GET requests to fetch the staff members from a particular hospital. The hospital name is 
    provided as a query parameter in the request. If the hospital is found, the function retrieves all staff 
    categories related to that hospital and returns them in a structured JSON response. The function handles the 
    following categories of staff:
    - `medecins` (doctors)
    - `infirmiers` (nurses)
    - `radiologues` (radiologists)
    - `laborantins` (lab technicians)
    - `personnel_admin` (administrative staff)

    Each category includes details such as name, email, and for some categories, specialty or service.

    If the hospital name is not provided or if the hospital does not exist, appropriate error messages are returned.

    Args:
        request (HttpRequest): The HTTP GET request object, which should contain a query parameter `hospitalName`.

    Returns:
        JsonResponse:
            - On success: A JSON response with the list of staff members grouped by category.
            - On failure:
                - If the hospital is not found: A JSON response with an error message and HTTP 404 status.
                - If no hospital name is provided: A JSON response with an error message and HTTP 400 status.

    Example:
        GET /get_all_staff?hospitalName=SomeHospital
        Response: 
        {
            "medecins": [{"nomComplet": "Dr. John Doe", "email": "john@example.com", "specialite": "Cardiology"}],
            "infirmiers": [{"nomComplet": "Jane Smith", "email": "jane@example.com", "specialiteInf": "Emergency"}],
            "radiologues": [{"nomComplet": "Dr. Sarah Lee", "email": "sarah@example.com"}],
            "laborantins": [{"nomComplet": "Chris Johnson", "email": "chris@example.com"}],
            "personnel_admin": [{"nomComplet": "Linda Green", "email": "linda@example.com", "service": "HR"}]
        }

        GET /get_all_staff
        Response: {"error": "No hospital name provided"}, 400

        GET /get_all_staff?hospitalName=NonExistentHospital
        Response: {"error": "Hospital not found"}, 404
    """
    # Retrieve the hospital name from the request parameters
    hospital_name = request.GET.get('hospitalName','')
    if hospital_name:
        try:
            # Get the hospital instance
            hospital = Hopital.objects.get(nom=hospital_name)
            
            # Retrieve all staff categories related to the hospital
            medecins = CompteMedecin.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'specialite')
            infirmiers = CompteInfirmier.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'specialiteInf')
            radiologues = CompteRadiologue.objects.filter(idHopital_id=hospital).values('nomComplet', 'email')
            laborantins = CompteLaborantin.objects.filter(idHopital_id=hospital).values('nomComplet', 'email')
            personnel_admin = ComptePersonnelAdministratif.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'service')
            
            # Combine all the staff data into one response
            all_staff ={
                'medecins': list(medecins.values()),
                'infirmiers': list(infirmiers.values()),
                'radiologues': list(radiologues.values()),
                'laborantins': list(laborantins.values()),
                'personnel_admin': list(personnel_admin.values()),
            }

            return JsonResponse(all_staff)
        
        except Hopital.DoesNotExist:
            return JsonResponse({'error': 'Hospital not found'}, status=404)
    else:
        return JsonResponse({'error': 'No hospital name provided'}, status=400)

#----------TRAITEMENT DES DONNEES LUES POUR DES FINS D'INSERTION D'UN COMPTE EMPLOYE----------
def traiter_insertion_employe(email, nom, prenom, motDePasse, profession, hopital):
    """
    Validate the required fields provided for inserting an employee.

    Validates the input data and inserts the employee into the database. Supports the following professions:
    - Médecin with a specialty.
    - Infirmier with a specialty.
    - Personnel Administratif with a service.
    - Radiologue, Laborantin, Pharmacien.

    Args:
        email (str): The email address of the employee (primary key for the account).
        nom (str): The last name of the employee.
        prenom (str): The first name of the employee.
        motDePasse (str): The password for the employee's account.
        profession (str): The profession or post the employee occupies.
        hopital (str): The name of the hospital where the employee works (primary key for the hospital).

    Raises:
        ValueError: If any input is invalid (e.g. email, password, profession, or hospital).
    """
    # Vérifier la validité de l'email
    try:
        validate_email(email)  # Vérifie si l'email est valide
    except ValidationError:
        raise ValueError("L'email n'est pas valide.")
    
    # Vérifier si l'email existe déjà
    if User.objects.filter(email=email).exists():
        raise ValueError(f"L'email {email} est déjà utilisé.")

    # Vérification de la longueur du mot de passe
    if len(motDePasse) < 8:
        raise ValueError("Le mot de passe doit comporter au moins 8 caractères.")

    # Vérifiez si l'hôpital existe
    try:
        hopital_instance = Hopital.objects.get(nom=hopital)
    except Hopital.DoesNotExist:
        raise ValueError(f"L'hôpital {hopital} n'existe pas.")

    # Traitement pour les médecins
    if profession.startswith('Médecin-'):
        specialite = profession.replace('Médecin-', '')
        if specialite in dict(CompteMedecin.SPEC_CHOIX):
            CompteMedecin.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                specialite=specialite,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"La spécialité {specialite} n'est pas valide pour un médecin.")

    # Traitement pour les infirmiers
    elif profession.startswith('Infirmier-'):
        specialite = profession.replace('Infirmier-', '')
        if specialite in dict(CompteInfirmier.SPEC_CHOIX):
            CompteInfirmier.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                specialite=specialite,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"La spécialité {specialite} n'est pas valide pour un infirmier.")

    # Traitement pour le personnel administratif
    elif profession.startswith('Administratif-'):
        service = profession.replace('Administratif-', '')
        if service in dict(ComptePersonnelAdministratif.SERVICE_CHOIX):
            ComptePersonnelAdministratif.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                service=service,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"Le service {service} n'est pas valide pour un personnel administratif.")

    # Autres professions : Radiologue, Laborantin, Pharmacien
    elif profession == 'Radiologue':
        CompteRadiologue.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    elif profession == 'Laborantin':
        CompteLaborantin.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    elif profession == 'Pharmacien':
        ComptePharmacien.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    else:
        raise ValueError(f"La profession {profession} n'est pas valide.")

    print(f"L'employé {nom} {prenom} a été ajouté avec succès dans la table correspondant à la profession {profession}.")

#----------CREATION D'UN ENREGISTREMENT DANS LA TABLE POUR UN NOUVEL EMPLOYE----------
class EmployeeCreateView(APIView):
    """
    API view to handle the creation of an employee record.

    This view accepts a POST request with employee details, validates the input data,
    and inserts the employee into the appropriate table based on their profession.

    Args:
        request (Request): The HTTP request containing the employee data.

    Returns:
        Response:
            - On success: A JSON response with a success message and HTTP 201 status.
            - On failure: A JSON response with error details and HTTP 400 status.
    """
    def post(self, request, *args, **kwargs):
        # Sérialisation et validation des données
        serializer = EmployeeSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                # Appel de la fonction d'insertion
                traiter_insertion_employe(
                    email=serializer.validated_data['email'],
                    nom=serializer.validated_data['nom'],
                    prenom=serializer.validated_data['prenom'],
                    motDePasse=serializer.validated_data['motDePasse'],
                    profession=serializer.validated_data['profession'],
                    hopital=serializer.validated_data['hopital']
                )
                return Response({"message": "Employé ajouté avec succès!"}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#----------AFFICHAGE DE LA LISTE DES EMPLOYES PAR PROFESSION----------
class ListeEmployesView(APIView):
    """
    API view to retrieve and display a list of employees grouped by their professions.

    This view handles GET requests to return serialized data for all employees, 
    categorized by profession.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response:
            - On success: A JSON response containing employees categorized by profession with HTTP 200 status.
    """
    def get(self, request, *args, **kwargs):
        # Récupérer tous les employés
        medecins = CompteMedecin.objects.all()
        infirmiers = CompteInfirmier.objects.all()
        administratifs = ComptePersonnelAdministratif.objects.all()
        radiologues = CompteRadiologue.objects.all()
        laborantins = CompteLaborantin.objects.all()
        pharmaciens = ComptePharmacien.objects.all()

        # Sérialiser les employés
        medecins_serializer = CompteMedecinSerializer(medecins, many=True)
        infirmiers_serializer = CompteInfirmierSerializer(infirmiers, many=True)
        administratifs_serializer = ComptePersonnelAdministratifSerializer(administratifs, many=True)
        radiologues_serializer = CompteRadiologueSerializer(radiologues, many=True)
        laborantins_serializer = CompteLaborantinSerializer(laborantins, many=True)
        pharmaciens_serializer = ComptePharmacienSerializer(pharmaciens, many=True)

        data = {
            'medecins': medecins_serializer.data,
            'infirmiers': infirmiers_serializer.data,
            'administratifs': administratifs_serializer.data,
            'radiologues': radiologues_serializer.data,
            'laborantins': laborantins_serializer.data,
            'pharmaciens': pharmaciens_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)