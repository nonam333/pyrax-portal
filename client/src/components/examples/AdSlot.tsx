import AdSlot from '../AdSlot';

export default function AdSlotExample() {
  return (
    <div className="space-y-6 p-6 bg-background">
      <h3 className="text-white text-lg font-semibold">Banner Ad (728x90)</h3>
      <AdSlot size="banner" position="header" />
      
      <h3 className="text-white text-lg font-semibold">Square Ad (300x250)</h3>
      <AdSlot size="square" position="sidebar" />
      
      <h3 className="text-white text-lg font-semibold">Mobile Ad (320x50)</h3>
      <AdSlot size="mobile" position="mobile-content" />
    </div>
  );
}