from django.contrib import admin
from .models import *

admin.site.register(Hopital)
admin.site.register(CompteAdministrateur)
admin.site.register(CompteMedecin)
admin.site.register(CompteInfirmier)
admin.site.register(ComptePatient)
admin.site.register(ComptePersonnelAdministratif)
admin.site.register(DPI)
admin.site.register(Ordonnance)
admin.site.register(Soin)
admin.site.register(ConsultationMedicale)
admin.site.register(Medicament)
admin.site.register(Sejour)
admin.site.register(Diagnostic)
admin.site.register(BilanRadiologique)
admin.site.register(BilanBiologique)
admin.site.register(LigneBilanBiologique)
admin.site.register(Posologie)
admin.site.register(Facture)
admin.site.register(LigneFacture)
admin.site.register(EffetSecondaire)
