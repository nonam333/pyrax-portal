import { Quote } from "lucide-react";

interface PullQuoteProps {
  content: string;
  author?: string;
  [key: string]: any;
}

export function PullQuote({ content, author }: PullQuoteProps) {
  return (
    <div className="my-8 relative">
      <div className="absolute -left-4 top-0 text-primary/20">
        <Quote className="w-12 h-12" />
      </div>
      <blockquote className="border-l-4 border-primary bg-gradient-to-r from-primary/10 to-transparent pl-8 pr-6 py-6 italic">
        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
          {content}
        </p>
        {author && (
          <footer className="mt-4 text-sm text-muted-foreground not-italic">
            — {author}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
