import type { User } from '../model/types';

interface UserStatsProps {
  user: User;
}

const UserStats = ({ user }: UserStatsProps) => (
  <div className="font-pretendard text-title text-ink flex flex-wrap items-center gap-6 tracking-[-1px] sm:gap-16">
    <p>
      <span className="font-bold">업로드</span> {user.uploadCount}
    </p>
    <p>
      <span className="font-bold">공개</span> {user.publicCount}
    </p>
    <p>
      <span className="font-bold">총 공유 수</span> {user.totalShares}
    </p>
  </div>
);

export default UserStats;
