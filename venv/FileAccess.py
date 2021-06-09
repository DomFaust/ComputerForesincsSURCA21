import tkinter as tk
from tkinter.filedialog import askopenfilename

allFiles = [] #array to store files


def fileChooser(): #select files and add to file array

    fileName = askopenfilename()

    window.configure(text="File: " + fileName) #change to output MD5 hash

    allFiles.append(fileName)
    L1.insert(tk.END,fileName)

def MD5Comp(): #empty until MD5 code
    print()

GUI = tk.Tk()
GUI.title('SURCA Project')
GUI.geometry("700x300")
GUI.config(background = "white")

window = tk.Label(GUI, text = "Calcuating MD5 of Files",
               width = 100, height = 4, fg = "blue")

button1 = tk.Button(GUI,
                        text="Browse for First File",
                        command=fileChooser)
button2 = tk.Button(GUI,
                        text="Browse for Second File",
                        command=fileChooser)
button3 = tk.Button(GUI,
                    text = "MD5 Comparison",
                    command = MD5Comp)
buttonExit = tk.Button(GUI,
                     text="Exit",
                     command=exit)

window.grid(column=1, row=1)

button1.grid(column=1, row=2)
button2.grid(column=1, row=3)
button3.grid(column=1, row=4)

L1 = tk.Listbox(GUI,width = 100, height= 2)
L1.grid(column = 1, row = 5)

buttonExit.grid(column=1, row=6)



# Let the window wait for any events
GUI.mainloop()
