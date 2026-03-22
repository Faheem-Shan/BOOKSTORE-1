from rest_framework import serializers
from products.models import Category, Product
from orders.models import Order, OrderItem
from accounts.models import User

# --- Category Serializer ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

# --- Order Item Serializer 
class OrderItemSerializer(serializers.ModelSerializer):
 
    product_title = serializers.ReadOnlyField(source='product.title')
    
    class Meta:
        model = OrderItem
        fields = ['product_title', 'quantity', 'price']

# --- Order Serializer ---
class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.StringRelatedField(source='user', read_only=True)
    total = serializers.ReadOnlyField(source='total_price')
    items = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()

    class Meta:
        model = Order
        
        fields = ['id', 'customer_name', 'status', 'total', 'created_at', 'items','payment_method']

    def get_payment_method(self, obj):
        return "Online Payment"

    def get_items(self, obj):
        return [
            {
                "product_title": item.product.title if item.product else "Deleted Product",
                "quantity": item.quantity,
                "price": str(item.price)
            } for item in obj.items.all()
        ]
    

class ProductSerializer(serializers.ModelSerializer):
   
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'price', 'offer_price','stock', 
            'image', 'category', 'category_name', 'is_instock', 'created_at'
        ]