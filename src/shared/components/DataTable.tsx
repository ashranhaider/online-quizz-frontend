import { Table, Form } from "react-bootstrap";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];

    /* Layout styling */
    className?: string;
    style?: React.CSSProperties;

    /* Pagination (optional) */
    showPagination?: boolean;
    page?: number; // 1-based
    pageSize?: number;
    totalCount?: number;
    onPageChange?: (page: number) => void;

    onPageSizeChange?: (pageSize: number) => void;     // ✅ NEW
    pageSizeOptions?: number[];                        // ✅ NEW
    showFirstLast?: boolean;
    showPageInfo?: boolean;

    /* Search (optional) */
    showSearch?: boolean;
    searchText?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function DataTable<T>({
    data,
    columns,

    className,
    style,

    showPagination = true,
    page = 1,
    pageSize = 10,
    totalCount = 0,
    onPageChange,

    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],

    showFirstLast = true,
    showPageInfo = true,

    showSearch = true,
    searchText = "",
    onSearchChange,
    searchPlaceholder = "Search...",
}: DataTableProps<T>) {
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const safePage = clamp(page, 1, totalPages);

    const canPaginate =
        showPagination &&
        typeof onPageChange === "function" &&
        typeof onPageSizeChange === "function" &&
        totalCount > 0;

    const startRow = totalCount === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const endRow = Math.min(safePage * pageSize, totalCount);

    const handlePageSizeChange = (newSize: number) => {
        // AG Grid behavior: change size -> reset to page 1
        onPageSizeChange?.(newSize);
        onPageChange?.(1);
    };

    return (
        <>
            <div
                className={`datatable-scroll ${className ?? ""}`}
                style={style}
            >
                {/* Search */}
                {showSearch && typeof onSearchChange === "function" && (
                    <Form.Control
                        className="mb-3"
                        placeholder={searchPlaceholder}
                        value={searchText}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                )}

                {/* Table */}
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {typeof col.accessor === "function"
                                                ? col.accessor(row)
                                                : String(row[col.accessor])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            {/* Pagination Footer (AG-grid style) */}
            {canPaginate && totalPages > 1 && (
                <div className="datatable-footer d-flex align-items-center justify-content-between px-3 py-2 border-top">
                    {/* LEFT: Page size */}
                    <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">Page Size:</span>
                        <Form.Select
                            size="sm"
                            style={{ width: 90 }}
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        >
                            {pageSizeOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    {/* CENTER: Row info */}
                    <div className="small text-muted">
                        {startRow}–{endRow} of {totalCount}
                    </div>

                    {/* RIGHT: Navigation (Bootstrap Icons) */}
                    <div className="d-flex align-items-center gap-1">
                        {showFirstLast && (
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                disabled={safePage === 1}
                                onClick={() => onPageChange?.(1)}
                                title="First page"
                            >
                                <i className="bi bi-chevron-bar-left" />
                            </button>
                        )}

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={safePage === 1}
                            onClick={() => onPageChange?.(safePage - 1)}
                            title="Previous page"
                        >
                            <i className="bi bi-chevron-left" />
                        </button>

                        {showPageInfo && (
                            <span className="mx-2 small">
                                Page <strong>{safePage}</strong> of{" "}
                                <strong>{totalPages}</strong>
                            </span>
                        )}

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={safePage === totalPages}
                            onClick={() => onPageChange?.(safePage + 1)}
                            title="Next page"
                        >
                            <i className="bi bi-chevron-right" />
                        </button>

                        {showFirstLast && (
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                disabled={safePage === totalPages}
                                onClick={() => onPageChange?.(totalPages)}
                                title="Last page"
                            >
                                <i className="bi bi-chevron-bar-right" />
                            </button>
                        )}
                    </div>
                </div>
            )}

        </>
    );
}

export default DataTable;
