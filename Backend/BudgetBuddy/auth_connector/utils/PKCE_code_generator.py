import secrets
import hashlib
import base64


def generate_code_verifier():
    return base64.urlsafe_b64encode(
        secrets.token_bytes(32)
    ).rstrip(b'=').decode('ascii')

def generate_code_challenge(verifier):
    digest = hashlib.sha256(verifier.encode('ascii')).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b'=').decode('ascii')

def get_pkce():
    verifier = generate_code_verifier()
    challenge = generate_code_challenge(verifier)
    return verifier, challenge

