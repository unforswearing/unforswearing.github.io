<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" href="../css/index.css" />
  </head>
  <body>
    <h2>Unforswearing.com/Feed</h2>
    <hr/>
    This page is a feed of posts from my phone, using iOS shortcuts to generate an xml file, and xsl templates to create this page. This is an experiment and may not be very interesting.
    <br/>
    <a href="https://unforswearing.com">Home</a>
    <hr/>
    <br/>
    <xsl:for-each select="/rss/channel/item">
      <div style="padding-bottom:10px;">
        <em><strong><xsl:value-of select="pubDate"/></strong></em>
        <br/>
        <xsl:value-of select="description"/>
        <br/>
      </div>
    </xsl:for-each>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>