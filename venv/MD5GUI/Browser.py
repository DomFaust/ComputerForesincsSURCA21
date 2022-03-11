import tkinterweb
import tkinter as tk

def url(Frame):
    root = tk.Tk()
    frame = tkinterweb.HtmlFrame(root)
    frame.load_website("www.google.com")
    frame.pack(fill="both", expand=True)
    root.mainloop()

if __name__ == "__main__":
    url(GUI)
    # Let the window wait for any events
    GUI.mainloop()