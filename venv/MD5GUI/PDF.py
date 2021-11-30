from PyPDF2 import PdfFileReader
import tkinter as tk
from tkinter.filedialog import askopenfilename

def pdf(Frame):
    GUI = tk.Tk()
    GUI.title('Senior Project')
    GUI.geometry("700x400")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Getting Information about PDF",
                      width=100, height=4, fg="blue")

    scroll = tk.Scrollbar(GUI,orient = "horizontal")

    button1 = tk.Button(GUI,
                        text="Browse for PDF",
                        command=lambda: [pdfInfo(window,L1)])
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

def pdfInfo(window,L1):
    fileName = askopenfilename(
        title="Open PDF File",
        filetypes=(
            ("PDF Files", "*.pdf"),
            ("All Files", "*.*")))


    pdf = PdfFileReader(fileName,strict=True,warndest=None,overwriteWarnings=True)

    #print(pdf.documentInfo)
    if(pdf.isEncrypted):
        L1.insert(tk.END,"ERROR: "+fileName+" is Encrypted and Data Cannot be Retrieved")
    else:
        if(pdf.documentInfo == None):
            window.configure(text="Current Document Name: " + fileName)
            L1.insert(tk.END,"No PDF Data Found for " + fileName)
        else:
            window.configure(text="Current Document Name: " + fileName)
            L1.insert(tk.END,"Document Info:\n",pdf.documentInfo)

    #L1.insert(tk.END,"\nDocument Name: " + fileName)



if __name__ == "__main__":
    pdf(GUI)
    # Let the window wait for any events
    GUI.mainloop()