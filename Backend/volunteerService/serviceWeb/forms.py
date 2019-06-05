from django import forms  # 注意是django下的forms
from serviceWeb import models
class ArticleForm(forms.ModelForm):
    class Meta:
        model = models.UserProfile
        fields = "__all__"
        error_messages = {
            'myfile': {
                'invalid_image': '请上传正确格式的图片！'
            }
 
        }

