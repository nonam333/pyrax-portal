import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import { BookOpen, ArrowLeft } from "lucide-react";

// Category configurations
const CATEGORY_CONFIG: Record<string, {
  title: string;
  description: string;
  icon: string;
  difficulty: string;
}> = {
  "crypto-basics": {
    title: "Cryptocurrency Basics",
    description: "Fundamental concepts and blockchain technology essentials for complete beginners",
    icon: "📚",
    difficulty: "Beginner"
  },
  "wallets": {
    title: "Cryptocurrency Wallets",
    description: "Secure and manage your digital assets with the right wallet solutions",
    icon: "💼",
    difficulty: "Beginner"
  },
  "trading": {
    title: "Trading & Investment",
    description: "Trading strategies, technical analysis, and investment fundamentals",
    icon: "📈",
    difficulty: "Intermediate"
  },
  "defi": {
    title: "DeFi & Staking",
    description: "Decentralized finance protocols and passive income strategies",
    icon: "🪙",
    difficulty: "Intermediate"
  },
  "nfts": {
    title: "NFTs & Digital Collectibles",
    description: "Non-fungible tokens, digital art, and blockchain collectibles",
    icon: "🖼️",
    difficulty: "Beginner"
  },
  "security": {
    title: "Security & Best Practices",
    description: "Protect your cryptocurrency assets and avoid common security pitfalls",
    icon: "🛡️",
    difficulty: "Beginner"
  },
  "taxes": {
    title: "Taxes & Compliance",
    description: "Cryptocurrency tax laws, reporting requirements, and regulatory compliance",
    icon: "⚖️",
    difficulty: "Intermediate"
  },
  "developers": {
    title: "Blockchain Development",
    description: "Smart contracts, Web3 development tools, and blockchain programming",
    icon: "👨‍💻",
    difficulty: "Advanced"
  },
  "news-explained": {
    title: "Understanding Crypto News",
    description: "Navigate cryptocurrency news and market developments with confidence",
    icon: "📰",
    difficulty: "Beginner"
  }
};

export default function LearnCategoryPage() {
  const { category } = useParams();

  // Fetch articles for this category
  const { data: articles, isLoading } = useQuery({
    queryKey: ['/api/blog-posts', { contentType: 'Learn', category }],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts?contentType=Learn`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const allArticles = await res.json();

      // Filter by category
      const categoryName = category?.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      return allArticles.filter((article: any) => {
        const articleCategory = article.category?.toLowerCase();
        const searchCategory = categoryName?.toLowerCase();
        return articleCategory?.includes(searchCategory) || searchCategory?.includes(articleCategory);
      });
    },
    staleTime: Infinity
  });

  const config = category ? CATEGORY_CONFIG[category] : null;

  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/learn">
            <a className="text-orange-500 hover:text-orange-400">← Back to Learn</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black border-b border-neutral-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Back Button */}
          <Link href="/learn">
            <a className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to All Topics</span>
            </a>
          </Link>

          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">{config.icon}</div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              {config.difficulty}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              {config.title}
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              {config.description}
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">{articles?.length || 0}</div>
                <div className="text-sm text-neutral-400">Articles</div>
              </div>
              <div className="w-px bg-neutral-800"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {articles ? Math.round(articles.reduce((acc: number, a: any) => {
                    const mins = parseInt(a.readTime) || 10;
                    return acc + mins;
                  }, 0) / 60) : 0}h
                </div>
                <div className="text-sm text-neutral-400">Total Reading</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-neutral-900 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article: any, index: number) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold mb-4">No Articles Yet</h3>
            <p className="text-neutral-400 mb-8">
              Articles for this category are coming soon!
            </p>
            <Link href="/learn">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(255,141,0,0.3)] transition-shadow">
                Explore Other Topics
              </a>
            </Link>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-neutral-800 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Continue Your Learning Journey
          </h2>
          <p className="text-neutral-400 mb-8">
            Explore more topics and deepen your cryptocurrency knowledge
          </p>
          <Link href="/learn">
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-lg text-lg hover:shadow-[0_0_40px_rgba(255,141,0,0.4)] transition-shadow">
              <BookOpen className="w-5 h-5" />
              Browse All Topics
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
