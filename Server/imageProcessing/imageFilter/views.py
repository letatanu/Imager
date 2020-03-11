from imageFilter.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from imageFilter.models import Image

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
        # recaptcha_response = request.POST.get('g-recaptcha-response')
        # url = 'https://www.google.com/recaptcha/api/siteverify'
        # values = {
        #     'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
        #     'response': recaptcha_response
        # }
        # data = urllib.parse.urlencode(values).encode()
        # req = urllib.request.Request(url, data=data)
        # response = urllib.request.urlopen(req)
        # result = json.loads(response.read().decode())
        # ''' End reCAPTCHA validation '''
        #
        # if result['success']:
        print(request.data)
        post_serializer = PostSerializer(data=request.data)
        if post_serializer.is_valid():
            name = post_serializer.save()
            # name = str(name)
            # name_modified = name[:-4] + "_modified" + name[-4:]
            # if ('toGray' in request.data):
            #     img = cv2.imread(os.path.join(settings.MEDIA_ROOT, str(name)), cv2.IMREAD_COLOR)
            #     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            #     print(name_modified)
            #     cv2.imwrite(os.path.join(settings.MEDIA_ROOT,name_modified), gray)
            return Response(str(name), status=status.HTTP_201_CREATED)
        else:
            print("error", post_serializer.errors)
            return Response(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)