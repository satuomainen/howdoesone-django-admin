from rest_framework import serializers

from .models import IssuingNetwork, CardHolder, CreditCard


class IssuingNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssuingNetwork
        fields = '__all__'


class CardHolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardHolder
        fields = '__all__'


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'
