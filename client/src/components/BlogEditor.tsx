import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Save, Eye, EyeOff, Upload, Link } from "lucide-react";

export interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentType: "News" | "Learn" | "Markets" | "Analysis" | "Regulation";
  category: string;
  coverImage: string;
  author: string;
  status: "draft" | "published" | "unpublished";
}

interface BlogEditorProps {
  initialData?: Partial<BlogPostData>;
  onSave: (data: BlogPostData) => Promise<void>;
  onCancel?: () => void;
  mode?: "create" | "edit";
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
  "code-block",
];

export default function BlogEditor({
  initialData = {},
  onSave,
  onCancel,
  mode = "create",
}: BlogEditorProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [formData, setFormData] = useState<BlogPostData>({
    title: initialData.title || "",
    slug: initialData.slug || "",
    excerpt: initialData.excerpt || "",
    content: initialData.content || "",
    contentType: initialData.contentType || "News",
    category: initialData.category || "",
    coverImage: initialData.coverImage || "",
    author: initialData.author || "Pyrax Editorial",
    status: initialData.status || "draft",
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleBlur = () => {
    if (formData.title && !slugManuallyEdited) {
      const generatedSlug = generateSlug(formData.title);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  useEffect(() => {
    if (formData.content) {
      const text = formData.content.replace(/<[^>]*>/g, "");
      const wordCount = text.trim().split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      if (!formData.excerpt) {
        const excerpt = text.substring(0, 200).trim() + (text.length > 200 ? "..." : "");
        setFormData((prev) => ({ ...prev, excerpt }));
      }
    }
  }, [formData.content]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setFormData((prev) => ({ ...prev, coverImage: dataUrl }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your article",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content) {
      toast({
        title: "Content Required",
        description: "Please add some content to your article",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      toast({
        title: "Article Saved",
        description: `Your article has been ${formData.status === "published" ? "published" : "saved as draft"}`,
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          {mode === "create" ? "Create New Article" : "Edit Article"}
        </h2>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter article title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              onBlur={handleTitleBlur}
              data-testid="input-title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              placeholder="article-slug"
              value={formData.slug}
              onChange={(e) => {
                setFormData({ ...formData, slug: e.target.value });
                setSlugManuallyEdited(true);
              }}
              data-testid="input-slug"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contentType">Content Type</Label>
              <Select
                value={formData.contentType}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, contentType: value })
                }
              >
                <SelectTrigger id="contentType" data-testid="select-content-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Learn">Learn</SelectItem>
                  <SelectItem value="Markets">Markets</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
                  <SelectItem value="Regulation">Regulation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Bitcoin, DeFi, Trading..."
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                data-testid="input-category"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief description of your article..."
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              data-testid="textarea-excerpt"
            />
          </div>

          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Image URL or upload..."
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                data-testid="input-cover-image"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleImageUpload}
                type="button"
                data-testid="button-upload-image"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {formData.coverImage && (
              <div className="mt-2">
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-md"
                  data-testid="img-cover-preview"
                />
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Author name..."
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              data-testid="input-author"
            />
          </div>

          <div className="grid gap-2">
            <Label>Content</Label>
            <div className="border rounded-md overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                formats={formats}
                placeholder="Write your article content here..."
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Badge
              variant={
                formData.status === "published"
                  ? "default"
                  : formData.status === "draft"
                  ? "secondary"
                  : "outline"
              }
              data-testid={`badge-status-${formData.status}`}
            >
              {formData.status}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={saving}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() =>
            setFormData({
              ...formData,
              status: formData.status === "published" ? "draft" : "published",
            })
          }
          disabled={saving}
          data-testid="button-toggle-status"
        >
          {formData.status === "published" ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Save as Draft
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Publish
            </>
          )}
        </Button>
        <Button
          className="bg-gradient-to-r from-primary to-accent text-black font-semibold"
          onClick={handleSubmit}
          disabled={saving}
          data-testid="button-save"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : mode === "create" ? "Create Article" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}