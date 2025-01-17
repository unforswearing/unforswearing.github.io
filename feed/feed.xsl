<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" href="../css/index.css" />
  </head>
  <body>
    <h2><a href="https://unforswearing.com">unforswearing.com</a>/feed</h2>
    <hr/>
    This page is a feed of posts from my phone, using iOS shortcuts to generate an xml file, iCloud to sync the file to a git repo, and bash script to run xsl templates to generate this html page. This is an experiment and may not be very interesting.
    <br/>
    <a href="https://unforswearing.com">Home</a>
    <hr/>
    <br/>
    <xsl:for-each select="/rss/channel/item">
      <div style="padding-bottom:10px; width: 60%;">
        <em><strong><xsl:value-of select="pubDate"/></strong></em>
        <br/>
        <xsl:value-of select="description"/>
        <br/>
        <span>...</span>
        <br/>
      </div>
    </xsl:for-each>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>