# Generated by Django 3.0.3 on 2020-03-06 20:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('imageFilter', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='getimage',
            name='content',
        ),
        migrations.RemoveField(
            model_name='getimage',
            name='title',
        ),
    ]