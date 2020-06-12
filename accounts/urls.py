from django.urls import path,include
from .views import UserAPI,UserList,LoginAPI

urlpatterns=[
	#path('',include('rest_auth.urls')),
	#path('registration/verify-email/', ConfirmEmailView.as_view(), name='rest_verify_email'),
	#path('registraion/',include('rest_auth.registration.urls')),
    #path('rest-auth/registration/account-email-verification-sent/', django_rest_auth_null, name='account_email_verification_sent'),
	path('register/',UserList.as_view()),
	path('login/',LoginAPI.as_view()),
	path('user/',UserAPI.as_view())
	
]