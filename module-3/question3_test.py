import requests

def scrape_web(url: str) -> str:
    """Scrape content from a web page and return it as markdown using Jina Reader.
    
    Args:
        url: The URL of the web page to scrape
        
    Returns:
        The content of the web page in markdown format
    """
    jina_url = f"https://r.jina.ai/{url}"
    response = requests.get(jina_url)
    response.raise_for_status()
    return response.text

if __name__ == "__main__":
    # Test the function
    url = "https://github.com/alexeygrigorev/minsearch"
    content = scrape_web(url)
    char_count = len(content)
    print(f"Content retrieved successfully!")
    print(f"Number of characters: {char_count}")
    print(f"\nFirst 500 characters:\n{content[:500]}")

