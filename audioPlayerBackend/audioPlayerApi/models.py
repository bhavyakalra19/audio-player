from django.db import models

# Create your models here.
class Genre(models.Model):
    category_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.category_name

class AudioSongs(models.Model):
    audio_name = models.CharField(max_length=100)
    audio_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, default=None)
    audio_file = models.FileField(null=True, blank=True, upload_to='audio/')
    audio_img = models.FileField(null=True, blank=True, upload_to='images/')

    def __str__(self):
        return self.audio_name