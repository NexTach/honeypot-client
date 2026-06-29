import { cn } from '@/shared/lib';

type CardRatio = '9:16' | '1:1' | '16:9';

interface CardProps {
  src: string;
  alt?: string;
  caption: string;
  ratio?: CardRatio;
  className?: string;
}

const ratioClass: Record<CardRatio, string> = {
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
};

const Card = ({ src, alt = '', caption, ratio = '1:1', className }: CardProps) => (
  <div className={cn('flex flex-col', className)}>
    <div className={cn('relative w-full overflow-hidden', ratioClass[ratio])}>
      {/* GIF 애니메이션은 next/image 최적화 이슈가 있어 plain img 사용 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    </div>
    <div className="bg-cream w-full px-0.5 py-1">
      <p className="font-pretendard text-body text-ink-disabled truncate">{caption}</p>
    </div>
  </div>
);

export default Card;
