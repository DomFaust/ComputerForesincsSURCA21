
#this works for jfif, png, jpg will not print out exif data0

from hachoir.parser import createParser
from hachoir.metadata import extractMetadata

filename = r"C:\Users\Matt Savela\Desktop\cat.jpg"
parser = createParser(filename)
metadata = extractMetadata(parser)

for line in metadata.exportPlaintext():
    print(line)