from rest_framework import serializers 
from DPI.models import *

class HopitalSerializer(serializers.ModelSerializer):
    """
    Serializer for the Hopital model.

    This serializer handles the serialization and deserialization of the 
    Hopital model's data. It includes all fields of the model and provides
    functionality to create new Hopital instances.
    """
    class Meta:
        """
        Meta class for HopitalSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = Hopital
        fields = '__all__'
        
    
class CompteAdministrateurSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompteAdministrateur model.

    This serializer handles the serialization and deserialization of the 
    CompteAdministrateur model's data. It includes all fields of the model and provides
    functionality to create new CompteAdministrateur instances.
    """
    class Meta:
        """
        Meta class for CompteAdministrateurSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = CompteAdministrateur
        fields = '__all__'
        
 
class CompteMedecinSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompteMedecin model.

    This serializer is responsible for converting the CompteMedecin model's data 
    to and from Python data types. It ensures that all necessary fields of the 
    CompteMedecin model are included in the serialized output.
    """
    class Meta:
        """
        Meta class for CompteMedecinSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = CompteMedecin
        fields = '__all__'


class CompteInfirmierSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompteInfirmier model.

    This serializer handles the conversion of CompteInfirmier model data 
    to and from JSON format. It ensures the inclusion of all relevant fields.
    """
    class Meta:
        """
        Meta class for CompteInfirmierSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = CompteInfirmier
        fields = '__all__'


class ComptePersonnelAdministratifSerializer(serializers.ModelSerializer):
    """
    Serializer for the ComptePersonnelAdministratif model.

    This serializer manages the serialization and deserialization process 
    for the ComptePersonnelAdministratif model. It includes all necessary fields.
    """
    class Meta:
        """
        Meta class for ComptePersonnelAdministratifSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = ComptePersonnelAdministratif
        fields = '__all__'


class CompteLaborantinSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompteLaborantin model.

    This serializer is responsible for converting the CompteLaborantin model 
    data into a JSON format and back. It ensures that all fields from the model 
    are properly serialized.
    """
    class Meta:
        """
        Meta class for CompteLaborantinSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = CompteLaborantin
        fields = '__all__'


class CompteRadiologueSerializer(serializers.ModelSerializer):
    """
    Serializer for the CompteRadiologue model.

    This serializer manages the serialization and deserialization of the 
    CompteRadiologue model's data. It includes all fields from the model 
    to ensure proper data handling.
    """
    class Meta:
        """
        Meta class for CompteRadiologueSerializer.

        Specifies the model to be serialized and the fields to include
        in the serialized output.
        """
        model = CompteRadiologue
        fields = '__all__'
        

class ComptePatientSerializer(serializers.ModelSerializer):
    """
    Serializer for the ComptePatient model.

    This serializer manages the conversion of the ComptePatient model's data 
    to and from JSON. It includes all fields and supports creating new 
    ComptePatient instances.
    """
    class Meta:
        """
        Meta class for ComptePatientSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = ComptePatient
        fields = '__all__'
        

class DPISerializer(serializers.ModelSerializer):
    """
    Serializer for the DPI model.

    This serializer handles the serialization and deserialization of the 
    DPI (Dossier Patient Informatisé) model's data. All fields are included.
    """
    class Meta:
        """
        Meta class for DPISerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = DPI
        fields = '__all__'
        

class OrdonnanceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Ordonnance model.

    This serializer is responsible for the serialization and deserialization 
    of Ordonnance data, ensuring that all fields are included in the process.
    """
    class Meta:
        """
        Meta class for OrdonnanceSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Ordonnance
        fields = '__all__'


class SoinSerializer(serializers.ModelSerializer):
    """
    Serializer for the Soin model.

    This serializer handles the conversion of Soin model data into a serialized 
    format and supports deserialization for creating new Soin instances.
    """
    class Meta:
        """
        Meta class for SoinSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Soin
        fields = '__all__'


class ConsultationMedicaleSerializer(serializers.ModelSerializer):
    """
    Serializer for the ConsultationMedicale model.

    This serializer is responsible for managing the serialization and 
    deserialization of ConsultationMedicale data.
    """
    class Meta:
        """
        Meta class for ConsultationMedicaleSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = ConsultationMedicale
        fields = '__all__'


class AntecedentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Antecedent model.

    This serializer handles the serialization and deserialization of 
    Antecedent model data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for AntecedentSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Antecedent
        fields = '__all__'
  

class MedicamentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Medicament model.

    This serializer is responsible for converting Medicament data to and 
    from serialized format, including all fields in the process.
    """
    class Meta:
        """
        Meta class for MedicamentSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Medicament
        fields = '__all__'
    

class SejourSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sejour model.

    This serializer handles the serialization and deserialization of 
    Sejour model data, supporting all fields of the model.
    """
    class Meta:
        """
        Meta class for SejourSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Sejour
        fields = '__all__'


class DiagnosticSerializer(serializers.ModelSerializer):
    """
    Serializer for the Diagnostic model.

    This serializer is responsible for the conversion of Diagnostic data 
    to and from serialized format, including all model fields.
    """
    class Meta:
        """
        Meta class for DiagnosticSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Diagnostic
        fields = '__all__'


class BRSerializer(serializers.ModelSerializer):
    """
    Serializer for the BilanRadiologique model.

    This serializer handles the serialization and deserialization of 
    BilanRadiologique data, focusing on the specified fields.
    """
    class Meta:
        """
        Meta class for BRSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = BilanRadiologique
        fields = ['rapport', 'type', 'idSejour', 'file']


class BilanBiologiqueSerializer(serializers.ModelSerializer):
    """
    Serializer for the BilanBiologique model.

    This serializer ensures the proper handling of BilanBiologique data, 
    including all fields during the serialization process.
    """
    class Meta:
        """
        Meta class for BilanBiologiqueSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = BilanBiologique
        fields = '__all__'
   

class LigneSigneVitalSerializer(serializers.ModelSerializer):   
    """
    Serializer for the LigneSigneVital model.

    This serializer manages the serialization and deserialization of 
    LigneSigneVital data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for LigneSigneVitalSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = LigneSigneVital
        fields = '__all__'


class LigneAnalyseSerializer(serializers.ModelSerializer):   
    """
    Serializer for the LigneAnalyse model.

    This serializer is responsible for serializing and deserializing 
    LigneAnalyse data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for LigneAnalyseSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = LigneAnalyse
        fields = '__all__'


class PosologieSerializer(serializers.ModelSerializer):
    """
    Serializer for the Posologie model.

    This serializer handles the serialization and deserialization of 
    Posologie data, including all fields of the model.
    """
    class Meta:
        """
        Meta class for PosologieSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Posologie
        fields = '__all__'


class FactureSerializer(serializers.ModelSerializer):        
    """
    Serializer for the Facture model.

    This serializer manages the serialization and deserialization of 
    Facture data, including all fields of the model.
    """
    class Meta:
        """
        Meta class for FactureSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = Facture
        fields = '__all__'


class LigneFactureSerializer(serializers.ModelSerializer):
    """
    Serializer for the LigneFacture model.

    This serializer is responsible for the serialization and deserialization 
    of LigneFacture data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for LigneFactureSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = LigneFacture
        fields = '__all__'


class EffetSecondaireSerializer(serializers.ModelSerializer):
    """
    Serializer for the EffetSecondaire model.

    This serializer manages the serialization and deserialization of 
    EffetSecondaire data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for EffetSecondaireSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = EffetSecondaire
        fields = '__all__'
        

class ComptePharmacienSerializer(serializers.ModelSerializer):
    """
    Serializer for the ComptePharmacien model.

    This serializer manages the serialization and deserialization of 
    ComptePharmacien data. All fields of the model are included.
    """
    class Meta:
        """
        Meta class for ComptePharmacienSerializer.

        Specifies the model to be serialized and the fields to include 
        in the serialized output.
        """
        model = ComptePharmacien
        fields = '__all__'


class EmployeeSerializer(serializers.Serializer):
    """
    Serializer for Employee data.

    This serializer handles the serialization and deserialization of basic 
    employee data, including fields for email, name, and job details.
    """
    email = serializers.EmailField()
    nom = serializers.CharField(max_length=50)
    prenom = serializers.CharField(max_length=50)
    motDePasse = serializers.CharField(max_length=255)
    profession = serializers.CharField(max_length=50)
    hopital = serializers.CharField(max_length=50)

class EmailCheckSerializer(serializers.Serializer):
    """
    Serializer for email validation.

    This serializer validates and processes an email field.
    """
    email = serializers.EmailField()

