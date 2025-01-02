
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

class CompteRadiologueViewSet(viewsets.ModelViewSet):
    queryset = CompteRadiologue.objects.all()
    serializer_class = CompteRadiologueSerializer

class ComptePharmacienViewSet(viewsets.ModelViewSet):
    queryset = ComptePharmacien.objects.all()
    serializer_class = ComptePharmacienSerializer

class CompteLaborantinViewSet(viewsets.ModelViewSet):
    queryset = CompteLaborantin.objects.all()
    serializer_class = CompteLaborantinSerializer

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
                "idMedecinTraitant": medecin_traitant.id,
                "personneAcontacter": data.get("personne_a_contacter")
            }
            dpi_serializer = DPISerializer(data=dpi_data)

            if dpi_serializer.is_valid():
                dpi = dpi_serializer.save()

                # Créer le compte patient
                patient_data = {
                    "user": user.id,
                    "email": data.get("email"),
                    "nom": data.get("nom"),
                    "prenom": data.get("prenom"),
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
            
            # Récupérer le médecin traitant associé
            medecin_traitant = dpi.idMedecinTraitant
            
            # Vérifier si le médecin existe
            if medecin_traitant:
                data = {
                    "nom": medecin_traitant.nom,
                    "prenom": medecin_traitant.prenom,
                    "email": medecin_traitant.email,
                    "specialite": medecin_traitant.specialite,
                }
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Aucun médecin traitant associé."}, status=status.HTTP_404_NOT_FOUND)
        
        except DPI.DoesNotExist:
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
            
#---------------------------------------------------------------------------------------------------------------
# ajouter un soins 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Soin, Sejour, CompteInfirmier
from .serializers import SoinSerializer
from django.shortcuts import get_object_or_404

class AjouterSoinView(APIView):
    def post(self, request, idsejour, *args, **kwargs):
        # Récupérer l'infirmier par son nom
        nom_infirmier = request.data.get('nom_infirmier')
        type_soin = request.data.get('type_soin')
        resume_soin = request.data.get('resume_soin')

        # Récupérer l'infirmier par son nom
        infirmier = get_object_or_404(CompteInfirmier, nom=nom_infirmier)

        # Récupérer le séjour par son ID
        sejour = get_object_or_404(Sejour, id=idsejour)

        # Créer le soin et l'ajouter à la base de données
        soin = Soin.objects.create(
            idSejour=sejour,
            idInfirmier=infirmier,
            typeSoin=type_soin,
            resumeSoins=resume_soin
        )

        # Récupérer la liste des soins mise à jour
        soins = Soin.objects.filter(idSejour=sejour)
        soins_liste = []
        for soin in soins:
            soins_liste.append({
                'nom_infirmier': soin.idInfirmier.nom,
                'type_soin': soin.typeSoin,
                'resume_soin': soin.resumeSoin, 
            })

        # Retourner la réponse JSON avec la liste des soins
        return Response({'soins': soins_liste}, status=status.HTTP_201_CREATED)
#-----------------------------------------------------------------------------------------------
#---------------------------------------------------------------------
# Afficher liste des soins ( recuperer id-sejour par le frontend)


class ListeSoinsView(APIView):
    def get(self, request, idsejour, *args, **kwargs):
        # Récupérer le séjour par son ID
        sejour = get_object_or_404(Sejour, id=idsejour)

        # Récupérer les soins associés au séjour
        soins = Soin.objects.filter(idSejour=sejour)

        # Préparer la liste des soins à retourner
        soins_liste = []
        for soin in soins:
            soins_liste.append({
                'type_soin': soin.typeSoin,
                'resume_soin': soin.resumeSoin,
                'nom_infirmier': soin.idInfirmier.nom,
            })

        # Retourner la réponse JSON avec la liste des soins
        return Response({'soins': soins_liste})
#---------------------------------------------------------------------------------------------
# Recherche soins par nss 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DPI, Soin, Sejour, CompteInfirmier
from django.shortcuts import get_object_or_404

class RechercheSoinsParNSSView(APIView):
    def get(self, request, nss, *args, **kwargs):
        # Récupérer le patient par son NSS (Numéro de Sécurité Sociale)
        dpi = get_object_or_404(DPI, numeroSecuriteSociale=nss)

        # Récupérer les séjours associés à ce patient
        sejours = Sejour.objects.filter(idDossierPatient=dpi)

        # Récupérer les soins associés aux séjours du patient
        soins = Soin.objects.filter(idSejour__in=sejours)

        # Préparer les données du patient à afficher
        patient_data = {
            'nss': dpi.numeroSecuriteSociale,
            'nom': dpi.nom,
            'prenom': dpi.prenom,
            'date_naissance': dpi.dateNaissance,
            # Ajoute ici d'autres informations importantes du patient
        }

        # Préparer la liste des soins associés à ce patient
        soins_liste = []
        for soin in soins:
            soins_liste.append({
                'nom_infirmier': soin.idInfirmier.nom,
                'type_soin': soin.typeSoin,
                'resume_soin': soin.resumeSoin,
            })

        # Retourner la réponse JSON avec les informations du patient et la liste des soins
        return Response({
            'patient': patient_data,
            'soins': soins_liste
        })
#-----------------------------------------------------------------------------------------------------
# Supprimer soisn et mis a jour la liste des soins 

class SupprimerSoinView(APIView):
    def delete(self, request, soin_id, *args, **kwargs):
        # Récupérer le soin par son ID
        soin = get_object_or_404(Soin, id=soin_id)

        # Récupérer le séjour associé au soin
        sejour = soin.idSejour

        # Supprimer le soin
        soin.delete()

        # Récupérer les soins mis à jour pour ce séjour
        soins_mis_a_jour = Soin.objects.filter(idSejour=sejour)

        # Préparer la nouvelle liste des soins
        soins_liste = []
        for soin in soins_mis_a_jour:
            soins_liste.append({
                'nom_infirmier': soin.idInfirmier.nom,
                'type_soin': soin.typeSoin,
                'resume_soin': soin.resumeSoin,
            })

        # Retourner la réponse JSON avec la nouvelle liste des soins
        return Response({'message': 'Soin supprimé avec succès', 'soins': soins_liste}, status=status.HTTP_204_NO_CONTENT)