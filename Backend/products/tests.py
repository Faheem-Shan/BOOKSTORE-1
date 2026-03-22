from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Product, Category

class ProductTests(APITestCase):
    def setUp(self):
        # 1. ADMIN SETUP
        self.admin_user = User.objects.create_superuser(
            username='admin', 
            password='password123', 
            email='admin@test.com'
        )
        self.client.force_authenticate(user=self.admin_user)

        # 2. DATA SETUP
        self.category = Category.objects.create(name="Science")
        
        # Product 1: Active
        self.active_book = Product.objects.create(
            category=self.category,
            title="Cosmos",
            author="Carl Sagan",
            price=25.00,
            stock=True,
            is_deleted=False
        )
        
        # Product 2: Soft-Deleted
        self.deleted_book = Product.objects.create(
            category=self.category,
            title="Old Theory",
            author="Unknown",
            price=5.00,
            stock=True,
            is_deleted=True 
        )

    def test_soft_delete_filtering(self):
        """Ensure the API only shows books that are NOT deleted."""
        url = reverse('product-list') 
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['title'], "Cosmos")

    def test_toggle_stock_action(self):
        """Ensure the toggle button updates the database."""
        # Note: Check if your URL name is 'product-toggle-stock' in urls.py
        url = reverse('product-toggle-stock', kwargs={'pk': self.active_book.pk})
        
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.active_book.refresh_from_db()
        self.assertFalse(self.active_book.stock)

    def test_search_functionality(self):
        """Ensure searching for 'Cosmos' returns the right book."""
        url = reverse('product-list')
        response = self.client.get(url, {'search': 'Cosmos'})
        
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['title'], "Cosmos")