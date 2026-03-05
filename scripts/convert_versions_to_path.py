import os
import shutil

# Define the source and destination directories
source_directory = "../versions"
destination_directory = "../versions"

# Iterate over all files in the source directory
for file in os.listdir(source_directory):
    if file.endswith(".json"):
        # Extract the folder name before the "_"
        folder_name = file.split("_")[0]
        
        # Create the full path for the new folder
        folder_path = os.path.join(destination_directory, folder_name)
        
        # Create the new folder if it doesn't exist yet
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        # Move the file to the new folder with the name after the "_"
        new_name = file.split("_")[1]
        destination_path = os.path.join(folder_path, new_name)
        shutil.move(os.path.join(source_directory, file), destination_path)
