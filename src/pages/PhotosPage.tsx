import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../App';
import toast from 'react-hot-toast';
import type { User } from '@supabase/supabase-js';
import { Button } from '@mui/material';
import PhotoUploadingModal from '../components/PhotoUploadingModal';
import { transliterate } from 'transliteration';
import ImagesList from '../components/ImagesList';
import type { ImageData } from '../types/states';
import { ClockLoader } from 'react-spinners';

export default function PhotosPage() {
    const [user, setUser] = useState<User | null>(null);
    const [photos, setPhotos] = useState<File[] | undefined>(undefined);
    const [isUploadImageModalOpen, setIsUploadImageModalOpen] = useState(false);
    const [urlsList, setUrlsList] = useState<ImageData[]>([]);
    const [isLoading, setIsLoding] = useState(false);

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
        loadPhotos();
    }, [user]);

    // moove functions to another file
    async function uploadPhotos(evt: FormEvent<HTMLDivElement>) {
        evt.preventDefault();

        if (!user) return;
        if (!photos) return;
        for (const photo of photos) {
            try {
                const photoName = transliterate(photo.name);
                const filePath = `user-${user.id}/${photoName}`;

                const { error } = await supabase.storage
                    .from('photos')
                    .upload(filePath, photo);
                if (error) throw error;

                const { error: dbError } = await supabase
                    .from('photos')
                    .insert({ userId: user.id, path: filePath });
                if (dbError) throw dbError;
                toast.success('Succesfully uploaded images');
            } catch (err) {
                toast.error((err as Error).message);
            }
        }
        setIsUploadImageModalOpen(false);
        setPhotos(undefined);
        loadPhotos();
    }

    async function loadPhotos() {
        try {
            setIsLoding(true);
            if (!user) return;

            const folderPath = `user-${user.id}`;
            const { data, error } = await supabase.storage
                .from('photos')
                .list(folderPath);

            if (error) throw error;

            const urls = (
                await Promise.all(
                    data.map(async photo => {
                        if (photo.name === '.emptyFolderPlaceholder') return;
                        const { data: signedData, error: signedError } =
                            await supabase.storage
                                .from('photos')
                                .createSignedUrl(
                                    `${folderPath}/${photo.name}`,
                                    60
                                );

                        if (signedError) {
                            throw signedError;
                        }

                        const [fixedName] = photo.name.split('.');
                        return {
                            url: signedData.signedUrl,
                            name: fixedName,
                            id: photo.id,
                            // createdAt: photo.created_at,
                        };
                    })
                )
            ).filter(photo => !!photo);
            setUrlsList(urls);
        } catch (err) {
            toast.error((err as Error).message);
        } finally {
            setIsLoding(false);
        }
    }

    return (
        <section className="overlay-container gap-6">
            <Button
                className="w-full max-w-[35vw]"
                variant="contained"
                onClick={() => setIsUploadImageModalOpen(true)}
            >
                Upload Image
            </Button>
            {isLoading ? (
                <ClockLoader />
            ) : (
                <ImagesList isLoading={isLoading} urlsList={urlsList} />
            )}
            <PhotoUploadingModal
                isOpen={isUploadImageModalOpen}
                setIsOpen={setIsUploadImageModalOpen}
                handleSubmit={uploadPhotos}
                photos={photos}
                setPhotos={setPhotos}
            />
        </section>
    );
}
