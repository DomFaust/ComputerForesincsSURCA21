import hashlib

def calculate(file):

    m = hashlib.sha1()

    with open(file, 'rb') as f:
        data = f.read()
        m.update(data)

    print(m.digest())
    print('digest size = ', m.digest_size)
    print('block size = ', m.block_size)

def main():
    file = input('enter file ')
#   data = input('enter what you are looking for')
    calculate(file)

main()
