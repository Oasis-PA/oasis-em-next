#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

def slugify(text):
    """Convert text to URL-friendly slug"""
    text = text.lower()
    text = re.sub(r'[áàâã]', 'a', text)
    text = re.sub(r'[éè]', 'e', text)
    text = re.sub(r'[í]', 'i', text)
    text = re.sub(r'[óòô]', 'o', text)
    text = re.sub(r'[ú]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def clean_content(text):
    """Remove image suggestions and references"""
    lines = text.split('\n')
    cleaned_lines = []

    for line in lines:
        # Skip image suggestion lines
        if '[SUGESTAO' in line.upper() or '[SUGESTÃO' in line:
            continue
        # Skip blank lines followed by references
        if line.strip() and line.strip()[0].isupper() and ',' in line and len(line.split()) <= 10:
            # Check if it looks like a reference
            if not any(c in line for c in ['**', '##', 'http']):
                continue

        cleaned_lines.append(line)

    text = '\n'.join(cleaned_lines)
    # Clean multiple newlines
    text = re.sub(r'\n\n\n+', '\n\n', text)
    return text.strip()

def infer_tags(full_text, title):
    """Infer tags based on content"""
    text_lower = full_text.lower()
    title_lower = title.lower()
    tags = set()

    keyword_mapping = {
        'cabelo': ['cabelo', 'capilar', 'fio', 'suplemento', 'queda'],
        'skincare': ['skincare', 'pele', 'dermatolog', 'cosmetico', 'facial'],
        'oleo': ['oleo', 'vegetal', 'hidratacao', 'umectacao'],
        'nutricao': ['nutricao', 'alimentacao', 'nutriente'],
        'infantil': ['infantil', 'bebe', 'crianca', 'pediatrico'],
        'saude': ['saude', 'wellness', 'bem-estar'],
        'beleza': ['beleza', 'beauty', 'estetico'],
    }

    for tag, keywords in keyword_mapping.items():
        for keyword in keywords:
            if keyword in text_lower or keyword in title_lower:
                tags.add(tag)
                break

    return ','.join(sorted(tags)) if tags else 'beleza,saude'

def is_reference_line(text):
    """Check if text looks like a bibliographic reference"""
    # Has author name (Caps) followed by comma and year
    if not text[0].isupper():
        return False
    # Has multiple commas (typical of citations)
    if text.count(',') < 1:
        return False
    # Has 4-digit year pattern or 'et al.'
    if re.search(r'\d{4}|et al', text, re.IGNORECASE):
        return True
    return False

def extract_paragraphs(text):
    """Extract paragraphs for resumo"""
    paragraphs = []
    current_para = []

    for line in text.split('\n'):
        line = line.strip()

        if not line or line.startswith('#'):
            if current_para:
                para_text = ' '.join(current_para)
                if len(para_text) > 20 and not is_reference_line(para_text):
                    paragraphs.append(para_text)
                current_para = []
            continue

        current_para.append(line)

    if current_para:
        para_text = ' '.join(current_para)
        if len(para_text) > 20 and not is_reference_line(para_text):
            paragraphs.append(para_text)

    return paragraphs

def parse_artigos():
    """Parse artigos.md file"""

    artigos_file = Path('data/artigos.md')
    if not artigos_file.exists():
        print("Erro: data/artigos.md nao encontrado")
        return

    with open(artigos_file, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    # Fix escaped backslashes
    content = content.replace(r'\. ', '. ')
    content = content.replace(r'\[', '[')
    content = content.replace(r'\-', '-')

    # Remove separator lines
    content = re.sub(r'^-{3,}$', '', content, flags=re.MULTILINE)

    lines = content.split('\n')

    # Parse articles
    artigos_list = []
    current_article = None

    for line in lines:
        if re.match(r'^\s*#\s+\d+\.', line):
            # Save previous article
            if current_article is not None:
                artigos_list.append(current_article)

            # Extract short title
            parts = line.split('.', 1)
            short_title = parts[1].strip() if len(parts) > 1 else ''

            current_article = {
                'short_title': short_title,
                'content_lines': []
            }
        elif current_article is not None:
            current_article['content_lines'].append(line)

    # Don't forget last article
    if current_article is not None:
        artigos_list.append(current_article)

    # Process articles
    processed = []
    for idx, article in enumerate(artigos_list, 1):
        short_title = article['short_title']
        content_lines = article['content_lines']

        # Find the "# **Title**" line - content STARTS from here
        content_start = 0
        title_line = ''
        found_title = False

        for i, line in enumerate(content_lines):
            if line.strip().startswith('# **'):
                content_start = i
                title_line = line.strip()
                found_title = True
                break

        # If no "# **Title**" found, content starts from beginning
        # and we need to add a markdown header with the short title
        if not found_title:
            title_line = f"# **{short_title}**"
            full_content = title_line + '\n\n' + '\n'.join(content_lines[content_start:])
        else:
            # Content BEGINS with the title
            full_content = '\n'.join(content_lines[content_start:])

        cleaned_content = clean_content(full_content)

        # Extract resumo
        paragraphs = extract_paragraphs(cleaned_content)
        resumo = ''
        if paragraphs:
            # Find a reasonable paragraph for resumo
            for p in paragraphs:
                if 30 < len(p) < 200:
                    resumo = p
                    break
            if not resumo and paragraphs:
                resumo = paragraphs[0]

            if len(resumo) > 160:
                resumo = resumo[:157] + '...'

        slug = slugify(short_title)
        tags = infer_tags(cleaned_content, short_title)

        artigo = {
            'id': idx,
            'titulo': short_title,
            'slug': slug,
            'tags': tags,
            'resumo': resumo,
            'conteudo': cleaned_content
        }

        processed.append(artigo)

    # Save to JSON
    output_file = Path('scripts/artigos-data.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed, f, indent=2, ensure_ascii=False)

    print(f"[OK] {len(processed)} artigos extraidos!")
    print(f"[INFO] Arquivo: {output_file}\n")

    for artigo in processed:
        print(f"{artigo['id']}. {artigo['titulo']}")
        print(f"   Slug: {artigo['slug']}")
        print(f"   Tags: {artigo['tags']}")
        if artigo['resumo']:
            print(f"   Resumo: {artigo['resumo'][:70]}...")
        else:
            print(f"   Resumo: [VAZIO]")
        print()

if __name__ == '__main__':
    parse_artigos()
