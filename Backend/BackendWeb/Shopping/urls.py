from django.contrib import admin
from django.urls import path
from .views import Login,SignUp,return_category,return_productInfo, return_banner,return_all_products

urlpatterns = [
    path('login/', Login, name='login'),
    path('signup/', SignUp, name='signup'),
    path('api/category/', return_category, name='category'),
    path('api/all-product/', return_productInfo, name='all-product'),
    path('api/product/', return_all_products, name='product'),
    path('api/all-banner/', return_banner, name= 'all-banner')
]