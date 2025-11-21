import sys
import re

file_path = sys.argv[1]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the import of styles from CSS module
content = re.sub(
    r"import\s+styles\s+from\s+['\"]@/styles/[^'\"]+\.module\.css['\"];?\n",
    "",
    content
)

# Replace className={styles.X} with className="X"
content = re.sub(
    r'className=\{styles\.(\w+)\}',
    r'className="\1"',
    content
)

# Replace className={`${styles.X} ${styles.Y}`} with className="X Y"
content = re.sub(
    r'className=\{\`\$\{styles\.(\w+)\}\s+\$\{styles\.(\w+)\}\`\}',
    r'className="\1 \2"',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {file_path}")
