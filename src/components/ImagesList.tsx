import { ImageList, ImageListItem } from '@mui/material';
import type { ImagesListProps } from '../types/props';
import { ClockLoader } from 'react-spinners';

export default function ImagesList({ urlsList, isLoading }: ImagesListProps) {
    return (
        <div className="overlay w-[70vw]">
            {isLoading ? (
                <ClockLoader />
            ) : (
                <>
                    {!urlsList.length ? (
                        <p>No Images</p>
                    ) : (
                        <ImageList
                            // sx={{ width: 500, height: 450 }}
                            variant="quilted"
                            cols={3}
                            rowHeight="auto"
                            gap={8}
                        >
                            {urlsList.map(item => (
                                <ImageListItem
                                    key={item.id}
                                    // cols={item.cols || 1}
                                    // rows={item.rows || 1}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </>
            )}
        </div>
    );
}
