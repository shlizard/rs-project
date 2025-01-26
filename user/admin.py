from django.contrib import admin
from .models import Users
# Register your models here.



# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    pass

admin.site.register(Users, UsersAdmin)