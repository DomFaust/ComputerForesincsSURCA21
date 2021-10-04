import hashlib
import tkinter as tk
from tkinter.filedialog import askopenfilename


def fileChooser(): #select files and add to file array
    global result
    global fileName

    fileName = askopenfilename()
    result = hashlib.md5()

    with open(fileName, 'rb') as f:
        data = f.read()
        result.update(data)

    window.configure(text="MD5 Hash: " + result.hexdigest()) #change to output MD5 hash

    if(L1.size() == 4):
        L1.delete(0,tk.END)
        L1.insert(tk.END,fileName,result.hexdigest())
    else:
        L1.insert(tk.END, fileName, result.hexdigest())

def recalc():
    global result1

    result1 = hashlib.md5()

    with open(fileName, 'rb') as f:
        data = f.read()
        result1.update(data)

    window.configure(text="MD5 Hash: " + result1.hexdigest())  # change to output MD5 hash

    L1.insert(tk.END, fileName, result1.hexdigest())

def MD5Comp(): #empty until MD5 code
    if result.hexdigest() == result1.hexdigest():
        window.configure(text = "The file has not been modified or tampered with")
    else:
        window.configure(text = "The file has been modified or tampered with")

GUI = tk.Tk()
GUI.title('Senior Project')
GUI.geometry("700x300")
GUI.config(background = "white")

window = tk.Label(GUI, text = "Calcuating MD5 of Files",
               width = 100, height = 4, fg = "blue")

button1 = tk.Button(GUI,
                    text = "Browse for First File for MD5 Hash",
                    command = lambda:[fileChooser(),switch()])
def switch():
    if button1["state"] == "normal":
        button1["state"] = "disabled"
        button2["state"] = "normal"
    else:
        button1["state"] = "normal"

def switch2():
    if button2["state"] == "normal":
        button2["state"] = "disabled"
        button3["state"] = "normal"
    else:
        button2["state"] = "normal"



button2 = tk.Button(GUI,
                        text = "Recalculate MD5 Hash",
                        command = lambda:[recalc(),switch2()])
button3 = tk.Button(GUI,
                    text = "MD5 Comparison",
                    command = MD5Comp)
buttonExit = tk.Button(GUI,
                     text = "Exit",
                     command = exit)

window.grid(column=1, row=1)

button1.grid(column=1, row=2)
button2.grid(column=1, row=3)
button2["state"] = "disabled"
button3.grid(column=1, row=4)
button3["state"] = "disabled"

L1 = tk.Listbox(GUI,width = 100, height= 4)
L1.grid(column = 1, row = 5)

buttonExit.grid(column=1, row=6)



# Let the window wait for any events
GUI.mainloop()
