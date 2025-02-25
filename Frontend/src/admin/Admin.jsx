import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

// const [itemOffset, setItemOffset] = useState(0);

// Simulate fetching items from another resources.
// (This could be items from props; or items loaded in a local state
// from an API endpoint with useEffect and useState)
// const endOffset = itemOffset + itemsPerPage;
// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
// const currentItems = 3;
const pageCount = 8;

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);
  console.log('pageCount :>> ', pageCount);
  const fetchAll = async () => {
    const resp = await axios.get("http://localhost:8080/api/user/getall", {
      params: {
        limit: 3,
        page: currentPage,
      },
    });
    setPageCount(resp.data.pageCount);
    console.log(resp.data);
    return resp.data.data;
  };
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users",currentPage],
    queryFn: fetchAll,
    // enabled:false
  });
  console.log(data);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;
  const handlePageClick = (selected) => {
    console.log('selected :>> ', selected);
    setCurrentPage(selected.selected + 1);
    console.log(currentPage);
  };
  return (
    <>
      <div className="container-fluid">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col" colSpan={3}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "N/A"}</td>
                  <td>{user.gender || "N/A"}</td>
                  <td>
                    <Link to={`/edit/${user?._id}`}>
                      <button>
                        <RiEditBoxLine />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button>
                      <MdDelete />
                    </button>
                  </td>
                  <td>
                    <Link to={`/view/${user?._id}`}>
                      <button>
                        <FaEye />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginLeft: "500px" }}>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          // renderOnZeroPageCount={null}
        />
      </div>

      {isError && "error"}
      {isLoading && "Loading...."}
    </>
  );
};

export default Admin;
