from django.urls import path
from rest_framework.routers import DefaultRouter  # DRF router for automatic URL generation
from . import views
from .views import * 
# Initialize the DRF router
router = DefaultRouter()
router.register(r'hopital', HopitalViewSet, basename="hopital")
router.register(r'compteadmin', CompteAdministrateurViewSet, basename="compteadmin")
router.register(r'compteinfirmier', CompteInfirmierViewSet, basename="compteinfirmier")
router.register(r'comptemedecin', CompteMedecinViewSet, basename="comptemedecin")
router.register(r'comptepersonneladministratif', ComptePersonnelAdministratifViewSet, basename="comptepersonneladministratif")
router.register(r'comptepatient', ComptePatientViewSet, basename="comptepatient")
router.register(r'dpi', DPIViewSet, basename="dpi")
router.register(r'ordonnance', OrdonnanceViewSet, basename="ordonnance")
router.register(r'soin', SoinViewSet, basename="soin")
router.register(r'consultationmedicale', ConsultationMedicaleViewSet, basename="consultationmedicale")
router.register(r'bilanbiologique', BilanBiologiqueViewSet, basename="bilanbiologique")
router.register(r'lignesignevital', LigneAnalyseViewSet, basename="lignesignevital")
router.register(r'ligneanalyse', LigneAnalyseViewSet, basename="ligneanalyse")
router.register(r'sejour', SejourViewSet, basename="sejour")
router.register(r'medicament', MedicamentViewSet, basename="medicament")
router.register(r'diagnostic', DiagnosticViewSet, basename="diagnostic")
router.register(r'posologie', PosologieViewSet, basename="posologie")
router.register(r'facture', FactureViewSet, basename="facture")
router.register(r'lignefacture', LigneFactureViewSet, basename="lignefacture")
router.register(r'effetsecondaire', EffetSecondaireViewSet, basename="effetsecondaire")

# Define your app's URL patterns
urlpatterns = [
    path('home/', views.homePage),
    path('register/', views.registerPage),
    
    path('signupAdmin/', views.admin_signup, name='admin_signup'),
    path('loginAdmin/', views.admin_login, name='admin_login'),
    path('admin/', views.admin_dashboard, name='admin_dashboard'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/<str:email>/', ProfileView.as_view(), name='profile'),
    path('profile/<str:email>/<int:idSejour>/', SejourDetailView.as_view(), name='sejour_detail'),

    path('profile/<str:email>/<int:idSejour>/<int:consultation_id>/', ConsultationDetailView.as_view(), name='consultation-detail'),
    path('profile/<str:email>/<int:idSejour>/medicament/', MedicamentDetailView.as_view(), name='medicament-detail'),

    path('profile/<str:email>/<int:idSejour>/labs/', LabsView.as_view(), name='labs_list'),
    
    # URL to get the details of a specific lab type (VitalSigns, BloodCountTest, Radio)
    path('profile/<str:email>/<int:idSejour>/labs/<str:lab_type>/', LabDetailView.as_view(), name='lab_detail'),
   


]

# Add the router's URLs to the list of URL patterns
urlpatterns += router.urls