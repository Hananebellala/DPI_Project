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

class BilanRadiologiqueSerializer(serializers.ModelSerializer):   
    class Meta:
        model = BilanRadiologique
        fields = '__all__'
        
    def create(self, validated_data):
            instance = BilanRadiologique.objects.create(**validated_data)
            return instance
    
class BilanBiologiqueSerializer(serializers.ModelSerializer):   
    class Meta:
        model = BilanBiologique
        fields = '__all__'
        
    def create(self, validated_data):
            instance = BilanBiologique.objects.create(**validated_data)
            return instance

class LigneBilanBiologiqueSerializer(serializers.ModelSerializer):   
    class Meta:
        model = LigneBilanBiologique
        fields = '__all__'
        
    def create(self, validated_data):
            instance = LigneBilanBiologique.objects.create(**validated_data)
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