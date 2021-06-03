import tkinter as tk
from tkinter.filedialog import askopenfilename


def fileChooser():
    fileName = askopenfilename(initialdir = "/",
                                          title = "Select a File",
                                          filetypes = (("Text files",
                                                        "*.txt*"),
                                                       ("all files",
                                                        "*.*")))
    window.configure(text="File: " + fileName)

GUI = tk.Tk()
GUI.title('File Chooser')
GUI.geometry("500x500")
GUI.config(background = "white")

window = tk.Label(GUI, text = "File Explorer using Tkinter",
               width = 100, height = 4, fg = "blue")

button = tk.Button(GUI,
                        text="Browse Files",
                        command=fileChooser)

buttonExit = tk.Button(GUI,
                     text="Exit",
                     command=exit)

window.grid(column=1, row=1)

button.grid(column=1, row=2)

buttonExit.grid(column=1, row=3)

# Let the window wait for any events
GUI.mainloop()
