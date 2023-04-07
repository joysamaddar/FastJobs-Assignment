"use client";

import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import tableIcon from "../public/table.svg";
import kanbanIcon from "../public/kanban.svg";
import downArrow from "../public/down-arrow.svg";
import searchIcon from "../public/search.svg";
import { dataStore } from "@/store/dataStore";
import DataStoreInterface from "@/store/dataStore.interface";
import { shallow } from "zustand/shallow";

type Row = {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
};

const columnHelper = createColumnHelper<Row>();

const columns = [
  columnHelper.accessor("first_name", {
    header: () => <span>First Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: () => <span>Last Name</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("gender", {
    header: () => <span>Gender</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("email", {
    header: () => <span>@ Email</span>,
    cell: (info) => info.renderValue(),
  }),
];

async function getData() {
  const res = await fetch("https://frontendtestapi.staging.fastjobs.io/data", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Table() {
  const max = 5;
  const serverData: MutableRefObject<[]> = useRef([]);
  const { data, setData } = dataStore(
    (state) => ({
      data: (state as DataStoreInterface).data,
      setData: (state as DataStoreInterface).setData,
    }),
    shallow
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://frontendtestapi.staging.fastjobs.io/data",
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      serverData.current = await res.json();
      setData(serverData.current);
      console.log(serverData.current);
    }
    getData();
  }, [setData]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value == "") {
      setData(serverData.current);
      return;
    }
    setData(
      serverData.current.filter((val: Row) => {
        if (
          val.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.last_name.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return true;
        }
      })
    );
  };

  const setPageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let lastPage = Math.ceil(data.length / max);
    if (Number(e.target.value) > lastPage) {
      setPage(lastPage);
    } else if (Number(e.target.value) <= 0) {
      setPage(1);
    } else {
      setPage(Number(e.target.value));
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      {serverData.current.length != 0 ? (
        <>
          <div className="flex mt-8 items-center justify-between flex-col lg:flex-row">
            <div className="flex font-bold gap-8 order-2 lg:order-1">
              <div
                className={`flex p-4 items-center justify-center gap-2 ${
                  view == "table" ? "border-b-4 border-black" : ""
                } cursor-pointer`}
                onClick={() => setView("table")}
              >
                <Image
                  src={tableIcon}
                  alt="Table icon"
                  width="20"
                  height="12"
                />
                <p>Table view</p>
              </div>
              <div
                className={`flex p-4 items-center justify-center gap-2 ${
                  view == "kanban" ? "border-b-4 border-black" : ""
                } cursor-pointer`}
                onClick={() => setView("kanban")}
              >
                <Image
                  src={kanbanIcon}
                  alt="Kanban icon"
                  width="24"
                  height="12"
                />
                <p>Kanban</p>
              </div>
            </div>
            <div className="flex gap-8 text-[#B3B3B3] items-center order-1 lg:order-2 w-full lg:w-auto">
              <p className="hidden lg:block cursor-not-allowed">Sort</p>
              <p className="hidden lg:block cursor-not-allowed">Filter</p>
              <div className="flex gap-4 w-full lg:w-auto">
                <Image
                  src={searchIcon}
                  alt="Search icon"
                  width="20"
                  height="12"
                />
                <input
                  type="text"
                  className="p-2 w-full lg:w-auto"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={searchHandler}
                />
              </div>
              <div className="gap-[1px] hidden lg:flex cursor-not-allowed">
                <p className="bg-[#6776FF] text-white text-sm px-3 py-1 rounded-l">
                  New
                </p>
                <button className="bg-[#6776FF] px-2 rounded-r cursor-not-allowed">
                  <Image
                    src={downArrow}
                    alt="Down arrow"
                    width="12"
                    height="12"
                  />
                </button>
              </div>
            </div>
          </div>
          {view == "table" ? (
            <>
              <div className="overflow-auto">
                <table className="w-full border-2 border-gray text-left">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        className="border-2 border-gray text-[#rgba(71, 77, 79, 1)]"
                      >
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder ? null : (
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none p-3"
                                    : "p-3",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " ⬆",
                                  desc: " ⬇",
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row, i) => {
                      const low = (page - 1) * max;
                      if (i >= low && i < low + max) {
                        return (
                          <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="p-6">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
              {table.getRowModel().rows.length == 0 && (
                <p className="text-center p-16 w-full">
                  Please redefine your search terms and try again...
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <p>
                  Showing{" "}
                  {data.length < max
                    ? data.length
                    : `${(page - 1) * max + 1} - ${max}`}{" "}
                  of {data.length}
                </p>
                <div className="flex gap-2 items-center justify-center">
                  <p>Page</p>
                  <input
                    type="number"
                    className="border-2 border-gray p-1 w-16 text-center"
                    value={page}
                    onChange={setPageHandler}
                  />
                  <p>of {Math.ceil(data.length / max)}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="p-16 text-center">
              Kanban board under construction...
            </p>
          )}
        </>
      ) : (
        <p className="p-16 text-center">Loading...</p>
      )}
    </div>
  );
}
