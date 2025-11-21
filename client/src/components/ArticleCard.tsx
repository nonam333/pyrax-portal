import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { Link } from 'wouter';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  coverImage?: string;
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

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link href={`/article/${article.id}`}>
      <motion.article
        ref={cardRef}
        className={`group hover-elevate rounded-lg overflow-hidden bg-card border border-card-border cursor-pointer h-full flex flex-col ${
          isLarge ? 'md:flex-row' : ''
        }`}
        data-testid={`card-article-${article.id}`}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.02,
          y: -8,
          boxShadow: '0 20px 40px rgba(255, 141, 0, 0.3), 0 0 20px rgba(255, 141, 0, 0.2)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${
          isLarge
            ? 'h-48 md:h-auto md:w-1/2'
            : isCompact
              ? 'h-40'
              : 'h-48'
        }`}>
          <motion.img
            src={article.image || article.coverImage || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=675&fit=crop'}
            alt={article.title}
            className="w-full h-full object-cover"
            data-testid={`img-article-${article.id}`}
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
          {/* Shine effect overlay */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ pointerEvents: 'none' }}
            />
          )}
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <Badge
              className="bg-gradient-to-r from-primary to-accent text-black font-medium text-xs shadow-lg"
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
      </motion.article>
    </Link>
  );
}