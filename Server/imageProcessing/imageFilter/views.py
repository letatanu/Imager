from imageFilter.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from imageFilter.models import Image
from django.conf import settings
import cv2
import os
import numpy as np
from colorthief import ColorThief
# Create your views here.
class ImageFilterView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Image.objects.all()
        print(request)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # ''' Begin reCAPTCHA validation '''
        #         # recaptcha_response = request.POST.get('g-recaptcha-response')
        #         # url = 'https://www.google.com/recaptcha/api/siteverify'
        #         # values = {
        #         #     'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
        #         #     'response': recaptcha_response
        #         # }
        #         # data = urllib.parse.urlencode(values).encode()
        #         # req = urllib.request.Request(url, data=data)
        #         # response = urllib.request.urlopen(req)
        #         # result = json.loads(response.read().decode())
        #         # ''' End reCAPTCHA validation '''
        #         #
        #         # if result['success']:
        print(request.data)
        post_serializer = PostSerializer(data=request.data)
        if post_serializer.is_valid():
            img = post_serializer.validated_data['image']
            if img:
                image = img.file.read()
                name = img.name
                task = post_serializer.validated_data['task']
                name_modified = name[:-4] + task + name[-4:]
                if task == 'toGray':
                    image = np.asarray(bytearray(image), dtype="uint8")
                    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                    cv2.imwrite(os.path.join(settings.MEDIA_ROOT, name_modified), gray)
                    print(name_modified)
                    return Response(str(os.path.join(settings.MEDIA_URL,name_modified)), status=status.HTTP_200_OK)
                elif task == 'palette':
                    img = post_serializer.save()
                    img_url = os.path.join(settings.MEDIA_ROOT, str(img))
                    numOfColors = int(post_serializer.validated_data["numberOfColors"])
                    colorTh = ColorThief(img_url)
                    palette = colorTh.get_palette(numOfColors)
                    print(palette)
                    os.remove(img_url)
                    return Response(palette, status=status.HTTP_200_OK)
                elif task == "Gaussian":
                    image = np.asarray(bytearray(image), dtype="uint8")
                    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                    gauss = cv2.GaussianBlur(image,(5,5),0)
                    cv2.imwrite(os.path.join(settings.MEDIA_ROOT, name_modified), gauss)
                    print(name_modified)
                    return Response(str(os.path.join(settings.MEDIA_URL, name_modified)), status=status.HTTP_200_OK)
                elif task == "Detail":
                    image = np.asarray(bytearray(image), dtype="uint8")
                    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                    detail = cv2.detailEnhance(image, sigma_s=10, sigma_r=0.15)
                    cv2.imwrite(os.path.join(settings.MEDIA_ROOT, name_modified), detail)
                    print(name_modified)
                    return Response(str(os.path.join(settings.MEDIA_URL, name_modified)), status=status.HTTP_200_OK)
            # name = post_serializer.save()
            # name = str(name)
            # name_modified = name[:-4] + "_modified" + name[-4:]
            # if ('toGray' in request.data):
            #     img = cv2.imread(os.path.join(settings.MEDIA_ROOT, str(name)), cv2.IMREAD_COLOR)
            #     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            #     print(name_modified)
            #     cv2.imwrite(os.path.join(settings.MEDIA_ROOT,name_modified), gray)
            return Response("Failed", status=status.HTTP_400_BAD_REQUEST)
        else:
            print("error", post_serializer.errors)
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)