from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import permissions,status,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer , UserSerializerWithToken ,LoginUserSerializer

from knox.models import AuthToken

#from rest_framework.exceptions import NotFound
#from rest_framework.views import APIView
#from allauth.account.models import EmailConfirmation,EmailConfirmationHMAC
#from django.utils.translation import ugettext_lazy as _
#from rest_auth.registration.serializers import VerifyEmailSerializer


'''@api_view(['GET'])
def current_user(request):

	serializer = UserSerializer(request.user)
	return Response(serializer.data)'''

class UserList(generics.GenericAPIView):
	
	serializer_class = UserSerializerWithToken

	def post(self,request,*args,**kwargs):
		
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()
			
		if user:
			
			return Response({
				"user":UserSerializer(user,context=self.get_serializer_context()).data,
				"token":AuthToken.objects.create(user)[1]
			})

				#f Response(status=status.HTTP_201_CREATED):

				
class LoginAPI(generics.GenericAPIView):
	serializer_class = LoginUserSerializer

	def post(self,request,*args,**kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		return Response({
			"user":UserSerializer(user,context=self.get_serializer_context()).data,
			"token":AuthToken.objects.create(user)[1]
		})		

class UserAPI(generics.RetrieveAPIView):
	permission_classes =(permissions.IsAuthenticated,)
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

'''@api_view()
def django_rest_auth_null():
	return Response(status=status.HTTP_400_BAD_REQUEST)

class ConfirmEmailView(APIView):
	permission_classes=[permissions.AllowAny]
	allowed_methods = ('POST','OPTIONS','HEAD')

	def get_serializer(self, *args, **kwargs):
		return VerifyEmailSerializer(*args,**kwargs)

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.kwargs['key'] = serializer.validated_data['key']
		try:
			confirmation = self.get_object()
			confirmation.confirm(self.request)
			return Response({'detail': _('Successfully confirmed email.')}, status=status.HTTP_200_OK)
		except EmailConfirmation.DoesNotExist:
			return Response({'detail': _('Error. Incorrect key.')}, status=status.HTTP_404_NOT_FOUND)

	def get_object(self, queryset=None):
		key = self.kwargs['key']
		emailconfirmation = EmailConfirmationHMAC.from_key(key)
		if not emailconfirmation:
			if queryset is None:
				queryset = self.get_queryset()
			try:
				emailconfirmation = queryset.get(key=key.lower())
			except EmailConfirmation.DoesNotExist:
				raise EmailConfirmation.DoesNotExist
		return emailconfirmation

	def get_queryset(self):
		qs = EmailConfirmation.objects.all_valid()
		qs = qs.select_related("email_address__user")
		return qs'''