import re

# Read the file
with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Counter for unique seeds
counter = [100]

def replace_url(match):
    seed = counter[0]
    counter[0] += 1
    return f'https://picsum.photos/seed/{seed}/400/300'

# Replace all Unsplash URLs
content = re.sub(r'https://images\.unsplash\.com/[^"\']+', replace_url, content)

# Write back
with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Replaced {counter[0] - 100} Unsplash URLs with picsum.photos')
