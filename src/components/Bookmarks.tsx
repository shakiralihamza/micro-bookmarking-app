import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {IconButton} from "gatsby-theme-material-ui";
import DeleteIcon from '@mui/icons-material/Delete';
import {CircularProgress, Container, Skeleton, Stack, TextField, Typography} from "@mui/material";
import {Bookmark} from "../interfaces";
import {FC, useEffect} from "react";
import {LoadingButton} from "@mui/lab";


function createTodo(data: any) {
    return fetch('/.netlify/functions/create', {
        body: JSON.stringify(data),
        method: 'POST'
    }).then(response => {
        return response.json()
    })
}

const deleteTodo = (bookmarkId: string) => {
    return fetch('/.netlify/functions/delete', {
        body: JSON.stringify({id: bookmarkId}),
        method: 'POST',
    }).then(response => {
        return response.json()
    })
}


export default function Bookmarks() {
    const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [validUrl, setValidUrl] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isCreating, setIsCreating] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState('');

    useEffect(() => {
        fetch('/.netlify/functions/read-all')
            .then(response => {
                return response.json()
            })
            .then(data => {
                const bookmarks = data.map((bookmark: any) => ({...bookmark.data, id: bookmark.ref['@ref'].id}))
                setIsLoading(false)
                setBookmarks(() => bookmarks)
            }).catch(error => {
            console.log('error: ' + error)
        })

    }, []);

    const handleSubmit = () => {
        //check if url is valid
        if (!url.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
            setValidUrl(false)
            return
        }
        setIsCreating(true)

        const myBookmark = {title, url};
        createTodo(myBookmark)
            .then((response) => {
                console.log('API response', response)
                setBookmarks([...bookmarks, {...response.data, id: response.ref['@ref'].id}])
                setTitle('')
                setUrl('')
                setIsCreating(false)
            })
            .catch((error) => {
                console.log('API error', error)
            })
    }
    const handleDelete = (id: string) => {
        setIsDeleting(true);
        setDeletingId(id)
        deleteTodo(id)
            .then((response) => {
                console.log('Delete API response', response)
                // set app state
                setIsDeleting(false);
                setDeletingId('');
                setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
            })
            .catch((error) => {
                console.log('API error', error)
            })
    }

    //following are the components put in variables to make it easier to read;
    //return statement would just include logic for the components
    const AddBookmark = () => (
        <ListItem
            secondaryAction={
                <LoadingButton
                    onClick={handleSubmit}
                    loading={isCreating}
                    variant="contained"
                >
                    Add
                </LoadingButton>
            }>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size={'small'} label="Bookmark Title" variant="outlined"/>
            <TextField
                helperText={validUrl ? '' :
                    <Typography variant={'body2'} color={'error'}>Invalid URL</Typography>}
                value={url}
                onChange={(e) => {
                    setValidUrl(true)
                    setUrl(e.target.value)
                }}
                size={'small'} label="URL" variant="outlined" sx={{ml: 2}}/>

        </ListItem>
    );


    // @ts-ignore
    const DefaultSkeleton: FC = () => (
        [1, 2, 3].map(() =>
            <ListItem
                key={Math.random()}
                sx={{mt: 3}}
                secondaryAction={
                    <>
                        <Stack direction={'row'}>
                            <Skeleton variant="circular" width={40} height={40}/>
                        </Stack>
                    </>

                }>
                <Skeleton variant="rounded" height={40} sx={{width: '100%', mr: 4}}/>
            </ListItem>
        ));

    // @ts-ignore
    const Bookmarks: FC = () => (
        bookmarks.map(bookmark =>
            <ListItem
                key={bookmark.id}
                sx={{mt: 5}}
                secondaryAction={
                    <>
                        {
                            isDeleting && bookmark.id === deletingId
                                ? <CircularProgress
                                    sx={{
                                        color: 'grey.400'
                                    }}
                                    color={'inherit'} size={20}/>
                                : <IconButton
                                    onClick={() => {
                                        handleDelete(bookmark.id)
                                    }}
                                    disableRipple edge="end" aria-label="delete">
                                    <DeleteIcon sx={{
                                        color: 'grey.400'
                                    }}/>
                                </IconButton>
                        }

                    </>

                }>
                <ListItemText sx={{mr: 2}} primary={bookmark.title} secondary={bookmark.url}/>
            </ListItem>
        )
    )
    return (
        <Container maxWidth={'md'} sx={{mt: 5}}>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <AddBookmark/>
                {isLoading ? <DefaultSkeleton/> : <Bookmarks/>}
            </List>
        </Container>
    );
}
