
from django.contrib.auth.hashers import make_password

from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework import permissions, viewsets # DRF class for creating views
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import User
from django.views.decorators.http import require_GET,require_http_methods
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view

# Defining the view for each model
# creates a rest API for each model  ( CRUD )
class HopitalViewSet(viewsets.ModelViewSet):
    queryset = Hopital.objects.all()
    serializer_class = HopitalSerializer

class CompteAdministrateurViewSet(viewsets.ModelViewSet):
    queryset = CompteAdministrateur.objects.all()
    serializer_class = CompteAdministrateurSerializer

from rest_framework.permissions import AllowAny
from rest_framework.decorators import action

class CompteMedecinViewSet(viewsets.ModelViewSet):
    queryset = CompteMedecin.objects.all()
    serializer_class = CompteMedecinSerializer
    permission_classes = [AllowAny]

@api_view(['DELETE'])
def delete(request, email):
    try:
        member = CompteMedecin.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteMedecin.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteInfirmierViewSet(viewsets.ModelViewSet):
    queryset = CompteInfirmier.objects.all()
    serializer_class = CompteInfirmierSerializer

@api_view(['DELETE'])
def delete(request, email):
    try:
        member = CompteInfirmier.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteInfirmier.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class ComptePersonnelAdministratifViewSet(viewsets.ModelViewSet):
    queryset = ComptePersonnelAdministratif.objects.all()
    serializer_class = ComptePersonnelAdministratifSerializer

@api_view(['DELETE'])
def delete(request, email):
    try:
        member = ComptePersonnelAdministratif.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except ComptePersonnelAdministratif.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteRadiologueViewSet(viewsets.ModelViewSet):
    queryset = CompteRadiologue.objects.all()
    serializer_class = CompteRadiologueSerializer

@api_view(['DELETE'])
def delete(request, email):
    try:
        member = CompteRadiologue.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteRadiologue.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

class CompteLaborantinViewSet(viewsets.ModelViewSet):
    queryset = CompteLaborantin.objects.all()
    serializer_class = CompteLaborantinSerializer

@api_view(['DELETE'])
def delete(request, email):
    try:
        member = CompteLaborantin.objects.get(email=email)
        member.delete()
        return Response({'message': 'Member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CompteLaborantin.DoesNotExist:
        return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)

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
    
class AntecedentViewSet(viewsets.ModelViewSet):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

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
    serializer_class = BRSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BilanBiologiqueViewSet(viewsets.ModelViewSet):
    queryset = BilanBiologique.objects.all()
    serializer_class = BilanBiologiqueSerializer

class LigneSigneVitalViewSet(viewsets.ModelViewSet):
    queryset = LigneSigneVital.objects.all()
    serializer_class = LigneSigneVitalSerializer

class LigneAnalyseViewSet(viewsets.ModelViewSet):
    queryset = LigneAnalyse.objects.all()
    serializer_class = LigneAnalyseSerializer

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

@require_GET  # Ensures that only GET requests are allowed
def check_mail(request):
    email = request.GET.get('email', '')
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)

    # Check if email exists in the database (pseudo code)
    email_exists = (
        CompteMedecin.objects.filter(email=email).exists() or
        CompteInfirmier.objects.filter(email=email).exists() or
        CompteAdministrateur.objects.filter(email=email).exists() or
        ComptePersonnelAdministratif.objects.filter(email=email).exists() or
        CompteLaborantin.objects.filter(email=email).exists() or
        CompteRadiologue.objects.filter(email=email).exists()
    )
    return JsonResponse({'exists': email_exists})

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (
    CompteMedecin,
    CompteInfirmier,
    CompteAdministrateur,
    ComptePersonnelAdministratif,
    CompteLaborantin,
    CompteRadiologue,
)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete(request, email):
    if not email:
        return JsonResponse({'error': 'Email is required'}, status=400)
    
    deleted = False
    # Loop over each model and try to delete the member
    for model in [
        CompteMedecin,
        CompteInfirmier,
        CompteAdministrateur,
        ComptePersonnelAdministratif,
        CompteLaborantin,
        CompteRadiologue,
    ]:
        # Attempt to delete member from model
        deleted_count, _ = model.objects.filter(email=email).delete()
        if deleted_count > 0:
            deleted = True

    if deleted:
        return JsonResponse({'message': f'Member with email {email} deleted successfully'})
    else:
        return JsonResponse({'error': 'No member found with the provided email'}, status=404)
    
