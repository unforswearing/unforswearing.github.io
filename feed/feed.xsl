<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="stylesheet" href="../css/index.css" />
        <style>
          html {
            font-size: 125%;
          }
          a {
            text-decoration: underline;
          }
          @media all and (max-width: 1200px) {
          body {
          padding-left: 80px;
          font-size: 180%;
          }
          }
        </style>
      </head>
      <body style="padding-bottom:800px;">
        <h2><a style="text-decoration: none;" href="https://unforswearing.com">unforswearing.com</a> / <a
            style="text-decoration: none; color: #b7410e;" href="/feed/">
  feed</a><span style="color: #b7410e; padding-left: 10px;">■</span></h2>
        <hr />
        <em>
          <xsl:value-of select="/rss/channel/description" />
        </em>
        <br />
        <details style="font-size:85%"><summary style="padding-bottom:10px;">About</summary><strong style="color: #b7410e;">Feed</strong> is a page that collects very short thoughts or links that can be quickly added to the site from my phone via iOS Shortcuts. This page started as a way to create something interesting with RSS feeds, and this seemed like a great first attempt to create a mobile-based publishing workflow.
        <br/>
        Posts are created by running a shortcut on my phone. The shortcut asks for a post body, creates the <code>rss</code> / <code>xml</code> content from a template, and saves the file to a <code>git</code> repository. From there, the RSS file is processed using a <code>xsl</code> template to generate this HTML page.
        <br />
        This is an experiment and may not be very interesting. However, feel free to <a href="feed.xml" target="_top">subscribe to this feed</a> for updates.
        </details>
        <hr />
        <xsl:for-each select="/rss/channel/item">
          <div class="items" style="padding-bottom:10px; padding-top: 10px; width: 70%;">
            <h3 class="{guid}" id="{guid}" style="font-style: italic;">
              <span style="color: #b7410e; padding-right: 10px; font-size: 125%">■</span><xsl:value-of select="pubDate" />
            </h3>
            <em>
              <sub><a href="#{guid}" style="font-size: 85%;">link</a></sub>
            </em>
            <xsl:copy-of select="description/node()" />
            <xsl:if test="position()!=last()">
              <em><strong><a href="#{following-sibling::item[1]/guid}"
                style="font-size: 85%; padding-right: 7px">prev</a></strong></em>
            </xsl:if>
            <xsl:if test="position()>1">
              <em><strong><a href="#{preceding-sibling::item[1]/guid}"
                style="font-size: 85%; padding-left: 7px; padding-right: 7px">next</a></strong></em>
            </xsl:if>
            <br />
          </div>
          <xsl:variable name="prevGuid" value="{guid}" />
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>