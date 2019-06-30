from django.contrib import admin

from .models import CardHolder, CreditCard, IssuingNetwork

# Register your models here.
admin.site.register(CardHolder)
admin.site.register(CreditCard)
admin.site.register(IssuingNetwork)

