# Generated by Django 5.1.4 on 2024-12-21 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DPI', '0002_alter_compteinfirmier_specialite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='compteinfirmier',
            name='specialite',
            field=models.CharField(choices=[('Aide Soignant', 'Aide Soignant'), ('Sage femme', 'Sage Femme')], max_length=30),
        ),
    ]
