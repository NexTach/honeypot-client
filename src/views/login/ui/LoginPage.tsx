import Image from 'next/image';

import { DataGSMLogo } from '@/shared/assets';

const LoginPage = () => (
  <main className="bg-cream min-h-[calc(100vh-69px)] overflow-hidden">
    {/* 왼쪽 패널: 레트로 그레이 + 레인보우 스트라이프 + 카세트
        모바일: 일반 블록(상단 섹션), 데스크탑: 절대 배치로 왼쪽 절반 차지 */}
    <div className="bg-retro-gray border-border relative overflow-hidden border-b lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:border-r lg:border-b-0">
      {/* 레인보우 스트라이프 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[1142px] w-[174px] -rotate-[24deg] opacity-80">
          <div className="bg-stripe-teal min-w-px flex-1" />
          <div className="bg-stripe-green min-w-px flex-1" />
          <div className="bg-stripe-yellow min-w-px flex-1" />
          <div className="bg-stripe-orange min-w-px flex-1" />
          <div className="bg-stripe-red min-w-px flex-1" />
        </div>
      </div>

      {/* 카세트 — 모바일 (정적 배치) */}
      <div className="relative mx-auto h-[200px] w-4/5 max-w-[340px] py-10 lg:hidden">
        <Image
          src="/images/CassetteTape.png"
          alt="카세트 테이프"
          fill
          sizes="340px"
          className="object-contain"
          priority
        />
      </div>

      {/* 카세트 — 데스크탑 (패널 중앙 절대 배치) */}
      <div className="absolute top-5/9 left-1/2 hidden h-[366px] w-[535px] -translate-x-1/2 -translate-y-1/2 rotate-[2.08deg] lg:block">
        <Image
          src="/images/CassetteTape.png"
          alt="카세트 테이프"
          fill
          sizes="535px"
          className="object-cover"
          priority
        />
      </div>
    </div>

    {/* 콘텐츠: 제목 + 설명 + 버튼
        모바일: 일반 플로우, 데스크탑: 오른쪽 절반에서 수직 중앙 정렬 */}
    <div className="relative flex flex-col gap-8 px-5 py-10 sm:px-12 sm:py-14 lg:ml-[50%] lg:min-h-[calc(100vh-69px)] lg:justify-center lg:gap-[146px] lg:py-0 lg:pr-[80px] lg:pl-[80px]">
      {/* 제목 + 설명 */}
      <div className="flex flex-col items-start gap-4 lg:items-end lg:gap-[26px]">
        <h1 className="font-pretendard text-ink lg:text-poster w-full text-[40px] leading-none font-black tracking-tight sm:text-[52px] lg:text-right lg:tracking-[-2px]">
          당신의 움짤,
          <br />
          꿀통에 담아두세요.
        </h1>
        <p className="font-pretendard text-body text-ink w-full lg:text-right">
          디스코드 속 GIF를 링크 만료 걱정 없이 오래 보관해두고, <br className="hidden lg:block" />
          태그 검색으로 필요한 순간 언제든지 다시 찾아보세요.
        </p>
      </div>

      {/* DataGSM 로그인 버튼 */}
      <button
        type="button"
        className="border-ink bg-cream font-pretendard text-body text-ink hover:bg-retro-gray flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] overflow-hidden border px-8 tracking-[-0.32px] transition-colors lg:px-[115px]"
      >
        <DataGSMLogo />
        <span className="whitespace-nowrap">DataGSM으로 로그인하기</span>
      </button>
    </div>
  </main>
);

export default LoginPage;
