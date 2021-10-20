import hashlib
import tkinter as tk
from tkinter.filedialog import askopenfilename

def Sha(Frame):
    GUI = tk.Tk()
    GUI.title('Sha 1 and Sha 2')
    GUI.geometry("700x400")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Calcuating Sha 1 and Sha 2",
                      width=100, height=4, fg="blue")

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
    L1 = tk.Listbox(GUI, width=100, height=13)
    L1.grid(column=1, row=4)
    buttonExit.grid(column=1, row=5)

def clear(L1):
    L1.delete(0,tk.END)

def calculate2(window, L1):
    window.configure(text="Sha 2")
    fileName = askopenfilename()
    m = hashlib.sha224()
    n = hashlib.sha256()

    with open(fileName, 'rb') as f:
        data = f.read()
        m.update(data)

        L1.insert(tk.END, "Sha 224 for " + fileName)
        L1.insert(tk.END, m.hexdigest())
        L1.insert(tk.END, "Digest Size: ", m.digest_size)
        L1.insert(tk.END, "Block Size: ", m.block_size)

        L1.insert(tk.END, "Sha 256 for " + fileName)
        L1.insert(tk.END, n.hexdigest())
        L1.insert(tk.END, "Digest Size: ", n.digest_size)
        L1.insert(tk.END, "Block Size: ", n.block_size)


def calculate(window,L1):
    window.configure(text="Sha 1")
    fileName = askopenfilename()
    m = hashlib.sha1()

    with open(fileName, 'rb') as f:
        data = f.read()
        m.update(data)

        L1.insert(tk.END, fileName)
        L1.insert(tk.END, m.hexdigest())
        L1.insert(tk.END, "Digest Size: ", m.digest_size)
        L1.insert(tk.END, "Block Size: ", m.block_size)


if __name__ == "__main__":
    Sha(GUI)
    # Let the window wait for any events
    GUI.mainloop()