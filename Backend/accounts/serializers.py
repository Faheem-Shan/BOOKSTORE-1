from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    is_blocked = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_blocked']

    def get_role(self, obj):
        # First priority: Check Django's built-in staff/superuser status
        if obj.is_superuser or obj.is_staff:
            return "admin"
        
        # Second priority: Check the Profile model if it exists
        profile = getattr(obj, 'profile', None)
        if profile:
            return profile.role
        
        return "user"

    def get_is_blocked(self, obj):
        profile = getattr(obj, 'profile', None)
        if profile:
            return profile.is_blocked
        return False # Admins/Users without profiles aren't blocked by default
