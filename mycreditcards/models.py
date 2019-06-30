from django.db import models


class IssuingNetwork(models.Model):
    # Examples: "Lunchers Club", "European Express"
    name = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return self.name


class CardHolder(models.Model):
    # Example: "Matthew"
    first_name = models.CharField(max_length=50, null=False, blank=False)

    # Example: "Lopez"
    last_name = models.CharField(max_length=50, null=False, blank=False)

    # Example: "166737461198"
    id_number = models.CharField(max_length=12, null=False, blank=False)

    def __str__(self):
        return '{last_name}, {first_name} [{id_number}]'.format(
            last_name=self.last_name, first_name=self.first_name, id_number=self.id_number)


class CreditCard(models.Model):
    issuing_network = models.ForeignKey(
        IssuingNetwork, on_delete=models.PROTECT, blank=False, null=False)

    card_holder = models.ForeignKey(CardHolder, on_delete=models.CASCADE, blank=False, null=False)

    # Example: "Matthew Lopez"
    name_on_card = models.CharField(max_length=50, null=False, blank=False)

    # Example: "4673156615247325"
    card_number = models.CharField(max_length=19, null=False, blank=False)

    # Example: "770"
    cvv = models.CharField(max_length=3, null=False, blank=False)

    # Example: "02"
    expiration_month = models.CharField(max_length=2, null=False, blank=False)

    # Example: "2023"
    expiration_year = models.CharField(max_length=4, null=False, blank=False)

    def __str__(self):
        return '{name_on_card}, {issuing_network} {card_number}'.format(
            name_on_card=self.name_on_card,
            issuing_network=self.issuing_network.name,
            card_number=self.card_number)

