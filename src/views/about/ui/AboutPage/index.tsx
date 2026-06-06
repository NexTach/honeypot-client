import Image from 'next/image';

import { LogoLarge } from '@/shared/assets';
import { Button } from '@/shared/ui';

const PROBLEMS = [
  {
    title: '링크 소실',
    desc: '디스코드 CDN 링크가 삭제되면 소중한 GIF들이 영원히 사라집니다.',
  },
  {
    title: '즐겨찾기 과다',
    desc: 'GIF가 너무 많아 상황에 맞는 GIF를 찾으려면 무한 스크롤을 해야 합니다.',
  },
  {
    title: '분산 저장',
    desc: '여러 채널에 흩어진 GIF들을 체계적으로 관리할 방법이 없습니다.',
  },
  {
    title: '검색 불가',
    desc: '원하는 GIF를 검색해서 찾을 수 없습니다.',
  },
] as const;

const FEATURES = [
  {
    title: '안전한 보관',
    desc: '디스코드 링크 만료 걱정 없이 GIF를 영구적으로 보존합니다.',
  },
  {
    title: '태그 기반 검색',
    desc: '태그를 활용해 원하는 GIF를 빠르고 쉽게 찾을 수 있습니다.',
  },
  {
    title: '노출 관리',
    desc: '업로드한 GIF의 공개/비공개를 자유롭게 전환할 수 있습니다.',
  },
  {
    title: '커뮤니티 문화',
    desc: 'GSM만의 독특한 밈과 문화를 함께 만들어갑니다. GSM의 역사를 아카이빙합니다.',
  },
  {
    title: '추억 보존',
    desc: '졸업 후에도 GSM에서의 즐거웠던 순간들을 다시 꺼내볼 수 있습니다.',
  },
  {
    title: 'GSM 전용',
    desc: 'DataGSM OAuth 인증을 통해 학교 구성원만 접근 가능하도록 보호됩니다.',
  },
] as const;

const USAGE = [
  {
    title: 'DataGSM으로 로그인',
    desc: '로그인을 해야 이용이 가능한 서비스입니다.',
  },
  {
    title: 'GIF 업로드',
    desc: '재미있는 GIF를 업로드하고 태그를 추가할 수 있습니다.',
  },
  {
    title: 'GIF 탐색',
    desc: '원하는 GIF를 검색해서 빠르게 찾고 공유할 수 있습니다.',
  },
] as const;

const FUTURE = [
  {
    title: '세대를 잇다.',
    desc: `선배들부터 지금의 재학생, 그리고 미래의 후배들까지. 꿀통은 GSM의 모든 세대가 공유하는 추억의 보관소가 될 것입니다. '우리 때는 이런 GIF가 유행이었지'라는 이야기와 함께, 학교의 역사와 문화가 자연스럽게 전해지는 공간을 만들고 싶습니다.`,
    end: false,
  },
  {
    title: 'GSM만의 독특한 문화',
    desc: `학교 행사, 프로젝트 발표등 여러 일상 속에서 탄생한 명장면들이 GIF로 기록되고 재사용되면서, 우리만의 고유한 밈 문화가 형성됩니다. 이는 GSM 구성원이라는 공동체 의식을 강화하고, 학교에 대한 소속감과 자부심을 높이는 역할을 할 것입니다.`,
    end: true,
  },
  {
    title: '졸업 후에도 연결되는 추억',
    desc: `졸업하고 몇 년이 지나도 꿀통에 접속하면 학창시절의 즐거웠던 순간들을 다시 꺼내볼 수 있습니다. '그때 그 GIF' 하나가 동문들 간의 대화를 이어주고, GSM에서의 소중한 시간들을 회상하게 만드는 매개체가 될 것입니다.`,
    end: false,
  },
] as const;

