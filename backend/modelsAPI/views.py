from django.contrib.auth import models
from django.contrib.auth.models import User
from rest_framework import viewsets, status as http_status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import FormParser, JSONParser
from drf_yasg.utils import swagger_auto_schema
from .serializers import PredictionSerializer
import pickle
import pandas as pd
import numpy as np
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import sklearn 
import re
# Create your views here.
from .columns import columns



class MatchesViewSet(viewsets.ViewSet):
    parser_classes = (FormParser,JSONParser)
    permission_classes=(AllowAny,)
    @method_decorator(cache_page(60*60*2))
    @swagger_auto_schema(request_body=PredictionSerializer)
    def predict_production(self,request):
        '''
        Request to predict crop production
        '''
        try:
            directory = settings.BASE_DIR / 'modelsAPI' / 'models' / 'finalized_model.sav'
            loaded_model = pickle.load(open(directory, 'rb'))
        except Exception as e:
            return Response(status=http_status.HTTP_404_NOT_FOUND)
        list = []
        for value in request.data.values():
            list.append(value)
        list = [list]
        template = pd.DataFrame([],columns=columns)
        X = pd.DataFrame(list,columns=['Area','State_Name','District_Name','Season','Crop'])
        X = pd.get_dummies(X)
        frames = [template,X]
        result = pd.concat(frames)
        result = result.fillna(0)
        prediction = loaded_model.predict(X)
        return Response(prediction[0],status=http_status.HTTP_200_OK)