import { Grid, Typography } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import SortableItem from '../components/SortableItem';
import type { TasksListProps } from '../types/props';

export default function TasksList({ handleDragEnd, columns }: TasksListProps) {
    return (
        <div className="overlay max-w-[70vw] w-full">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <Grid container spacing={2} sx={{ width: '100%' }} columns={3}>
                    {['todo', 'inProgress', 'done'].map(status => (
                        <SortableContext
                            items={columns[status].map(t => t.id)}
                            key={status}
                        >
                            <Grid size={1} xs={4}>
                                <Typography className="">
                                    {status.toUpperCase()}
                                </Typography>
                                {columns[status].map(task => (
                                    <SortableItem key={task.id} task={task} />
                                ))}
                            </Grid>
                        </SortableContext>
                    ))}
                </Grid>
            </DndContext>
        </div>
    );
}
