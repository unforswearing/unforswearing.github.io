<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.1">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <link rel="stylesheet" href="../css/index.css"/>
        <link rel="stylesheet" href="feed.css"/>
      </head>
      <body id="top" style="padding-bottom:1000px;">
        <h1><a style="text-decoration: none;" href="https://unforswearing.com">unforswearing.com</a> / <a style="text-decoration: none; color: #b7410e;" href="/feed/">feed</a>
          <span style="color: #b7410e; padding-left: 10px;">■</span>
        </h1>
        <em>
          <xsl:value-of select="/rss/channel/description"/>
        </em>
        <br/>
        <br/>
        <details style="font-size:85%"><summary style="padding-bottom:10px;"><strong>About</strong></summary><strong style="color: #b7410e;">Feed</strong> is a page that collects very short thoughts or links that can be quickly added to the site from my phone via iOS Shortcuts. This page started as a way to create something interesting with RSS feeds, and this seemed like a great way to create a mobile-based publishing workflow.
        <br/><br/>
        Posts are created by running a shortcut on my phone. The shortcut asks for a post body, creates the <code>rss</code> / <code>xml</code> content from a template, and saves the file to a <code>git</code> repository. From there, the RSS file is processed using a <code>xsl</code> template to generate this HTML page.
        <br/><br/>
        This is an experiment and may not be very interesting. However, feel free to <a href="feed.xml" target="_top">subscribe to this feed</a> for updates.
        <br/><br/>
        </details>
        <!-- <hr style="width:85%; float: left; padding-bottom: 10x;"/> -->
        <br/>
        <xsl:for-each select="/rss/channel/item">
          <xsl:variable name="post">
            <div class="items">
              <h2 class="{guid}" id="{guid}" style="font-style: italic;">
                <span style="color: #b7410e; padding-right: 10px; font-size: 125%">■</span>
                <xsl:value-of select="pubDate"/>
              </h2>
              <span style="margin-top: -20px;">
                <em>
                  <sub>
                    <!-- <a href="#{guid}" style="font-size: 85%; padding-top: 0px;">link</a> -->
                    <a href="#{guid}" style="font-size: 85%; line-height: 10px;">link</a>
                  </sub>
                </em>
              </span>
              <xsl:copy-of select="description/node()"/>
              <div style="padding-top: 80px;">
                <xsl:if test="position()!=last()">
                  <em>
                    <strong>
                      <a href="#{following-sibling::item[1]/guid}" style="font-size: 85%; padding-right:10px;">prev</a>
                    </strong>
                  </em>
                </xsl:if>
                <xsl:if test="position()&gt;1">
                  <em>
                    <strong>
                      <a href="#{preceding-sibling::item[1]/guid}" style="font-size: 85%; padding-left: 10px; padding-right: 10px;">next</a>
                    </strong>
                  </em>
                </xsl:if>
                <em>
                  <strong>
                    <a href="#top" style="font-size: 85%; float: right;">top</a>
                  </strong>
                </em>
              </div>
            </div>
          </xsl:variable>
          <xsl:copy-of select="$post"/>
          <!-- <hr style="width:85%; float: left; padding-bottom: 10x;"/> -->
          <xsl:variable name="prevGuid" value="{guid}"/>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
