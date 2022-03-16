import zipfile
import time
import tkinter as tk
from tkinter.filedialog import askopenfilename
import json
import firebase_admin
from firebase_admin import db
from datetime import date



def crack(zfile, wordlist,window,L1):
    #ref = db.reference("/BruteForce/" + date.today().strftime("%m_%d_%Y") + "_Breaking_ZIP_File")
    #L1.insert(tk.END,'Please Wait While we Attempt to Crack the Password')
    with open(wordlist, 'rb') as wordlists:
        for data in wordlists:
            for words in data.split():
                try:
                    s_time = time.time()
                    L1.insert(tk.END,'Trying Password: ',words)
                    zfile.extractall(pwd=words)
                    #L1.insert(tk.END,'Password Found: ',words.decode())
                    final = time.time() - s_time
                    window.configure(text='Password Found: ' + words.decode() + '  Took %s Seconds' % (final))
                    return 1,words.decode(),final
                except:
                    pass
    return 0,"Unknown",-1


def BruteForce(Frame):

    GUI = tk.Tk()
    GUI.title('Brute Force Attack')
    GUI.geometry("700x500")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Brute Force Password Attack",
                      width=100, height=4, fg="blue")

    button1 = tk.Button(GUI,
                        text="Browse for Zip File for Bute Force",
                        command=lambda: [clear(L1), fileChooser(window, L1)])
    button2 = tk.Button(GUI,
                        text="Select New Wordlist",
                        command=lambda: [word(window,L1)])
    button3 = tk.Button(GUI,
                        text="Run Brute Force",
                        command=lambda: [run(window,L1)])
    buttonExit = tk.Button(GUI,
                           text="Exit",
                           command=GUI.destroy)

    window.grid(column=1, row=1)

    button1.grid(column=1, row=2)
    button2.grid(column=1, row=3)
   # button2["state"] = "disabled"
    button3.grid(column=1, row=4)
    #button3["state"] = "disabled"

    L1 = tk.Listbox(GUI, width=100, height=20)
    L1.grid(column=1, row=5)

    buttonExit.grid(column=1, row=6)
    
def word(window,L1):
    global wordlist
    wordlist = askopenfilename(
        title="Select Wordlist File",
        filetypes=(
            ("Text Files", "*.txt"),
            ("All Files", "*.*")))

    window.configure(text="Word List Selected")

    
def clear(L1):
    L1.delete(0,tk.END)
    
def fileChooser(window,L1):
    global zfile
    global z

    z = askopenfilename(
        title="Select Zip File",
        filetypes=(
            ("Zip Files", "*.zip"),
            ("All Files", "*.*")))
    zfile = zipfile.ZipFile(z)

    window.configure(text="Zip File Selected")


def run(window,L1):
    ref = db.reference("/BruteForce/" + date.today().strftime("%m_%d_%Y") + "_Breaking_ZIP_File")
    found,decode,time = crack(zfile, wordlist, window, L1)
    if found == 0:
        window.configure(text='No Password Found with Given Wordlist')
    ref.push({'File': z, 'Wordlist': wordlist, 'Password': decode, 'Decode Time in Seconds': time})

if __name__ == "__main__":
    BruteForce(GUI)
    # Let the window wait for any events
    GUI.mainloop()
