from django.contrib import admin
from django.urls import path, include           # Django utilities for URL routing
from rest_framework.routers import DefaultRouter  # DRF router for automatic URL generation
from DPI.views import *             # Import the view you created

# Create a router
router = DefaultRouter()
router.register(r'hopital', HopitalViewSet, basename="hopital")    # Link the router to the HopitalViewSet
router.register(r'compteadmin', CompteAdministrateurViewSet, basename="compteadmin")
router.register(r'compteinfirmier', CompteInfirmierViewSet, basename="compteinfirmier")
router.register(r'comptemedecin', CompteMedecinViewSet, basename="comptemedecin")
router.register(r'comptepersonneladministratif', ComptePersonnelAdministratifViewSet, basename="comptepersonneladministratif")
router.register(r'comptelaborantin', CompteLaborantinViewSet, basename="comptelaborantin")
router.register(r'compteradiologue', CompteRadiologueViewSet, basename="compteradiologue")
router.register(r'comptepharmacien', ComptePharmacienViewSet, basename="comptepharmacien")
router.register(r'comptepatient', ComptePatientViewSet, basename="comptepatient")
router.register(r'dpi', DPIViewSet, basename="dpi")
router.register(r'ordonnance', OrdonnanceViewSet, basename="ordonnance")
router.register(r'soin', SoinViewSet, basename="soin")
router.register(r'consultationmedicale', ConsultationMedicaleViewSet, basename="consultationmedicale")
router.register(r'sejour', SejourViewSet, basename="sejour")
router.register(r'medicament', MedicamentViewSet, basename="medicament")
router.register(r'diagnostic', DiagnosticViewSet, basename="diagnostic")
router.register(r'bilanradiologique', BilanRadiologiqueViewSet, basename="bilanradiologique")
router.register(r'bilanbiologique', BilanBiologiqueViewSet, basename="bilanbiologique")
router.register(r'lignebilanbiologique', LigneBilanBiologiqueViewSet, basename="lignebilanbiologique")
router.register(r'posologie', PosologieViewSet, basename="posologie")
router.register(r'facture', FactureViewSet, basename="facture")
router.register(r'lignefacture', LigneFactureViewSet, basename="lignefacture")
router.register(r'effetsecondaire', EffetSecondaireViewSet, basename="effetsecondaire")

# Include the router's URLs in your app's urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),        # Add all router-generated URLs to the app
]