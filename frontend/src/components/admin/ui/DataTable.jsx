'use client';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DataTable({
    columns,
    data,
    actions,
    pagination,
    onSearch,
    onFilter,
    title,
    subtitle
}) {
    return (
        <div className="space-y-4">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    {title && <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>}
                    {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-500"
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>
                    {onFilter && (
                        <Button variant="outline" onClick={onFilter} className="px-3">
                            <Filter size={18} />
                        </Button>
                    )}
                    {actions}
                </div>
            </div>

            {/* Table wrapper for horizontal scroll */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm min-w-[1000px]">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className={`px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap ${col.className || ''}`}
                                        style={col.width ? { width: col.width } : {}}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        {columns.map((col, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={`px-6 py-4 text-gray-700 dark:text-gray-300 ${col.truncate ? 'truncate max-w-[200px]' : 'whitespace-nowrap'} ${col.className || ''}`}
                                                title={col.truncate ? (col.render ? '' : row[col.accessor]) : ''}
                                            >
                                                {col.render ? col.render(row) : row[col.accessor]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
                    <div>Showing {data.length} results</div>
                    <div className="flex gap-2">
                        <button disabled className="p-1 border border-gray-200 dark:border-gray-700 rounded opacity-50 hover:bg-gray-100">
                            <ChevronLeft size={16} />
                        </button>
                        <button disabled className="p-1 border border-gray-200 dark:border-gray-700 rounded opacity-50 hover:bg-gray-100">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
