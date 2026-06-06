import { Button, Card, IconButton, TextButton } from '@/shared/ui';

import { ComponentShowcase } from './ComponentShowcase';

const HomePage = () => {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-16 px-8 py-12">
      {/* Button */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">Button</h2>
        <div className="flex max-w-sm flex-col gap-3">
          <Button>기본 버튼</Button>
          <Button confirmed>확인된 버튼 (confirmed)</Button>
          <Button disabled>비활성 버튼 (disabled)</Button>
        </div>
      </section>

      {/* IconButton */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">IconButton</h2>
        <div className="flex flex-wrap gap-3">
          <IconButton variant="sort" />
          <IconButton variant="back" />
        </div>
      </section>

      {/* TextButton */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">TextButton</h2>
        <div className="flex gap-6">
          <TextButton active>활성 (active)</TextButton>
          <TextButton>비활성 (inactive)</TextButton>
        </div>
      </section>

      {/* Card */}
      <section className="flex flex-col gap-4">
        <h2 className="font-pretendard text-section text-ink font-bold">Card</h2>
        <div className="flex flex-wrap items-start gap-4">
          <Card
            src="https://placehold.co/273x485/ede7d9/3d3028.png"
            caption="9:16 세로형 카드"
            ratio="9:16"
            className="w-[180px]"
          />
          <Card
            src="https://placehold.co/273x273/ede7d9/3d3028.png"
            caption="1:1 정방형 카드"
            ratio="1:1"
            className="w-[220px]"
          />
          <Card
            src="https://placehold.co/273x154/ede7d9/3d3028.png"
            caption="16:9 가로형 카드"
            ratio="16:9"
            className="w-[273px]"
          />
        </div>
      </section>

      {/* Client components (Input, TagChip) */}
      <ComponentShowcase />
    </main>
  );
};

export default HomePage;
