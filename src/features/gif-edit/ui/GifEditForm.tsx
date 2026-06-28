'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { Gif } from '@/entities/gif';
import { cn, parseTags } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { type GifEditFormValues, gifEditSchema } from '../model/schema';
import { usePatchGif } from '../model/usePatchGif';

interface GifEditFormProps {
  gif: Gif;
  onClose: () => void;
}

const GifEditForm = ({ gif, onClose }: GifEditFormProps) => {
  const router = useRouter();
  const patchGif = usePatchGif(gif.id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GifEditFormValues>({
    resolver: zodResolver(gifEditSchema),
    defaultValues: {
      title: gif.title,
      description: gif.description ?? '',
      tagsInput: gif.tags.map((tag) => `#${tag.name}`).join(' '),
      isPublic: gif.isPublic,
    },
  });

  const isPublic = watch('isPublic');

  const onSubmit = handleSubmit((values) => {
    patchGif.mutate(
      {
        title: values.title,
        description: values.description,
        isPublic: values.isPublic,
        tags: parseTags(values.tagsInput),
      },
      {
        onSuccess: () => {
          // 상세 페이지는 SSR prop → 서버 데이터 재요청.
          router.refresh();
          onClose();
        },
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Input
          label="GIF이름"
          placeholder="입력ㄱㄱ"
          maxLength={15}
          error={errors.title?.message}
          {...register('title')}
        />

        <Input label="설명" placeholder="입력ㄱㄱ" {...register('description')} />

        <Input label="태그" placeholder="입력ㄱㄱ" {...register('tagsInput')} />

        <div className="flex w-full flex-col gap-1">
          <span className="font-pretendard text-body text-ink tracking-[-0.32px]">공개 여부*</span>
          <div className="flex gap-3 sm:gap-4">
            <Button
              type="button"
              confirmed={isPublic}
              onClick={() => setValue('isPublic', true)}
              className="flex-1 px-4 whitespace-nowrap"
            >
              공개
            </Button>
            <Button
              type="button"
              confirmed={!isPublic}
              onClick={() => setValue('isPublic', false)}
              className="flex-1 px-4 whitespace-nowrap"
            >
              비공개
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'border-stripe-red text-stripe-red border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-stripe-red hover:text-cream cursor-pointer',
          )}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={patchGif.isPending}
          className={cn(
            'border-ink text-ink bg-cream border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-retro-gray cursor-pointer disabled:cursor-not-allowed',
          )}
        >
          {patchGif.isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
};

export default GifEditForm;
