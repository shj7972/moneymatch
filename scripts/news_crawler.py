import os
import json
import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
import urllib.parse

# Configuration
query = urllib.parse.quote("정부지원금 OR 복지") # Broader query for testing
RSS_URL = f"https://news.google.com/rss/search?q={query}&hl=ko&gl=KR&ceid=KR:ko"
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "../src/data/news.json")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def fetch_news():
    print(f"Fetching news from {RSS_URL}...")
    feed = feedparser.parse(RSS_URL)
    entries = feed.entries[:6]  # Get top 6 news items
    
    news_items = []
    
    for entry in entries:
        title = entry.title
        link = entry.link
        published = entry.published
        
        # Basic sentiment analysis (Mock for now, or use LLM if key exists)
        sentiment = "neutral"
        if "상승" in title or "급등" in title or "호재" in title:
            sentiment = "positive"
        elif "하락" in title or "급락" in title or "악재" in title:
            sentiment = "negative"
            
        summary = "AI 요약 서비스를 연결해주세요."
        
        # If OpenAI key is present, use it for summary (Simplified)
        # For this demo, we'll strip HTML from description or use title as summary base
        if 'summary' in entry:
            soup = BeautifulSoup(entry.summary, 'html.parser')
            summary = soup.get_text()[:100] + "..."
            
        news_items.append({
            "title": title,
            "link": link,
            "published": published,
            "summary": summary,
            "sentiment": sentiment
        })
        
    return news_items

def save_news(news_items):
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(news_items, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(news_items)} news items to {OUTPUT_FILE}")

import sys

if __name__ == "__main__":
    try:
        data = fetch_news()
        save_news(data)
        print("Successfully updated news data.")
    except Exception as e:
        print(f"Error occurred during news update: {e}", file=sys.stderr)
        sys.exit(1)
