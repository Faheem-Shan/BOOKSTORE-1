from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='user'
    )
    is_blocked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} ({self.role})"
