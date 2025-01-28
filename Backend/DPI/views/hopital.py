from ..models import *
from ..serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets


class HopitalViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing hospital instances.

    This viewset provides the standard actions for working with hospital records:
    listing all hospitals, retrieving specific hospital details, creating new hospitals, 
    updating existing hospitals, and deleting hospitals.

    It uses the `HopitalSerializer` to serialize data and the `Hopital` model as the 
    data source.

    Args:
        queryset (QuerySet): A set of all hospital instances (`Hopital.objects.all()`).
        serializer_class (Serializer): The serializer class to be used for the hospital model (`HopitalSerializer`).

    Returns:
        Response:
            - GET request: Returns a list or detail of hospital records.
            - POST request: Creates a new hospital record.
            - PUT/PATCH request: Updates an existing hospital record.
            - DELETE request: Deletes a hospital record.
    """
    queryset = Hopital.objects.all()
    serializer_class = HopitalSerializer

#----------CREATION D'UN ENREGISTREMENT DANS LA TABLE POUR UN NOUVEL HOPITAL----------
class AjouterHopitalView(generics.CreateAPIView):
    """
    API view to handle the creation of a hospital record.

    This view accepts a POST request with hospital details (e.g. name)
    and inserts the hospital into the database.

    Args:
        request (Request): The HTTP request containing the hospital data.

    Returns:
        Response:
            - On success: A JSON response with a success message and HTTP 201 status.
            - On failure: A JSON response with validation error details and HTTP 400 status.
    """
    queryset = Hopital.objects.all()
    serializer_class = HopitalSerializer

    def create(self, request, *args, **kwargs):
        """
        Overridden create method to customize the response after creating a hospital record.

        Validates the input data using the serializer and saves it to the database.

        Args:
            request (Request): The HTTP request containing the hospital data.

        Returns:
            Response:
                - HTTP 201: If the hospital is successfully created.
                - HTTP 400: If validation errors occur.
        """
        # Utilisation du serializer pour valider et enregistrer l'hôpital
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'hôpital dans la base de données
            return Response({"message": "Hôpital ajouté avec succès!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
