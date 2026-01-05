"""
Search implementation for Question 5.
Downloads fastmcp documentation, indexes it with minsearch, and provides search functionality.
"""
import os
import zipfile
import requests
from pathlib import Path
from minsearch import Index

def download_file(url: str, filepath: str) -> bool:
    """Download a file if it doesn't already exist."""
    if os.path.exists(filepath):
        print(f"File already exists: {filepath}")
        return False
    
    print(f"Downloading {url}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(filepath, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    
    print(f"Downloaded to {filepath}")
    return True

def extract_and_process_files(zip_path: str, extract_to: str) -> list[dict]:
    """Extract zip file and process only .md and .mdx files.
    
    Returns:
        List of dictionaries with 'filename' and 'content' keys
    """
    documents = []
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        # Get all file names
        all_files = zip_ref.namelist()
        
        # Filter for .md and .mdx files
        md_files = [f for f in all_files if f.endswith('.md') or f.endswith('.mdx')]
        
        print(f"Found {len(md_files)} markdown files")
        
        for file_path in md_files:
            # Remove the first part of the path (e.g., "fastmcp-main/")
            # Split by '/' and remove the first element
            parts = file_path.split('/')
            if len(parts) > 1:
                # Remove the first directory (e.g., "fastmcp-main")
                clean_path = '/'.join(parts[1:])
            else:
                clean_path = file_path
            
            # Read file content
            try:
                content = zip_ref.read(file_path).decode('utf-8')
                documents.append({
                    'filename': clean_path,
                    'content': content
                })
                print(f"Processed: {clean_path}")
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
    
    return documents

def create_index(documents: list[dict]) -> Index:
    """Create a minsearch index from documents."""
    print("Creating search index...")
    
    # Initialize Index with 'content' as the text field to index
    # 'filename' will be stored but not indexed for search
    index = Index(text_fields=['content'])
    
    # Fit the index with documents
    index.fit(documents)
    
    print(f"Indexed {len(documents)} documents")
    return index

def search_documents(index: Index, query: str, top_k: int = 5) -> list[dict]:
    """Search the index and return top_k most relevant documents.
    
    Args:
        index: The MinSearch index
        query: Search query string
        top_k: Number of results to return (default: 5)
        
    Returns:
        List of document dictionaries with filename and content
    """
    print(f"Searching for: '{query}'")
    
    # Search the index
    # num_results specifies how many results to return
    # output_ids=False means return full documents, not just IDs
    results = index.search(query, num_results=top_k, output_ids=False)
    
    return results

def main():
    """Main function to download, index, and test search."""
    # Configuration
    zip_url = "https://github.com/jlowin/fastmcp/archive/refs/heads/main.zip"
    zip_filename = "fastmcp-main.zip"
    extract_dir = "fastmcp-extracted"
    
    # Step 1: Download zip file if not already downloaded
    download_file(zip_url, zip_filename)
    
    # Step 2: Extract and process files
    documents = extract_and_process_files(zip_filename, extract_dir)
    print(f"\nTotal documents processed: {len(documents)}")
    
    # Step 3: Create index
    index = create_index(documents)
    
    # Step 4: Test search with "demo" query
    print("\n" + "="*50)
    print("Testing search with query: 'demo'")
    print("="*50)
    
    results = search_documents(index, "demo", top_k=5)
    
    print(f"\nFound {len(results)} results:")
    for i, result in enumerate(results, 1):
        print(f"\n{i}. {result.get('filename', 'Unknown')}")
        # Show first 200 characters of content
        content_preview = result.get('content', '')[:200]
        print(f"   Preview: {content_preview}...")
    
    # Answer to Question 5
    if results:
        first_file = results[0].get('filename', 'Unknown')
        print(f"\n{'='*50}")
        print(f"First file returned: {first_file}")
        print(f"{'='*50}")
    else:
        print("\nNo results found!")

if __name__ == "__main__":
    main()

