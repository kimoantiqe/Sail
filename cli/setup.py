from setuptools import setup

setup(
    name='Sail-Cli',
    version='1.0.0',
    py_modules=['commands'],
    install_requires=[
        'Click',
    ],
    entry_points='''
        [console_scripts]
        sail=cli:cli
    '''
)