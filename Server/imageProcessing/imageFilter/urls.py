from django.urls import path
from . import views


urlpatterns = [
    path('posts/', views.ImageFilterView.as_view(), name= 'posts_list'),
]