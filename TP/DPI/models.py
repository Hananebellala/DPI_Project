from django.db import models

# Create your models here.

class DPI(models.Model):
    idDossierPatient = models.CharField(max_length=10, primary_key=True)
    numeroSecuriteSociale = models.CharField(max_length=13)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=60)
    dateDeNaissance = models.DateField
    adresse = models.TextField
    telephone = models.DecimalField(max_digits = 10, decimal_places = 0)
    mutuelle = models.CharField(max_length = 30)
    idMedecinTraitant = models.ForeignKey
    personneAcontacter = models.TextField

class Ordonnance(models.Model):
    idOrdonnance = models.CharField(max_length = 20, primary_key=True)
    idDiagnostic = models.ForeignKey
    dateOrdonnance = models.DateField

class Soin(models.Model):
    idSoin = models.CharField(max_length = 18, primary_key=True)
    idSejour = models.ForeignKey
    idInfirmier = models.ForeignKey
    typeSoin = models.TextChoices("Soin1", "Soin2")
    resumeSoin = models.TextField

class ConsultationMedicale(models.Model):
    idConsultation = models.CharField(max_length = 19, primary_key=True)
    idSejour = models.ForeignKey
    dateConsultation = models.DateField

class ExamenComplementaire(models.Model):
    idBilan = models.CharField(max_length = 19, primary_key=True)
    idConsultation = models.ForeignKey
    dateExamen = models.DateField
    resultat = models.TextField

class Medicament(models.Model):
    nomMedicament = models.CharField(primary_key=True, max_length=50)
    forme = models.TextChoices("Orale", "Injectable", "Dermique")

class Sejour(models.Model):
    idSejour = models.CharField(max_length = 13, primary_key=True)
    idDossierPatient = models.ForeignKey
    idCompteMedecin = models.ForeignKey
    dateDebutSejour = models.DateField
    dateFinSejour = models.DateField
    motifAdmission = models.TextField

class Diagnostic(models.Model):
    idDiagnostic = models.CharField(max_length = 20, primary_key=True)
    idSejour = models.ForeignKey
    desciptionMaladie = models.TextField

class Posologie(models.Model):
    idPosologie = models.CharField(max_length = 25, primary_key=True)
    idOrdonnance = models.ForeignKey
    nomMedicament = models.ForeignKey
    dose = models.FloatField
    dureePrise = models.IntegerField

class Facture(models.Model):
    idFacture = models.CharField(max_length = 13,primary_key=True)
    idSejour = models.ForeignKey
    dateFacture = models.DateField
    montant = models.DecimalField(max_digits=10, decimal_places=2)

class LigneFacture(models.Model):
    idLigneFacture = models.CharField(max_length = 15, primary_key=True)
    idFacture = models.ForeignKey
    idSoin = models.TextChoices("soin1", "soin2")
    fraisSoin = models.DecimalField(max_digits=10, decimal_places=2)

class EffetSecondaire(models.Model):
    idEffetSecondaire = models.CharField(max_length = 10, primary_key=True)
    nomMedicament = models.ForeignKey
    descriptionEffetSecondaire = models.TextField
