import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

# Create your models here.

class Hopital(models.Model):
    nom = models.CharField(primary_key=True, max_length=50)

class ComptePersonne(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, default=None)
    email = models.CharField(max_length=50, unique=True, default=None)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    motDePasse = models.CharField(max_length=255)
    class Meta:
        abstract = True

class CompteAdministrateur(ComptePersonne):
    pass

class CompteEmployeeHopital(ComptePersonne):
    idHopital = models.ForeignKey(Hopital, on_delete=models.CASCADE, default=None)
    class Meta:
        abstract = True

class CompteMedecin(CompteEmployeeHopital):
    SPEC_CHOIX = [
        ('Chirurgien','Chirurgien'),
        ('Généraliste', 'Généraliste'),
        ('Pédiatre', 'Pédiatre'),
        ('Endocrinologie','Endocrinologue'),
        ('Cardiologue', 'Cardiologue'),
        ('Dermatologe', 'Dermatologue'),
        ('Neurologe','Neurologue'),
        ('Obstétricien','Obstétricien'),
        ('Ostéologue','Ostéologue'),
        ('Ophtalmologue','Ophtalmologue'),
        ('ORL','ORL'),
        ('Gastro-entérologue','Gastro-entérologue'),
        ('Néphrologue','Néphrologue'),
        ('Anesthésiste',"Anesthésiste"),
    ]
    specialite = models.CharField(default="Généraliste", max_length=30, choices=SPEC_CHOIX)

class CompteInfirmier(CompteEmployeeHopital):
    SPEC_CHOIX = [
        ('De bloc opératoire', 'De bloc opératoire'),
        ('Anesthésiste', 'Anesthésiste'),
        ('Puériculteur', 'Puériculteur'),
        ('En Pratique Avancée','En Pratique Avancée'),
        ('Hygiéniste','Hygiéniste'),
        ('Coordinateur','Coordinateur'),
    ]
    specialite = models.CharField(max_length=30, choices=SPEC_CHOIX)

class ComptePersonnelAdministratif(CompteEmployeeHopital):
    SERVICE_CHOIX = [
        ('Urgences', 'Urgences'),
        ('Réanimation', 'Réanimation'),
        ('Pédiatrie', 'Pédiatrie'),
        ('Cardiologie', 'Cardiologie'),
        ('Endocrinologie','Endocrinologie'),
        ('Dermatologie', 'Dermatologie'),
        ('Neurologie','Neurologie'),
        ('Obstétrique','Obstétrique'),
        ('Ostéologie','Ostéologie'),
        ('Ophtalmologie','Ophtalmologie'),
        ('ORL','ORL'),
        ('Gastro-entérologie','Gastro-entérologie'),
        ('Néphrologie','Néphrologie'),
        ('Orthopédie','Orthopédie'),
        ('Anesthésiologie','Anesthésiologie'),
    ]
    service = models.CharField(default="Urgences", max_length = 30, choices=SERVICE_CHOIX)

class CompteRadiologue(CompteEmployeeHopital):
    pass

class CompteLaborantin(CompteEmployeeHopital):
    pass

class DPI(models.Model):
    numeroSecuriteSociale = models.CharField(primary_key=True, max_length=13)
    dateDeNaissance = models.DateField(default=datetime.date.today)
    adresse = models.TextField(default='Alger')
    telephone = models.DecimalField(max_digits = 10, decimal_places = 0)
    mutuelle = models.CharField(max_length = 30)
    idMedecinTraitant = models.ForeignKey(CompteMedecin, on_delete=models.DO_NOTHING)
    personneAcontacter = models.CharField(max_length = 50, default=None)
    
class ComptePatient(ComptePersonne):
    dossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE)

class Sejour(models.Model):
    idDossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE)
    idCompteMedecin = models.ForeignKey(CompteMedecin, on_delete=models.DO_NOTHING)
    dateDebutSejour = models.DateField(default=datetime.date.today)
    dateFinSejour = models.DateField(default=datetime.date.today)
    motifAdmission = models.TextField(default="Maladie")

class Diagnostic(models.Model):
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    descriptionMaladie = models.TextField(default='')

class Ordonnance(models.Model):
    idDiagnostic = models.ForeignKey(Diagnostic, on_delete=models.DO_NOTHING)
    dateOrdonnance = models.DateField(default=datetime.date.today)

