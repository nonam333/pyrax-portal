import ArticleCard from '../ArticleCard';
import cryptoImage from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';

export default function ArticleCardExample() {
  const sampleArticle = {
    id: '1',
    title: 'Ethereum 2.0 Staking Rewards Reach New All-Time High',
    excerpt: 'As more validators join the network, staking rewards continue to grow, making Ethereum an attractive investment option for long-term holders.',
    image: cryptoImage,
    category: 'Ethereum',
    author: 'Mike Johnson',
    publishedAt: '4 hours ago',
    readTime: '5 min read'
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-white text-lg font-semibold">Default Article Card</h3>
      <ArticleCard article={sampleArticle} />
      
      <h3 className="text-white text-lg font-semibold">Large Article Card</h3>
      <ArticleCard article={sampleArticle} variant="large" />
      
      <h3 className="text-white text-lg font-semibold">Compact Article Card</h3>
      <ArticleCard article={sampleArticle} variant="compact" />
    </div>
  );
}