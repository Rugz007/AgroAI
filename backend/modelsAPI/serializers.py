from rest_framework import serializers


class PredictionSerializer(serializers.Serializer):
    area = serializers.DecimalField(decimal_places=3,max_digits=15)
    state = serializers.CharField(max_length=100)
    district = serializers.CharField(max_length=100)
    season = serializers.CharField(max_length=100)
    crop = serializers.CharField(max_length=100)
