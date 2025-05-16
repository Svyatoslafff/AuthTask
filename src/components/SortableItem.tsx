import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SortableItemProps } from '../types/props';

export default function SortableItem({ task }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                padding: '8px',
                background: 'white',
                borderRadius: '5px',
                marginBottom: '8px',
            }}
            className="flex flex-col justify-center items-center"
        >
            <h3 className=" text-2xl">{task.name}</h3>
            <p className="text-gray-500">{task.description}</p>
        </div>
    );
}
