import { Table, Form } from "react-bootstrap";
import "./DataTable.css";
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
                className={`datatable-container shadow-sm ${className ?? ""}`}
                style={style}
            >
                {/* Search */}
                {showSearch && typeof onSearchChange === "function" && (
                    <div className="datatable-search p-3 border-bottom bg-light">
                        <Form.Control
                            className="datatable-search-input"
                            placeholder={searchPlaceholder}
                            value={searchText}
                            onChange={(e) => onSearchChange(e.target.value)}
                            size="sm"
                        />
                    </div>
                )}

                {/* Table */}
                <div className="datatable-scroll">
                    <Table bordered hover responsive className="datatable-table mb-0">
                        <thead className="datatable-head">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="datatable-header">{col.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="datatable-body">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-4">
                                        <span className="text-muted">No records found</span>
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="datatable-row">
                                        {columns.map((col, colIndex) => (
                                            <td key={colIndex} className="datatable-cell">
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
            </div>
            {/* Pagination Footer (AG-grid style) */}
            {canPaginate && totalPages > 1 && (
                <div className="datatable-footer d-flex align-items-center justify-content-between px-4 py-3 border-top bg-light">
                    {/* LEFT: Page size */}
                    <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted fw-semibold">Page Size:</span>
                        <Form.Select
                            size="sm"
                            className="datatable-page-size"
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
                        <span className="fw-semibold">{startRow}–{endRow}</span> of <span className="fw-semibold">{totalCount}</span>
                    </div>

                    {/* RIGHT: Navigation (Bootstrap Icons) */}
                    <div className="d-flex align-items-center gap-2">
                        {showFirstLast && (
                            <button
                                className="btn btn-sm btn-outline-secondary datatable-nav-btn"
                                disabled={safePage === 1}
                                onClick={() => onPageChange?.(1)}
                                title="First page"
                            >
                                <i className="bi bi-chevron-bar-left" />
                            </button>
                        )}

                        <button
                            className="btn btn-sm btn-outline-secondary datatable-nav-btn"
                            disabled={safePage === 1}
                            onClick={() => onPageChange?.(safePage - 1)}
                            title="Previous page"
                        >
                            <i className="bi bi-chevron-left" />
                        </button>

                        {showPageInfo && (
                            <span className="mx-2 small text-muted">
                                Page <strong className="text-dark">{safePage}</strong> of{" "}
                                <strong className="text-dark">{totalPages}</strong>
                            </span>
                        )}

                        <button
                            className="btn btn-sm btn-outline-secondary datatable-nav-btn"
                            disabled={safePage === totalPages}
                            onClick={() => onPageChange?.(safePage + 1)}
                            title="Next page"
                        >
                            <i className="bi bi-chevron-right" />
                        </button>

                        {showFirstLast && (
                            <button
                                className="btn btn-sm btn-outline-secondary datatable-nav-btn"
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
