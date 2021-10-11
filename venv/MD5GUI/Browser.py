import tkinter as tk
import tkinterweb

def url(Frame):
    root = tk.Tk()
    frame = tkinterweb.HtmlFrame(root)
    frame.load_website("www.google.com")
    frame.pack(fill="both", expand=True)
    root.mainloop()


if __name__ == "__main__":

    url(root)
# Let the window wait for any events
    root.mainloop()