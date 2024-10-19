import os
import requests
import pathspec  # Install using `pip install pathspec`
from dotenv import load_dotenv  # Install using `pip install python-dotenv`
from openai import OpenAI  # Import OpenAI client

# Load environment variables from .env file
load_dotenv()

# Retrieve OpenAI API key and Ollama API URL from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OLLAMA_API_URL = os.getenv("OLLAMA_API_URL")

# Instantiate OpenAI client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Configuration: Switch between Ollama and OpenAI APIs
use_openai = True  # Set to True to use OpenAI API, False to use Ollama

# Load .gitignore and return a PathSpec object
def load_gitignore(project_dir):
    gitignore_path = os.path.join(project_dir, '.gitignore')
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as gitignore_file:
            gitignore_patterns = gitignore_file.read()
        return pathspec.PathSpec.from_lines('gitwildmatch', gitignore_patterns.splitlines())
    return None

# Define a function to generate documentation for a file
def generate_documentation(file_content, file_name, relative_path):
    prompt = f"""
    Please generate concise markdown documentation for the following file named `{file_name}`, which is part of a larger software project. The documentation should include:

    - **File Purpose**: A short explanation of what this file contributes to the project.
    - **Key Functions/Classes**: Summarize any key functions or classes and their purpose, without detailing every small function.
    - **How It's Used**: Describe how this file is typically used in the context of the project.
    - **Dependencies**: Mention any significant dependencies or libraries used in this file.

    Here is the content of `{file_name}`:

    ```python
    {file_content}
    ```
    """

    if use_openai:
        # Use OpenAI API with new format
        completion = openai_client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.5
        )
        # Access response text
        return completion.choices[0].message.content
    else:
        # Use Ollama API
        response = requests.post(
            OLLAMA_API_URL,
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False  # Disable streaming for simplicity
            }
        )

        if response.status_code == 200:
            return response.json().get("response", "No response from model")
        else:
            return f"Error: {response.status_code}, {response.text}"

# Function to check if a file matches exclusion patterns
def should_exclude_file(relative_path, file_name):
    # List of specific files to exclude
    excluded_files = ['autodoc.py']

    # Patterns to exclude files
    excluded_patterns = [
        lambda f: f.endswith('.test.js'),  # Files ending with '.test.js'
        lambda f: f.endswith('.config.js') and '/' not in relative_path,  # Files ending with '.config.js' only if in root
        lambda f: 'dist/' in relative_path  # Exclude files within 'dist' directories
    ]

    # Check if the file matches specific exclusions
    if file_name in excluded_files:
        return True

    # Check if the file matches any exclusion pattern
    for pattern in excluded_patterns:
        if pattern(file_name):
            return True

    return False

# Function to traverse the directory and generate markdown files
def generate_docs_for_project(project_dir):
    gitignore_spec = load_gitignore(project_dir)
    generated_docs = []

    for root, dirs, files in os.walk(project_dir):
        # Remove ignored directories from traversal and exclude 'dist' directories
        dirs[:] = [d for d in dirs if not gitignore_spec or not gitignore_spec.match_file(os.path.relpath(os.path.join(root, d), project_dir))]
        dirs[:] = [d for d in dirs if d != 'dist']

        for file in files:
            relative_path = os.path.relpath(os.path.join(root, file), project_dir)

            # Skip ignored files
            if gitignore_spec and gitignore_spec.match_file(relative_path):
                continue

            # Skip files based on custom exclusion rules
            if should_exclude_file(relative_path, file):
                continue

            # Only process code files (e.g., .py, .js, .php, .vue)
            if file.endswith(('.py', '.js', '.php', '.vue')):
                file_path = os.path.join(root, file)

                # Read the contents of the file
                with open(file_path, 'r') as f:
                    file_content = f.read()

                # Generate documentation using the chosen LLM
                documentation = generate_documentation(file_content, file, relative_path)

                # Include the relative path in the markdown
                markdown_content = f"# Documentation for `{file}`\n\n"
                markdown_content += f"**File Path**: `{relative_path}`\n\n"
                markdown_content += documentation

                # Save the markdown file
                doc_file_path = os.path.join(root, file.replace('.', '_') + "_doc.md")
                with open(doc_file_path, 'w') as doc_file:
                    doc_file.write(markdown_content)

                generated_docs.append(markdown_content)
                print(f"Documentation generated for {file_path}")

    # Generate overview documentation
    generate_overview(generated_docs, project_dir)

# Function to generate an overview markdown file for the project
def generate_overview(generated_docs, project_dir):
    combined_docs = "\n\n".join(generated_docs)
    prompt = f"""
    Please generate an overview markdown documentation for the entire project. The overview should include:

    - **Project Purpose**: Describe the overall purpose of the project.
    - **Key Features**: Highlight the main features and components of the project.
    - **Summary**: Provide a summary of the different parts based on the provided documentation.

    Here are the generated documentation snippets for each file in the project:

    {combined_docs}
    """

    if use_openai:
        # Use OpenAI API with new format
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
            temperature=0.5
        )
        overview_content = completion.choices[0].message.content
    else:
        # Use Ollama API
        response = requests.post(
            OLLAMA_API_URL,
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False  # Disable streaming for simplicity
            }
        )

        if response.status_code == 200:
            overview_content = response.json().get("response", "No response from model")
        else:
            overview_content = f"Error: {response.status_code}, {response.text}"

    # Save the overview markdown file
    overview_file_path = os.path.join(project_dir, "overview.md")
    with open(overview_file_path, 'w') as overview_file:
        overview_file.write(overview_content)

    print("Overview documentation generated for the project.")

# Use the current working directory as the project directory
project_directory = os.getcwd()
generate_docs_for_project(project_directory)
