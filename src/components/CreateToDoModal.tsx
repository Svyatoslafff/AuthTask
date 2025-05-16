import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useState, type ChangeEvent } from 'react';
import type { CreateToDoModalProps } from '../types/props';

export default function CreateToDoModal({
    isOpen,
    setIsOpen,
    handleSubmit,
    newToDo,
    setNewToDo,
}: CreateToDoModalProps) {
    function handleClose() {
        setIsOpen(false);
    }
    const handleChange = (
        evt: ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const { name, value } = evt.target;
        console.log(name, value);
        setNewToDo(prev => ({ ...prev, [name]: value }));
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: handleSubmit,
                    },
                }}
            >
                <DialogTitle>Add ToDo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="ToDo name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={newToDo.name}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={newToDo.description}
                    />
                    <InputLabel id="select-status-label">Status</InputLabel>
                    <Select
                        labelId="select-status-label"
                        id="select-status"
                        name="status"
                        value={newToDo.status}
                        label="Status"
                        fullWidth
                        displayEmpty={false}
                        onChange={handleChange}
                    >
                        <MenuItem value="placeholder" disabled>
                            <p>Choose status</p> {/* Placeholder */}
                        </MenuItem>
                        <MenuItem value="todo">ToDo</MenuItem>
                        <MenuItem value="inProgress">In progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
