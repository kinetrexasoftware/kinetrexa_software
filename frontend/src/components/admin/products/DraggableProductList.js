'use client';
import { useState, useEffect } from 'react';
import { GripVertical, Edit2, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function DraggableProductList({ products, onReorder, onEdit, onDelete, isFiltered }) {
    // Hydration fix for DnD
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        // Disable reordering if filtered
        if (isFiltered) return;

        const items = Array.from(products);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onReorder(items);
    };

    if (!enabled) {
        return null;
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500">
                No products found.
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="products-list" isDropDisabled={isFiltered}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {isFiltered && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-lg text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                Returns are disabled while filtering. Clear search to reorder.
                            </div>
                        )}

                        {products.map((product, index) => (
                            <Draggable
                                key={product.id || product._id}
                                draggableId={product.id || product._id}
                                index={index}
                                isDragDisabled={isFiltered}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm p-5 rounded-2xl border ${snapshot.isDragging ? 'border-primary-500 shadow-2xl scale-[1.02]' : 'border-gray-200 dark:border-white/5'} transition-all duration-200 flex flex-col md:flex-row items-center gap-6`}
                                    >
                                        <div
                                            {...provided.dragHandleProps}
                                            className={`text-gray-400 transition-colors ${isFiltered ? 'cursor-not-allowed opacity-50' : 'hover:text-primary-500 cursor-grab active:cursor-grabbing'}`}
                                        >
                                            <GripVertical size={20} />
                                        </div>

                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradientTheme || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white shadow-lg`}>
                                            <Sparkles size={24} />
                                        </div>

                                        <div className="flex-grow text-center md:text-left">
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
                                                    ${product.status === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                                        product.status === 'Beta' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' :
                                                            'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                                                    {product.status}
                                                </span>
                                                {product.isFeatured && (
                                                    <span className="bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1">{product.tagline}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-400'}`}></div>
                                            <span className="text-xs font-semibold text-gray-500 uppercase">{product.isActive ? 'Active' : 'Archived'}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="p-2.5 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-primary-500/5 transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(product.id || product._id)}
                                                className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
