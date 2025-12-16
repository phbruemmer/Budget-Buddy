from django.urls import path, include
from .views import LoginInitiatorView

urlpatterns = [
    path('init-login/', LoginInitiatorView.as_view(), name='LoginInitiatorView'),
]
