#!/usr/bin/env python3
import re
import sys

def convert_css_to_module(css_content, page_name):
    """Convert global CSS to CSS Module format"""

    # Remove the wrapper class prefix and convert selectors to camelCase
    wrapper_pattern = f".page-{page_name}-wrapper"

    # Replace wrapper with .wrapper, but keep element selectors that follow (e.g., ".wrapper main" stays as-is for now)
    content = css_content.replace(f"{wrapper_pattern} ", ".wrapper ")
    content = re.sub(rf"{re.escape(wrapper_pattern)}(?=\s*{{)", ".wrapper", content)

    # Convert kebab-case to camelCase for classes
    def kebab_to_camel(match):
        class_name = match.group(1)
        words = class_name.split('-')
        camel_case = words[0] + ''.join(word.capitalize() for word in words[1:])
        return f".{camel_case}"

    # Find all class selectors and convert them
    content = re.sub(r'\.([a-z][a-z0-9]*(?:-[a-z0-9]+)*)', kebab_to_camel, content)

    # Convert ID selectors with kebab-case to camelCase
    def kebab_to_camel_id(match):
        id_name = match.group(1)
        words = id_name.split('-')
        camel_case = words[0] + ''.join(word.capitalize() for word in words[1:])
        return f"#{camel_case}"

    content = re.sub(r'#([a-z][a-z0-9]*(?:-[a-z0-9]+)*)', kebab_to_camel_id, content)

    return content

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert-css-module.py <input-file> <page-name>")
        sys.exit(1)

    input_file = sys.argv[1]
    page_name = sys.argv[2]

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            css_content = f.read()

        converted = convert_css_to_module(css_content, page_name)

        output_file = input_file.replace('.css', '.module.css')
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(converted)

        print(f"Converted {input_file} to {output_file}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
