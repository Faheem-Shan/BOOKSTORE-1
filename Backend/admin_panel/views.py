from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from django.db.models import Sum

# Import your models
from products.models import Product, Category
from orders.models import Order
from accounts.models import User
from products.serializers import ProductSerializer
from accounts.serializers import UserSerializer
from .serializers import CategorySerializer, OrderSerializer

class AdminDashboardStats(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            pending_count = Order.objects.filter(status__iexact="PENDING").count()
            revenue_query = Order.objects.filter(status__iexact="Delivered").aggregate(total=Sum('total_price'))
            total_revenue = revenue_query.get('total') or 0

            return Response({
                "totalProducts": Product.objects.count(),
                "totalUsers": User.objects.count(),
                "pendingOrders": pending_count,
                "outOfStock": Product.objects.filter(stock=False).count(),
                "totalRevenue": float(total_revenue),
                "totalExpenses": 3000.00,
            })
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        

class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all().order_by('-date_joined')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            profile = getattr(user, 'profile', None) 
            if not profile:
                return Response({"error": "This user has no profile record"}, status=status.HTTP_400_BAD_REQUEST)
                
            profile.is_blocked = not profile.is_blocked
            profile.save()
            return Response({"message": "User status updated", "is_blocked": profile.is_blocked})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class CategoryListCreateView(APIView):
   
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return []

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
            serializer = CategorySerializer(category, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# ---  Order Management ---
class AdminOrderListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        try:
            orders = Order.objects.all().select_related('user').prefetch_related('items__product').order_by('-created_at')
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Order List Error: {e}")
            return Response({"error": "Failed to fetch orders"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminOrderUpdateStatusView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            new_status = request.data.get('status')
            if new_status:
                order.status = new_status
                order.save()
                return Response({"message": "Status updated", "status": order.status})
            return Response({"error": "Status not provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        

class AdminProductListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        products = Product.objects.all().order_by('-id')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminProductDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            
            # FIXED: Using your field name 'stock'
            if 'toggle-stock' in request.path:
                product.stock = not product.stock
                product.save()
                return Response({
                    "stock": product.stock, 
                    "message": "Stock status updated"
                }, status=status.HTTP_200_OK)
            
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    