from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AccountTests(APITestCase):

    def test_user_registration(self):
        """
        UNIT TEST: User Registration
        Goal: Can a new visitor create an account?
        """
        # 1. ARRANGE: Define the URL and the data we want to send
        url = reverse('register')  # Make sure 'register' matches the name in your accounts/urls.py
        data = {
            "username": "tester",
            "email": "test@example.com",
            "password": "StrongPassword123",
            "first_name": "Test",
            "last_name": "User"
        }

        # 2. ACT: Send a fake 'POST' request to the API
        response = self.client.post(url, data)

        # 3. ASSERT: Check if the result is what we expected
        # We expect a 201 Created status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # We expect the database to now have 1 user
        self.assertEqual(User.objects.count(), 1)
        
        # We expect that user to have the username we gave
        self.assertEqual(User.objects.get().username, 'tester')