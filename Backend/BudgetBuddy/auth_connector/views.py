from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from django.shortcuts import redirect

from django.utils import timezone

from .utils import PKCE_code_generator as pkce_cg

import secrets


class LoginInitiatorView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Generate Code Verifier #
        verifier, challenge = pkce_cg.get_pkce()

        # CSRF - oauth state
        state = secrets.token_urlsafe(32)

        print(verifier)
        print(challenge)
        print(state)

        # Create Session #
        request.session['pre_login'] = True
        request.session['pkce_verifier'] = verifier
        request.session['oauth_state'] = state
        request.session['created_at'] = timezone.now().isoformat()
        request.session.cycle_key()
        request.session.set_expiry(600)
        # Create Session #

        print(request.session)

        # Build URL #
        auth_url = (
            "http://192.168.115.200:8081/authorize"
            "?response_type=code"
            "&client_id=JyBNlpc8hXBAINEMqfg1Tb4ULL9mLxhAwfF1W7s7"
            "redirect_uri=http://192.168.115.200:8080/auth/callback"
            f"&code_challenge={challenge}"
            f"&code_challenge_method=S256"
            f"&state={state}"
        )
        print(auth_url)

        return redirect(auth_url)
