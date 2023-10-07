import { ColumnDef } from "@tanstack/react-table"

//import { CellAction } from "./cell-action"


export const columns = [
  {
    accessorKey: "weddingDate",
    header: "Wedding Date"
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  //{
   // id: "actions",
    //cell: ({ row }) => <CellAction data={row.original} />
 // },
];