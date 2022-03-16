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
from MD5GUI import BruteForce
from datetime import date

cred = firebase_admin.credentials.Certificate("C:\\Users\domin\Downloads\python-application-results-firebase-adminsdk-hwe4o-dbe377275c.json") #json file needed to access database
defaultApp = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://python-application-results-default-rtdb.firebaseio.com/'
})     #connects database to Python
ref = db.reference("/")

def browser(): #open up new window for broswer
    win = tk.Toplevel(GUI).withdraw()
    Browser.url(win)

def sha(): #open up new window for SHA
    win = tk.Toplevel(GUI).withdraw()
    Sha.Sha(win,cred,defaultApp,ref)

def MD5(): #open up new window for MD5
    win = tk.Toplevel(GUI).withdraw()
    MD5_GUI.MD5GUI(win)

def pdf(): #open up new window for PDF
    win = tk.Toplevel(GUI).withdraw()
    PDF.pdf(win)

def jpg(): #open up new window for JPG
    win = tk.Toplevel(GUI).withdraw()
    exifData.jpg(win)

def png(): #open up new window for PNG
    win = tk.Toplevel(GUI).withdraw()
    PictureData.png(win)

def brute(): #open up new window for Brute Force
    win = tk.Toplevel(GUI).withdraw()
    BruteForce.BruteForce(win)


#def login():
 #   win = tk.Toplevel(GUI).withdraw()
  #  Login.login(win)

if __name__ == "__main__":
    GUI = tk.Tk()
    GUI.title('Menu')
    GUI.geometry("265x200")                           #creates top level GUI
    GUI.config(background = "white")
    window = tk.Label(GUI, text = "Please Select What you Would Like to do",width=37,height=4,fg = "blue")
    window.grid(columnspan=2)
    md5Button = tk.Button(GUI, text="MD5 Comparison",command=MD5)
    md5Button.grid(column=0, row=1, sticky = 'ew')
    broButton = tk.Button(GUI, text="Browser",command = browser)
    broButton.grid(column=1,row=1,sticky = 'ew')
    shaButton = tk.Button(GUI, text="Sha1 and Sha2",command = sha)
    shaButton.grid(column=0,row=2,sticky = 'ew')
    pdfButton = tk.Button(GUI,text="PDF Metadata",command = pdf)
    pdfButton.grid(column=1,row=2,sticky = 'ew')
   # jpgButton = tk.Button(GUI, text="Picture Exif Metadata (deprecated)", command = jpg)
   # jpgButton.grid(column=0, row=3,sticky = 'ew')
    bruteButton = tk.Button(GUI,text="Brute Force",command = brute)
    bruteButton.grid(column=0,row=3,sticky = 'ew')
    pngButton = tk.Button(GUI, text="Picture Metadata", command = png)
    pngButton.grid(column=1, row=3,sticky = 'ew')
   # logButton = tk.Button(GUI, text="Login",command = login)
    #logButton.grid(columnspan=2, rowspan=2, sticky='n')
    buttonExit = tk.Button(GUI,text="Exit",command=exit)
    buttonExit.grid(columnspan=2,rowspan=2,sticky = 'n')

    GUI.mainloop()