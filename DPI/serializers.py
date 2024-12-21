from rest_framework import serializers 
from DPI.models import Hopital,CompteAdministrateur,CompteMedecin,CompteInfirmier,ComptePatient,ComptePersonnelAdministratif,DPI,Ordonnance,Soin,ConsultationMedicale,ExamenComplementaire,Medicament,Sejour,Diagnostic,Posologie,Facture,LigneFacture,EffetSecondaire

class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = ('id',
                  'nom')
    def create(self, validated_data):
        instance = Hopital.objects.create(**validated_data)
        return instance    
    
class CompteAdministrateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteAdministrateur
        fields = '__all__'
        
    def create(self, validated_data):
            instance = CompteAdministrateur.objects.create(**validated_data)
            return instance 
 
class CompteMedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteMedecin
        fields = '__all__'
        
    def create(self, validated_data):
            instance = CompteMedecin.objects.create(**validated_data)
            return instance 

class CompteInfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteInfirmier
        fields = '__all__'
        
    def create(self, validated_data):
            instance = CompteInfirmier.objects.create(**validated_data)
            return instance 
    
class ComptePersonnelAdministratifSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComptePersonnelAdministratif
        fields = '__all__'
        
    def create(self, validated_data):
            instance = ComptePersonnelAdministratif.objects.create(**validated_data)
            return instance 
    
class ComptePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComptePatient
        fields = '__all__'
        
    def create(self, validated_data):
            instance = ComptePatient.objects.create(**validated_data)
            return instance 
    
class DPISerializer(serializers.ModelSerializer):
    class Meta:
        model = DPI
        fields = ('id',
                  'NSS',
                  'nom',
                  'prenom',
                  'dateDeNaissance',
                  'adresse',
                  'telephone',
                  'mutuelle',
                  'idMedecinTraitant',
                  'personneAcontacter')
        
    def create(self, validated_data):
            instance = DPI.objects.create(**validated_data)
            return instance

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = ('id',
                  'idDiagnostic',
                  'dateOrdonnance')
        
    def create(self, validated_data):
            instance = Ordonnance.objects.create(**validated_data)
            return instance
    
class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = ('id',
                  'idSoin',
                  'idInfirmier',
                  'typeSoin',
                  'resume')
        
    def create(self, validated_data):
            instance = Soin.objects.create(**validated_data)
            return instance

class ConsultationMedicaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationMedicale
        fields = ('id',
                  'idSejour',
                  'dateConsultation')
        
    def create(self, validated_data):
            instance = ConsultationMedicale.objects.create(**validated_data)
            return instance
        
class ExamenComplementaireSerializer(serializers.ModelSerializer):       
    class Meta:
        model = ExamenComplementaire
        fields = ('id',
                  'dateExamen',
                  'resultat')

    def create(self, validated_data):
            instance = ExamenComplementaire.objects.create(**validated_data)
            return instance

class MedicamentSerializer(serializers.ModelSerializer):     
    class Meta:
        model = Medicament
        fields = ('nomMedicament',
                  'forme')
    
    def create(self, validated_data):
            instance = Medicament.objects.create(**validated_data)
            return instance

class SejourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sejour
        fields = ('id',
                  'idDossierPatient',
                  'idCompteMedecin',
                  'dateDebutSejour',
                  'dateFinSejour',
                  'motifAdmission')
    
    def create(self, validated_data):
            instance = Sejour.objects.create(**validated_data)
            return instance
        
class DiagnosticSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Diagnostic
        fields = ('id',
                  'idSejour',
                  'descriptionMaladie')
        
    def create(self, validated_data):
            instance = Diagnostic.objects.create(**validated_data)
            return instance

class PosologieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posologie
        fields = ('id',
                  'idOrdonnance',
                  'nomMedicament',
                  'dose',
                  'dureePrise')
    
    def create(self, validated_data):
            instance = Posologie.objects.create(**validated_data)
            return instance

class FactureSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Facture
        fields = ('id',
                  'idSejour',
                  'dateFacture',
                  'montant')
        
    def create(self, validated_data):
            instance = Facture.objects.create(**validated_data)
            return instance

class LigneFactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneFacture
        fields = ('id',
                  'idFacture',
                  'idSoin',
                  'fraisSoin')
        
    def create(self, validated_data):
            instance = LigneFacture.objects.create(**validated_data)
            return instance
        
class EffetSecondaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = EffetSecondaire
        fields = ('idEffetSecondaire',
                  'nomMedicament',
                  'descriptionEffetSecondaire')
        
    def create(self, validated_data):
            instance = EffetSecondaire.objects.create(**validated_data)
            return instance