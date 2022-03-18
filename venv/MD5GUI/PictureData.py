from hachoir.parser import createParser
from hachoir.metadata import extractMetadata
from collections import defaultdict
import tkinter as tk
from tkinter.filedialog import askopenfilename
import json
import firebase_admin
from firebase_admin import db
import datetime
from datetime import date

def png(Frame):
    GUI = tk.Tk()
    GUI.title('Senior Project')
    GUI.geometry("700x400")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Getting Information about Pictures",
                      width=100, height=4, fg="blue")

    scroll = tk.Scrollbar(GUI,orient = "horizontal")

    button1 = tk.Button(GUI,
                        text="Browse for Picture",
                        command=lambda: [clear(L1),pngInfo(window,L1)])
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

def clear(L1):
    L1.delete(0,tk.END)

def pngInfo(window,L1):
    data  = {}
    ref = db.reference("/Picture Metadata/" + date.today().strftime("%m_%d_%Y"))

    imageName = askopenfilename(
        title="Select Picture File",
        filetypes=(
            ("JPG Files", "*.jpg"),
            ("PNG Files", "*.png"),
            ("JFIF Files", "*.jfif"),
            ("All Files", "*.*")))

    parser = createParser(imageName)
    metadata = extractMetadata(parser)
    #data = metadata_as_dict(metadata)

  #  print(data)


    for line in metadata.exportPlaintext():
        L1.insert(tk.END, line)
    #metalist = metadata.exportPlaintext()
    ref.push(json.loads(json.dumps(metadataAsDict(metadata), default=convertTimestamp)))
    #L1.insert(tk.END,item)

def convertTimestamp(item_date_object):
    if isinstance(item_date_object, (datetime.date, datetime.datetime)):
        #print(item_date_object.strftime("%m_%d_%Y %H:%M:%S"))
        return item_date_object.strftime("%m_%d_%Y %H:%M:%S")

def metadataAsDict(metadata):
    return {item.key: (len(item.values) > 1 and
                       [v.value for v in item.values] or
                       item.values[0].value)
            for item in metadata if item.values}

   # ref.push(json.dumps(metadata.exportPlaintext(),separators= (", ", ": ")))


if __name__ == "__main__":
    png(GUI)
    # Let the window wait for any events
    GUI.mainloop()