from ..models import *
from ..serializers import *
from rest_framework import viewsets

class SoinViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing `Soin` instances.

    This class provides a set of views (list, retrieve, create, update, delete)
    for the `Soin` model using the `SoinSerializer` serializer.

    Attributes:
        queryset (QuerySet): A QuerySet that defines the set of `Soin` 
                              objects to retrieve from the database.
        serializer_class (class): The serializer class used to serialize and 
                                  deserialize `Soin` objects.

    Methods:
        list(request): Returns a list of all `Soin` objects.
        retrieve(request, pk): Retrieves a single `Soin` object by primary key.
        create(request): Creates a new `Soin` object.
        update(request, pk): Updates an existing `Soin` object by primary key.
        destroy(request, pk): Deletes a single `Soin` object by primary key.
    """
    
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer


class DiagnosticViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing `Diagnostic` instances.

    This class provides a set of views (list, retrieve, create, update, delete)
    for the `Diagnostic` model using the `DiagnosticSerializer` serializer.

    Attributes:
        queryset (QuerySet): A QuerySet that defines the set of `Diagnostic` 
                              objects to retrieve from the database.
        serializer_class (class): The serializer class used to serialize and 
                                  deserialize `Diagnostic` objects.

    Methods:
        list(request): Returns a list of all `Diagnostic` objects.
        retrieve(request, pk): Retrieves a single `Diagnostic` object by primary key.
        create(request): Creates a new `Diagnostic` object.
        update(request, pk): Updates an existing `Diagnostic` object by primary key.
        destroy(request, pk): Deletes a single `Diagnostic` object by primary key.
    """
    
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticSerializer

