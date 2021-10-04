import tkinter as tk
#from SURCA21_sandbox import MD5GUI
from MD5GUI import MD5_GUI

GUI = tk.Tk()
GUI.title('Menu')
GUI.geometry("700x300")
GUI.config(background = "white")

window = tk.Label(GUI, text = "Please Select What you Would Like to do",
               width = 100, height = 4, fg = "blue")
def createNewWindow():
   # newWindow = tk.Toplevel(GUI)
    #labelExample = tk.Label(newWindow, text = "New Window")
    #buttonExample = tk.Button(newWindow, text = "New Window button")

    #labelExample.pack()
    #buttonExample.pack()
    MD5_GUI.main()




buttonExample = tk.Button(GUI, text="Create new window",command=createNewWindow)
buttonExample.grid(column=1, row=7)

GUI.mainloop()