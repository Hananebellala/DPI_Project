import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.forms import ValidationError
import re


def is_email(text):
    email_pattern = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    if not re.match(email_pattern, text):
        raise ValidationError(f"{text} n'est pas une adresse électronique valide")

def is_NSS(text):
    NSS_pattern = re.compile(r'^(0[1-9]|[1-4][0-9]|5[0-8]|99)(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{5}}$')
    if not re.match(NSS_pattern, text):
        raise ValidationError(f"{text} n'est pas un NSS valide")
    
def is_phonenumber(text):
    phonenumber_pattern = re.compile(r'^0\d{9}')
    if not re.match(phonenumber_pattern, text):
        raise ValidationError(f"{text} n'est pas un numéro de téléphone valide")
    
# Create your models here.


class Hopital(models.Model):
    nom = models.CharField(primary_key=True, max_length=50)
class Meta:
        db_table = 'dpi_hopital'

class ComptePersonne(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, default=None)
    email = models.CharField(max_length=100, primary_key=True, default=None)
    nomComplet = models.CharField(max_length=100)
    motDePasse = models.CharField(max_length=255)
    class Meta:
       abstract = True

class CompteAdministrateur(ComptePersonne):
    pass
class Meta:
        db_table = 'dpi_compteadministrateur'

class CompteEmployeeHopital(ComptePersonne):
    idHopital = models.ForeignKey(Hopital, on_delete=models.CASCADE, default=None)
    class Meta:
        abstract = True

class CompteMedecin(CompteEmployeeHopital):
    SPEC_CHOIX = [
        ('Chirurgien','Chirurgien'),
        ('Généraliste', 'Généraliste'),
        ('Pédiatre', 'Pédiatre'),
        ('Endocrinologue','Endocrinologue'),
        ('Cardiologue', 'Cardiologue'),
        ('Dermatologue', 'Dermatologue'),
        ('Neurologue','Neurologue'),
        ('Obstétricien','Obstétricien'),
        ('Ostéologue','Ostéologue'),
        ('Ophtalmologue','Ophtalmologue'),
        ('ORL','ORL'),
        ('Gastro-entérologue','Gastro-entérologue'),
        ('Néphrologue','Néphrologue'),
        ('Anesthésiste',"Anesthésiste"),
    ]
    email = models.CharField(max_length=50, unique=True, primary_key=True, default=None)
    specialite = models.CharField(default="Généraliste", max_length=30, choices=SPEC_CHOIX)
    class Meta:
        db_table = 'dpi_comptemedecin'

class CompteInfirmier(CompteEmployeeHopital):
    SPEC_CHOIX = [
        ('de bloc opératoire', 'de bloc opératoire'),
        ('anesthésiste', 'anesthésiste'),
        ('puériculteur', 'puériculteur'),
        ('en pratique avancée','en pratique avancée'),
        ('hygiéniste','hygiéniste'),
        ('coordinateur','coordinateur'),
    ]
    specialiteInf = models.CharField(max_length=60, choices=SPEC_CHOIX)
    class Meta:
        db_table = 'dpi_compteinfirmier'


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
    class Meta:
        db_table = 'dpi_personneladministratif'

class CompteRadiologue(CompteEmployeeHopital):
    pass
class Meta:
        db_table = 'dpi_compteradialogue'

class CompteLaborantin(CompteEmployeeHopital):
    pass
class Meta:
        db_table = 'dpi_comptelaborantin'

class ComptePharmacien(CompteEmployeeHopital):
    pass
class Meta:
        db_table = 'dpi_comptepharmacien'

class DPI(models.Model):
    numeroSecuriteSociale = models.CharField(primary_key=True, max_length=13)
    dateDeNaissance = models.DateField(default=datetime.date.today)
    adresse = models.TextField(default='')
    telephone = models.DecimalField(max_digits = 10, decimal_places = 0)
    mutuelle = models.CharField(max_length = 30)
    idMedecinTraitant = models.TextField(default='')
    personneAcontacter = models.CharField(max_length = 50, default=None)
    
    class Meta:
        db_table = 'dpi_dpi'

class ComptePatient(ComptePersonne):
    dossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE)
    class Meta:
        db_table = 'dpi_comptepatient'

class Sejour(models.Model):
    idDossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE)
    idCompteMedecin = models.ForeignKey(CompteMedecin, on_delete=models.DO_NOTHING)
    dateDebutSejour = models.DateField(default=datetime.date.today)
    dateFinSejour = models.DateField(default=datetime.date.today)
    motifAdmission = models.TextField(default="")
    class Meta:
        db_table = 'dpi_sejour'

class ConsultationMedicale(models.Model):
    OUTILS = [
        ('Stéthoscope','Stéthoscope'),
        ('Tensiomètre','Tensiomètre'),
        ('Thermomètre','Tensiomètre'),
    ]
    premiere = models.BooleanField(default=True)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    dateConsultation = models.DateField(default=datetime.date.today)
    outilsConsultation = models.CharField(default="Stéthoscope", max_length=50, choices=OUTILS)
    resume = models.CharField(max_length=500)
    dateProchaineConsultation = models.DateField(null=True, blank=True)
    class Meta:
        db_table = 'dpi_consultationmedicale'

