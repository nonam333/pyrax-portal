import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { Link } from 'wouter';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'large' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isLarge = variant === 'large';
  const isCompact = variant === 'compact';

  return (
    <Link href={`/article/${article.id}`}>
      <article
        className={`group hover-elevate rounded-lg overflow-hidden bg-card border border-card-border transition-all duration-200 cursor-pointer h-full flex flex-col ${
          isLarge ? 'md:flex-row' : ''
        }`}
        data-testid={`card-article-${article.id}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${
          isLarge
            ? 'h-48 md:h-auto md:w-1/2'
            : isCompact
              ? 'h-40'
              : 'h-48'
        }`}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-testid={`img-article-${article.id}`}
          />
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <Badge
              className="bg-gradient-to-r from-primary to-accent text-black font-medium text-xs"
              data-testid={`badge-category-${article.id}`}
            >
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={`p-3 md:p-4 flex flex-col ${isLarge ? 'md:w-1/2 md:p-6 md:justify-between' : 'space-y-2 md:space-y-3'}`}>
          <div>
            <h3
              className={`font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 ${
                isLarge ? 'text-lg md:text-xl lg:text-2xl mb-2 md:mb-3' : isCompact ? 'text-sm md:text-base' : 'text-base md:text-lg'
              }`}
              data-testid={`text-title-${article.id}`}
            >
              {article.title}
            </h3>

            {!isCompact && (
              <p
                className={`text-muted-foreground line-clamp-2 md:line-clamp-3 mt-2 ${
                  isLarge ? 'text-sm md:text-base' : 'text-xs md:text-sm'
                }`}
                data-testid={`text-excerpt-${article.id}`}
              >
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Meta */}
          <div className={`flex items-center flex-wrap gap-2 text-muted-foreground mt-auto pt-2 ${
            isCompact ? 'text-xs' : 'text-xs md:text-sm'
          }`}>
            <div className="flex items-center gap-1" data-testid={`meta-author-${article.id}`}>
              <User className="h-3 w-3 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{article.author}</span>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-1" data-testid={`meta-time-${article.id}`}>
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="whitespace-nowrap">{article.publishedAt}</span>
            </div>
            {!isCompact && (
              <>
                <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                <span className="hidden sm:inline whitespace-nowrap" data-testid={`text-read-time-${article.id}`}>{article.readTime}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}