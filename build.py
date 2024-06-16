from os import listdir, isdir
from os.path import join, splitext

# get previous version
with open('index.html') as f:
    v = f.read().split('?v=')[1].split('"')[0]

v = input('Enter new version (default %s): ' %v)

# edit files
def edit_version(file):
    with open(file, encoding='utf-8') as f:
        data = f.read()

    edited = ''
    for line in data.split('\n'):
        # remove trailing spaces
        line = line.rstrip()

        # edit version
        if '?v=' in line:
            a, c = line.split('?v=')
            b, c = v, c.split('"')[1]
            line = a+b+c
        edited += line+'\n'

    with open(file, encoding='utf-8') as f: f.write(edited)
    print('Edited', file)

def edit_files(path):
    for f in listdir(path):
        f = join(path, f)
        if isdir(f): find_files(f)
        elif splitext(f)[1] == '.html':
            edit_version(f)

edit_files('.')
input('Done.')
