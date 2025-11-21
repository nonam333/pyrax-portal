import { motion } from "framer-motion";
import { ArticleChart } from "./article/ArticleChart";
import { DataTable } from "./article/DataTable";
import { StatBox } from "./article/StatBox";
import { Callout } from "./article/Callout";
import { ImageGallery } from "./article/ImageGallery";
import { PullQuote } from "./article/PullQuote";
import AdSlot from "./AdSlot";

interface RichArticleContentProps {
  content: string;
  injectAds?: boolean;
}

export function RichArticleContent({ content, injectAds = true }: RichArticleContentProps) {
  // Parse the HTML content and replace custom tags with React components
  const parseContent = (htmlContent: string) => {
    const sections: JSX.Element[] = [];
    let currentIndex = 0;

    // Regular expression to find custom tags
    const customTagRegex = /<(chart|datatable|statbox|callout|gallery|pullquote)\s+([^>]*)>([\s\S]*?)<\/\1>/gi;

    let match;
    let sectionIndex = 0;
    let contentSectionCount = 0; // Track content sections for ad injection

    while ((match = customTagRegex.exec(htmlContent)) !== null) {
      const [fullMatch, tagName, attributes, innerContent] = match;
      const matchStart = match.index;

      // Add HTML content before this custom tag
      if (matchStart > currentIndex) {
        const htmlBefore = htmlContent.substring(currentIndex, matchStart);
        if (htmlBefore.trim()) {
          sections.push(
            <motion.div
              key={`html-${sectionIndex}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlBefore }}
            />
          );
          sectionIndex++;
          contentSectionCount++;

          // Inject ad after approximately every 3-4 content sections (around 40% through content)
          if (injectAds && contentSectionCount === 3) {
            sections.push(
              <motion.div
                key={`ad-mid-${sectionIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="my-12"
              >
                <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
                <div className="flex justify-center lg:hidden">
                  <AdSlot size="mobile" position="mid-article-mobile" />
                </div>
                <div className="hidden lg:flex justify-center">
                  <AdSlot size="square" position="mid-article" />
                </div>
              </motion.div>
            );
            sectionIndex++;
          }
        }
      }

      // Parse attributes from the tag
      const attrs = parseAttributes(attributes);

      // Render the appropriate component based on tag name
      sections.push(
        <motion.div
          key={`${tagName}-${sectionIndex}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
        >
          {renderCustomComponent(tagName, attrs, innerContent, sectionIndex)}
        </motion.div>
      );
      sectionIndex++;

      currentIndex = matchStart + fullMatch.length;
    }

    // Add any remaining HTML content after the last custom tag
    if (currentIndex < htmlContent.length) {
      const htmlAfter = htmlContent.substring(currentIndex);
      if (htmlAfter.trim()) {
        sections.push(
          <motion.div
            key={`html-${sectionIndex}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlAfter }}
          />
        );
      }
    }

    return sections;
  };

  const parseAttributes = (attrString: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    return attrs;
  };

  const renderCustomComponent = (
    tagName: string,
    attrs: Record<string, string>,
    content: string,
    index: number
  ): JSX.Element => {
    switch (tagName.toLowerCase()) {
      case "chart":
        return <ArticleChart key={`chart-${index}`} {...attrs} data={content} />;
      case "datatable":
        return <DataTable key={`table-${index}`} {...attrs} data={content} />;
      case "statbox":
        return <StatBox key={`stat-${index}`} {...attrs} content={content} />;
      case "callout":
        return <Callout key={`callout-${index}`} {...attrs} content={content} />;
      case "gallery":
        return <ImageGallery key={`gallery-${index}`} {...attrs} images={content} />;
      case "pullquote":
        return <PullQuote key={`quote-${index}`} {...attrs} content={content} />;
      default:
        return <div key={`unknown-${index}`} />;
    }
  };

  return (
    <div className="space-y-8">
      {parseContent(content)}
    </div>
  );
}
