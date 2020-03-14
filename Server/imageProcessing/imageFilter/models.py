from django.db import models

# Create your models here.
class Image(models.Model):
    task = models.CharField(max_length=100, default='')
    image = models.ImageField()
    numberOfColors = models.IntegerField(default=0)
    image_id = models.IntegerField(default=0)
    def __str__(self):
        return self.image.name