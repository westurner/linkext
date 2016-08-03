
import sys
import bs4

contents = sys.stdin.read()
soup = bs4.BeautifulSoup(contents, 'html.parser')
print(soup.prettify())
