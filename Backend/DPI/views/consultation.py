from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets


class ConsultationMedicaleViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing medical consultations (ConsultationMedicale).

    This viewset provides CRUD functionality for the `ConsultationMedicale` model.

    Attributes:
        queryset (QuerySet): A queryset that retrieves all `ConsultationMedicale` objects.
        serializer_class (Serializer): The serializer class used to validate and serialize `ConsultationMedicale` data.
    
    Permissions:
        - By default, permissions will be inherited from the global settings. Customize as needed in the project.

    Methods:
        - List (`GET`): Retrieve a list of all medical consultations.
        - Retrieve (`GET`): Retrieve details of a specific consultation by its ID.
        - Create (`POST`): Create a new consultation.
        - Update (`PUT`): Update all fields of an existing consultation.
        - Partial Update (`PATCH`): Update specific fields of an existing consultation.
        - Delete (`DELETE`): Delete a specific consultation by its ID.
    """
    queryset = ConsultationMedicale.objects.all()
    serializer_class = ConsultationMedicaleSerializer


class ConsultationDetailView(APIView):
    """
    API view for retrieving detailed information about a specific medical consultation.

    Attributes:
        permission_classes (list): Specifies the permissions required to access this view.
                                   Default is `IsAuthenticated`, which ensures only authenticated users can access the endpoint.

    Methods:
        get(request, email, idSejour, consultation_id, *args, **kwargs):
            Handles GET requests to fetch detailed information about a specific consultation.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour , consultation_id, *args, **kwargs):
        """
        Retrieve details of a specific consultation based on the consultation ID.

        Args:
            request (HttpRequest): The HTTP request object.
            email (str): The email of the user (for potential validation or context, though not directly used here).
            idSejour (int): The ID of the related sejour (hospital stay).
            consultation_id (int): The ID of the consultation to retrieve.

        Returns:
            Response: A JSON response containing consultation details if found, or an error message otherwise.

        Responses:
            - 200 OK: Returns the consultation details in JSON format.
            - 404 Not Found: Consultation not found for the given ID.
            - 500 Internal Server Error: General error in processing the request.
        """
        try:

            consultation = ConsultationMedicale.objects.get(id=consultation_id)
            # Prepare the response with consultation details
            consultation_data = {
                "id": consultation.id, 
                "date": consultation.dateConsultation,
                "outil": consultation.outilsConsultation,
                "resume":consultation.resume,
                "Premiere":consultation.premiere,
            }

            return Response(consultation_data, status=status.HTTP_200_OK)

        except ConsultationMedicale.DoesNotExist:
            return Response({"error": "Consultation not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AntecedentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Antecedent instances.

    This viewset provides `list`, `retrieve`, `create`, `update`, and `destroy`
    actions for the `Antecedent` model. It automatically handles the
    CRUD operations by integrating with Django's ORM and serializers.

    Attributes:
        queryset (QuerySet): The queryset defines the set of `Antecedent`
            objects that this viewset interacts with. In this case, it
            retrieves all the records from the database.
        serializer_class (Serializer): The serializer class defines the
            structure and validation logic for the `Antecedent` data
            that will be sent to or received from this viewset.
    """
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

    