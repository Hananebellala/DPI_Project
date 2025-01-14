from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class MedicamentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting Medicament instances.

    This viewset provides standard actions such as `list`, `retrieve`, `create`, 
    `update`, and `destroy` for the `Medicament` model. It uses Django's ORM 
    to fetch data and a serializer to validate and serialize the data.

    Attributes:
        queryset (QuerySet): The set of `Medicament` objects to work with. 
            In this case, it fetches all instances of the `Medicament` model 
            from the database.
        serializer_class (Serializer): Specifies the serializer used to 
            validate, serialize, and deserialize data for `Medicament` instances.
    """
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class MedicamentDetailView(APIView):
    """
    API view for retrieving details about prescribed medications (posologies) for a specific patient's stay.

    Attributes:
        permission_classes (list): Ensures only authenticated users can access this endpoint.
                                   Uses the `IsAuthenticated` permission class.

    Methods:
        get(request, email, idSejour, *args, **kwargs):
            Handles GET requests to retrieve medication details for a specific stay (sejour).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, *args, **kwargs):
        """
        Retrieve details of the medications (posologies) prescribed during a patient's stay.

        Args:
            request (HttpRequest): The HTTP request object.
            email (str): The email of the user (for potential validation or context, though not directly used here).
            idSejour (int): The ID of the related sejour (hospital stay).

        Returns:
            Response: A JSON response containing medication details if found, or an error message otherwise.

        Responses:
            - 200 OK: Returns the posologies (medication) details in JSON format.
            - 404 Not Found: If posologies, ordonnance, or diagnostic is not found for the given sejour.
            - 500 Internal Server Error: General error in processing the request.
        """
        try:
            diagnostic = Diagnostic.objects.get(idSejour=idSejour)
            ordonnance = Ordonnance.objects.get(idDiagnostic=diagnostic.id)
            posologies = Posologie.objects.get(idOrdonnance=ordonnance.id)

            posologies_data = {
                "id": posologies.id, 
                "nom-medicament": posologies.nomMedicament.nomMedicament,
                "forme-medicament": posologies.nomMedicament.forme,
                "quantite-medicament": posologies.nomMedicament.quantiteStock,
                "dose": posologies.dose,
                "dureePrise": posologies.dureePrise,
            }

            return Response(posologies_data, status=status.HTTP_200_OK)

        except Posologie.DoesNotExist:
            return Response({"error": "Posologie not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PosologieBySejourView(APIView):
    """
    API View to retrieve a list of `Posologie` (prescriptions or dosages) associated with a specific hospital stay (`Sejour`).

    This endpoint fetches all `Posologie` records linked to the provided `id_sejour` 
    and serializes them into JSON format for the response.

    Methods:
        get(request, id_sejour, format=None):
            Handles GET requests to retrieve the list of `Posologie` records.

    Example usage:
        GET /sejour/<id_sejour>/posologies/
    """
    def get(self, request, id_sejour, format=None):
        """
        Handles the GET request to fetch the list of `Posologie` associated with a specific `Sejour`.

        Args:
            request (HttpRequest): The HTTP request object.
            id_sejour (int): The ID of the hospital stay (`Sejour`) for which posologies are being retrieved.
            format (str, optional): The format of the response (default is `None`).

        Returns:
            Response: A JSON response containing the serialized `Posologie` data.
        """
        posologies = Posologie.objects.filter(idSejour=id_sejour)
        serializer = PosologieSerializer(posologies, many=True)
        return Response(serializer.data)
    

class OrdonnanceViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing Ordonnance instances.

    This viewset provides standard CRUD (Create, Read, Update, Delete) operations
    for the `Ordonnance` model. It supports actions such as:
    - Listing all Ordonnance instances
    - Retrieving a single Ordonnance instance
    - Creating a new Ordonnance instance
    - Updating an existing Ordonnance instance
    - Deleting an Ordonnance instance

    Attributes:
        queryset (QuerySet): The set of `Ordonnance` objects retrieved from 
            the database. By default, it fetches all instances.
        serializer_class (Serializer): Specifies the serializer used for 
            validating, serializing, and deserializing `Ordonnance` data.
    """
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class PosologieViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing dosages (Posologie).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `Posologie` model, which represents dosage instructions in the system.
    
    Attributes:
        queryset: A queryset for retrieving all `Posologie` objects from the database.
        serializer_class: The serializer class used to convert `Posologie` objects into JSON format and vice versa.
    """
    queryset = Posologie.objects.all()
    serializer_class = PosologieSerializer


class EffetSecondaireViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing secondary effect instances.

    This class provides a set of views (list, retrieve, create, update, delete)
    for the `EffetSecondaire` model using the `EffetSecondaireSerializer` serializer.

    Attributes:
        queryset (QuerySet): A QuerySet that defines the set of `EffetSecondaire` 
                              objects to retrieve from the database.
        serializer_class (class): The serializer class used to serialize and 
                                  deserialize `EffetSecondaire` objects.

    Methods:
        list(request): Returns a list of all `EffetSecondaire` objects.
        retrieve(request, pk): Retrieves a single `EffetSecondaire` object by primary key.
        create(request): Creates a new `EffetSecondaire` object.
        update(request, pk): Updates an existing `EffetSecondaire` object by primary key.
        destroy(request, pk): Deletes a single `EffetSecondaire` object by primary key.
    """
    
    queryset = EffetSecondaire.objects.all()
    serializer_class = EffetSecondaireSerializer
