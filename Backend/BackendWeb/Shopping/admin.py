from django.contrib import admin
from .models import User, ProductVideo, ProductImage, Product, ProductVisit, ProductVisitSummary, Cart, CartItem, Category, DiscountCode, PriceHistory,Banner
# Register your models here.
myModels = [User, ProductVideo, ProductImage, Product, ProductVisit, ProductVisitSummary, Cart, CartItem, Category, DiscountCode, PriceHistory,Banner]  # iterable list
admin.site.register(myModels)