import tkinter as tk
import json
import firebase_admin
from firebase_admin import db
#from SURCA21_sandbox import MD5GUI
from MD5GUI import MD5_GUI
from MD5GUI import Browser
from MD5GUI import Sha
from MD5GUI import PDF
from MD5GUI import exifData
from MD5GUI import PictureData
from MD5GUI import Login
from datetime import date

cred = firebase_admin.credentials.Certificate("C:\\Users\domin\Downloads\python-application-results-firebase-adminsdk-hwe4o-dbe377275c.json")
defaultApp = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://python-application-results-default-rtdb.firebaseio.com/'
})
ref = db.reference("/")

def browser():
    win = tk.Toplevel(GUI).withdraw()
    Browser.url(win)

def sha():
    win = tk.Toplevel(GUI).withdraw()
    Sha.Sha(win,cred,defaultApp,ref)

def MD5():
    win = tk.Toplevel(GUI).withdraw()
    MD5_GUI.MD5GUI(win)

def pdf():
    win = tk.Toplevel(GUI).withdraw()
    PDF.pdf(win)

def jpg():
    win = tk.Toplevel(GUI).withdraw()
    exifData.jpg(win)

def png():
    win = tk.Toplevel(GUI).withdraw()
    PictureData.png(win)

if __name__ == "__main__":
    GUI = tk.Tk()
    GUI.title('Menu')
    GUI.geometry("700x300")
    GUI.config(background = "white")
   # tk.Button(GUI,text="Return to Main Menu",command=GUI.deiconify)
    window = tk.Label(GUI, text = "Please Select What you Would Like to do",
                   width = 100, height = 4, fg = "blue")
    window.grid(column=1,row=1)
    md5Button = tk.Button(GUI, text="MD5 Comparison",command=MD5)
    md5Button.grid(column=1, row=2)
    broButton = tk.Button(GUI, text="Browser",command = browser)
    broButton.grid(column=1,row=3)
    shaButton = tk.Button(GUI, text="Sha1 and Sha2",command = sha)
    shaButton.grid(column=1,row=4)
    pdfButton = tk.Button(GUI,text="PDF Metadata",command = pdf)
    pdfButton.grid(column=1,row=5)
    jpgButton = tk.Button(GUI, text="Picture Exif Metadata (deprecated)", command = jpg)
    jpgButton.grid(column=1, row=6)
    pngButton = tk.Button(GUI, text="Picture Metadata", command = png)
    pngButton.grid(column=1, row=7)
    buttonExit = tk.Button(GUI,text="Exit",command=exit)
    buttonExit.grid(column=1,row=8)
    GUI.mainloop()