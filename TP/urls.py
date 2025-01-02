
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include           # Django utilities for URL routing
from rest_framework.routers import DefaultRouter  # DRF router for automatic URL generation
from DPI.views import *             # Import the view you created
from django.contrib.auth import views as auth_views

# Create a router
router = DefaultRouter()
router.register(r'hopital', HopitalViewSet, basename="hopital")    # Link the router to the HopitalViewSet
router.register(r'compteadmin', CompteAdministrateurViewSet, basename="compteadmin")
router.register(r'compteinfirmier', CompteInfirmierViewSet, basename="compteinfirmier")
router.register(r'comptemedecin', CompteMedecinViewSet, basename="comptemedecin")
router.register(r'comptepersonneladministratif', ComptePersonnelAdministratifViewSet, basename="comptepersonneladministratif")
router.register(r'comptepatient', ComptePatientViewSet, basename="comptepatient")
router.register(r'comptelaborantin', CompteLaborantinViewSet, basename="comptelaborantin")
router.register(r'compteradiologue', CompteRadiologueViewSet, basename="compteradiologue")
router.register(r'comptepharmacien', ComptePharmacienViewSet, basename="comptepharmacien")
router.register(r'dpi', DPIViewSet, basename="dpi")
router.register(r'ordonnance', OrdonnanceViewSet, basename="ordonnance")
router.register(r'soin', SoinViewSet, basename="soin")
router.register(r'consultationmedicale', ConsultationMedicaleViewSet, basename="consultationmedicale")
router.register(r'antecedent', AntecedentViewSet, basename="antecedent")
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
    path('api/creer-sejour/', CreerSejourView.as_view(), name='creer-sejour'),#creation du sejour il faut recuperer id doctor+nss par le frontend
    path('api/medecin-traitant/<str:nss>/', MedecinTraitantAPIView.as_view(), name='medecin-traitant'),
    path('generate-qr/<str:numero_securite_sociale>/', GenerateQRCodeView.as_view(), name='generate_qr'),  # creation du QR code unique basse sur le num de securite sociale 
    path('api/recherche-patient/', RecherchePatientView.as_view(), name='recherche_patient'), # recherche d un patient par nss (mm par QR apres la requette) + get recuperer consulter le dpi 
    path('api/employes/', ListeEmployesView.as_view(), name='liste-employes'), #recuperation de la liste des employees  //get 
    path('api/hopital/', AjouterHopitalView.as_view(), name='ajouter-hopital'), # add new hopital  // post
    path('api/employe/', EmployeeCreateView.as_view(), name='create_employee'), # add new employee   // post 
    path('api/create-patient/', CreatePatientAccountAndDossierAPIView.as_view(), name='create-patient'),#creation du compte +docier du patient recuperer dan le mm formulaire   //post

    #path('api/add_employee/', add_employee_api, name='add_employee_api'),
    #path('', auth_views.LoginView.as_view(), name='login'),
    #path('', essaye),
    path('', include(router.urls)),
    path('', include('DPI.urls')), 
                    # Add all router-generated URLs to the app
]