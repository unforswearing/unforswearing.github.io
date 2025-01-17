<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="stylesheet" href="../css/index.css" />
        <style>
          @media all and (max-width: 900px) {
          body {
          padding-left: 60px;
          font-size: 160%;
          }
          }
        </style>
      </head>
      <body style="padding-bottom:800px;">
        <h2><a href="https://unforswearing.com">unforswearing.com</a> / <a href="/feed/index.html">
  feed</a></h2>
        <hr />
        <em>
          <xsl:value-of select="/rss/channel/description" />
        </em>
        <br />
        <details style="font-size:85%"><summary style="padding-bottom:10px;">About</summary> This
  page is a feed of posts from my phone, using iOS shortcuts to generate an xml file synced to a git
  repository. For now I am manually running a bash script to (1) run an xsl template that generates
  this html page, and (2) push files to the server. <br /> This is an experiment and may not be very
  interesting. However, feel free to <a href="feed.xml" target="_top">subscribe to this feed</a> for
  updates. </details>
        <hr />
        <br />
        <xsl:for-each select="/rss/channel/item">
          <div class="items" style="padding-bottom:10px; width: 60%;">
            <h3 class="{guid}" id="{guid}" style="font-style: italic;">
              <xsl:value-of select="pubDate" />
            </h3>
            <em>
              <a href="#{guid}" style="font-size: 85%; padding-left:5px;">[link]</a>
            </em>
            <xsl:copy-of select="description/node()" />
            <span style="color: #a9a9a9">..</span>
            <br />
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>