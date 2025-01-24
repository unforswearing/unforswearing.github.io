#!/usr/bin/env python
# coding=utf8

# source: https://leancrew.com/all-this/2015/12/homemade-rss-aggregator-followup/
# modified by unforswearing (me) to remove utf8 encoding and use python3+.
# this script will eventually be used to build an aggregated feed, rather than
# the html file that is currently output to unforswearing.com/feed/daily.html.

import feedparser as fp
import time
from datetime import datetime, timedelta
import pytz

subscriptions = [
  'https://hnrss.org/newest?points=100',
  'https://www.smithsonianmag.com/rss/history/',
  'https://www.smithsonianmag.com/rss/multimedia/',
  'https://www.smithsonianmag.com/rss/science-nature/',
  'https://www.smithsonianmag.com/rss/arts-culture/',
  'https://www.smithsonianmag.com/rss/articles/',
  'https://hedgehogreview.com/web-features/feed',
  'https://old.reddit.com/r/Film.rss',
  'https://old.reddit.com/r/CriticalTheory.rss',
  'https://old.reddit.com/r/consciousness.rss'
]

# Date and time setup. I want only posts from "today,"
# where the day lasts until 2 AM.
utc = pytz.utc
homeTZ = pytz.timezone('US/Eastern')
dt = datetime.now(homeTZ)

if dt.hour < 2:
  dt = dt - timedelta(hours=24)
start = dt.replace(hour=0, minute=0, second=0, microsecond=0)
start = start.astimezone(utc)

# Collect all of today's posts and put them in a list of tuples.
posts = []

for s in subscriptions:
  f = fp.parse(s)
  try:
    blog = f['feed']['title']
  except KeyError:
    continue
  for e in f['entries']:
    try:
      when = e['published_parsed']
    except KeyError:
      when = e['updated_parsed']
    when =  utc.localize(datetime.fromtimestamp(time.mktime(when)))
    if when > start:
      title = e['title']
      try:
        body = e['content'][0]['value']
      except KeyError:
        body = e['summary']
      link = e['link']
      posts.append((when, blog, title, link, body))

# Sort the posts in reverse chronological order.
posts.sort()
posts.reverse()

# Turn them into an HTML list.
listTemplate = '''<li>
  <p class="title"><a href="{3}">{2}</a></p>
  <p class="info">{1}<br />{0}</p>
  <p>{4}</p>\n</li>'''

litems = []

for p in posts:
  q = [ x for x in p[1:] ]
  timestamp = p[0].astimezone(homeTZ)
  q.insert(0, timestamp.strftime('%b %d, %Y %I:%M %p'))
  litems.append(listTemplate.format(*q))
ul = '<hr />'.join(litems)

# Print the HTMl.
print('''<html>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width" />
<head>
<style>
body {{
  background-color: #555;
  width: 750px;
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
}}
h1 {{
  font-family: Helvetica, Sans-serif;
}}
.rss {{
  list-style-type: none;
  margin: 0;
  padding: .5em 1em 1em 1.5em;
  background-color: white;
}}
.rss li {{
  margin-left: -.5em;
  line-height: 1.4;
}}
.rss li pre {{
  overflow: auto;
}}
.rss li p {{
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
}}
.title {{
  font-weight: bold;
  font-family: Helvetica, Sans-serif;
  font-size: 110%;
  margin-bottom: .25em;
}}
.title a {{
  text-decoration: none;
  color: black;
}}
.info {{
  font-size: 85%;
  margin-top: 0;
  margin-left: .5em;
}}
img {{
  max-width: 700px;
}}
@media screen and (max-width:667px) {{
  body {{
    font-size: 200%;
    width: 650px;
    background-color: white;
  }}
  .rss li {{
    line-height: normal;
  }}
  img {{
    max-width: 600px;
  }}
}}
</style>
<title>Today’s RSS</title>
<body>
<ul class="rss">
{}
</ul>
<br/>
<em>Generated using the <a href="https://leancrew.com/all-this/2015/12/homemade-rss-aggregator-followup/">homemade rss aggregator</a>.</em>
</body>
</html>
'''.format(ul))
