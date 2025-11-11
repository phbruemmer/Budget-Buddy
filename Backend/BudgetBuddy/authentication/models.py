import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

#                                                     # # # # # #
#   I need a countdown (5 minutes?) if the user is not verified #
#   within the time period the temporary user gets deleted.     #
# # # # # #                                                     #


class User(AbstractUser):
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=6, blank=True, null=True)

    def generate_verification_code(self):
        code = str(uuid.uuid4().int)[:6]
        self.verification_code = code
        self.save()
        print(self.verification_code)
        return code
