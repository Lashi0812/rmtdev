import { SortBy } from "../lib/types";

type SortingControlsProps = {
  onClick: (sortBy: SortBy) => void;
  sortBy: SortBy;
};
export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={onClick}
        btnType="relevant"
        isActive={sortBy === "relevant"}
      />
      <SortingButton
        onClick={onClick}
        btnType="recent"
        isActive={sortBy === "recent"}
      />
    </section>
  );
}

type SortingButtonProps = {
  onClick: (sortBy: SortBy) => void;
  btnType: SortBy;
  isActive: boolean;
};

function SortingButton({ onClick, btnType, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(btnType)}
      className={`sorting__button sorting__button--${btnType} ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {btnType.toUpperCase()}
    </button>
  );
}
