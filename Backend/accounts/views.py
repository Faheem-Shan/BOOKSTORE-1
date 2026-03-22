from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, UserSerializer

# Create your views here.

#Register
class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response({
                'success': True,
                'token': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#login API 
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)

#         if not user:
#             return Response(
#                 {'success': False, 'message': 'Invalid credentials'},
#                 status=status.HTTP_401_UNAUTHORIZED
#             )

#         if user.profile.is_blocked:
#             return Response(
#                 {'success': False, 'message': 'Your account is blocked'},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         refresh = RefreshToken.for_user(user)

#         return Response({
#         'success': True,
#         'access': str(refresh.access_token),
#         'refresh': str(refresh), # Add this!
#         'user': UserSerializer(user).data
#     }, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {'success': False, 'message': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Use getattr to avoid crashing if profile is missing
        profile = getattr(user, 'profile', None)
        if profile and profile.is_blocked:
            return Response(
                {'success': False, 'message': 'Your account is blocked'},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            'success': True,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                **UserSerializer(user).data,
                'role': 'admin' if user.is_staff else 'user', # This maps to your React role check
                'is_active': user.is_active
            }
        }, status=status.HTTP_200_OK)
    

class ForgotPasswordView(APIView):
    permission_classes = [] # Allow anyone to request a reset

    def post(self, request):
        email = request.data.get('email')
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
            
            # For now, we print to the console. Later you can use real SMTP.
            subject = 'Password Reset Request'
            message = f'Hi {user.username}, click the link below to reset your password: http://localhost:5173/reset-password'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            
            # send_mail(subject, message, email_from, recipient_list)
            
            return Response({"message": "Password reset link sent to your email."}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
        

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        
        try:
            user = User.objects.get(email=email)
            user.set_password(new_password) # This automatically hashes the password!
            user.save()
            return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)