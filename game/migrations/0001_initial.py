# Generated by Django 2.0.4 on 2018-06-20 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TRoom',
            fields=[
                ('roomId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('roomSetId', models.CharField(max_length=50)),
                ('personNum', models.IntegerField()),
            ],
        ),
    ]