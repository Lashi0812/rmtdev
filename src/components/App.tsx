import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce(searchText);
  const { jobItems, isLoading } = useJobItems(debounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived state
  const totalNumberOfJobs = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfJobs / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // event handlers
  const onClick = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous") {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortBy = (sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm setSearchText={setSearchText} searchText={searchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfJobs={totalNumberOfJobs} />
            <SortingControls onClick={handleSortBy} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            onClick={onClick}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
