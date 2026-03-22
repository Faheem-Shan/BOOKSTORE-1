# orders/urls.py
from django.urls import path
from .views import CreateRazorpayOrder,PlaceOrderView, OrderListView

urlpatterns = [
    path("create-payment/", CreateRazorpayOrder.as_view()),
    path('place/', PlaceOrderView.as_view()),
    path('', OrderListView.as_view()),
]
