from django.urls import path
from .views import AdminDashboardStats,AdminUserListView,CategoryListCreateView,CategoryDetailView,AdminOrderListView,AdminOrderUpdateStatusView,AdminProductListView,AdminProductDetailView

urlpatterns = [
    # This matches the "Dashboard Overview" in your screenshot
    path("dashboard/", AdminDashboardStats.as_view(), name="admin-dashboard"),
    path("users/", AdminUserListView.as_view(), name="admin-user-list"),
    path("users/<int:pk>/toggle-block/", AdminUserListView.as_view(), name="admin-user-block"),
    # --- Categories ---
    path("categories/", CategoryListCreateView.as_view(), name="admin-category-list"),
    path("categories/<int:pk>/", CategoryDetailView.as_view(), name="admin-category-detail"),

    # --- Orders ---
    path("orders/", AdminOrderListView.as_view(), name="admin-order-list"),
    path("orders/<int:pk>/update-status/", AdminOrderUpdateStatusView.as_view(), name="admin-order-status"),

    # --- Products ---
    path("products/", AdminProductListView.as_view(), name="admin-product-list"),
    path("products/<int:pk>/toggle-stock/", AdminProductDetailView.as_view(), name="admin-product-toggle"),
    path("products/<int:pk>/", AdminProductDetailView.as_view(), name="admin-product-detail"),
    
]