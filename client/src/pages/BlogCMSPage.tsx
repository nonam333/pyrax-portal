import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogEditor, { BlogPostData } from '@/components/BlogEditor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { 
  Trash2, Edit2, Eye, EyeOff, Plus, Newspaper, GraduationCap, 
  TrendingUp, Scale, RefreshCw, BarChart3, FileText 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  contentType: 'News' | 'Learn' | 'Markets' | 'Analysis' | 'Regulation';
  coverImage?: string;
  author: string;
  readTime: string;
  status: 'draft' | 'published' | 'unpublished';
  publishedAt: string;
  updatedAt: string;
}

type ContentType = 'News' | 'Learn' | 'Markets' | 'Analysis' | 'Regulation';

const contentTypes: { value: ContentType; label: string; icon: any; description: string }[] = [
  { value: 'News', label: 'News', icon: Newspaper, description: 'Latest crypto news and updates' },
  { value: 'Learn', label: 'Learn', icon: GraduationCap, description: 'Educational guides and tutorials' },
  { value: 'Markets', label: 'Markets', icon: BarChart3, description: 'Market analysis and insights' },
  { value: 'Analysis', label: 'Analysis', icon: TrendingUp, description: 'In-depth research reports' },
  { value: 'Regulation', label: 'Regulation', icon: Scale, description: 'Regulatory updates and compliance' },
];

function ContentTypeTab({ contentType, onEdit }: { contentType: ContentType; onEdit: (post: BlogPost) => void }) {
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
        description: 'Article has been deleted successfully',
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

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ postId, newStatus }: { postId: string; newStatus: string }) => {
      const response = await apiRequest('PATCH', `/api/blog-posts/${postId}`, { status: newStatus });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      refetch();
      toast({
        title: 'Status Updated',
        description: 'Article status has been updated',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update status',
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
            {typeInfo?.label} Articles ({posts?.length || 0})
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
          <div className="text-muted-foreground">Loading {contentType.toLowerCase()} articles...</div>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4 hover-elevate" data-testid={`card-post-${post.id}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={`/article/${post.id}`}>
                      <h4 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors cursor-pointer" data-testid={`text-post-title-${post.id}`}>
                        {post.title}
                      </h4>
                    </Link>
                    <Badge 
                      variant={
                        post.status === 'published' ? 'default' : 
                        post.status === 'draft' ? 'secondary' : 
                        'outline'
                      } 
                      data-testid={`badge-status-${post.id}`}
                    >
                      {post.status}
                    </Badge>
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
                    <span data-testid={`text-updated-${post.id}`}>
                      Updated: {new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(post)}
                    data-testid={`button-edit-${post.id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatusMutation.mutate({
                      postId: post.id,
                      newStatus: post.status === 'published' ? 'unpublished' : 'published'
                    })}
                    disabled={toggleStatusMutation.isPending}
                    data-testid={`button-toggle-status-${post.id}`}
                  >
                    {post.status === 'published' ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
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
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" data-testid={`empty-state-${contentType.toLowerCase()}`}>
          <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-card-foreground mb-2">No {contentType} Articles Yet</h4>
          <p className="text-muted-foreground">
            Click "Create Article" above to start adding {contentType.toLowerCase()} content
          </p>
        </div>
      )}
    </div>
  );
}

export default function BlogCMSPage() {
  const [activeTab, setActiveTab] = useState<ContentType>('News');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (postData: BlogPostData) => {
      const response = await apiRequest('POST', '/api/blog-posts', postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      setShowEditor(false);
      setEditingPost(null);
      toast({
        title: 'Article Created',
        description: 'Your article has been created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create article',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BlogPostData }) => {
      const response = await apiRequest('PATCH', `/api/blog-posts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      setShowEditor(false);
      setEditingPost(null);
      toast({
        title: 'Article Updated',
        description: 'Your article has been updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update article',
        variant: 'destructive',
      });
    },
  });

  const handleSave = async (data: BlogPostData) => {
    if (editingPost) {
      await updateMutation.mutateAsync({ id: editingPost.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = async (post: BlogPost) => {
    const res = await fetch(`/api/blog-posts/${post.id}`);
    if (res.ok) {
      const fullPost = await res.json();
      setEditingPost(fullPost);
      setShowEditor(true);
    } else {
      toast({
        title: 'Failed to load article',
        description: 'Could not load the article for editing',
        variant: 'destructive',
      });
    }
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-blog-editor">
        <PriceTicker />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogEditor
            initialData={editingPost || { contentType: activeTab }}
            onSave={handleSave}
            onCancel={() => {
              setShowEditor(false);
              setEditingPost(null);
            }}
            mode={editingPost ? 'edit' : 'create'}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-cms">
      <PriceTicker />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-card-foreground mb-2" data-testid="text-page-title">
              Content Management System
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-page-description">
              Create and manage your articles directly
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-accent text-black font-semibold"
            onClick={() => {
              setEditingPost(null);
              setShowEditor(true);
            }}
            data-testid="button-create-article"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Article
          </Button>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ContentType)}>
            <TabsList className="grid w-full grid-cols-5 mb-6" data-testid="tabs-content-types">
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
                <ContentTypeTab contentType={type.value} onEdit={handleEdit} />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>

      <Footer />
    </div>
  );
}