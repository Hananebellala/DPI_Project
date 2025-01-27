from ..models import *
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class BilanRadiologiqueViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing radiological reports (BilanRadiologique).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `BilanRadiologique` model, which represents radiological assessment reports.

    Attributes:
        queryset: A queryset for retrieving all `BilanRadiologique` objects from the database.
        serializer_class: The serializer class used to convert `BilanRadiologique` objects into JSON format and vice versa.
    
    Methods:
        create: Handles the creation of a new `BilanRadiologique` instance.
            Validates the incoming data, performs the creation, and returns the result.
    """
    queryset = BilanRadiologique.objects.all()
    serializer_class = BRSerializer

    def create(self, request, *args, **kwargs):
        """
        Handles the creation of a new `BilanRadiologique` instance.
        
        This method customizes the default `create` method by adding extra logic to validate the
        incoming data and respond with either success or failure based on the validation.
        
        Arguments:
            request: The HTTP request containing data for creating a new instance.
            *args: Additional arguments passed to the parent class method.
            **kwargs: Additional keyword arguments passed to the parent class method.
        
        Returns:
            Response: A response indicating the success or failure of the creation request.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BilanBiologiqueViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing biological reports (BilanBiologique).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `BilanBiologique` model, which represents biological assessments.

    Attributes:
        queryset: A queryset for retrieving all `BilanBiologique` objects from the database.
        serializer_class: The serializer class used to convert `BilanBiologique` objects into JSON format and vice versa.
    """
    queryset = BilanBiologique.objects.all()
    serializer_class = BilanBiologiqueSerializer


class LigneSigneVitalViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing vital sign lines (LigneSigneVital).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `LigneSigneVital` model, which represents individual records of vital signs in a patient assessment.

    Attributes:
        queryset: A queryset for retrieving all `LigneSigneVital` objects from the database.
        serializer_class: The serializer class used to convert `LigneSigneVital` objects into JSON format and vice versa.
    """
    queryset = LigneSigneVital.objects.all()
    serializer_class = LigneSigneVitalSerializer


class LigneAnalyseViewSet(viewsets.ModelViewSet):
    """
    A viewset for managing analysis lines (LigneAnalyse).
    
    This viewset provides the standard actions to perform CRUD (Create, Read, Update, Delete) operations
    on the `LigneAnalyse` model, which represents individual analysis results in a medical report.

    Attributes:
        queryset: A queryset for retrieving all `LigneAnalyse` objects from the database.
        serializer_class: The serializer class used to convert `LigneAnalyse` objects into JSON format and vice versa.
    """
    queryset = LigneAnalyse.objects.all()
    serializer_class = LigneAnalyseSerializer


class LabsView(APIView):
    """
    API View for retrieving the list of laboratory types associated with a specific patient's hospital stay.

    This endpoint provides the types of labs available for a given `Sejour` (hospital stay) identified by its `idSejour`.
    The endpoint constructs URLs for different lab types and returns them in the response.

    Attributes:
        permission_classes (list): Ensures that the API is accessible only to authenticated users.

    Methods:
        get(request, email, idSejour, *args, **kwargs):
            Handles GET requests to retrieve lab types.

    Example usage:
        GET /profile/<email>/<idSejour>/labs/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, *args, **kwargs):
        """
        Handles the GET request to fetch lab types for a specific patient's hospital stay.

        Args:
            request (HttpRequest): The HTTP request object.
            email (str): The email address of the patient.
            idSejour (int): The ID of the hospital stay (`Sejour`).
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: A JSON response containing lab types or an error message.

        Raises:
            Sejour.DoesNotExist: If the specified `Sejour` is not found.
            DPI.DoesNotExist: If the `DPI` (medical record) is not found for the patient.
            ComptePatient.DoesNotExist: If the patient's account is not found.
            Exception: For any other unexpected errors.
        """
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
    """
    API View to retrieve detailed information for a specific lab type 
    associated with a patient's hospital stay (`Sejour`).

    This endpoint fetches detailed data for a specific lab type such as `VitalSigns`, 
    `BloodCountTest`, or `Radio`, based on the provided `lab_type`.

    Attributes:
        permission_classes (list): Ensures that the API is accessible only to authenticated users.

    Methods:
        get(request, email, idSejour, lab_type, *args, **kwargs):
            Handles GET requests to retrieve lab details.

    Example usage:
        GET /profile/<email>/<idSejour>/labs/<lab_type>/
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, email, idSejour, lab_type, *args, **kwargs):
        """
        Handles the GET request to fetch detailed information about a specific lab type.

        Args:
            request (HttpRequest): The HTTP request object.
            email (str): The email address of the patient.
            idSejour (int): The ID of the hospital stay (`Sejour`).
            lab_type (str): The type of lab data to retrieve (e.g., `VitalSigns`, `BloodCountTest`, `Radio`).
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: A JSON response containing lab details or an error message.

        Raises:
            Sejour.DoesNotExist: If the specified `Sejour` is not found.
            Exception: For any other unexpected errors.
        """
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
        
    