import React, {useMemo} from "react";
import {
    MaterialReactTable,
    useMaterialReactTable
} from "material-react-table";
import "../CSS/User.css";

const data = [
    {
        name: "John",
        address:"Gandhinagar",
        age: 30
    },
    {
        name: "Sara",
        address:"Gandhinagar",
        age: 25
    }
];

export default function User() {
    const columns = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                muiTableHeadCellProps: {sx: {color: "green"}}, //custom props
                Cell: ({renderedCellValue}) => <strong>{renderedCellValue}</strong> //optional custom cell render
            },
            {
                accessorFn: (row) => row.address, //alternate way
                id: "address", //id required if you use accessorFn instead of accessorKey
                header: "Address",
            },
            {
                accessorFn: (row) => row.age, //alternate way
                id: "age", //id required if you use accessorFn instead of accessorKey
                header: "Age",
            }
        ],
        []
    );

    const table = useMaterialReactTable({
        data,
        columns
    });

    return (
        <div className="user-container">
            <MaterialReactTable table={table}/>
        </div>
    );
}
