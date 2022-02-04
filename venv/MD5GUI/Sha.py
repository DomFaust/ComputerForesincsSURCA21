import hashlib
import tkinter as tk
from tkinter.filedialog import askopenfilename
import json
import firebase_admin
from firebase_admin import db
from datetime import date

def Sha(Frame,cred,defaultApp,ref):


    GUI = tk.Tk()
    GUI.title('Sha 1 and Sha 2')
    GUI.geometry("700x400")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Calcuating Sha 1 and Sha 2",
                      width=100, height=4, fg="blue")

    scrollH = tk.Scrollbar(GUI, orient="horizontal")

    sha1 = tk.Button(GUI, text = "Browse for File for Sha 1",
                     command = lambda: [clear(L1),calculate(window, L1)])

    sha2 = tk.Button(GUI, text="Browse for File for Sha 2",
                     command=lambda: [clear(L1),calculate2(window, L1)])

    buttonExit = tk.Button(GUI,
                           text="Exit",
                           command=GUI.destroy)

    window.grid(column=1, row=1)
    sha1.grid(column=1,row=2)
    sha2.grid(column=1,row=3)
    L1 = tk.Listbox(GUI, width=130, height=13)
    L1.config(xscrollcommand=scrollH.set)
    L1.grid(column=1, row=4)
    scrollH.grid(column=1, row=5)
    scrollH.config(command=L1.xview)
    buttonExit.grid(column=1, row=6)

def clear(L1):
    L1.delete(0,tk.END)


def calculate2(window, L1):
    ref = db.reference("/SHA/" + date.today().strftime("%m_%d_%y") + "_SHA 2")
    print(ref.get())

    window.configure(text="Sha 2")
    fileName = askopenfilename()
    m = hashlib.sha224()
    n = hashlib.sha256()
    k = hashlib.sha384()
    j = hashlib.sha512()

    with open(fileName, 'rb') as f:
        data = f.read()
        m.update(data)
        n.update(data)
        k.update(data)
        j.update(data)

        L1.insert(tk.END, "Sha 224 for " + fileName)
        L1.insert(tk.END, m.hexdigest())
        L1.insert(tk.END, "Digest Size: ", m.digest_size)
        L1.insert(tk.END, "Block Size: ", m.block_size)
        L1.insert(tk.END,"\n")

        L1.insert(tk.END, "Sha 256 for " + fileName)
        L1.insert(tk.END, n.hexdigest())
        L1.insert(tk.END, "Digest Size: ", n.digest_size)
        L1.insert(tk.END, "Block Size: ", n.block_size)
        L1.insert(tk.END, "\n")

        L1.insert(tk.END, "Sha 384 for " + fileName)
        L1.insert(tk.END, k.hexdigest())
        L1.insert(tk.END, "Digest Size: ", k.digest_size)
        L1.insert(tk.END, "Block Size: ", k.block_size)
        L1.insert(tk.END, "\n")

        L1.insert(tk.END, "Sha 512 for " + fileName)
        L1.insert(tk.END, j.hexdigest())
        L1.insert(tk.END, "Digest Size: ", j.digest_size)
        L1.insert(tk.END, "Block Size: ", j.block_size)

        ref.push({
            'Session File': fileName, 'Sha 224 Hex Digest': m.hexdigest(), 'Sha 224 Digest Size': m.digest_size,
            'Sha 224 Block Size': m.block_size, 'Sha 256 Hex Digest': n.hexdigest(), 'Sha 256 Digest Size': n.digest_size,
            'Sha 256 Block Size': n.block_size, 'Sha 384 Hex Digest': k.hexdigest(), 'Sha 384 Digest Size': k.digest_size,
            'Sha 384 Block Size': k.block_size, 'Sha 512 Hex Digest': j.hexdigest(), 'Sha 512 Digest Size': j.digest_size,
            'Sha 512 Block Size': j.block_size
        })


def calculate(window,L1):
    ref = db.reference("/SHA/" + date.today().strftime("%m_%d_%y")+ "_SHA 1")
    print(ref.get())

    window.configure(text="Sha 1")
    fileName = askopenfilename()
    m = hashlib.sha1()

    with open(fileName, 'rb') as f:
        data = f.read()
        m.update(data)

        ref.push({
           'Session File':fileName, 'Hex Digest':m.hexdigest(),'Digest Size': m.digest_size,'Block Size': m.block_size
        })

        L1.insert(tk.END, fileName)
        L1.insert(tk.END, m.hexdigest())
        L1.insert(tk.END, "Digest Size: ", m.digest_size)
        L1.insert(tk.END, "Block Size: ", m.block_size)


if __name__ == "__main__":
    Sha(GUI,cred,defaultApp,ref)
    # Let the window wait for any events
    GUI.mainloop()