import { Card } from '@/components/ui/card';

interface AdSlotProps {
  size?: 'banner' | 'square' | 'skyscraper' | 'mobile';
  position?: string;
}

export default function AdSlot({ size = 'banner', position = 'content' }: AdSlotProps) {
  // todo: remove mock functionality - implement Google AdSense integration
  const dimensions = {
    banner: { width: '728px', height: '90px', mobileWidth: '320px', mobileHeight: '50px' },
    square: { width: '300px', height: '250px', mobileWidth: '300px', mobileHeight: '250px' },
    skyscraper: { width: '160px', height: '600px', mobileWidth: '300px', mobileHeight: '250px' },
    mobile: { width: '320px', height: '50px', mobileWidth: '320px', mobileHeight: '50px' }
  };

  const adDimensions = dimensions[size];

  // Responsive container classes based on ad size
  const containerClasses = {
    banner: 'w-full max-w-[728px] h-[50px] sm:h-[90px]',
    square: 'w-full max-w-[300px] h-[250px]',
    skyscraper: 'w-full max-w-[300px] h-[250px] lg:max-w-[160px] lg:h-[600px]',
    mobile: 'w-full max-w-[320px] h-[50px]'
  };

  return (
    <Card
      className={`flex items-center justify-center bg-muted border-dashed border-2 border-muted-foreground/30 ${containerClasses[size]}`}
      data-testid={`ad-slot-${size}`}
    >
      <div className="text-center text-muted-foreground px-4">
        <div className="text-xs sm:text-sm font-medium mb-1" data-testid="text-ad-label">
          Advertisement
        </div>
        <div className="text-[10px] sm:text-xs hidden sm:block" data-testid="text-ad-size">
          {adDimensions.width} × {adDimensions.height}
        </div>
        <div className="text-[10px] sm:text-xs mt-1 text-muted-foreground/70 truncate" data-testid="text-ad-position">
          {position}
        </div>
      </div>
    </Card>
  );
}