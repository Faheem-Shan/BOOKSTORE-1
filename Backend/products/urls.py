from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet,CategoryProductListView
from django.urls import path, include

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('', ProductViewSet,basename='product')

urlpatterns = [
    path('category/<str:category_name>/', CategoryProductListView.as_view(), name='category-products'),
    path('', include(router.urls)),
]