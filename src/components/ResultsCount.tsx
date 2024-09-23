type ResultsCountProps = {
  totalNumberOfJobs: number;
};
export default function ResultsCount({ totalNumberOfJobs }: ResultsCountProps) {
  return <p className="count">{totalNumberOfJobs} results</p>;
}
