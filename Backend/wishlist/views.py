from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Wishlist
from products.models import Product
from .serializers import WishlistSerializer


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)


class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        wishlist.products.add(product)

        return Response({"message": "Product added to wishlist"})

class RemoveFromWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        wishlist = get_object_or_404(Wishlist, user=request.user)

        wishlist.products.remove(product_id)
        return Response({"message": "Product removed from wishlist"})
