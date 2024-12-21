import datetime
from django.db import models

# Create your models here.

class Hopital(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    nom = models.CharField(max_length=50)

class ComptePersonne(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    nomUtilisateur = models.CharField(primary_key=True, max_length=30, default="USERNAME")
    motDePasse = models.CharField(max_length=255)
    class Meta:
        abstract = True

class CompteEmployee(models.Model):
    idHopital = models.ForeignKey(Hopital, on_delete=models.CASCADE, default="Hopital")
    class Meta:
        abstract = True

class CompteAdministrateur(CompteEmployee):
    mdpHopital = models.CharField(max_length=50)

class CompteMedecin(CompteEmployee):
    class SpecialiteType(models.TextChoices):
        GENERALISTE = 'Généraliste'
        PEDIATRE = 'Pédiatre'
        DERMATOLOGUE = 'Dermatologue'
        NEUROLOGUE = 'Neurologue'
        OBSTETRICIEN = 'Obstétricien'
        OSTEOLOGUE = 'Ostéologue'
        OPHTALMOLOGUE = 'Ophtalmologue'
        ORL = 'ORL'
        GASTROENTEROLOGUE = 'Gastro-entérologue'
    specialite = models.CharField(default="Généraliste", max_length=30, choices=SpecialiteType.choices)

class CompteInfirmier(CompteEmployee):
    class SpecialiteType(models.TextChoices):
        AIDE_SOIGNANT = 'Aide Soignant'
        SAGE_FEMME = 'Sage femme'
    specialite = models.CharField(max_length=30, choices=SpecialiteType.choices)

class ComptePersonnelAdministratif(CompteEmployee):
    class SpecialiteType(models.TextChoices):
        URGENCES = 'Urgences'
        PEDIATRIE = 'Pédiatrie'
        DERMATOLOGIE = 'Dermatologue'
        NEUROLOGIE = 'Neurologue'
        OBSTETRIQUE = 'Obstétrique'
        OSTEOLOGIE = 'Ostéologie'
        OPHTALMOLOGiE = 'Ophtalmologie'
        ORL = 'ORL'
        GASTROENTEROLOGiE = 'Gastro-entérologie'
    service = models.CharField(default="Urgences",max_length=30, choices=SpecialiteType.choices)
    
class DPI(models.Model):
    idDossierPatient = models.CharField(max_length=10, primary_key=True)
    numeroSecuriteSociale = models.CharField(max_length=13)
    dateDeNaissance = models.DateField(default=datetime.date.today)
    adresse = models.TextField(default='Alger')
    telephone = models.DecimalField(max_digits = 10, decimal_places = 0)
    mutuelle = models.CharField(max_length = 30)
    idMedecinTraitant = models.ForeignKey(CompteMedecin, on_delete=models.DO_NOTHING, default="MedecinTraitant")
    personneAcontacter = models.CharField(max_length = 50, default="azerty@gmail.com or 0792838288")
    
class ComptePatient(ComptePersonne):
    dossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE, default="DossierPatient")

class Sejour(models.Model):
    idSejour = models.CharField(max_length=13, primary_key=True)
    idDossierPatient = models.ForeignKey(DPI, on_delete=models.CASCADE, default="DossierPatient")
    idCompteMedecin = models.ForeignKey(CompteMedecin, on_delete=models.DO_NOTHING, default="CompteMedecin")
    dateDebutSejour = models.DateField(default=datetime.date.today)
    dateFinSejour = models.DateField(default=datetime.date.today)
    motifAdmission = models.TextField(default="Maladie")

class Diagnostic(models.Model):
    idDiagnostic = models.CharField(max_length = 20, primary_key=True)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE, default="Sejour")
    descriptionMaladie = models.TextField(default='')

class Ordonnance(models.Model):
    idOrdonnance = models.CharField(max_length = 20, primary_key=True)
    idDiagnostic = models.ForeignKey(Diagnostic, on_delete=models.DO_NOTHING, default="Diagnostic")
    dateOrdonnance = models.DateField(default=datetime.date.today)

class Soin(models.Model):
    idSoin = models.CharField(max_length = 18, primary_key=True)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE, default="Soin")
    idInfirmier = models.ForeignKey(CompteInfirmier, on_delete=models.DO_NOTHING, default="Infirmier")
    typeSoin = models.TextChoices("Soin1", "Soin2")
    resumeSoin = models.TextField(default="Fait")

class ConsultationMedicale(models.Model):
    idConsultation = models.CharField(max_length = 19, primary_key=True)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE, default="Sejour")
    dateConsultation = models.DateField(default=datetime.date.today)

class ExamenComplementaire(models.Model):
    idBilan = models.CharField(max_length = 19, primary_key=True)
    idConsultation = models.ForeignKey(ConsultationMedicale,on_delete=models.CASCADE, default="Consultation")
    dateExamen = models.DateField(default=datetime.date.today)
    resultat = models.TextField(default='')

class Medicament(models.Model):
    nomMedicament = models.CharField(max_length=50, primary_key=True,)
    forme = models.TextChoices("Orale", "Injectable", "Dermique")

class Posologie(models.Model):
    idPosologie = models.CharField(max_length = 25, primary_key=True)
    idOrdonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE, default="Ordonnance")
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE, default="Medicament")
    dose = models.FloatField(default=1)
    dureePrise = models.IntegerField(default=10)

class Facture(models.Model):
    idFacture = models.CharField(max_length = 13,primary_key=True)
    idSejour = models.ForeignKey(Sejour, on_delete=models.CASCADE, default="Sejour")
    dateFacture = models.DateField(default=datetime.date.today)
    montant = models.DecimalField(max_digits=10, decimal_places=2)

class LigneFacture(models.Model):
    idLigneFacture = models.CharField(max_length = 15, primary_key=True)
    idFacture = models.ForeignKey(Facture, on_delete=models.CASCADE, default="Facture")
    idSoin = models.TextChoices("soin1", "soin2")
    fraisSoin = models.DecimalField(max_digits=10, decimal_places=2)

class EffetSecondaire(models.Model):
    idEffetSecondaire = models.CharField(max_length = 10, primary_key=True)
    nomMedicament = models.ForeignKey(Medicament, on_delete=models.CASCADE, default="Medicament")
    descriptionEffetSecondaire = models.TextField(default='')