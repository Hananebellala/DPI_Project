from ..models import *
from ..serializers import *
from rest_framework import viewsets


class FactureViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing invoices (Factures).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `Facture` model.

    Attributes:
        queryset: A queryset for retrieving all `Facture` objects from the database.
        serializer_class: The serializer class used to convert `Facture` objects into JSON format and vice versa.
    """
    queryset = Facture.objects.all()
    serializer_class = FactureSerializer


class LigneFactureViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing invoice lines (LigneFacture).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `LigneFacture` model, which represents individual items in a `Facture`.
    
    Attributes:
        queryset: A queryset for retrieving all `LigneFacture` objects from the database.
        serializer_class: The serializer class used to convert `LigneFacture` objects into JSON format and vice versa.
    """
    queryset = LigneFacture.objects.all()
    serializer_class = LigneFactureSerializer
