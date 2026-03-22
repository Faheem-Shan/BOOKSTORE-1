from django.contrib import admin
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # These MUST match the field names in your models.py exactly
    list_display = ('id', 'title', 'price', 'is_deleted')
    list_editable = ('is_deleted',)
    list_filter = ('is_deleted',)