from django.middleware.csrf import get_token
from django.http import JsonResponse

def provide_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_protect
def get_all_staff(request):
    # Retrieve the hospital name from the request parameters
    hospital_name = request.GET.get('hospitalName','')
    
    if hospital_name:
        try:
            # Get the hospital instance
            hospital = Hopital.objects.get(nom=hospital_name)
            
            # Retrieve all staff categories related to the hospital
            medecins = CompteMedecin.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'specialite')
            infirmiers = CompteInfirmier.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'specialiteInf')
            radiologues = CompteRadiologue.objects.filter(idHopital_id=hospital).values('nomComplet', 'email')
            laborantins = CompteLaborantin.objects.filter(idHopital_id=hospital).values('nomComplet', 'email')
            personnel_admin = ComptePersonnelAdministratif.objects.filter(idHopital_id=hospital).values('nomComplet', 'email', 'service')
            
            # Combine all the staff data into one response
            all_staff ={
                'medecins': list(medecins.values()),
                'infirmiers': list(infirmiers.values()),
                'radiologues': list(radiologues.values()),
                'laborantins': list(laborantins.values()),
                'personnel_admin': list(personnel_admin.values()),
            }

            return JsonResponse(all_staff)
        
        except Hopital.DoesNotExist:
            return JsonResponse({'error': 'Hospital not found'}, status=404)
    else:
        return JsonResponse({'error': 'No hospital name provided'}, status=400)

from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import AdminSignUpForm, AdminLoginForm

# Admin Sign Up View
def admin_signup(request):
    if request.method == 'POST':
        form = AdminSignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_staff = True  # Mark as a staff member
            user.is_superuser = True  # Mark as a superuser (optional)
            user.save()

            login(request, user)  # Log the user in immediately after sign up
            messages.success(request, "Account created successfully!")  # Success message
            return redirect('admin_dashboard')  # Redirect to admin dashboard
    else:
        form = AdminSignUpForm()

    return render(request, 'admin_signup.html', {'form': form})

# Admin Login View
def admin_login(request):
    if request.method == 'POST':
        form = AdminLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('admin_dashboard')  # Redirect to admin dashboard
            else:
                form.add_error(None, "Invalid credentials")
    else: 
        form = AdminLoginForm()
    return render(request, 'admin_login.html', {'form': form})

# Admin Dashboard View
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')  # Template for the admin dashboard

    
# Create your views here
def homePage(request):
    return render(request, 'home.html')


def registerPage(request):
    return render(request, 'register.html')

def loginPage(request):
    return render(request, 'login.html')

def essaye(request):
    return HttpResponse( "it's work ")

# views.py

"""
@csrf_exempt
def add_employee_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Charger les données JSON envoyées dans la requête
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            profession = data.get('profession')
            hospital_name = data.get('hospital')
            password = data.get('password')

            # Vérification des champs obligatoires
            if not all([first_name, last_name, email, profession, hospital_name, password]):
                return JsonResponse({'error': 'Tous les champs sont requis.'}, status=400)

            # Récupérer l'hôpital
            try:
                hospital = Hopital.objects.get(nom=hospital_name)
            except Hopital.DoesNotExist:
                return JsonResponse({'error': 'Hôpital introuvable.'}, status=404)

            # Créer l'utilisateur Django
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            # Créer le compte en fonction de la profession
            if profession == 'medecin':
                CompteMedecin.objects.create(
                    user=user,
                    nom=last_name,
                    prenom=first_name,
                    email=email,
                    idHopital=hospital
                )
            elif profession == 'infirmier':
                CompteInfirmier.objects.create(
                    user=user,
                    nom=last_name,
                    prenom=first_name,
                    email=email,
                    idHopital=hospital
                )
            elif profession == 'pharmacien':
                ComptePharmacien.objects.create(
                    user=user,
                    nom=last_name,
                    prenom=first_name,
                    email=email,
                    idHopital=hospital
                )
            else:
                return JsonResponse({'error': 'Profession non valide.'}, status=400)

            return JsonResponse({'success': 'Employé ajouté avec succès.'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Format JSON invalide.'}, status=400)

    return JsonResponse({'error': 'Méthode non autorisée.'}, status=405)
"""


