from hachoir.parser import createParser
from hachoir.metadata import extractMetadata
import tkinter as tk
from tkinter.filedialog import askopenfilename

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

    imageName = askopenfilename(
        title="Select Picture File",
        filetypes=(
            ("JPG Files", "*.jpg"),
            ("PNG Files", "*.png"),
            ("JFIF Files", "*.jfif"),
            ("All Files", "*.*")))

    parser = createParser(imageName)
    metadata = extractMetadata(parser)

    for line in metadata.exportPlaintext():
        L1.insert(tk.END,line)
        print(line)



if __name__ == "__main__":
    png(GUI)
    # Let the window wait for any events
    GUI.mainloop()