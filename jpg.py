import piexif
import os
from PIL import Image
from PIL.ExifTags import TAGS

imagename = r"C:\Users\Matt Savela\Desktop\image.jpg"
image = Image.open(imagename)

#image.show()



exif = piexif.load(imagename)
print(f"meta for {imagename}:")
for ifd in exif:
    print(f'{ifd}:')
    for tag in exif[ifd]:
        tagn = piexif.TAGS[ifd][tag]["name"]
        tagv= exif[ifd][tag]
        if isinstance(tagv, bytes):
            tagv = tagv[:10]
        print(f'\t{tagn}: {tagv}')
print()

#exif = image._getexif()
#if 271 in exif.keys():
#        print('Make:', exif[271])

# iterating over all EXIF data fields
#for tag_id in exifdata:
    # get the tag name, instead of human unreadable tag id
#   tag = TAGS.get(tag_id, tag_id)
#    data = exifdata.get(tag_id)
    # decode bytes
#    if isinstance(data, bytes):
#        data = data.decode()
#    print(f"{tag:25}: {data}")