const AboutPage = () => {
  return (
    <div className="border-border flex flex-col border-b">
      {/* ── 히어로 ── */}
      <section className="bg-retro-gray border-border relative h-[640px] w-full overflow-hidden border-b">
        {/* 레인보우 스트라이프 배경 */}
        <div className="absolute top-[-211px] right-[530px] h-[1025px] w-[174px] -rotate-[24deg] opacity-80">
          <div className="stripe-rainbow flex h-full w-full">
            <div className="bg-stripe-teal min-w-px flex-1" />
            <div className="bg-stripe-green min-w-px flex-1" />
            <div className="bg-stripe-yellow min-w-px flex-1" />
            <div className="bg-stripe-orange min-w-px flex-1" />
            <div className="bg-stripe-red min-w-px flex-1" />
          </div>
        </div>

        {/* 카세트 테이프 — 메인 */}
        <div className="absolute top-[119px] right-[94px] h-[378px] w-[553px] rotate-[2.08deg]">
          <Image
            src="/images/CassetteTape.png"
            alt="카세트 테이프"
            fill
            sizes="553px"
            className="object-cover"
            priority
          />
        </div>

        {/* 좌측 콘텐츠 */}
        <div className="absolute top-1/2 left-[144px] flex w-[424px] -translate-y-1/2 flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="font-pretendard text-poster text-ink leading-none font-black tracking-[-0.02em]">
              추억의 저장소
            </h1>
            <p className="font-pretendard text-body text-ink leading-[1.6] tracking-[-0.02em]">
              꿀통은 학생들이 만든 GIF를 디스코드 링크 만료와 무관하게 보존하고,
              <br />
              태그 기반 검색을 통해 쉽게 재사용할 수 있도록 돕는 서비스입니다.
            </p>
          </div>
          <Button className="w-auto px-8">꿀통 시작하기</Button>
        </div>
      </section>

      {/* ── 섹션2: 꿀통은 왜? ── */}
      <section className="border-border bg-cream flex flex-col gap-[120px] border-b px-[144px] py-[208px]">
        <div className="flex w-[1152px] flex-col gap-5">
          <h2 className="font-serif-kr text-h2 text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
            꿀통은 왜 만들어졌을까요?
          </h2>
          <p className="font-serif-kr text-body text-ink leading-[1.6] tracking-[-0.02em]">
            꿀통의 시작은 아주 소소한 고민이었습니다.
          </p>
        </div>

        <div className="flex h-[188px] w-full flex-col items-end justify-center">
          <div className="flex flex-col gap-5">
            <h3 className="font-serif-kr text-section text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
              학생들의 소통 창구
            </h3>
            <p className="font-serif-kr text-body text-ink w-[599px] text-justify leading-[1.6] tracking-[-0.02em]">
              <strong className="font-bold">GSM 학생들은 매일 디스코드에서 소통합니다.</strong>
              {` 프로젝트 협업, 과제 질문, 일상 대화까지 모든 것이 디스코드에서 이루어지죠. 그리고 우리는 말보다 GIF로 감정을 표현하는 걸 좋아합니다. "ㅋㅋㅋ" 대신 웃는 GIF를, "대박" 대신 놀라는 GIF를 보냅니다. 선배들이 만든 재미있는 반응, 학교 행사 영상에서 캡처한 명장면들... 심지어 고양이 밈까지. 이런 `}
              <strong className="font-bold">
                GIF들은 이제 단순한 이미지가 아니라 GSM만의 문화이자 공통 언어가 되었습니다.
              </strong>
            </p>
          </div>
        </div>

        <h3 className="font-serif-kr text-section text-ink w-[1152px] leading-[1.2] font-semibold tracking-[-0.01em]">
          그러나, 문제가 발생했습니다.
        </h3>
      </section>

      {/* ── 섹션3: 문제 ── */}
      <section className="border-border bg-retro-gray border-b px-[144px] py-[120px]">
        <div className="grid grid-cols-2 gap-8">
          {PROBLEMS.map(({ title, desc }) => (
            <div key={title} className="flex flex-col gap-2">
              <h3 className="font-serif-kr text-section text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
                {title}
              </h3>
              <p className="font-serif-kr text-body text-ink text-justify leading-[1.6] tracking-[-0.02em]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 섹션4: 해결 ── */}
      <section className="border-border flex h-[640px] items-center border-b px-[144px]">
        <div className="flex w-full items-center justify-between pr-[194px]">
          <div className="flex w-[646px] flex-col gap-5">
            <h2 className="font-serif-kr text-h2 text-ink w-[598px] leading-[1.2] font-semibold tracking-[-0.01em]">
              그래서, 꿀통을 만들었습니다.
            </h2>
            <div className="font-serif-kr text-body text-ink space-y-4 text-justify leading-[1.6] tracking-[-0.02em]">
              <p>
                이러한 문제들은 단순한 불편함에서 끝나지 않았습니다. 함께 만들고 공유했던 GIF가
                사라지고, 시간이 지날수록 기록과 맥락도 함께 흩어졌습니다. 꿀통은 이러한 문제를
                해결하고, GSM 구성원들이 만든 GIF를 한곳에 모아 언제든 쉽게 저장하고 찾을 수 있도록
                하기 위해 만들어졌습니다.
              </p>
              <p>
                저희 꿀통은 단순한 저장소에 머무르지 않습니다. 학교 안에서 만들어진 밈과 순간의
                기록, 추억을 오래 보존하며{' '}
                <strong className="font-bold">현재와 미래의 GSM 학생들을 연결하는 아카이브</strong>
                가 되는 것을 목표로 합니다.
              </p>
            </div>
          </div>

          {/* 꿀통 브랜드 마크 */}
          <LogoLarge />
        </div>
      </section>

      {/* ── 주요 기능 ── */}
      <section className="border-border bg-retro-gray border-b px-[144px] py-[120px]">
        <div className="flex w-[1152px] flex-col gap-[60px]">
          <h2 className="font-serif-kr text-h2 text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
            주요 기능
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {FEATURES.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="font-serif-kr text-section text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="font-serif-kr text-body text-ink text-justify leading-[1.6] tracking-[-0.02em]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 이용 안내 ── */}
      <section className="border-border border-b px-[144px] py-[120px]">
        <div className="flex w-full flex-col gap-[60px]">
          <h2 className="font-pretendard text-h2 text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
            이용 안내
          </h2>
          <div className="flex flex-col gap-8">
            {USAGE.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="font-serif-kr text-section text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="font-serif-kr text-body leading-[1.6] tracking-[-0.02em] text-[#635b5b]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 꿀통이 꿈꾸는 미래 ── */}
      <section className="border-border bg-retro-gray border-b px-[144px] py-[208px]">
        <div className="flex w-[1152px] flex-col gap-[120px]">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif-kr text-h2 text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
              꿀통이 꿈꾸는 미래
            </h2>
            <p className="font-serif-kr text-body text-ink leading-[1.6] tracking-[-0.02em]">
              단순한 저장소를 넘어, GSM 문화의 중심이 되고자 합니다
            </p>
          </div>

          {FUTURE.map(({ title, desc, end }) => (
            <div key={title} className={`flex w-[599px] flex-col gap-5 ${end ? 'self-end' : ''}`}>
              <h3 className="font-serif-kr text-section text-ink leading-[1.2] font-semibold tracking-[-0.01em]">
                {title}
              </h3>
              <p className="font-serif-kr text-body text-ink text-justify leading-[1.6] tracking-[-0.02em]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="border-border bg-cream flex items-center justify-between border-b px-[144px] py-4">
        <p className="text-caption text-ink font-mono leading-none uppercase">
          © 2026 꿀통 - GSM GIF Archive Service
        </p>
        <Button className="w-auto px-8">꿀통 시작하기</Button>
      </footer>
    </div>
  );
};

export default AboutPage;
