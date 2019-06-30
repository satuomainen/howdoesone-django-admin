import json
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import IssuingNetwork, CardHolder, CreditCard
from . serializers import IssuingNetworkSerializer, CardHolderSerializer, CreditCardSerializer

#from django.shortcuts import render
#from django.http import HttpResponse
#from rest_framework import status

class IssuingNetworkView(APIView):

    def get(self, request):
        issuing_networks = IssuingNetwork.objects.all()
        serializer = IssuingNetworkSerializer(issuing_networks, many=True)
        return Response(serializer.data)


class CardHolderView(APIView):

    def get(self, request):
        card_holders = CardHolder.objects.all()
        serializer = CardHolderSerializer(card_holders, many=True)
        return Response(serializer.data)


class CreditCardView(APIView):

    def get(self, request):
        card_holder_id_number = request.query_params.get('id_number', None)

        if card_holder_id_number is not None:
            credit_cards = CreditCard.objects.filter(card_holder__id_number=card_holder_id_number)
        else:
            credit_cards = CreditCard.objects.all()

        if not credit_cards:
            raise Http404

        serializer = CreditCardSerializer(credit_cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        post_body = json.loads(request.body);
        card_holder_id_number = post_body.get('id_number', None)

        if card_holder_id_number is not None:
            credit_cards = CreditCard.objects.filter(card_holder__id_number=card_holder_id_number)
        else:
            credit_cards = CreditCard.objects.all()

        if not credit_cards:
            raise Http404

        serializer = CreditCardSerializer(credit_cards, many=True)
        return Response(serializer.data)
