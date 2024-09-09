# from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

# Create your views here.
class RegisterUser(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = UserSerializer(data = request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({'status': 403, 'message': serializer.errors})
        serializer.save()
        user = User.objects.get(username = serializer.data['username'])
        token_obj, _ = Token.objects.get_or_create(user = user)
        return Response({'status': 200, 'payload': serializer.data, 'message': 'User Registration is Successful', 'token': str(token_obj)})
    

class checkUser(APIView):
    def post(self,request):
        print(request.data)
        print("hello")
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user is None:
            return Response({"response":"Eithet username or password is incorrect"},status=status.HTTP_404_NOT_FOUND)
        else:
            user = User.objects.get(username = request.data['username'])
            token_obj, _ = Token.objects.get_or_create(user = user)
            return Response({'status': 200, 'token': str(token_obj)})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AudioSongsFunction(request):
    try:
        data = []
        if not request.data:
            audio_objs = AudioSongs.objects.all()[:7]
        else:
            audio_objs = AudioSongs.objects.filter(audio_name__icontains = request.data['name'])[:7]
        if not audio_objs:
            return Response(data, status=status.HTTP_200_OK)

        serializer = AudioSongsSerializer(audio_objs, many = True)
        if serializer.data:
            for audioData in serializer.data:
                response_data = {
                    'id': audioData['id'],
                    'audio_name': audioData['audio_name'],
                    'audio_data': audioData['audio_file'],
                    'audio_image': audioData['audio_img'],
                    'audio_genre':audioData['audio_genre']['category_name'],
                }
                data.append(response_data)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'status': status.HTTP_200_OK, 'message': 'No data found in backend'})
    except AudioSongs.DoesNotExist:
        return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)