from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import Userserializer, CategorySerializer, ProductSerializer, ProductVisitSummarySerializer, BannerSerializer
from .models import User,Category, Product, ProductVisitSummary, Banner

# Create your views here.
@api_view(['POST'])
def Login(request):
    if request.method == 'POST':
        try:
            is_user = User.objects.get(password=request.data['password'], email=request.data['email'])
        except User.DoesNotExist:
             return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = Userserializer(is_user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def SignUp(request):
    serializer = Userserializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def return_category(request):
    query = Category.objects.all()
    serializer = CategorySerializer(query, many=True)
    return Response(serializer.data, status= status.HTTP_200_OK)

@api_view(['GET'])
def return_productInfo(request):
    query = ProductVisitSummary.objects.all()
    serializer = ProductVisitSummarySerializer(query, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def return_all_products(request):
    query = Product.objects.all()
    serializer = ProductSerializer(query, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def return_banner(request):
    query = Banner.objects.all()
    serializer = BannerSerializer(query, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)