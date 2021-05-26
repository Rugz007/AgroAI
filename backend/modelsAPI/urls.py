from django.urls import path
from .views import *


urlpatterns = [
    path('production',MatchesViewSet.as_view({'post':'predict_production'}),name='predictProduction'),
]
