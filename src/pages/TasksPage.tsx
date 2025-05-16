import { Button } from '@mui/material';
import { type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../App';
import TasksList from '../components/TasksList';
import toast from 'react-hot-toast';
import type { Columns } from '../types/states';
import CreateToDoModal from '../components/CreateToDoModal';
import type { User } from '@supabase/supabase-js';

export default function TasksPage() {
    const [user, setUser] = useState<User | null>(null);

    const [isCreateToDoModalOpen, setIsCreateToDoModalOpen] = useState(false);
    const [columns, setColumns] = useState<Columns>({
        todo: [],
        inProgress: [],
        done: [],
    });
    const [newToDo, setNewToDo] = useState({
        name: '',
        description: '',
        status: 'placeholder',
    });

    useEffect(() => {
        async function getUserInfo() {
            try {
                const { data, error } = await supabase.auth.getUser();

                if (error) {
                    throw error;
                } else {
                    setUser(data.user);
                }
            } catch (err) {
                toast.error((err as Error).message);
            }
        }
        getUserInfo();
    }, []);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('position');
            console.log(data);
            if (error) throw error;

            setColumns({
                todo: data.filter(task => task.status === 'todo'),
                inProgress: data.filter(task => task.status === 'inProgress'),
                done: data.filter(task => task.status === 'done'),
            });
        } catch (err) {
            toast.error((err as Error).message);
        }
    }

    async function handleAddToDoSubmit(evt: FormEvent<HTMLDivElement>) {
        evt.preventDefault();
        const { name, description, status } = newToDo;
        console.log(newToDo);
        try {
            if (!user) throw new Error('Unauthorized');
            await supabase.from('tasks').insert({
                userId: user.id,
                name,
                description,
                status,
                position: columns.todo.length,
            });
            console.log(1);
            loadTasks();
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsCreateToDoModalOpen(false);
        }
    }
    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const newTaskInfo = [
            ...columns.todo,
            ...columns.inProgress,
            ...columns.done,
        ].find(task => task.id === over.id);

        const newStatus = newTaskInfo?.status;

        const taskId = active.id;
        console.log(active, over);

        await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', taskId);
        updateTaskPositions();
        loadTasks();
    }

    async function updateTaskPositions() {
        await Promise.all(
            [...columns.todo, ...columns.inProgress, ...columns.done].map(
                (task, index) =>
                    supabase
                        .from('tasks')
                        .update({ position: index })
                        .eq('id', task.id)
            )
        );
    }

    return (
        <div className="overlay-container">
            <Button
                className="w-full max-w-[35vw]"
                variant="contained"
                onClick={() => setIsCreateToDoModalOpen(true)}
            >
                Create ToDo
            </Button>
            <TasksList handleDragEnd={handleDragEnd} columns={columns} />
            <CreateToDoModal
                isOpen={isCreateToDoModalOpen}
                setIsOpen={setIsCreateToDoModalOpen}
                handleSubmit={handleAddToDoSubmit}
                newToDo={newToDo}
                setNewToDo={setNewToDo}
            />
        </div>
    );
}
