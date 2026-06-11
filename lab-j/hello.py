import sys

name = "Maciej"
album = "57791"

print(
    f"Hello {name} ({album}). "
    f"This environment is using Python version {sys.version.split()[0]} "
    f"at location {sys.executable}."
)

