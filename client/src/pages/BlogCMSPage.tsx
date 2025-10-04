import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Database, RefreshCw, Trash2, ExternalLink, CheckCircle, AlertCircle, Newspaper, GraduationCap, TrendingUp, Scale, Link2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface NotionDatabase {
  id: string;
  title: string;
  url: string;
}

interface BlogPost {
  id: string;
  notionPageId?: string;
  title: string;
  excerpt?: string;
  category?: string;
  contentType: string;
  author: string;
  readTime: string;
  publishedAt: string;
  lastSyncedAt: string;
}

type ContentType = 'News' | 'Learn' | 'Analysis' | 'Regulation';

const contentTypes: { value: ContentType; label: string; icon: any; description: string }[] = [
  { value: 'News', label: 'News', icon: Newspaper, description: 'Homepage news articles and updates' },
  { value: 'Learn', label: 'Learn', icon: GraduationCap, description: 'Educational guides and tutorials' },
  { value: 'Analysis', label: 'Analysis', icon: TrendingUp, description: 'Market analysis and research reports' },
  { value: 'Regulation', label: 'Regulation', icon: Scale, description: 'Regulatory updates and compliance' },
];

function ContentTypeTab({ contentType }: { contentType: ContentType }) {
  const { toast } = useToast();
  
  const { data: posts, isLoading, refetch } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts', { contentType }],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts?contentType=${contentType}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiRequest('DELETE', `/api/blog-posts/${postId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      refetch();
      toast({
        title: 'Post Deleted',
        description: 'Content has been deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete post',
        variant: 'destructive',
      });
    },
  });

  const typeInfo = contentTypes.find(t => t.value === contentType);
  const Icon = typeInfo?.icon || Newspaper;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground flex items-center gap-2" data-testid={`text-${contentType.toLowerCase()}-title`}>
            <Icon className="h-5 w-5 text-primary" />
            {typeInfo?.label} Content ({posts?.length || 0})
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{typeInfo?.description}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()}
          data-testid={`button-refresh-${contentType.toLowerCase()}`}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">Loading {contentType.toLowerCase()} content...</div>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 hover-elevate" data-testid={`card-post-${post.id}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-card-foreground" data-testid={`text-post-title-${post.id}`}>
                      {post.title}
                    </h4>
                    {post.notionPageId && (
                      <Badge variant="outline" className="text-xs" data-testid={`badge-synced-${post.id}`}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Synced
                      </Badge>
                    )}
                    {post.category && (
                      <Badge className="text-xs bg-primary text-black" data-testid={`badge-category-${post.id}`}>
                        {post.category}
                      </Badge>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span data-testid={`text-author-${post.id}`}>{post.author}</span>
                    <span>•</span>
                    <span data-testid={`text-read-time-${post.id}`}>{post.readTime}</span>
                    <span>•</span>
                    <span data-testid={`text-published-${post.id}`}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    {post.notionPageId && (
                      <>
                        <span>•</span>
                        <span data-testid={`text-synced-${post.id}`}>
                          Last synced: {new Date(post.lastSyncedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(post.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${post.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" data-testid={`empty-state-${contentType.toLowerCase()}`}>
          <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-card-foreground mb-2">No {contentType} Content Yet</h4>
          <p className="text-muted-foreground">
            Sync posts from Notion with Category set to "{contentType}" to see them here
          </p>
        </div>
      )}
    </div>
  );
}

// Extract database ID from Notion URL
function extractDatabaseId(url: string): string | null {
  try {
    // Trim whitespace
    const trimmed = url.trim();
    
    // Handle various Notion URL formats:
    // https://www.notion.so/2823393c0f9e809da82ecd57e5166e9e?v=...
    // https://www.notion.so/My-Database-2823393c0f9e809da82ecd57e5166e9e?v=...
    // https://www.notion.so/workspace/My-Database-2823393c0f9e809da82ecd57e5166e9e?v=...
    // Find any 32-character hex string in the URL
    const match = trimmed.match(/([a-f0-9]{32})/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export default function BlogCMSPage() {
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [pastedUrl, setPastedUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ContentType>('News');
  const { toast } = useToast();

  const { data: databases, isLoading: loadingDatabases } = useQuery<NotionDatabase[]>({
    queryKey: ['/api/notion/databases'],
  });

  const syncMutation = useMutation({
    mutationFn: async (databaseId: string) => {
      const response = await apiRequest('POST', '/api/blog-posts/sync-notion', { databaseId });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({
        title: 'Sync Successful',
        description: `Synced ${data.synced} posts from Notion`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Sync Failed',
        description: error.message || 'Failed to sync posts from Notion',
        variant: 'destructive',
      });
    },
  });

  const handleSync = () => {
    // Try to get database ID from pasted URL first
    const urlDatabaseId = pastedUrl ? extractDatabaseId(pastedUrl) : null;
    const databaseId = urlDatabaseId || selectedDatabase;
    
    if (!databaseId) {
      toast({
        title: 'No Database Selected',
        description: 'Please select a database from the dropdown or paste a Notion database URL',
        variant: 'destructive',
      });
      return;
    }
    
    if (pastedUrl && !urlDatabaseId) {
      toast({
        title: 'Invalid URL',
        description: 'Could not extract database ID from the URL. Please check the format.',
        variant: 'destructive',
      });
      return;
    }
    
    syncMutation.mutate(databaseId);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-cms">
      <PriceTicker />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-card-foreground mb-2" data-testid="text-page-title">
            Content Management System
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-page-description">
            Manage all your content and sync from Notion
          </p>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4" data-testid="text-sync-title">
            <Database className="inline-block h-6 w-6 mr-2" />
            Sync from Notion
          </h2>
          <p className="text-muted-foreground mb-6" data-testid="text-sync-description">
            Select a Notion database to sync your content. Add a "Category" property with values like: News, Learn, Analysis, Regulation, Education, Tutorial, Research, Policy, etc.
          </p>

          <div className="space-y-4">
            {/* Option 1: Select from dropdown */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Select Notion Database
                </label>
                <Select 
                  value={selectedDatabase} 
                  onValueChange={(val) => {
                    setSelectedDatabase(val);
                    setPastedUrl(''); // Clear URL when selecting from dropdown
                  }}
                >
                  <SelectTrigger className="w-full" data-testid="select-database">
                    <SelectValue placeholder={loadingDatabases ? "Loading databases..." : "Choose a database"} />
                  </SelectTrigger>
                  <SelectContent>
                    {databases?.map((db) => (
                      <SelectItem key={db.id} value={db.id} data-testid={`option-database-${db.id}`}>
                        {db.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* OR Separator */}
            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-sm font-medium text-muted-foreground">OR</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Option 2: Paste URL */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-card-foreground mb-2 block flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  Paste Notion Database URL
                </label>
                <Input
                  type="text"
                  placeholder="https://www.notion.so/2823393c0f9e809da82ecd57e5166e9e?v=..."
                  value={pastedUrl}
                  onChange={(e) => {
                    setPastedUrl(e.target.value);
                    setSelectedDatabase(''); // Clear dropdown when pasting URL
                  }}
                  data-testid="input-database-url"
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Sync Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSync}
                disabled={(!selectedDatabase && !pastedUrl) || syncMutation.isPending}
                className="bg-gradient-to-r from-primary to-accent text-black font-semibold"
                data-testid="button-sync"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                {syncMutation.isPending ? 'Syncing...' : 'Sync Posts'}
              </Button>
            </div>
          </div>

          {selectedDatabase && databases?.find(db => db.id === selectedDatabase) && (
            <div className="mt-4 p-3 bg-card border border-border rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected Database:</span>
                <a
                  href={databases.find(db => db.id === selectedDatabase)?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                  data-testid="link-notion-database"
                >
                  {databases.find(db => db.id === selectedDatabase)?.title}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ContentType)}>
            <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-content-types">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <TabsTrigger 
                    key={type.value} 
                    value={type.value}
                    data-testid={`tab-${type.value.toLowerCase()}`}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {type.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {contentTypes.map((type) => (
              <TabsContent key={type.value} value={type.value}>
                <ContentTypeTab contentType={type.value} />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
