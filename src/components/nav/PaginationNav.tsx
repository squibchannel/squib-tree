import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React from "react";

interface PaginationNavProps {
  onNextPage: () => void;
  onPrevPage: () => void;
}

function PaginationNav({ onNextPage, onPrevPage }: PaginationNavProps) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" onClick={onPrevPage}>
            Home
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={onNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationNav;
