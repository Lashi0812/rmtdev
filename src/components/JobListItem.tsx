import { useActiveId } from "../lib/hooks";
import { TJobItem } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type TJobListItemProps = {
  jobItem: TJobItem;
};

export default function JobListItem({ jobItem }: TJobListItemProps) {
  const activeId = useActiveId();

  return (
    <li className={`job-item ${activeId === jobItem.id ? "job-item--active" : ""}`}>
      <a href={`#${jobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
