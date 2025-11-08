from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Test(APIView):
    def post(self, request):
        print(request.data)
        return Response({"message": "Hello world!"},
                        status=status.HTTP_200_OK)
