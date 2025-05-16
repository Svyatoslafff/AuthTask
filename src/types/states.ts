import type { ToDo } from './props';

export type ImageData = {
    url: string;
    name: string;
    id: string;
};

export type Columns = {
    todo: ToDo[];
    inProgress: ToDo[];
    done: ToDo[];
};
