from django.db import models

# Create your models here.
class Image(models.Model):
    task = models.CharField(max_length=100, default='')
    image = models.ImageField()

    def __str__(self):
        return self.task