import { Card } from '@/components/ui/card';

interface AdSlotProps {
  size?: 'banner' | 'square' | 'skyscraper' | 'mobile';
  position?: string;
}

export default function AdSlot({ size = 'banner', position = 'content' }: AdSlotProps) {
  // todo: remove mock functionality - implement Google AdSense integration
  const dimensions = {
    banner: { width: '728px', height: '90px' },
    square: { width: '300px', height: '250px' },
    skyscraper: { width: '160px', height: '600px' },
    mobile: { width: '320px', height: '50px' }
  };

  const adDimensions = dimensions[size];

  return (
    <Card 
      className="flex items-center justify-center bg-muted border-dashed border-2 border-muted-foreground/30"
      style={{ 
        width: adDimensions.width, 
        height: adDimensions.height,
        maxWidth: '100%'
      }}
      data-testid={`ad-slot-${size}`}
    >
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium mb-1" data-testid="text-ad-label">
          Advertisement
        </div>
        <div className="text-xs" data-testid="text-ad-size">
          {adDimensions.width} × {adDimensions.height}
        </div>
        <div className="text-xs mt-1 text-muted-foreground/70" data-testid="text-ad-position">
          {position}
        </div>
      </div>
    </Card>
  );
}