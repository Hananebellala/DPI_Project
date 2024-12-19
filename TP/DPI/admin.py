from django.contrib import admin
from .models import DPI,Ordonnance,Soin,ConsultationMedicale,ExamenComplementaire,Medicament,Sejour,Diagnostic,Posologie,Facture,LigneFacture,EffetSecondaire

admin.site.register(DPI)
admin.site.register(Ordonnance)
admin.site.register(Soin)
admin.site.register(ConsultationMedicale)
admin.site.register(ExamenComplementaire)
admin.site.register(Medicament)
admin.site.register(Sejour)
admin.site.register(Diagnostic)
admin.site.register(Posologie)
admin.site.register(Facture)
admin.site.register(LigneFacture)
admin.site.register(EffetSecondaire)