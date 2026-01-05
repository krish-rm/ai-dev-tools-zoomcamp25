"""
Test script to count occurrences of "data" on https://datatalks.club/
This simulates what the MCP tool should do when integrated with Cursor.
"""
import requests

def scrape_web(url: str) -> str:
    """Scrape content from a web page and return it as markdown using Jina Reader."""
    jina_url = f"https://r.jina.ai/{url}"
    response = requests.get(jina_url)
    response.raise_for_status()
    return response.text

if __name__ == "__main__":
    url = "https://datatalks.club/"
    print(f"Scraping {url}...")
    content = scrape_web(url)
    
    # Count occurrences of "data" (case-insensitive)
    count = content.lower().count("data")
    
    print(f"\nContent length: {len(content)} characters")
    print(f"Number of times 'data' appears: {count}")
    print(f"\nFirst 1000 characters of content:\n{content[:1000]}...")

