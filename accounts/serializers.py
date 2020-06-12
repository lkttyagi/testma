from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from django.contrib.auth import authenticate



class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('id','username',)

class UserSerializerWithToken(serializers.ModelSerializer):

		#token = serializers.SerializerMethodField()
		#password = serializers.CharField(write_only=True)

		'''def get_token(self,obj):
			jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
			jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

			payload = jwt_payload_handler(obj)
			token = jwt_encode_handler(payload)
			return token
			
		def create(self,validated_data):
			password = validated_data.pop('password',None)
			instance = self.Meta.model(**validated_data)

			if password is not None:
				instance.set_password(password)
			instance.save()
			return instance'''

		class Meta:
			model = User
			fields = ('id','password','email','first_name')
			extra_kwargs = {'password':{'write_only':True}}#new line
		def create(self,validated_data):
			print("email is",validated_data['email'])
			user = User.objects.create_user(validated_data['email'],None,validated_data['password'])
			return user
class LoginUserSerializer(serializers.Serializer):
	username = serializers.CharField()
	password =serializers.CharField()

	def validate(self,data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Unable to login with Provided Credentials")

