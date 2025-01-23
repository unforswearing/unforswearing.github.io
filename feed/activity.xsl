<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="stylesheet" href="feed.css" />
        <link rel="alternate" type="application/rss+xml" title="Feed" href="activity.xml" />
      </head>
      <body>
        <xsl:value-of select="atom:feed/atom:title"/><br/>
        <em>Updated: <xsl:value-of select="atom:feed/atom:updated" /></em>
        <xsl:apply-templates select="atom:feed/atom:entry" />
      </body>
    </html>
  </xsl:template>

  <xsl:template match="atom:entry">
    <ul>
    <li>
        <xsl:value-of select="atom:title" /><span style="font-size:75%; color: #9f0f8f;"><em>
            <xsl:value-of select="atom:updated" /></em></span>
      </li>
    </ul>
    <!-- <div>
      <xsl:value-of select="atom:summary" disable-output-escaping="yes" />
    </div> -->
  </xsl:template>
</xsl:stylesheet>