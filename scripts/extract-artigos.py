#!/usr/bin/env python3
import re
import json

# Ler arquivo
with open('c:\\Users\\stefano\\Downloads\\artigos.txt', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Dividir por separador principal
sections = content.split('________________')

artigos = []

for section in sections:
    lines = [l.strip() for l in section.strip().split('\n') if l.strip()]
    if not lines:
        continue

    # Primeira linha: "N. Titulo curto"
    primeira = lines[0]
    match_titulo = re.match(r'^(\d+)\.\s+(.+)$', primeira)

    if not match_titulo:
        continue

    artigo_id = int(match_titulo.group(1))
    titulo_curto = match_titulo.group(2)

    # Encontra titulo completo (linha maior que a primeira, nao eh sugestao de imagem)
    titulo_completo = None
    content_start = 1

    for i, line in enumerate(lines[1:], 1):
        # Skip linhas especiais
        if '[SUGESTAO' in line.upper() or line.startswith('Descrição:') or line.startswith('Localização:'):
            continue
        # Se encontra linha maior que titulo curto, provavelmente eh o titulo completo
        if line and len(line) > len(titulo_curto) + 5 and not line.startswith(('JAEN', 'MEIRELES', 'SAMPAIO', 'SANTOS')):
            titulo_completo = line
            content_start = i + 1
            break

    if not titulo_completo:
        titulo_completo = titulo_curto
        content_start = 1

    # Limpa conteudo removendo sugestoes de imagem e referencias
    conteudo_lines = []
    for line in lines[content_start:]:
        # Remove linhas de sugestao de imagem
        if '[SUGESTAO' in line.upper() or '[SUGESTÃO' in line:
            continue
        # Remove referencias (linhas que comecam com nomes de autores)
        if line.startswith(('JAEN', 'MEIRELES', 'SAMPAIO', 'SANTOS', 'VARGAS', 'LEME', 'ALONSO', 'TRESSINO')):
            continue
        # Remove "Descrição:" etc
        if line.startswith('Descrição:') or line.startswith('Localização:'):
            continue
        conteudo_lines.append(line)

    conteudo = '\n'.join(conteudo_lines).strip()

    if not conteudo:
        continue

    # Cria slug a partir do titulo completo
    slug = titulo_completo.lower()
    slug = slug.replace('ã', 'a').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u').replace('ç', 'c')
    slug = re.sub(r'[^a-z0-9\s-]', '', slug).strip()
    slug = re.sub(r'\s+', '-', slug)

    # Pega resumo (primeiro paragrafo)
    paragrafos = conteudo.split('\n\n')
    resumo = paragrafos[0].strip() if paragrafos else conteudo[:300]
    resumo = resumo[:500]

    artigos.append({
        'id': artigo_id,
        'titulo': titulo_completo,
        'slug': slug,
        'resumo': resumo,
        'conteudo': conteudo
    })

# Output JSON
with open('c:\\Users\\stefano\\Documents\\GitHub\\oasis-em-next\\scripts\\artigos-data.json', 'w', encoding='utf-8') as f:
    json.dump(artigos, f, ensure_ascii=False, indent=2)

print(f"OK {len(artigos)} artigos extraidos e salvos")
