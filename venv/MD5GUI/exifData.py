import piexif
import os
from PIL import Image
from PIL.ExifTags import TAGS
import tkinter as tk
from tkinter.filedialog import askopenfilename

def jpg(Frame):
    GUI = tk.Tk()
    GUI.title('Senior Project')
    GUI.geometry("700x400")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Getting Information about JPG",
                      width=100, height=4, fg="blue")

    scroll = tk.Scrollbar(GUI,orient = "horizontal")

    button1 = tk.Button(GUI,
                        text="Browse for JPG",
                        command=lambda: [jpgInfo(window,L1)])
    buttonExit = tk.Button(GUI,
                           text="Exit",
                           command=GUI.destroy)

    window.grid(column=1, row=1)

    button1.grid(column=1, row=2)

    L1 = tk.Listbox(GUI, width=100, height=12)
    L1.config(xscrollcommand=scroll.set)
    L1.grid(column=1, row=3)
    scroll.grid(column=1,row = 4)
    buttonExit.grid(column=1, row=5)
    scroll.config(command=L1.xview)

def jpgInfo(window,L1):

    imageName = askopenfilename(
        title="Select JPG File",
        filetypes=(
            ("JPG Files", "*.jpg"),
            ("All Files", "*.*")))

    image = Image.open(imageName)

    #image.show()

    exif = piexif.load(imageName)
    window.configure(text="Metadata for: " + imageName)

    for ifd in exif:
        L1.insert(tk.END,ifd+":")
        print(f'{ifd}:')
        for tag in exif[ifd]:
            tagn = piexif.TAGS[ifd][tag]["name"]
            tagv = exif[ifd][tag]
            if isinstance(tagv, bytes):
                tagv = tagv[:10]
            print(f'\t{tagn}: {tagv}')
            L1.insert(tk.END,tagn+":"+tagv)



if __name__ == "__main__":
    jpg(GUI)
    # Let the window wait for any events
    GUI.mainloop()