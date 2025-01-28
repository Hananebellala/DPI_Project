from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


#----------CREATION D'UN SEJOUR POUR UN PATIENT ARRIVE A L'HOPITAL----------
class CreerSejourView(APIView):
    """
    API view for creating a hospital stay (séjour) for a patient upon arrival at the hospital.

    This view processes a POST request to create a new stay record for a patient. The information
    needed includes the patient's social security number (NSS), the attending doctor's ID, and
    the dates of the stay along with the admission reason.

    The following steps are performed:
    1. Retrieve the patient (DPI) using the provided NSS.
    2. Retrieve the attending doctor (CompteMedecin) using the provided doctor ID.
    3. Create a new hospital stay (séjour) record with the provided details:
        - Patient’s medical file (DPI)
        - Attending doctor
        - Start and end dates of the stay
        - Admission reason (optional)

    Args:
        request (Request): The HTTP request object containing the data for the new hospital stay.
        *args (tuple): Variable-length argument list (not used in this specific implementation).
        **kwargs (dict): Arbitrary keyword arguments (not used in this specific implementation).

    Returns:
        Response:
            - On success: A JSON response containing the details of the newly created stay (séjour).
            - On failure:
                - If the patient's NSS is not provided or invalid: HTTP 400 status with an error message.
                - If the attending doctor ID is not provided or invalid: HTTP 400 status with an error message.
                - If the patient or doctor is not found: HTTP 404 status with an error message.
                - If the data fails validation: HTTP 400 status with validation errors.
    """
    def post(self, request, *args, **kwargs):
        # Récupérer le NSS du patient depuis les paramètres ou le contexte
        nss_patient = request.data.get('nss_patient')  # Par exemple, passé en paramètre
        if not nss_patient:
            return Response({"error": "NSS du patient requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Récupérer le DPI (Patient)
            patient = DPI.objects.get(numeroSecuriteSociale=nss_patient)
        except DPI.DoesNotExist:
            return Response({"error": "Patient introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        # Récupérer le médecin (par exemple, via son ID ou son email fourni dans les données)
        id_medecin = request.data.get('id_medecin')
        if not id_medecin:
            return Response({"error": "ID du médecin requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            medecin = CompteMedecin.objects.get(pk=id_medecin)
        except CompteMedecin.DoesNotExist:
            return Response({"error": "Médecin introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        # Création du séjour
        data = {
            "idDossierPatient": patient.numeroSecuriteSociale,
            "idCompteMedecin": medecin.pk,
            "dateDebutSejour": request.data.get('dateDebutSejour'),
            "dateFinSejour": request.data.get('dateFinSejour'),
            "motifAdmission": request.data.get('motifAdmission', "Non spécifié"),
        }
        serializer = SejourSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#----------SUPPRESSION D'UN SEJOUR----------
class SejourViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing hospital stays (séjours). This viewset provides the standard actions for
    listing, retrieving, creating, updating, and deleting hospital stays.

    It uses the `SejourSerializer` to serialize the `Sejour` model data.

    Actions available:
    - List all hospital stays.
    - Retrieve details of a specific hospital stay.
    - Create a new hospital stay.
    - Update an existing hospital stay.
    - Delete a hospital stay.

    Additionally, this viewset includes a custom action to delete a specific hospital stay by its ID.
    """
    queryset = Sejour.objects.all()
    serializer_class = SejourSerializer

    # Action pour supprimer un séjour
    @action(detail=True, methods=['delete'])
    def supprimer_sejour(self, request, pk=None):
        try:
            sejour = Sejour.objects.get(pk=pk)
            sejour.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Sejour.DoesNotExist:
            return Response({'detail': 'Séjour non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        
class SejourDetailView(APIView):
    """
    Handles requests for retrieving detailed information about a specific sejour (hospital stay).

    This API view provides:
    - Diagnostic information for the specified sejour.
    - A list of all consultations associated with the sejour.

    Permissions:
        - Requires the user to be authenticated (`IsAuthenticated`).

    Methods:
        - `get(request, idSejour, *args, **kwargs)`: Retrieves the diagnostic and consultation details for a given sejour.

    Args:
        request (Request): The HTTP request object.
        idSejour (int): The unique identifier of the sejour.

    Returns:
        Response:
            - On success: A JSON object containing the diagnostic details and consultation history of the sejour.
            - On failure: A JSON object with an error message and appropriate HTTP status code.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, idSejour, *args, **kwargs):
        """
        Retrieves diagnostic and consultation details for a specific sejour.

        Args:
            request (Request): The HTTP request object.
            idSejour (int): The unique identifier of the sejour.

        Returns:
            Response:
                - On success: A JSON object with the following structure:
                    {
                        "sejour_id": <idSejour>,
                        "diagnostic_data": {
                            "id": <diagnostic_id>,
                            "description": <diagnostic_description>,
                            ...
                        },
                        "consultations": [
                            {
                                "id": <consultation_id>,
                                "date": <consultation_date>,
                                "outilsConsulation": <consultation_tools>,
                                ...
                            },
                            ...
                        ]
                    }
                - On failure: A JSON object with an error message and an appropriate HTTP status code.
        """
        try:
            # Retrieve the sejour using the idSejour
            
            diagnostic = Diagnostic.objects.get(idSejour=idSejour)
            
            # Fetch all consultations for the sejour
            consultations = ConsultationMedicale.objects.filter(idSejour=idSejour)
            diagnostic_data = {
                "id": diagnostic.id,
                "description": diagnostic.descriptionMaladie,  # Replace with actual fields of Diagnostic
                # Add other fields from the Diagnostic model here
            }

            # Prepare consultation data
            consultation_data = []
            for consultation in consultations:
                consultation_data.append({
                    "id"  :consultation.id,
                    "date": consultation.dateConsultation,
                    "outilsConsulation" : consultation.OutilsConsultation,
                   
                })

            return Response({
                "sejour_id": idSejour,
                "diagnostic_data":diagnostic_data,
                "consultations": consultation_data
            }, status=status.HTTP_200_OK)

        except Sejour.DoesNotExist:
            return Response({"error": "Sejour not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

