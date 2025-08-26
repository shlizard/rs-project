from django.shortcuts import render
from django.contrib.auth import password_validation
from rest_framework import generics
from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import exceptions

from backend.views import response

from .models import User
from .serializers import UserSerializer

# Create your views here.


class UserViewSet(ViewSet):
    def register(self, request):
        user_data = request.data
        email = user_data.get("email")
        password = user_data.get("password")

        if not email:
            return response(
                **{
                    "massage": "ایمیل باید وارد شود .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )

        if not password:
            return response(
                **{
                    "massage": "رمز عبور باید وارد شود .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )

        try:
            User.objects.get(email=email)

            return response(
                **{
                    "massage": "این ایمیل قبلا استفاده شده است .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )
        except User.DoesNotExist:
            serializer = UserSerializer(data=user_data)

            if not serializer.is_valid():
                return response(
                    **{
                        "massage": "ایمیل یا رمز عبور وارد شده صحیح نمی‌باشد .",
                        "code": status.HTTP_400_BAD_REQUEST,
                    }
                )

            user = User.objects.create(email=email)
            user.set_password(password)
            user.save()
            token = RefreshToken.for_user(user)
            serializer = UserSerializer({"email": user.email, "id": user.id, "token": token})

        return response(
            **{
                "massage": "ثبت نام با موفقیت انجام شد .",
                "data": serializer.data,
                "code": status.HTTP_201_CREATED,
            }
        )

    def login(self, request):
        user_data = request.data
        email = user_data.get("email")
        password = user_data.get("password")

        if not email:
            return response(
                **{
                    "massage": "ایمیل باید وارد شود .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )

        if not password:
            return response(
                **{
                    "massage": "رمز عبور باید وارد شود .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )

        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                return response(
                    **{
                        "massage": "ایمیل یا رمز عبور وارد شده صحیح نمی‌باشد .",
                        "code": status.HTTP_400_BAD_REQUEST,
                    }
                )

            token = RefreshToken.for_user(user)
            serializer = UserSerializer({"email": user, "id": user.id, "token": token})

            return response(
                **{
                    "massage": "ورود با موفقیت انجام شد .",
                    "data": serializer.data,
                    "code": status.HTTP_200_OK,
                }
            )

        except User.DoesNotExist:
            return response(
                **{
                    "massage": "ایمیل یا رمز عبور وارد شده صحیح نمی‌باشد .",
                    "code": status.HTTP_400_BAD_REQUEST,
                }
            )

    def user(self, request):
        user = request.user_data
        token = RefreshToken.for_user(user=user)

        serializer = UserSerializer({"email": user, "id": user.id, "token": token})

        return response(
            **{
                "massage": "ورود شما با موفقیت انجام شد",
                "data": serializer.data,
                "code": status.HTTP_200_OK,
            }
        )

    def users(self, request):
        users = User.objects.all()

        serializer = UserSerializer(users, many=True)

        return response(
            **{
                "massage": "اطلاعات با موفقیت ارسال شد .",
                "data": serializer.data,
                "code": status.HTTP_200_OK,
            }
        )


# def main(request):
#     pass


# class userApiView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
