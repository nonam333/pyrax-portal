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
        className={`group rounded-lg overflow-hidden bg-card border border-card-border cursor-pointer ${isLarge ? 'md:flex' : ''
          }`}
        data-testid={`card-article-${article.id}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge
            ? 'md:w-1/2'
            : isCompact
              ? 'h-40'
              : 'h-48'
          }`}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            data-testid={`img-article-${article.id}`}
          />
          <div className="absolute top-3 left-3">
            <Badge
              className="bg-gradient-to-r from-primary to-accent text-black font-medium"
              data-testid={`badge-category-${article.id}`}
            >
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={`p-4 ${isLarge ? 'md:w-1/2 md:p-6' : 'space-y-3'}`}>
          <h3
            className={`font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 ${isLarge ? 'text-xl md:text-2xl mb-3' : isCompact ? 'text-sm' : 'text-lg'
              }`}
            data-testid={`text-title-${article.id}`}
          >
            {article.title}
          </h3>

          {!isCompact && (
            <p
              className={`text-muted-foreground line-clamp-3 ${isLarge ? 'text-base' : 'text-sm'
                }`}
              data-testid={`text-excerpt-${article.id}`}
            >
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className={`flex items-center text-muted-foreground ${isCompact ? 'text-xs space-x-3' : 'text-sm space-x-4'
            }`}>
            <div className="flex items-center space-x-1" data-testid={`meta-author-${article.id}`}>
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1" data-testid={`meta-time-${article.id}`}>
              <Clock className="h-3 w-3" />
              <span>{article.publishedAt}</span>
            </div>
            {!isCompact && (
              <span data-testid={`text-read-time-${article.id}`}>{article.readTime}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}