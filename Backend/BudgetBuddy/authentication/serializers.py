from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
import re


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50, required=True)

    password = serializers.CharField(write_only=True, min_length=6, required=True)
    password_2 = serializers.CharField(write_only=True, min_length=6, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password_2"]

    def validate_username(self, value):
        if not re.match(r'^[A-Za-z0-9_]+$', value):
            raise serializers.ValidationError("Username can only contain letters, numbers, and underscores.")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if not re.match(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', value):
            raise serializers.ValidationError("Invalid email format.")
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_password(self, value):
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def validate(self, data):
        if data.get('password') != data.get('password_2'):
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop("password_2")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            is_active=False,
        )

        code = user.generate_verification_code()
        send_mail(
            "Verification Code",
            f"Your verification code us: {code}",
            "noreply@budget-buddy.com",
            [user.email],
            fail_silently=False,
        )
        return user


class VerifyUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email")

        if user.verification_code != data['code']:
            raise serializers.ValidationError("Invalid verification code.")

        user.is_active = True
        user.is_verified = True
        user.verification_code = None
        user.save()

        return user
