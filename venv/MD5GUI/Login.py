import tkinter as tk
from tkinter.filedialog import askopenfilename
import json
import firebase_admin
from firebase_admin import auth
import os
import requests

FIREBASE_WEB_API_KEY = os.environ.get("AIzaSyC9HDvYsLV11Zdnl85UKPEL9gfKGGsHsUQ")
rest_api_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

def login(frame):
    GUI = tk.Tk()
    GUI.title('Senior Project')
    GUI.geometry("700x300")
    GUI.config(background="white")

    window = tk.Label(GUI, text="Login or Create Account",
                      width=100, height=4, fg="blue")

    button1 = tk.Button(GUI,
                        text="Creat Account",
                        command=lambda: new(window))
    button2 = tk.Button(GUI,
                        text="Login",
                        command=lambda: returning(window))

    buttonExit = tk.Button(GUI,
                           text="Exit",
                           command=GUI.destroy)

    window.grid(column=1, row=1)
    button1.grid(column=1, row=2)
    button2.grid(column=1, row=3)
    buttonExit.grid(column=1, row=4)


def new(window):
    global email
    global username
    global password
    global screen

    screen = tk.Toplevel(window)
    screen.title("Register")
    screen.geometry("300x250")

    # Set label for user's instruction
    tk.Label(screen, text="Please enter details below").pack()
    tk.Label(screen, text="").pack()

    emailLabel = tk.Label(screen,text = "Email")
    emailLabel.pack()
    email = tk.Entry(screen)
    email.pack()

    # Set username label
    usernameLabel = tk.Label(screen, text="Username")
    usernameLabel.pack()

    # Set username entry
    username = tk.Entry(screen)
    username.pack()

    # Set password label
    passwordLabel = tk.Label(screen, text="Password")
    passwordLabel.pack()

    # Set password entry
    password = tk.Entry(screen, show='*')
    password.pack()

    tk.Label(screen, text="").pack()

    # Set register button
    tk.Button(screen, text="Register", width=10, height=1, bg="blue", command=registerUser).pack()

def registerUser():
    # get username and password
    username_info = username.get()
    password_info = password.get()
    email_info = email.get()

    # Open file in write mode
    print("E:",email_info)
    print("U:",username_info)
    print("P:",password_info)

    auth.create_user(email=email_info,uid=username_info, password=password_info)

# set a label for showing success information on screen

    tk.Label(screen, text="Registration Success", fg="green", font=("calibri", 11)).pack()


def returning(window):
    global email
    global username
    global password
    global screen

    screen = tk.Toplevel(window)
    screen.title("Login")
    screen.geometry("300x250")

    # Set label for user's instruction
    tk.Label(screen, text="Please enter details below").pack()
    tk.Label(screen, text="").pack()

    emailLabel = tk.Label(screen, text="Email")
    emailLabel.pack()
    email = tk.Entry(screen)
    email.pack()

    # Set username label
    usernameLabel = tk.Label(screen, text="Username")
    usernameLabel.pack()

    # Set username entry
    username = tk.Entry(screen)
    username.pack()

    # Set password label
    passwordLabel = tk.Label(screen, text="Password")
    passwordLabel.pack()

    # Set password entry
    password = tk.Entry(screen, show='*')
    password.pack()

    tk.Label(screen, text="").pack()

    # Set register button
    tk.Button(screen, text="Login", width=10, height=1, bg="blue", command=loginUser).pack()

def loginUser():
    password_info = password.get()
    email_info = email.get()

    auth.sign




if __name__ == "__main__":
    login(GUI)
# Let the window wait for any events
    GUI.mainloop()

