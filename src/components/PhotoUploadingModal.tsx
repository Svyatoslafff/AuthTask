import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import type { PhotoUploadingModalProps } from '../types/props';
import { MuiFileInput } from 'mui-file-input';
import { useState } from 'react';

export default function PhotoUploadingModal({
    isOpen,
    setIsOpen,
    photos,
    setPhotos,
    handleSubmit,
}: PhotoUploadingModalProps) {
    const [isPhotoImage, setIsPhotoImage] = useState(false);
    function handleClose() {
        setIsOpen(false);
        setPhotos(undefined);
    }
    return (
        <Dialog
            open={isOpen}
            // onClose={() => setIsOpen(false)}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
            }}
        >
            <DialogTitle>Upload your images</DialogTitle>
            <DialogContent>
                {/* <DialogContentText></DialogContentText> */}
                {/* <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="file"
                    fullWidth
                    variant="standard"
                /> */}
                <MuiFileInput
                    value={photos}
                    onChange={newPhotos => {
                        const notImageType = newPhotos.find(file => {
                            const [type] = file.type.split('/');
                            return type !== 'image';
                        });
                        if (!notImageType) {
                            setPhotos(newPhotos);
                            setIsPhotoImage(true);
                        } else {
                            setPhotos(undefined);
                            setIsPhotoImage(false);
                        }
                        console.log(newPhotos);
                    }}
                    multiple
                    placeholder="Choose files"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" disabled={!isPhotoImage}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
