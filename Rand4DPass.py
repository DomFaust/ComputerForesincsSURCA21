f = open("venv/wlist.txt", "a")
s = 0
e = 10000
for num in range(s,e):
    f.write(f"{num:04d}")
    f.write("\n")

f.close()
