import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
  images: string;
  caption?: string;
  [key: string]: any;
}

export function ImageGallery({ images, caption }: ImageGalleryProps) {
  // Parse images - can be JSON array or comma-separated
  let imageList: string[] = [];
  try {
    imageList = JSON.parse(images);
  } catch (e) {
    imageList = images.split(",").map((img) => img.trim());
  }

  if (!imageList || imageList.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <Carousel className="w-full">
        <CarouselContent>
          {imageList.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 bg-transparent">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto rounded-lg object-cover max-h-[500px]"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-black/50 border-primary/50 hover:bg-primary/20" />
        <CarouselNext className="right-4 bg-black/50 border-primary/50 hover:bg-primary/20" />
      </Carousel>
      {caption && (
        <p className="text-sm text-muted-foreground text-center mt-4 italic">{caption}</p>
      )}
    </div>
  );
}
