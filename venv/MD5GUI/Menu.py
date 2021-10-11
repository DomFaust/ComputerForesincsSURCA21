import tkinter as tk
#from SURCA21_sandbox import MD5GUI
from MD5GUI import MD5_GUI
from MD5GUI import Browser

def browser():
    win = tk.Toplevel(GUI)
    Browser.url(win)

def MD5():
    win = tk.Toplevel(GUI)
    MD5_GUI.MD5GUI(win)

if __name__ == "__main__":
    GUI = tk.Tk()
    GUI.title('Menu')
    GUI.geometry("300x300")
    GUI.config(background = "white")
    window = tk.Label(GUI, text = "Please Select What you Would Like to do",
                   width = 100, height = 4, fg = "blue")
    md5Button = tk.Button(GUI, text="MD5 Comparison",command=MD5)
    md5Button.grid(column=1, row=1)
    broButton = tk.Button(GUI, text="Browser",command = browser)
    broButton.grid(column=1,row=2)
    buttonExit = tk.Button(GUI,text="Exit",command=exit)
    buttonExit.grid(column=1,row=3)
    GUI.mainloop()