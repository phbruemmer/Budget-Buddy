from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Verification Info', {'fields': ('is_verified', 'verification_code')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Verification Info', {'fields': ('is_verified', 'verification_code')}),
    )

    readonly_fields = ('verification_code',)