class Soin(models.Model):
    SOIN_CHOIX = [
        ('Soin d\'hygiène et de confort', 'Soin d\'hygiène et de confort'),
        ('Surveillance clinique', 'Surveillance clinique'),
        ('Soin medical', 'Soin médical'),
        ('Soin spécifique','Soin spécifique'),
        ('Soin psycho-social','Soin psycho-social'),
        ('Soin d\'éducation/prévention','Soin d\'éducation/prévention'),
        ('Soin en cas d\'urgence','Soin en cas d\'urgence'),
    ]
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    idInfirmier = models.ForeignKey(CompteInfirmier, on_delete=models.DO_NOTHING, to_field='email')
    typeSoin = models.CharField(default="Soin médical", max_length=50, choices=SOIN_CHOIX)
    resumeSoin = models.TextField(default="Fait")

class ConsultationMedicale(models.Model):
    OUTILS = [
        ('Stéthoscope','Stéthoscope'),
        ('Tensiomètre','Tensiomètre'),
        ('Thermomètre','Tensiomètre'),
    ]
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    dateConsultation = models.DateField(default=datetime.date.today)
    OutilsConsultation = models.CharField(default="Stéthoscope", max_length=50, choices=OUTILS)

class ExamenComplementaire(models.Model):
    idConsultation = models.ForeignKey(ConsultationMedicale,on_delete=models.CASCADE)
    dateExamen = models.DateField(default=datetime.date.today)
    class Meta:
        abstract = True

class BilanRadiologique(ExamenComplementaire):
    TYPE = [
        ('Radiographie','Radiographie'),
        ('Echographie','Echographie'),
        ('Scanner','Scanner'),
        ('IRM','IRM'),
    ]
    type = models.CharField(default="Radiographie", max_length=20, choices=TYPE)
    rapport = models.CharField(default=None, max_length=1000)

class PieceJointe(models.Model):
    url = models.URLField(max_length=255,null=True,blank=True)
    file = models.FileField(upload_to='Files/',null=True,blank=True,validators=[FileExtensionValidator( ['pdf','png','jpeg','jpg'] )]) 

class BilanBiologique(ExamenComplementaire):
    resultatGlobal = models.CharField(max_length=100)

class LigneBilanBiologique(models.Model):
    TYPE = [
        ('Glycémie','Glycémie'),
        ('Tension artérielle','Tension Artérielle'),
        ('Cholestérol','Cholestérol'),
        ('Triglycérides','Triglycérides'),
        ('Créatinine','Créatinine'),
        ('Urée','Urée'),
        ('Bilirubine','Bilirubine'),
        ('CRP','CRP'),
        ('Granulocytes','Granulocytes'),
        ('Thrombocytes','Thrombocytes'),
    ]
    UNIT = [
        ('mm','mm'),
        ('ml','ml'),
        ('u/ml','u/ml'),
    ]
    idBilanBiologique = models.ForeignKey(BilanBiologique,on_delete=models.CASCADE)
    type = models.CharField(default="Glycémie", max_length=20, choices=TYPE)
    resultat = models.DecimalField(max_digits=10, decimal_places=5)
    unite = models.CharField(default="ml", max_length=20, choices=UNIT)


class Medicament(models.Model):
    TYPE_MED = [
        ('Orale', 'Orale'),
        ('Injectable', 'Injectable'),
        ('Dermique','Dermique')
    ]
    nomMedicament = models.CharField(max_length=50, primary_key=True,)
    forme = models.CharField(default="Orale", max_length=20, choices=TYPE_MED)

class Posologie(models.Model):
    idOrdonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE)
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    dose = models.FloatField(default=1)
    dureePrise = models.IntegerField(default=10)

class Facture(models.Model):
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    dateFacture = models.DateField(default=datetime.date.today)
    montant = models.DecimalField(max_digits=10, decimal_places=2)

class LigneFacture(models.Model):
    idFacture = models.ForeignKey(Facture, on_delete=models.CASCADE)
    idSoin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    fraisSoin = models.DecimalField(max_digits=10, decimal_places=2)

class EffetSecondaire(models.Model):
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    descriptionEffetSecondaire = models.TextField(default='')