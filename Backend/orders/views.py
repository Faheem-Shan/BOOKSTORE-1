from django.shortcuts import render
import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from cart.models import Cart
from .models import Order, OrderItem

class CreateRazorpayOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = int(float(request.data.get("amount")) * 100)  # convert to paisa

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response({
            "order_id": order["id"],
            "amount": order["amount"],
            "key": settings.RAZORPAY_KEY_ID
        })


class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = Cart.objects.get(user=request.user)
        if not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        total = 0
        order = Order.objects.create(user=request.user, total_price=0)

        for item in cart.items.all():
            price = item.product.offer_price or item.product.price
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=price
            )
            total += price * item.quantity

        order.total_price = total
        order.save()
        cart.items.all().delete()

        return Response({"message": "Order placed successfully"})


class OrderListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        data = []
        for order in orders:
            data.append({
                "id": order.id,
                "total": order.total_price,
                "status": order.status,
                "items": [
                    {
                        "title": item.product.title,
                        "quantity": item.quantity,
                        "price": item.price,
                        "image": request.build_absolute_uri(item.product.image.url) if item.product.image else None
                    } for item in order.items.all()
                ]
            })
        return Response(data)
