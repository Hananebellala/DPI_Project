from .models import DPI
from rest_framework import permissions, viewsets
from .serializers import DPISerializer


class DPIViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = DPI.objects.all()
    serializer_class = DPISerializer
    permission_classes = [permissions.IsAuthenticated]

