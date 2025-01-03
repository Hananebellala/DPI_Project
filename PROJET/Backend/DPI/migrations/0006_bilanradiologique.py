# Generated by Django 5.1.4 on 2025-01-01 00:57

import datetime
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DPI', '0005_consultationmedicale'),
    ]

    operations = [
        migrations.CreateModel(
            name='BilanRadiologique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateExamen', models.DateField(default=datetime.date.today)),
                ('type', models.CharField(choices=[('Radiographie', 'Radiographie'), ('Echographie', 'Echographie'), ('Scanner', 'Scanner'), ('IRM', 'IRM')], default='Radiographie', max_length=20)),
                ('rapport', models.CharField(default=None, max_length=1000)),
                ('file', models.FileField(blank=True, null=True, upload_to='Attached-files/', validators=[django.core.validators.FileExtensionValidator(['pdf', 'png', 'jpeg', 'jpg'])])),
                ('idSejour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DPI.sejour')),
            ],
            options={
                'db_table': 'dpi_bilanradiologique',
            },
        ),
    ]
