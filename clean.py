import re

with open('c:/Users/User/Desktop/011111/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove style='text-align: left' from doc-list
html = re.sub(r'class="doc-list"\s+style="text-align:\s*left"', 'class="doc-list"', html)

# Replace inline margin with class doc-list-item
html = re.sub(r'style="margin-bottom:\s*12px"', 'class="doc-list-item"', html)

# Replace the giant span style with class doc-list-name
html = re.sub(r'style="\s*display:\s*block;\s*font-size:\s*0\.85rem;\s*font-weight:\s*600;\s*margin-bottom:\s*5px;\s*color:\s*var\(--primary-color\);\s*"', 'class="doc-list-name"', html)

# Replace doc-actions with justify-content flex-start
html = re.sub(r'class="doc-actions"\s+style="justify-content:\s*flex-start"', 'class="doc-list-actions"', html)

# Remove the padding and font size inline styles from the buttons inside the list
html = re.sub(r'style="padding:\s*5px\s*12px;\s*font-size:\s*0\.8rem"', '', html)

# Sometimes prettier formats it differently, let's catch the unquoted styles too just in case, though prettier always uses quotes.

with open('c:/Users/User/Desktop/011111/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
