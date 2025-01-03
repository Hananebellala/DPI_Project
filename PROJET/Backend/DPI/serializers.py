from rest_framework import serializers 
from DPI.models import *

class HopitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hopital
        fields = '__all__'
        
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
    
class CompteLaborantinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteLaborantin
        fields = '__all__'
        
    def create(self, validated_data):
            instance = CompteLaborantin.objects.create(**validated_data)
            return instance 
    
class CompteRadiologueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteRadiologue
        fields = '__all__'
        
    def create(self, validated_data):
            instance = CompteRadiologue.objects.create(**validated_data)
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
        fields = '__all__'
        
    def create(self, validated_data):
            instance = DPI.objects.create(**validated_data)
            return instance

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'
        
    def create(self, validated_data):
            instance = Ordonnance.objects.create(**validated_data)
            return instance
    
class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'
        
    def create(self, validated_data):
            instance = Soin.objects.create(**validated_data)
            return instance

class ConsultationMedicaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationMedicale
        fields = '__all__'
        
    def create(self, validated_data):
            instance = ConsultationMedicale.objects.create(**validated_data)
            return instance
    
class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__'
        
    def create(self, validated_data):
            instance = Antecedent.objects.create(**validated_data)
            return instance
        
class MedicamentSerializer(serializers.ModelSerializer):     
    class Meta:
        model = Medicament
        fields = '__all__'
    
    def create(self, validated_data):
            instance = Medicament.objects.create(**validated_data)
            return instance

class SejourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sejour
        fields = '__all__'
    
    def create(self, validated_data):
            instance = Sejour.objects.create(**validated_data)
            return instance
        
class DiagnosticSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Diagnostic
        fields = '__all__'
        
    def create(self, validated_data):
            instance = Diagnostic.objects.create(**validated_data)
            return instance

class BRSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ['rapport', 'type', 'idSejour', 'file']
    
class BilanBiologiqueSerializer(serializers.ModelSerializer):   
    class Meta:
        model = BilanBiologique
        fields = '__all__'
        
    def create(self, validated_data):
            instance = BilanBiologique.objects.create(**validated_data)
            return instance

class BilanBiologiqueSerializer(serializers.ModelSerializer):   
    class Meta:
        model = BilanBiologique
        fields = '__all__'
        
    def create(self, validated_data):
            instance = BilanBiologique.objects.create(**validated_data)
            return instance

class LigneSigneVitalSerializer(serializers.ModelSerializer):   
    class Meta:
        model = LigneSigneVital
        fields = '__all__'
        
    def create(self, validated_data):
            instance = LigneSigneVital.objects.create(**validated_data)
            return instance
class LigneAnalyseSerializer(serializers.ModelSerializer):   
    class Meta:
        model = LigneAnalyse
        fields = '__all__'
        
    def create(self, validated_data):
            instance = LigneAnalyse.objects.create(**validated_data)
            return instance

class PosologieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posologie
        fields = '__all__'
    
    def create(self, validated_data):
            instance = Posologie.objects.create(**validated_data)
            return instance

class FactureSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Facture
        fields = '__all__'
        
    def create(self, validated_data):
            instance = Facture.objects.create(**validated_data)
            return instance

class LigneFactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneFacture
        fields = '__all__'
        
    def create(self, validated_data):
            instance = LigneFacture.objects.create(**validated_data)
            return instance
        
class EffetSecondaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = EffetSecondaire
        fields = '__all__'
        
    def create(self, validated_data):
            instance = EffetSecondaire.objects.create(**validated_data)
            return instance

# serializers.py la partie de ajout de emplyee 
from rest_framework import serializers

class EmployeeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    nom = serializers.CharField(max_length=50)
    prenom = serializers.CharField(max_length=50)
    motDePasse = serializers.CharField(max_length=255)
    profession = serializers.CharField(max_length=50)
    hopital = serializers.CharField(max_length=50)

class CompteRadiologueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteRadiologue
        fields = '__all__'

class CompteLaborantinSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteLaborantin
        fields = '__all__'

class ComptePharmacienSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComptePharmacien
        fields = '__all__'
