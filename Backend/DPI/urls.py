from django.urls import include, path
from rest_framework.routers import DefaultRouter  # DRF router for automatic URL generation
from . import views
from .views import * 
from django.conf import settings
from django.conf.urls.static import static
# Initialize the DRF router

router = DefaultRouter()

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
    path('profile/<str:email>/<int:idSejour>/labs/<str:lab_type>/', LabDetailView.as_view(), name='lab_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)