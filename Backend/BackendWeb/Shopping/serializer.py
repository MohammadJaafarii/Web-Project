from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers
from django.conf import settings
from .models import User, ProductVideo, ProductImage, Product, ProductVisit, ProductVisitSummary, Cart, CartItem, Category, DiscountCode, PriceHistory,Banner

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = SerializerMethodField('get_image_url')


    class Meta:
        model = ProductImage
        fields = ['id','product' ,'image', 'alt_text', 'image_url']

    def get_image_url(self, obj):
        return f"http://127.0.0.1:8000/{obj.image.url}"

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'description', 'more_description',
            'brand', 'height', 'width', 'screen_size', 'model_number',
            'ram_size', 'operating_system', 'color', 'images'
        ]

class PricehistorySerializer(ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = '__all__'



class CartitemSerializer(ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    image_url = SerializerMethodField('get_image_url')


    class Meta:
        model = Category
        fields = ('name', 'image', 'image_url')

    image = serializers.FileField(use_url=True)

    def get_image_url(self, obj):
        return f"http://127.0.0.1:8000/{obj.image.url}"


class DiscountcodeSerializer(ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = '__all__'



class ProductvisitSerializer(ModelSerializer):
    class Meta:
        model = ProductVisit
        fields = '__all__'

class BannerSerializer(ModelSerializer):
    image_url = SerializerMethodField('get_image_url')

    class Meta:
        model = Banner
        fields = ['image', 'product_b', 'name', 'description', 'url', 'image_url']

    def get_image_url(self, obj):
        return f"http://127.0.0.1:8000/{obj.image.url}"




class ProductVisitSummarySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ProductVisitSummary
        fields = [
            'id', 'product', 'start_date', 'end_date', 'total_visits'
        ]
        ordering = ['-total_visits']
class Userserializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

