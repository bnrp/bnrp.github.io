from PIL import Image
import os

thumbnail_folder = './thumbnails/'

height = 250

for file in os.listdir('.'):
    try:
        with Image.open(file) as im:
            x,y = im.size
            scale = height / y
            im.thumbnail((round(x*scale), height))
            im.save(thumbnail_folder + file, icc_profile=im.info.get('icc_profile'))
    except:
        print("Cannot create thumbnail for", file)      
        
