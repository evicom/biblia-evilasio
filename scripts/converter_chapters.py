import os
import json

def create_directories_and_files(main_folder, data):
    os.makedirs(main_folder, exist_ok=True)
    for item in data:
        id = item['id'].replace(" ", "")
        folder_name = main_folder + "/" + id

        os.makedirs(folder_name, exist_ok=True)
        book_file = os.path.join(folder_name, f'{id}.json')
        with open(book_file, 'w') as f:
            json.dump(item, f, ensure_ascii=False)
                

# Recursively get the paths of all JSON files in the "versions" folder
def get_json_file_paths(folder):
    json_files = []
    for root, dirs, files in os.walk(folder):
        if root.count(os.sep) - folder.count(os.sep) == 0:
            for file in files:
                if file.endswith('.json'):
                    json_files.append(os.path.join(root, file))
    return json_files

# Get the JSON file paths
json_files = get_json_file_paths('../versions/pt-br')

print(json_files)

for json_file in json_files:
    if not json_file.endswith('.json'):
        continue
    json_file = f'{json_file}'

    with open(json_file, encoding='utf-8-sig') as f:
        data = json.load(f)

    main_folder = json_file.replace('.json', '')
    create_directories_and_files(main_folder, data)