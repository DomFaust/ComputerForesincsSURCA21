import zipfile
import time


def crack(zfile, wordlist):
    with open(wordlist, 'rb') as wordlists:
        for data in wordlists:
            for words in data.split():
                try:
                    s_time = time.time()
                    zfile.extractall(pwd=words)
                    print('password found ' + words.decode())
                    print('took %s seconds' % (time.time() - s_time))
                    return 1
                except:
                    pass
    return 0


def main():
    z = input("enter password protected zip file ")
    zfile = zipfile.ZipFile(z)
    wordlist = input("enter wordlist ")

    if crack(zfile, wordlist) == 0:
        print("no password found")
    else:
        exit(0)


main()