class Diagnostic(models.Model):
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    idConsultation = models.ForeignKey(ConsultationMedicale, on_delete=models.CASCADE,null=True, blank=True)
    descriptionMaladie = models.TextField(default='')
    class Meta:
        db_table = 'dpi_diagnostic'

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
    class Meta:
        db_table = 'dpi_soin'



class Antecedent(models.Model):
    TYPE = [
        ('Médical personnel','Médical personnel'),
        ('Familial','Familial'),
        ('Médicamenteux','Médicamenteux'),
        ('Social et environnemental','Social et environnemental'),
        ('Obstétrical et gynécologique','Obstétrical et gynécologique'),
    ]
    typeAntecedent = models.CharField(default="Médical personnel", max_length=50, choices=TYPE)
    description = models.CharField(max_length=500)
    idConsultation = models.ForeignKey(ConsultationMedicale, on_delete=models.CASCADE,null=True, blank=True)
    def clean(self):
        if not(self.idConsultation.premiere):
            raise ValidationError("Un antécédent ne peut pas être ajouté qu'à une première consultation")
        super().clean()
    class Meta:
        db_table = 'dpi_antecedent'

class PieceJointe(models.Model):
    url = models.URLField(max_length=255,null=True,blank=True)
    file = models.FileField(upload_to='Attached-files/',null=True,blank=True,validators=[FileExtensionValidator( ['pdf','png','jpeg','jpg'] )]) 
    class Meta:
        db_table = 'dpi_piecejointe'

class ExamenComplementaire(models.Model):
    idSejour = models.ForeignKey(Sejour,on_delete=models.CASCADE)
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
    file = models.FileField(upload_to='Attached-files/',null=True,blank=True,validators=[FileExtensionValidator( ['pdf','png','jpeg','jpg'] )])
    class Meta:
        db_table = 'dpi_bilanradiologique'
    
class BilanBiologique(ExamenComplementaire):
    resultatGlobal = models.CharField(max_length=100)

class LigneBilanBiologique(models.Model):
    UNIT = [
        ('mm','mm'),
        ('mL','mL'),
        ('u/mL','u/mL'),
        ('mmHg','mmHg'),
        ('g/L','g/L'),
        ('mmol/mL','mmol/mL'),
        ('%','%'),
    ]
    idBilanBiologique = models.ForeignKey(BilanBiologique,on_delete=models.CASCADE)
    resultat = models.DecimalField(max_digits=10, decimal_places=5)
    unite = models.CharField(default="ml", max_length=20, choices=UNIT)
    class Meta:
        abstract = True
        db_table = 'dpi_bilanbiologique'        

class LigneSigneVital(LigneBilanBiologique):
    TYPE = [
        ('Glycémie','Glycémie'),
        ('Tension artérielle systolique','Tension artérielle systolique'),
        ('Tension artérielle diastolique','Tension artérielle diastolique'),
        ('Rythme cardiaque','Rythme cardiaque'),
    ]
    type = models.CharField(default="Glycémie", max_length=50, choices=TYPE)
    class Meta:
        db_table = 'dpi_lignesignevital'

class LigneAnalyse(LigneBilanBiologique):
    TYPE = [
        ('Cholestérol','Cholestérol'),
        ('Triglycérides','Triglycérides'),
        ('Créatinine','Créatinine'),
        ('Urée','Urée'),
        ('Bilirubine','Bilirubine'),
        ('CRP','CRP'),
        ('Hématies','Hématies'),
        ('Hématocrites','Hématocrites'),
        ('Hémoglobine','Hémoglobine'),
        ('Leucocytes','Leucocytes'),
        ('Granulocytes','Granulocytes'),
        ('Thrombocytes','Thrombocytes'),
        ('GGT','GGT'),
        ('LDH','LDH'),
    ]
    type = models.CharField(default="Hémoglobine", max_length=50, choices=TYPE)
    class Meta:
        db_table = 'dpi_ligneanalyse'

class Ordonnance(models.Model):
    idSejour = models.ForeignKey(Sejour, on_delete=models.DO_NOTHING)
    dateOrdonnance = models.DateField(default=datetime.date.today)
    class Meta:
        db_table = 'dpi_ordonnance'

class Medicament(models.Model):
    TYPE_MED = [
        ('Orale', 'Orale'),
        ('Injectable', 'Injectable'),
        ('Dermique','Dermique')
    ]
    nomMedicament = models.CharField(max_length=50, primary_key=True,)
    forme = models.CharField(default="Orale", max_length=20, choices=TYPE_MED)
    quantiteStock = models.PositiveIntegerField(default=0)
    class Meta:
        db_table = 'dpi_medicament'

class Posologie(models.Model):
    #idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE, null=True, blank=True)
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    dose = models.FloatField(default=1)
    Frequency=models.IntegerField(default=10)
    dureePrise = models.IntegerField(default=10)

class Facture(models.Model):
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE)
    dateFacture = models.DateField(default=datetime.date.today)
    montant = models.DecimalField(max_digits=10, decimal_places=2)

class LigneFacture(models.Model):
    idFacture = models.ForeignKey(Facture, on_delete=models.CASCADE)
    idSoin = models.ForeignKey(Soin, on_delete=models.CASCADE)
    fraisSoin = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        db_table = 'dpi_lignefacture'

class EffetSecondaire(models.Model):
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)
    descriptionEffetSecondaire = models.TextField(default='')
    class Meta:
        db_table = 'dpi_effetsecondaire'


        