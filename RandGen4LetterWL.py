def ran(start):
    f = open("4L.txt", "a")
    for i in range(26):
        for j in range(26):
            for k in range(26):
                str = start + (chr)((ord)('a') + i)
                str = str + (chr)((ord)('a') + j)
                str = str + (chr)((ord)('a') + k)
                f.write(str)
                f.write("\n")
    f.close()


def main():
    alpha = 'abcdefghijklmnopqrstuvwxyz'
    for i in alpha:
        start = i
        ran(start)


main()
