# Generated by Django 3.0.3 on 2020-03-14 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imageFilter', '0005_image_numberofcolors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
