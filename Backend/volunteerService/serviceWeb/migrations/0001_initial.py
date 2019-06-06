# Generated by Django 2.2.2 on 2019-06-06 03:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Managment',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('role', models.CharField(choices=[('s', '学生'), ('o', '组织'), ('a', '管理员')], db_column='role', default='a', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='OrganProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(db_column='name', max_length=70)),
                ('role', models.CharField(choices=[('s', '学生'), ('o', '组织'), ('a', '管理员')], db_column='role', default='o', max_length=1)),
                ('phone', models.CharField(db_column='phone', default='', max_length=18)),
                ('qq', models.CharField(db_column='qq', default='', max_length=14)),
                ('wechat', models.CharField(db_column='wechat', default='', max_length=30)),
                ('avatar', models.ImageField(blank=True, db_column='avatar', upload_to='static/image/OrganAvatar')),
                ('reputation', models.IntegerField(db_column='reputation', default=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(db_column='name', max_length=10)),
                ('role', models.CharField(choices=[('s', '学生'), ('o', '组织'), ('a', '管理员')], db_column='role', default='s', max_length=1)),
                ('gender', models.CharField(choices=[('f', '女'), ('m', '男')], db_column='gender', default='f', max_length=1)),
                ('status', models.CharField(choices=[('n', '正常'), ('b', '被拉黑')], db_column='status', default='n', max_length=1)),
                ('phone', models.CharField(db_column='phone', max_length=18)),
                ('dept', models.CharField(db_column='dept', max_length=30)),
                ('timeAll', models.IntegerField(db_column='timeAll', default=0)),
                ('avatar', models.ImageField(blank=True, db_column='avatar', upload_to='image/UserAvatar')),
                ('reputation', models.IntegerField(db_column='reputation', default=100)),
            ],
        ),
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('ID', models.IntegerField(db_column='ID', primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.UserProfile')),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('ID', models.IntegerField(db_column='id', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='name', max_length=70)),
                ('activityTime', models.DateTimeField(db_column='activityTime')),
                ('signStartTime', models.DateTimeField(db_column='signStartTime')),
                ('signEndTime', models.DateTimeField(db_column='signEndTime')),
                ('lastTime', models.IntegerField(db_column='lastTime')),
                ('maxNumber', models.IntegerField(db_column='maxNumber')),
                ('text', models.CharField(db_column='text', max_length=512)),
                ('status', models.CharField(choices=[('n', '未审核'), ('o', '已审核'), ('u', '报名中'), ('i', '进行中'), ('e', '结束')], db_column='status', default='n', max_length=1)),
                ('number', models.IntegerField(db_column='number', default=0)),
                ('avatar', models.ImageField(blank=True, db_column='avatar', upload_to='image/Activity')),
                ('organ', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.OrganProfile')),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('n', '已报名'), ('i', '已参加'), ('e', '时长已录入'), ('u', '未参加'), ('y', '取消报名')], db_column='status', default='n', max_length=1)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.Activity')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.UserProfile')),
            ],
            options={
                'unique_together': {('activity', 'user')},
            },
        ),
        migrations.CreateModel(
            name='Evaluation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.CharField(db_column='grade', default='5', max_length=1)),
                ('comment', models.CharField(db_column='comment', default='', max_length=1024)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.Activity')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='serviceWeb.UserProfile')),
            ],
            options={
                'unique_together': {('user', 'activity')},
            },
        ),
    ]
