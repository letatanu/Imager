# Convert Python data to API JSON format and vice-versa
from rest_framework import serializers
from imageFilter.models import Image
from django.conf import settings
import cv2
import os
import numpy as np
from colorthief import ColorThief

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    def save(self, **kwargs):
        name = super(PostSerializer, self).save()
        # image = self.validated_data['image']
        task = self.validated_data['task']
        name = str(name)
        print(name)
        name_modified = name[:-4] + task + name[-4:]
        if task == 'toGray':
            img = cv2.imread(os.path.join(settings.MEDIA_ROOT, str(name)), cv2.IMREAD_COLOR)
            # image = np.asarray(bytearray(image), dtype="uint8")
            # image = cv2.imdecode(image, cv2.IMREAD_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            print(name_modified)
            cv2.imwrite(os.path.join(settings.MEDIA_ROOT, name_modified), gray)
        return os.path.join(settings.MEDIA_URL,name_modified)