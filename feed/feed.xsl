<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" href="../css/index.css" />
  </head>
  <body style="padding-bottom:600px;">
    <h2><a href="https://unforswearing.com">unforswearing.com</a> / <a href="/feed/index.html">feed</a></h2>
    <hr/>
    This page is a feed of posts from my phone, using iOS shortcuts to generate an xml file synced to a git repository. For now I am manually running a bash script to (1) run an xsl template that generates this html page, and (2) push files to the server.
    <br/>
    This is an experiment and may not be very interesting.
    <hr/>
    <br/>
    <xsl:for-each select="/rss/channel/item">
      <div style="padding-bottom:10px; width: 60%;">
        <span class="{guid}" id="{guid}"><em><strong><xsl:value-of select="pubDate"/></strong></em></span>
        <em><a href="feed/index.html#{guid}" style="font-size: 85%; padding-left:5px;">link</a></em>
        <br/>
        <xsl:value-of select="description"/>
        <br/>
        <span style="color: #a9a9a9">..</span>
        <br/>
      </div>
    </xsl:for-each>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>