import hashlib
import tkinter as tk
from tkinter.filedialog import askopenfilename
import json
import firebase_admin
from firebase_admin import db
from datetime import date

def MD5GUI(Frame):
    GUI = tk.Tk()
    GUI.title('Senior Project')
    GUI.geometry("700x300")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Calcuating MD5 of Files",
                      width=100, height=4, fg="blue")

    button1 = tk.Button(GUI,
                        text="Browse for First File for MD5 Hash",
                        command=lambda: [clear(L1),fileChooser(window,L1), switch(button1,button2)])
    button2 = tk.Button(GUI,
                        text="Recalculate MD5 Hash",
                        command=lambda: [recalc(window,L1), switch2(button2,button3)])
    button3 = tk.Button(GUI,
                        text="MD5 Comparison",
                        command=lambda: [MD5Comp(window),switch(button1,button2)])
    buttonExit = tk.Button(GUI,
                           text="Exit",
                           command=GUI.destroy)

    window.grid(column=1, row=1)

    button1.grid(column=1, row=2)
    button2.grid(column=1, row=3)
    button2["state"] = "disabled"
    button3.grid(column=1, row=4)
    button3["state"] = "disabled"

    L1 = tk.Listbox(GUI, width=100, height=4)
    L1.grid(column=1, row=5)

    buttonExit.grid(column=1, row=6)

def clear(L1):
    L1.delete(0,tk.END)

def fileChooser(window, L1): #select files and add to file array
    ref = db.reference("/MD5/" + date.today().strftime("%m_%d_%y") + "_MD5_Calculation")
    print(ref.key)
    #print(ref.get())

    global result
    global fileName
    global keyPath

    fileName = askopenfilename()
    result = hashlib.md5()

    with open(fileName, 'rb') as f:
        data = f.read()
        result.update(data)

    window.configure(text="MD5 Hash: " + result.hexdigest()) #change to output MD5 hash

    L1.insert(tk.END, fileName, result.hexdigest())

    keyPath = ref.push({
        'Session File': fileName, 'Hex Digest': result.hexdigest(), 'Recalculated Hex Digest': -1, 'Comparison': "NA"
    })
    print(keyPath.path)

def recalc(window, L1):
    ref = db.reference("/MD5/" + date.today().strftime("%m_%d_%y") + "_MD5_Calculation").child(str(keyPath.key))
    print(ref)
    global result1

    result1 = hashlib.md5()

    with open(fileName, 'rb') as f:
        data = f.read()
        result1.update(data)

    window.configure(text="MD5 Hash: " + result1.hexdigest())  # change to output MD5 hash

    L1.insert(tk.END, fileName, result1.hexdigest())


    ref.update({
        'Session File': fileName, 'Hex Digest': result.hexdigest(), 'Recalculated Hex Digest': result1.hexdigest(), 'Comparison': "NA"
    })

def MD5Comp(window): #empty until MD5 code
    ref = db.reference("/MD5/" + date.today().strftime("%m_%d_%y") + "_MD5_Calculation").child(str(keyPath.key))
    print(ref.get())

    if result.hexdigest() == result1.hexdigest():
        window.configure(text = "The file has not been modified or tampered with")
        ref.update({
            'Session File': fileName, 'Hex Digest': result.hexdigest(), 'Recalculated Hex Digest': result1.hexdigest(),
            'Comparison': "The file has not been modified or tampered with"
        })
    else:
        window.configure(text = "The file has been modified or tampered with")
        ref.update({
            'Session File': fileName, 'Hex Digest': result.hexdigest(), 'Recalculated Hex Digest': result1.hexdigest(),
            'Comparison': "The file has been modified or tampered with"
        })



def switch(button1,button2):
    if button1["state"] == "normal":
        button1["state"] = "disabled"
        button2["state"] = "normal"
    else:
        button1["state"] = "normal"

def switch2(button2,button3):
    if button2["state"] == "normal":
        button2["state"] = "disabled"
        button3["state"] = "normal"
    else:
        button2["state"] = "normal"






if __name__ == "__main__":

    MD5GUI(GUI)
# Let the window wait for any events
    GUI.mainloop()
