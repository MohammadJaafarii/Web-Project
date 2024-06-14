from django.db import models
from colorfield.fields import ColorField
from django.db.models import F, Sum
from django.utils import timezone


# Create your models here.

class User(models.Model):
  username = models.CharField(max_length=20,verbose_name='username')
  password = models.CharField(max_length=50, verbose_name='password')
  email = models.EmailField(max_length=100, unique=True,verbose_name='Email')

  def __str__(self):
    return self.username


class ProductVideo(models.Model):
  """مدل ویدیو محصول"""

  product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product')  # ارتباط با مدل محصول
  video = models.FileField(upload_to="files")  # آدرس URL ویدیو
  title = models.CharField(max_length=255)  # عنوان ویدیو

class ProductImage(models.Model):
  """مدل تصویر محصول"""
  product = models.ForeignKey('Product', blank=True, related_name='images', on_delete=models.CASCADE, null=True)
  image = models.FileField(upload_to="files")  # آدرس URL تصویر
  alt_text = models.CharField(max_length=255)  # متن جایگزین برای تصویر

class Product(models.Model):
  """مدل محصول"""

  name = models.CharField(max_length=255, null=True)  # نام محصول
  price = models.DecimalField(max_digits=10, decimal_places=2 , null=True)  # قیمت
  description = models.TextField( null=True)  # توضیحات
  explain = models.CharField(max_length=300,null=True)
  more_description = models.TextField(blank=True, null=True)  # توضیحات بیشتر
  brand = models.CharField(max_length=255, null=True)  # برند
  height = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # ارتفاع
  width = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # عرض
  screen_size = models.CharField(max_length=255, blank=True, null=True)  # سایز صفحه
  model_number = models.CharField(max_length=255, null=True)  # شماره مدل
  ram_size = models.CharField(max_length=255, blank=True, null=True)  # سایز رم
  operating_system = models.CharField(max_length=255, blank=True, null=True)  # نوع سیستم عامل

  product_images = models.ManyToManyField('ProductImage', blank=True, related_name='videos')

  # فیلدهای مربوط به ویدیو
  product_videos = models.ManyToManyField('ProductVideo', blank=True, related_name='videos')

  # فیلد رنگ (می توانید از مدل جداگانه ای برای رنگ ها استفاده کنید)
  color = ColorField()

class PriceHistory(models.Model):
    """مدل تاریخچه قیمت"""

    product = models.ForeignKey('Product', on_delete=models.CASCADE,
                                  related_name='price_history')  # ارتباط با مدل محصول
    date_time = models.DateTimeField(default=timezone.now)  # تاریخ و زمان
    price = models.DecimalField(max_digits=10, decimal_places=2)  # قیمت

    class Meta:
        ordering = ['-date_time']  # مرتب سازی بر اساس تاریخ و زمان (جدیدترین در بالا)


class Cart(models.Model):
  """مدل سبد خرید"""

  user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='carts')  # ارتباط با کاربر***
  active = models.BooleanField(default=True)  # فعال یا غیرفعال
  created_at = models.DateTimeField(auto_now_add=True)  # تاریخ و زمان ایجاد
  updated_at = models.DateTimeField(auto_now=True)  # تاریخ و زمان آخرین به روز رسانی


class CartItem(models.Model):
  """مدل آیتم سبد خرید"""

  cart = models.ForeignKey('Cart', on_delete=models.CASCADE, related_name='cart_items')  # ارتباط با سبد خرید
  product = models.ForeignKey('Product', on_delete=models.CASCADE)  # ارتباط با مدل محصول
  quantity = models.PositiveIntegerField()  # تعداد


class Category(models.Model):
  """مدل دسته‌بندی"""

  name = models.CharField(max_length=255)  # نام دسته‌بندی
  image = models.FileField(upload_to="uploads/")
  nextleveone = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='next_one')
  nextlevetwo = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='next_two')
  nextlevethree = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='next_three')
  nextlevefour = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='next_four')
  nextlevefive = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='next_five')

  def __str__(self):
      return self.name



class DiscountCode(models.Model):
  """مدل کد تخفیف"""

  code = models.CharField(max_length=255, unique=True)  # کد تخفیف
  description = models.CharField(max_length=255)  # توضیحات
  discount_type = models.CharField(max_length=50, choices=[('percentage', 'درصد'), ('amount', 'مقدار')])  # نوع تخفیف (درصد یا مقدار)
  discount_value = models.DecimalField(max_digits=5, decimal_places=2)  # مقدار تخفیف
  max_discount = models.DecimalField(max_digits=10, decimal_places=2)  # حداکثر تخفیف
  is_active = models.BooleanField(default=True)  # فعال یا غیرفعال
  valid_from = models.DateTimeField(blank=True, null=True)  # تاریخ شروع اعتبار
  valid_until = models.DateTimeField(blank=True, null=True)  # تاریخ انقضا

  # مدل های مرتبط
  products = models.ManyToManyField('Product', blank=True)  # محصولات مرتبط
  categories = models.ManyToManyField('Category', blank=True)  # دسته‌بندی‌های مرتبط

  def __str__(self):
    return self.code

class ProductVisit(models.Model):
  """مدل بازدید محصول"""

  product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_visits')  # ارتباط با مدل محصول
  visit_date = models.DateTimeField(default=timezone.now)  # تاریخ و زمان بازدید

class ProductVisitSummary(models.Model):
  """مدل خلاصه بازدید محصول"""

  product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_visit_summaries')  # ارتباط با مدل محصول
  start_date = models.DateTimeField()  # تاریخ شروع بازه زمانی
  end_date = models.DateTimeField()  # تاریخ پایان بازه زمانی
  total_visits = models.PositiveIntegerField()  # تعداد کل بازدیدها

  class Meta:
    ordering = ['-total_visits']

class Banner(models.Model):
  image = models.FileField(upload_to="files")  # آدرس URL تصویر
  product_b = models.ForeignKey('Product', blank=True, related_name='product_1', on_delete=models.CASCADE, null=True)
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=200)
  url = models.CharField(max_length=50)