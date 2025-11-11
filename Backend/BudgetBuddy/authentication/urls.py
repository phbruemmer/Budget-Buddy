from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, token_obtain_pair, token_refresh

from django.urls import path

from .views import RegisterView
from .views import VerifyUserView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="register"),
    path("verify/", VerifyUserView.as_view(), name="verify"),

]
