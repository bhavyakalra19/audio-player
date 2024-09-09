from django.urls import path, include
from .views import *

urlpatterns = [
    path('api-auth/get-music',AudioSongsFunction),
    path('api-auth/register-user',RegisterUser.as_view()),
    path('api-auth/check-user',checkUser.as_view()),
]