# views.py la partie de add emplyee -------------------------------------------------------------------


def traiter_insertion_employe(email, nom, prenom, motDePasse, profession, hopital):
    """
    Insère un employé dans la table appropriée selon la profession et la spécialité.
    """
    # Vérifier la validité de l'email
    try:
        validate_email(email)  # Vérifie si l'email est valide
    except ValidationError:
        raise ValueError("L'email n'est pas valide.")
    
    # Vérifier si l'email existe déjà
    if User.objects.filter(email=email).exists():
        raise ValueError(f"L'email {email} est déjà utilisé.")

    # Vérification de la longueur du mot de passe
    if len(motDePasse) < 8:
        raise ValueError("Le mot de passe doit comporter au moins 8 caractères.")

    # Vérifiez si l'hôpital existe
    try:
        hopital_instance = Hopital.objects.get(nom=hopital)
    except Hopital.DoesNotExist:
        raise ValueError(f"L'hôpital {hopital} n'existe pas.")

    # Traitement pour les médecins
    if profession.startswith('Médecin-'):
        specialite = profession.replace('Médecin-', '')
        if specialite in dict(CompteMedecin.SPEC_CHOIX):
            CompteMedecin.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                specialite=specialite,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"La spécialité {specialite} n'est pas valide pour un médecin.")

    # Traitement pour les infirmiers
    elif profession.startswith('Infirmier-'):
        specialite = profession.replace('Infirmier-', '')
        if specialite in dict(CompteInfirmier.SPEC_CHOIX):
            CompteInfirmier.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                specialite=specialite,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"La spécialité {specialite} n'est pas valide pour un infirmier.")

    # Traitement pour le personnel administratif
    elif profession.startswith('Administratif-'):
        service = profession.replace('Administratif-', '')
        if service in dict(ComptePersonnelAdministratif.SERVICE_CHOIX):
            ComptePersonnelAdministratif.objects.create(
                email=email,
                nom=nom,
                prenom=prenom,
                motDePasse=motDePasse,
                service=service,
                idHopital=hopital_instance
            )
        else:
            raise ValueError(f"Le service {service} n'est pas valide pour un personnel administratif.")

    # Autres professions : Radiologue, Laborantin, Pharmacien
    elif profession == 'Radiologue':
        CompteRadiologue.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    elif profession == 'Laborantin':
        CompteLaborantin.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    elif profession == 'Pharmacien':
        ComptePharmacien.objects.create(
            email=email,
            nom=nom,
            prenom=prenom,
            motDePasse=motDePasse,
            idHopital=hopital_instance
        )
    else:
        raise ValueError(f"La profession {profession} n'est pas valide.")

    print(f"L'employé {nom} {prenom} a été ajouté avec succès dans la table correspondant à la profession {profession}.")

class EmployeeCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Sérialisation et validation des données
        serializer = EmployeeSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                # Appel de la fonction d'insertion
                traiter_insertion_employe(
                    email=serializer.validated_data['email'],
                    nom=serializer.validated_data['nom'],
                    prenom=serializer.validated_data['prenom'],
                    motDePasse=serializer.validated_data['motDePasse'],
                    profession=serializer.validated_data['profession'],
                    hopital=serializer.validated_data['hopital']
                )
                return Response({"message": "Employé ajouté avec succès!"}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# la vue pour ajouter un hopital a la bdd ----------------------------------------------------------------------
class AjouterHopitalView(generics.CreateAPIView):
    queryset = Hopital.objects.all()
    serializer_class = HopitalSerializer

    def create(self, request, *args, **kwargs):
        # Utilisation du serializer pour valider et enregistrer l'hôpital
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Sauvegarde l'hôpital dans la base de données
            return Response({"message": "Hôpital ajouté avec succès!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# la vue pour afficher la liste des employee--------------------------------------------------------------------
class ListeEmployesView(APIView):
    def get(self, request, *args, **kwargs):
        # Récupérer tous les employés
        medecins = CompteMedecin.objects.all()
        infirmiers = CompteInfirmier.objects.all()
        administratifs = ComptePersonnelAdministratif.objects.all()
        radiologues = CompteRadiologue.objects.all()
        laborantins = CompteLaborantin.objects.all()
        pharmaciens = ComptePharmacien.objects.all()

        # Sérialiser les employés
        medecins_serializer = CompteMedecinSerializer(medecins, many=True)
        infirmiers_serializer = CompteInfirmierSerializer(infirmiers, many=True)
        administratifs_serializer = ComptePersonnelAdministratifSerializer(administratifs, many=True)
        radiologues_serializer = CompteRadiologueSerializer(radiologues, many=True)
        laborantins_serializer = CompteLaborantinSerializer(laborantins, many=True)
        pharmaciens_serializer = ComptePharmacienSerializer(pharmaciens, many=True)

        data = {
            'medecins': medecins_serializer.data,
            'infirmiers': infirmiers_serializer.data,
            'administratifs': administratifs_serializer.data,
            'radiologues': radiologues_serializer.data,
            'laborantins': laborantins_serializer.data,
            'pharmaciens': pharmaciens_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)

#--------------------------------------------------------------------------------------------
# la vue qui concerne la creation du compte patient+ du docier dpi 

# la vue qui concerne la creation du compte patient+ du docier dpi 
class CreatePatientAccountAndDossierAPIView(APIView):
    def post(self, request):
        # Extraire les données du formulaire JSON
        data = request.data

        try:
            # Vérifier si le médecin traitant existe
            medecin_traitant = CompteMedecin.objects.get(email=data.get('doctor_traitant'))
        except CompteMedecin.DoesNotExist:
            return Response({"error": "Médecin traitant non trouvé."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Créer l'utilisateur associé
            user = User.objects.create_user(
                username=data.get('email'),
                email=data.get('email'),
                password=data.get('mot_de_passe')
            )

            # Créer le dossier patient (DPI)
            dpi_data = {
                "numeroSecuriteSociale": data.get("num_securite_sociale"),
                "dateDeNaissance": data.get("date_de_naissance"),
                "adresse": data.get("adresse"),
                "telephone": data.get("num_telephone"),
                "mutuelle": data.get("mutuelle"),
                "idMedecinTraitant": medecin_traitant.email,
                "personneAcontacter": data.get("personne_a_contacter")
            }
            dpi_serializer = DPISerializer(data=dpi_data)

            if dpi_serializer.is_valid():
                dpi = dpi_serializer.save()

                # Créer le compte patient
                patient_data = {
                    "user": user.id,
                    "email": data.get("email"),
                    "nomComplet":data.get("nomComplet"),
                    "motDePasse": data.get("mot_de_passe"),
                    "dossierPatient": dpi.numeroSecuriteSociale
                }
                patient_serializer = ComptePatientSerializer(data=patient_data)

                if patient_serializer.is_valid():
                    patient_serializer.save()
                    return Response({"message": "Compte patient et dossier créés avec succès."}, status=status.HTTP_201_CREATED)
                else:
                    # Si le compte patient n'est pas valide, supprimer le DPI et l'utilisateur
                    dpi.delete()
                    user.delete()
                    return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Si le DPI n'est pas valide, supprimer l'utilisateur
                user.delete()
                return Response(dpi_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#------------------------------------------------------------------------------------------------------------
#la recherche d unpatient par NSS
class RecherchePatientView(APIView):
    def post(self, request):
        # Récupérer le numéro de sécurité sociale depuis le corps de la requête
        numero_securite_sociale = request.data.get('numero_securite_sociale')
        
        if not numero_securite_sociale:
            return Response({"error": "Le numéro de sécurité sociale est requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Recherche du dossier patient par numéro de sécurité sociale
            dpi = DPI.objects.get(numeroSecuriteSociale=numero_securite_sociale)
            
            # Recherche du compte patient associé
            compte_patient = ComptePatient.objects.get(dossierPatient=dpi)
            
            # Sérialisation des données
            patient_serializer = ComptePatientSerializer(compte_patient)
            dpi_serializer = DPISerializer(dpi)
            
            # Retour des données combinées
            return Response({
                "patient": patient_serializer.data,
                "dossier_patient": dpi_serializer.data
            }, status=status.HTTP_200_OK)
        
        except DPI.DoesNotExist:
            return Response({"error": "Dossier patient introuvable."}, status=status.HTTP_404_NOT_FOUND)
        except ComptePatient.DoesNotExist:
            return Response({"error": "Compte patient introuvable."}, status=status.HTTP_404_NOT_FOUND)
#---------------------------------------------------------------------------------------
#la fonctionalite de recherche d un patient par QR code 
import qrcode
import qrcode.image.svg
from io import BytesIO
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from DPI.models import DPI
from django.views import View
class GenerateQRCodeView(View):
    def get(self, request, numero_securite_sociale):
        # Récupération du DPI correspondant
        dpi = get_object_or_404(DPI, numeroSecuriteSociale=numero_securite_sociale)
        
        # Génération du contenu pour le QR code
        qr_content = f"Dossier Patient: {dpi.numeroSecuriteSociale}, Nom: {dpi.personneAcontacter}, Téléphone: {dpi.telephone}"

        # Génération du QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_content)
        qr.make(fit=True)

        # Génération de l'image
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)

        # Retourne l'image en réponse HTTP
        return HttpResponse(buffer, content_type="image/png")
    
#-------------------------------------------------------------------------------------------------------------
#la vue pour recuperer le nom du medecin a partir du NSS patient 
class MedecinTraitantAPIView(APIView):
    def get(self, request, nss):
        try:
            # Rechercher le DPI correspondant au NSS
            dpi = DPI.objects.get(numeroSecuriteSociale=nss)
            
            # Récupérer l'email du médecin traitant associé
            medecin_traitant_email = dpi.idMedecinTraitant
            
            # Vérifier si un email de médecin est fourni
            if medecin_traitant_email:
                try:
                    # Rechercher le médecin avec l'email dans le modèle Medecin
                    medecin_traitant = CompteMedecin.objects.get(email=medecin_traitant_email)
                    
                    # Préparer les données du médecin traitant
                    data = {
                        "nomComplet":medecin_traitant.nomComplet,
                        "email": medecin_traitant.email,
                        "specialite": medecin_traitant.specialite,
                    }
                    return Response(data, status=status.HTTP_200_OK)
                except CompteMedecin.DoesNotExist:
                    # Si le médecin n'existe pas dans la base de données
                    return Response({"detail": "Médecin traitant introuvable."}, status=status.HTTP_404_NOT_FOUND)
            
            else:
                return Response({"detail": "Aucun médecin traitant associé."}, status=status.HTTP_404_NOT_FOUND)
        
        except DPI.DoesNotExist:
            # Si le DPI pour le NSS n'existe pas
            return Response({"detail": "Dossier patient introuvable pour ce NSS."}, status=status.HTTP_404_NOT_FOUND)
#-----------------------------------------------------------------------------------------------
# la creation du sejour  // remarque l equipe de frontend est responsable  de envoyer le nss et id doctor dans le passage se la page de recherche patient -recherche dpi  et la creation du sejour 
class CreerSejourView(APIView):
    def post(self, request, *args, **kwargs):
        # Récupérer le NSS du patient depuis les paramètres ou le contexte
        nss_patient = request.data.get('nss_patient')  # Par exemple, passé en paramètre
        if not nss_patient:
            return Response({"error": "NSS du patient requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Récupérer le DPI (Patient)
            patient = DPI.objects.get(numeroSecuriteSociale=nss_patient)
        except DPI.DoesNotExist:
            return Response({"error": "Patient introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        # Récupérer le médecin (par exemple, via son ID ou son email fourni dans les données)
        id_medecin = request.data.get('id_medecin')
        if not id_medecin:
            return Response({"error": "ID du médecin requis"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            medecin = CompteMedecin.objects.get(pk=id_medecin)
        except CompteMedecin.DoesNotExist:
            return Response({"error": "Médecin introuvable"}, status=status.HTTP_404_NOT_FOUND)
        
        # Création du séjour
        data = {
            "idDossierPatient": patient.numeroSecuriteSociale,
            "idCompteMedecin": medecin.pk,
            "dateDebutSejour": request.data.get('dateDebutSejour'),
            "dateFinSejour": request.data.get('dateFinSejour'),
            "motifAdmission": request.data.get('motifAdmission', "Non spécifié"),
        }
        serializer = SejourSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#--------------------------------------------------------------------------------------------------------
#supression du sejour par la reception du id sejour du front end 
from rest_framework.decorators import action

class SejourViewSet(viewsets.ModelViewSet):
    queryset = Sejour.objects.all()
    serializer_class = SejourSerializer

    # Action pour supprimer un séjour
    @action(detail=True, methods=['delete'])
    def supprimer_sejour(self, request, pk=None):
        try:
            sejour = Sejour.objects.get(pk=pk)
            sejour.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Sejour.DoesNotExist:
            return Response({'detail': 'Séjour non trouvé'}, status=status.HTTP_404_NOT_FOUND)

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        profile_url = None
        try:
            # Search for the user in the relevant tables
            if CompteMedecin.objects.filter(email=email).exists():
                user = CompteMedecin.objects.get(email=email)
            elif CompteInfirmier.objects.filter(email=email).exists():
                user = CompteInfirmier.objects.get(email=email)
            elif ComptePersonnelAdministratif.objects.filter(email=email).exists():
                user = ComptePersonnelAdministratif.objects.get(email=email)
            elif CompteRadiologue.objects.filter(email=email).exists():
                user = CompteRadiologue.objects.get(email=email)
            elif CompteLaborantin.objects.filter(email=email).exists():
                user = CompteLaborantin.objects.get(email=email)
            elif ComptePharmacien.objects.filter(email=email).exists():
                user = ComptePharmacien.objects.get(email=email)
            elif ComptePatient.objects.filter(email=email).exists():
                user = ComptePatient.objects.get(email=email)

            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

           # Debugging: Log the retrieved user
            print(f"User found: {user}")
            print(f"password is found: {user.motDePasse}")

           

            # Hash the input password and compare it to the stored hash manually
            hashedPass= make_password(user.motDePasse) 

            # Check the password manually (using 'motDePasse' instead of 'password')
            if not check_password(password, hashedPass):  # Use 'motDePasse' here
                # Debugging: Log the password mismatch
                print(f"Password mismatch for user: {email}")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            # Determine the role based on the model
            role = "unknown"
            if isinstance(user, CompteMedecin):
                role = 'doctor'
            elif isinstance(user, CompteInfirmier):
                role = 'nurse'
            elif isinstance(user, ComptePersonnelAdministratif):
                role = 'admin'
            elif isinstance(user, CompteRadiologue):
                role = 'radiologist'
            elif isinstance(user, CompteLaborantin):
                role = 'lab technician'
            elif isinstance(user, ComptePharmacien):
                role = 'pharmacist'
            elif isinstance(user, ComptePatient):
                role = 'patient'
                profile_url = self.get_patient_profile_url(user)
                

            # Generate access token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                "message": "Login successful",
                "role": role,
                "access_token": access_token,
                "profile_url": profile_url 
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def get_patient_profile_url(self, user):
        # Generate the URL for the patient profile, for example:
        return f"/profile/{user.email}/"
  
"""""
logic : 
1- front send post request to front after clicking on login 
2- back send response containing the url to be redirected to 
3- front send get request to redirect to the page 
4- back send response ( the page)

"""

from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email, *args, **kwargs):
        try:
            # Retrieve the logged-in user (patient)
           
            patient = ComptePatient.objects.get(email=email)
            # Fetch all sejours (hospitalizations) for the patient
            sejours = Sejour.objects.filter(idDossierPatient=patient.dossierPatient.numeroSecuriteSociale)

            # Prepare patient profile data
            general_info = {
                "date-of-birth": patient.dossierPatient.dateDeNaissance,
                "status": "not active",
                "mutuelle":patient.dossierPatient.mutuelle,
                #"sex": patient.sex,
                "address": patient.dossierPatient.adresse,
                "Social-Security-Number": patient.dossierPatient.numeroSecuriteSociale,  
                "sejours": [],
                "phone_number": patient.dossierPatient.telephone,
                "contact_person": patient.dossierPatient.personneAcontacter
            }

            # Add details about each sejour (stay)
            for sejour in sejours:
                sejour_info = {
                    "id": sejour.id,
                    "start_date": sejour.dateDebutSejour,
                    "end_date": sejour.dateFinSejour,
                    "motifAdmission": sejour.motifAdmission,
                }

                if sejour.dateDebutSejour <= datetime.now().date() <= sejour.dateFinSejour:
                    general_info["status"] = "active"  

                general_info["sejours"].append(sejour_info)

                if request.GET.get('generate_certificate') == 'true':  # If the button is clicked
               
                  return self.generate_certificate(patient, sejours)
            return Response(general_info, status=status.HTTP_200_OK)

        except ComptePatient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def generate_certificate(self, patient, sejours):
        # Generate the PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="certificate.pdf"'

        p = canvas.Canvas(response, pagesize=letter)

        p.drawString(100, 750, f"Certificate of Hospitalization for {patient.nom} {patient.prenom}")
        p.drawString(100, 730, f"Date of Birth: {patient.dossierPatient.dateDeNaissance}")
        p.drawString(100, 710, f"Mutuelle: {patient.dossierPatient.mutuelle}")

        # Assuming the first sejour is the most recent
        sejour = sejours.first()
        p.drawString(100, 690, f"Hospitalization Start Date: {sejour.dateDebutSejour}")
        p.drawString(100, 670, f"Hospitalization End Date: {sejour.dateFinSejour}")
        p.drawString(100, 650, f"Hospitalization Reason: {sejour.motifAdmission}")

        p.showPage()
        p.save()

        return response

# chaque sejour 3ndou : 
# - un seul diagnostic 
# - une seule ordonnace ( modifiable )
# - des examens 
class SejourDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, idSejour, *args, **kwargs):
        try:
            # Retrieve the sejour using the idSejour
            
            diagnostic = Diagnostic.objects.get(idSejour=idSejour)
            
            # Fetch all consultations for the sejour
            consultations = ConsultationMedicale.objects.filter(idSejour=idSejour)
            diagnostic_data = {
                "id": diagnostic.id,
                "description": diagnostic.descriptionMaladie,  # Replace with actual fields of Diagnostic
                # Add other fields from the Diagnostic model here
            }

            # Prepare consultation data
            consultation_data = []
            for consultation in consultations:
                consultation_data.append({
                    "id"  :consultation.id,
                    "date": consultation.dateConsultation,
                    "outilsConsulation" : consultation.OutilsConsultation,
                   
                })

            return Response({
                "sejour_id": idSejour,
                "diagnostic_data":diagnostic_data,
                "consultations": consultation_data
            }, status=status.HTTP_200_OK)

        except Sejour.DoesNotExist:
            return Response({"error": "Sejour not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ConsultationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour , consultation_id, *args, **kwargs):
        try:

            consultation = ConsultationMedicale.objects.get(id=consultation_id)
            # Prepare the response with consultation details
            consultation_data = {
                "id": consultation.id, 
                "date": consultation.dateConsultation,
                "outil": consultation.outilsConsultation,
                "resume":consultation.resume,
                "Premiere":consultation.premiere,
            }

            return Response(consultation_data, status=status.HTTP_200_OK)

        except ConsultationMedicale.DoesNotExist:
            return Response({"error": "Consultation not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MedicamentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, *args, **kwargs):
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



class LabsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, *args, **kwargs):
        try:
            print("id du sejour : ", idSejour)
            # Fetch the Sejour for the patient using idSejour
            sejour = Sejour.objects.get(id=idSejour)
            print("id du dossier " , sejour.idDossierPatient)
            dpi = DPI.objects.filter(numeroSecuriteSociale='11111').first()
            if not dpi:
              print("DPI not found!")
            else:
              print("DPI found:", dpi)       
            patient = ComptePatient.objects.get(dossierPatient = dpi.numeroSecuriteSociale)


            # You can use any logic here to get the different types of labs
            # Here I'm returning a simple list of lab types
            lab_types = [
                {"id": 1, "name": "vitalSigns", "url": "/profile/{}/{}/labs/VitalSigns/".format(patient.email, idSejour)},
                {"id": 2, "name": "BloodCountTest", "url": "/profile/{}/{}/labs/BloodCountTest/".format(patient.email, idSejour)},
                {"id": 3, "name": "Radio", "url": "/profile/{}/{}/labs/Radio/".format(patient.email, idSejour)}
            ]

            return Response({"lab_types": lab_types}, status=status.HTTP_200_OK)

        except Sejour.DoesNotExist:
            return Response({"error": "Sejour not found"}, status=status.HTTP_404_NOT_FOUND)
        except DPI.DoesNotExist:
            return Response({"error": "DPI not found for this patient"}, status=status.HTTP_404_NOT_FOUND)
        except ComptePatient.DoesNotExist:
            return Response({"error": "ComptePatient not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class LabDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, lab_type, *args, **kwargs):
        try:
            # Retrieve the sejour (hospitalization) for the patient
            sejour = Sejour.objects.get(id=idSejour)

            # Retrieve the lab details based on the lab type
            if lab_type == "VitalSigns":
                soins = Soin.objects.filter(idSejour=idSejour) 
                soins_list = [
                    {
                        "id": soin.id,
                        "name": soin.typeSoin, 
                        "resume": soin.resumeSoin,
                        "infermier": soin.idInfirmier.nom,
                    }
                    for soin in soins
                ]
                lab_details = {
                    "id": 1,
                    "details": soins_list
                }

            elif lab_type == "BloodCountTest":
                # Fetch the biological test and its analyses
                bilan = BilanBiologique.objects.filter(idSejour=idSejour).last()
                if bilan:
                    analyses = LigneAnalyse.objects.filter(idBilanBiologique=bilan.id)
                    analyses_list = [
                        {
                            "id": analysis.id,
                            "type": analysis.type,
                            "result": analysis.resultat,
                            "unit": analysis.unite
                        }
                        for analysis in analyses
                    ]
                    
                    signevitals = LigneSigneVital.objects.filter(idBilanBiologique=bilan.id)
                    signevitals_list = [
                        {
                            "id": signevitals.id,
                            "type": signevitals.type,
                            "result": signevitals.resultat,
                            "unit": signevitals.unite
                        }
                        for signevitals in signevitals
                    ]

                    lab_details = {
                        "id": 2,
                        "name": "Blood Count Lab",
                        "dateExam": bilan.dateExamen,
                        "globalResult": bilan.resultatGlobal,
                        "test 1": analyses_list,
                        "test 2": signevitals_list
                    }

                    

                else:
                    return Response({"error": "Bilan Biologique not found"}, status=status.HTTP_404_NOT_FOUND)
                
            elif lab_type == "Radio":
                
                bilanbiologiques = BilanRadiologique.objects.filter(idSejour=idSejour) 
                radio_list = [
                    {
                        "id": bilanbiologiques.id,
                        "name": bilanbiologiques.dateExamen, 
                        "resume": bilanbiologiques.type,
                        "infermier": bilanbiologiques.rapport,
                    }
                    for bilanbiologiques in bilanbiologiques
                ]
                lab_details = {
                    "id": 3,
                    "name": "Radio Lab",
                    "details": radio_list 
                }
            else:
                return Response({"error": "Lab type not found"}, status=status.HTTP_404_NOT_FOUND)

            return Response(lab_details, status=status.HTTP_200_OK)

        except Sejour.DoesNotExist:
            return Response({"error": "Sejour not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class PosologieBySejourView(APIView):
    def get(self, request, id_sejour, format=None):
        posologies = Posologie.objects.filter(idSejour=id_sejour)
        serializer = PosologieSerializer(posologies, many=True)
        return Response(serializer.data)
    

# views.py

from django.http import JsonResponse
from openpyxl import Workbook
import os
from django.views.decorators.csrf import csrf_exempt

# Create a directory for storing the Excel file if it doesn't exist
excel_file_path = 'contact_data.xlsx'
if not os.path.exists(excel_file_path):
    wb = Workbook()
    ws = wb.active
    ws.append(["Email", "Object", "Message"])  # Header row
    wb.save(excel_file_path)

@csrf_exempt
def save_contact_form(request):
    if request.method == "POST":
        email = request.POST.get("email")
        object_ = request.POST.get("object")
        message = request.POST.get("message")

        # Open the Excel file and append the new data
        wb = Workbook()
        ws = wb.active
        ws.append([email, object_, message])  # Add data as a new row
        wb.save(excel_file_path)

        return JsonResponse({"message": "Data saved successfully"}, status=200)
    else:
        return JsonResponse({"message": "Invalid request"}, status=400)

