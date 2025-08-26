import jwt

from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.tokens import RefreshToken

from backend.settings import SIMPLE_JWT
from backend.views import response as res
from user.models import User


class isLoggedIn:
    def __init__(self, get_response):
        self.get_response = get_response

    def process_request(self, request):
        if request.path == "/api/users/me/":
            token = request.headers.get("token")

            if not token:
                return res(
                    **{
                        "massage": "ابتدا ورود یا ثبت نام کنید .",
                        "code": status.HTTP_400_BAD_REQUEST,
                    }
                )

            try:
                user_id = jwt.decode(
                    token,
                    SIMPLE_JWT["SIGNING_KEY"],
                    algorithms=[SIMPLE_JWT["ALGORITHM"]],
                ).get("user_id")
                refresh_token = RefreshToken(token=token)
                refresh_token.blacklist()

                user = User.objects.get(pk=user_id)
                request.user_data = user
            except:
                return res(
                    **{
                        "massage": "ابتدا ورود یا ثبت نام کنید .",
                        "code": status.HTTP_400_BAD_REQUEST,
                    }
                )

            return None

    def __call__(self, request):
        response = self.process_request(request)

        if response:
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            response.render()

            return response

        response = self.get_response(request)

        return response
