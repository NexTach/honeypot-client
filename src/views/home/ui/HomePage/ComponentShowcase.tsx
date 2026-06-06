'use client';

import { useState } from 'react';

import { Input, TagChip } from '@/shared/ui';

export const ComponentShowcase = () => {
  const [tags, setTags] = useState(['고양이', '밈', '귀여움']);

  return (
    <>
      {/* Input */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">Input</h2>
        <div className="flex max-w-sm flex-col gap-6">
          <Input label="제목" placeholder="제목을 입력하세요" />
          <Input label="검색" placeholder="검색어를 입력하세요" defaultValue="고양이" />
          <Input label="이메일" placeholder="이메일 입력" error="올바른 이메일 형식이 아닙니다" />
        </div>
      </section>

      {/* TagChip */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">TagChip</h2>
        <div className="flex flex-wrap gap-2">
          <TagChip label="고양이" />
          <TagChip label="삭제 불가 태그" />
          {tags.map((tag) => (
            <TagChip
              key={tag}
              label={tag}
              onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
            />
          ))}
        </div>
        <p className="text-caption text-ink-disabled font-mono">오른쪽 세 태그는 제거 가능</p>
      </section>
    </>
  );
};
