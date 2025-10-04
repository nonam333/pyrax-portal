import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Database, RefreshCw, Trash2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  author: string;
  readTime: string;
  publishedAt: string;
  lastSyncedAt: string;
}

export default function BlogCMSPage() {
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const { toast } = useToast();

  const { data: databases, isLoading: loadingDatabases } = useQuery<NotionDatabase[]>({
    queryKey: ['/api/notion/databases'],
  });

  const { data: blogPosts, isLoading: loadingPosts, refetch: refetchPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
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
        description: `Synced ${data.synced} blog posts from Notion`,
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

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiRequest('DELETE', `/api/blog-posts/${postId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({
        title: 'Post Deleted',
        description: 'Blog post has been deleted successfully',
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

  const handleSync = () => {
    if (!selectedDatabase) {
      toast({
        title: 'No Database Selected',
        description: 'Please select a Notion database first',
        variant: 'destructive',
      });
      return;
    }
    syncMutation.mutate(selectedDatabase);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-cms">
      <PriceTicker />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-card-foreground mb-2" data-testid="text-page-title">
            Blog CMS
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-page-description">
            Manage your blog posts and sync content from Notion
          </p>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4" data-testid="text-sync-title">
            <Database className="inline-block h-6 w-6 mr-2" />
            Sync from Notion
          </h2>
          <p className="text-muted-foreground mb-6" data-testid="text-sync-description">
            Select a Notion database to sync your blog posts. Make sure your database has the following properties: Name/Title, Excerpt, Category, and optionally a cover image.
          </p>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Select Notion Database
              </label>
              <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
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
            <Button
              onClick={handleSync}
              disabled={!selectedDatabase || syncMutation.isPending}
              className="bg-gradient-to-r from-primary to-accent text-black font-semibold"
              data-testid="button-sync"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
              {syncMutation.isPending ? 'Syncing...' : 'Sync Posts'}
            </Button>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-card-foreground" data-testid="text-posts-title">
              Published Posts ({blogPosts?.length || 0})
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetchPosts()}
              data-testid="button-refresh-posts"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {loadingPosts ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading blog posts...</div>
            </div>
          ) : blogPosts && blogPosts.length > 0 ? (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="p-4 hover-elevate" data-testid={`card-post-${post.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-card-foreground" data-testid={`text-post-title-${post.id}`}>
                          {post.title}
                        </h3>
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
            <div className="text-center py-12" data-testid="empty-state">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No Blog Posts Yet</h3>
              <p className="text-muted-foreground mb-6">
                Sync your first posts from Notion to get started
              </p>
            </div>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  );
}
