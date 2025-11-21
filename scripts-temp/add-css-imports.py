import sys
import re

file_path = sys.argv[1]
css_file = sys.argv[2]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if CSS import already exists
if f"import '@/styles/{css_file}'" in content:
    print(f"CSS import already exists in {file_path}")
    sys.exit(0)

# Find the last import statement
lines = content.split('\n')
last_import_line = -1

for i, line in enumerate(lines):
    if line.strip().startswith('import '):
        last_import_line = i

if last_import_line != -1:
    # Insert after the last import
    lines.insert(last_import_line + 1, f"import '@/styles/{css_file}';")
    content = '\n'.join(lines)
else:
    # No imports found, add after the use client directive
    if content.startswith('"use client"'):
        lines = content.split('\n')
        lines.insert(1, f"import '@/styles/{css_file}';")
        content = '\n'.join(lines)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Added CSS import to {file_path}")
