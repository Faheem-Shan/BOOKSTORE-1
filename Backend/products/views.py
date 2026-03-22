from django.shortcuts import render
from django.db import models
from rest_framework import viewsets,generics,status,filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         # Start with products that are in stock (matches your frontend logic)
#         queryset = Product.objects.filter(is_deleted=False)
        
#         # 1. CATEGORY FILTER
#         category = self.request.query_params.get('category')
#         if category and category != 'All':
#             queryset = queryset.filter(category__name__iexact=category)
        
#         # 2. SEARCH FILTER (Title or Author)
#         search = self.request.query_params.get('search')
#         if search:
          
#             queryset = queryset.filter(title__icontains=search) | queryset.filter(author__icontains=search)
            
#         # 3. SORTING LOGIC
#         sort = self.request.query_params.get('sort')
#         if sort == 'price-asc':
#             queryset = queryset.order_by('price')
#         elif sort == 'price-desc':
#             queryset = queryset.order_by('-price')
            
#         return queryset.distinct()

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_deleted=False)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    # We will handle filtering manually in get_queryset to match your Shop.jsx params
    def get_queryset(self):
        queryset = Product.objects.filter(is_deleted=False)
        
        # 1. SEARCH: Match 'search' param from React
        search_query = self.request.query_params.get('search')
        if search_query:
            # Using Q objects for OR logic (Title OR Author)
            queryset = queryset.filter(
                models.Q(title__icontains=search_query) | 
                models.Q(author__icontains=search_query)
            )
        
        # 2. CATEGORY: Match 'category' param from React
        category = self.request.query_params.get('category')
        if category and category != 'All':
            queryset = queryset.filter(category__name__iexact=category)
            
        # 3. SORT: Match 'sort' param from React
        sort_option = self.request.query_params.get('sort')
        if sort_option == 'price-asc':
            queryset = queryset.order_by('price')
        elif sort_option == 'price-desc':
            queryset = queryset.order_by('-price')
        else:
            queryset = queryset.order_by('-id') # Default sort
            
        return queryset.distinct()

    @action(detail=True, methods=['patch'], url_path='toggle-stock')
    def toggle_stock(self, request, pk=None):
        try:
            product = self.get_object()
            product.stock = not product.stock
            product.save()
            return Response({
                'success': True,
                'stock': product.stock 
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
       
        category_name = self.kwargs['category_name']
        return Product.objects.filter(
            category__name__iexact=category_name, 
            stock=True,
            is_deleted=False
        )