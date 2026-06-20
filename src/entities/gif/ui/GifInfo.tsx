import type { Gif } from '../model/types';

interface GifInfoProps {
  gif: Gif;
  showShareCount?: boolean;
}

const GifInfo = ({ gif, showShareCount = true }: GifInfoProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-start justify-between gap-4">
      <h1 className="font-pretendard text-h2 text-ink font-bold">{gif.title}</h1>
      {showShareCount && (
        <span className="font-pretendard text-caption text-ink-disabled shrink-0">
          공유 {gif.shareCount}회
        </span>
      )}
    </div>

    {gif.description && (
      <p className="font-pretendard text-body text-ink-soft">{gif.description}</p>
    )}

    <div className="flex flex-col gap-1">
      <p className="text-ink-disabled font-mono text-base">
        {gif.tags.map((tag) => `#${tag}`).join(' ')}
      </p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-caption text-ink-faint font-mono">
          {gif.width}*{gif.height} · LOOP({gif.loop ? '→' : '—'})
        </span>
        <span className="font-pretendard text-caption text-ink-faint">{gif.uploader}</span>
      </div>
    </div>
  </div>
);

export default GifInfo;
