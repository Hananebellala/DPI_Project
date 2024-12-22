from .models import *
from rest_framework import permissions, viewsets # DRF class for creating views
from .serializers import *


# Defining the view for each model
class HopitalViewSet(viewsets.ModelViewSet):
    queryset = Hopital.objects.all()
    serializer_class = HopitalSerializer

class CompteAdministrateurViewSet(viewsets.ModelViewSet):
    queryset = CompteAdministrateur.objects.all()
    serializer_class = CompteAdministrateurSerializer

class CompteMedecinViewSet(viewsets.ModelViewSet):
    queryset = CompteMedecin.objects.all()
    serializer_class = CompteMedecinSerializer

class CompteInfirmierViewSet(viewsets.ModelViewSet):
    queryset = CompteInfirmier.objects.all()
    serializer_class = CompteInfirmierSerializer

class ComptePersonnelAdministratifViewSet(viewsets.ModelViewSet):
    queryset = ComptePersonnelAdministratif.objects.all()
    serializer_class = ComptePersonnelAdministratifSerializer

class ComptePatientViewSet(viewsets.ModelViewSet):
    queryset = ComptePatient.objects.all()
    serializer_class = ComptePatientSerializer

class DPIViewSet(viewsets.ModelViewSet):
    queryset = DPI.objects.all()
    serializer_class = DPISerializer

class OrdonnanceViewSet(viewsets.ModelViewSet):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer

class SoinViewSet(viewsets.ModelViewSet):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

class ConsultationMedicaleViewSet(viewsets.ModelViewSet):
    queryset = ConsultationMedicale.objects.all()
    serializer_class = ConsultationMedicaleSerializer

class MedicamentViewSet(viewsets.ModelViewSet):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

class SejourViewSet(viewsets.ModelViewSet):
    queryset = Sejour.objects.all()
    serializer_class = SejourSerializer

class DiagnosticViewSet(viewsets.ModelViewSet):
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticSerializer

class BilanRadiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanRadiologique.objects.all()
    serializer_class = BilanRadiologiqueSerializer

class BilanBiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanBiologique.objects.all()
    serializer_class = BilanBiologiqueSerializer

class LigneBilanBiologiqueViewSet(viewsets.ModelViewSet):
    queryset = LigneBilanBiologique.objects.all()
    serializer_class = LigneBilanBiologiqueSerializer

class PosologieViewSet(viewsets.ModelViewSet):
    queryset = Posologie.objects.all()
    serializer_class = PosologieSerializer

class FactureViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.all()
    serializer_class = FactureSerializer

class LigneFactureViewSet(viewsets.ModelViewSet):
    queryset = LigneFacture.objects.all()
    serializer_class = LigneFactureSerializer

class EffetSecondaireViewSet(viewsets.ModelViewSet):
    queryset = EffetSecondaire.objects.all()
    serializer_class = EffetSecondaireSerializer


