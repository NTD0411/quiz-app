import re

# Read preview.html
with open('preview.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract text content from <pre> tags
match = re.search(r'<pre>(.*?)</pre>', content, re.DOTALL)
if not match:
    print("Could not find <pre> tag")
    exit(1)

text = match.group(1).strip()

# Parse test data
tests_data = {}
current_test = None
current_part = None
lines = text.split('\n')

i = 0
while i < len(lines):
    line = lines[i].strip()
    
    # Check for TEST XX
    if line.startswith('TEST'):
        match = re.match(r'TEST (\d+)', line)
        if match:
            test_num = match.group(1)
            current_test = test_num
            tests_data[test_num] = {
                'part2': {}
            }
    
    # Check for PART 2
    if 'PART 2' in line:
        current_part = 'part2'
    
    # Check for question number (11-15 are Part 2)
    if current_test and current_part == 'part2':
        q_match = re.match(r'(\d+)\.(.+)', line)
        if q_match:
            q_num = q_match.group(1)
            if q_num in ['11', '12', '13', '14', '15']:
                # Extract sign (text until "What does the text say?")
                sign_lines = []
                i += 1
                while i < len(lines):
                    if 'What does the text say?' in lines[i]:
                        break
                    if lines[i].strip():
                        sign_lines.append(lines[i].strip())
                    i += 1
                
                sign_text = '\n'.join(sign_lines)
                
                # Extract answer options
                options = {'A': '', 'B': '', 'C': '', 'D': ''}
                while i < len(lines) and len(options) > 0:
                    line_strip = lines[i].strip()
                    for key in ['A', 'B', 'C', 'D']:
                        if line_strip.startswith(key + '.'):
                            options[key] = line_strip[2:].strip()
                    i += 1
                    if re.match(r'^\d+\.', line_strip):
                        i -= 1
                        break
                
                if current_test in tests_data and sign_text:
                    tests_data[current_test]['part2'][q_num] = {
                        'sign': sign_text,
                        'options': options
                    }
                
                continue
    
    i += 1

# Output as JavaScript
print("window.EXAM_BANK_PART2 = " + str(tests_data).replace("'", '"') + ";")
