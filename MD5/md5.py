import hashlib


def calculate(file):
    global result
    result = hashlib.md5()
    with open(file, 'rb') as f:
        data = f.read()
        result.update(data)

    print(result.hexdigest())
    return result.hexdigest()


def recalculate(a):
    global result1
    if a == 'yes':
        file1 = input("enter file name again ")
        result1 = hashlib.md5()
        with open(file1, 'rb') as f:
            data = f.read()
            result1.update(data)
        print(result1.hexdigest())
    else:
        print("\nyour md5 value is above")
        exit()
    return result1.hexdigest()


def cmp():
    if result.hexdigest() == result1.hexdigest():
        print("\nThe file has not been modified or tampered with")
    else:
        print('\nThe file has been modified or tampered with')


def main():
    file = input("enter file name ")
    calculate(file)

    a = input("\nif you want to recalculate type yes. If you don't type no ")
    recalculate(a)

    cmp()


main()
