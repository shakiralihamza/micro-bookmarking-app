import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {IconButton} from "gatsby-theme-material-ui";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import {Button, Container, TextField} from "@mui/material";
import {Bookmark} from "../interfaces";


export default function Bookmarks() {
    const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
    const [title, setTitle] = React.useState('');
    const [url, setUrl] = React.useState('');
    return (
        <Container maxWidth={'md'} sx={{mt:5}}>
            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <ListItem
                    secondaryAction={
                        <Button variant="contained" color="primary" sx={{float: 'right'}}>
                            Add
                        </Button>
                    }>
                    <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                        size={'small'} label="Bookmark Title" variant="outlined"/>
                    <TextField
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        size={'small'} label="URL" variant="outlined" sx={{ml: 2}}/>

                </ListItem>
                {
                    bookmarks.map(bookmark => (
                        <ListItem
                            key={bookmark.id}
                            sx={{mt: 5}}
                            secondaryAction={
                                <>
                                    <IconButton
                                        onClick={() => {
                                            setBookmarks(bookmarks.filter(b => b.id !== bookmark.id))
                                        }}
                                        disableRipple edge="end" aria-label="forward" sx={{mr: 1}}>
                                        <ReplyIcon sx={{
                                            transform: 'scaleX(-1);',
                                            color: 'grey.400'
                                        }}/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setBookmarks(bookmarks.filter(b => b.id !== bookmark.id))
                                        }}
                                        disableRipple edge="end" aria-label="delete">
                                        <DeleteIcon sx={{
                                            color: 'grey.400'
                                        }}/>
                                    </IconButton>
                                </>

                            }>
                            <ListItemText sx={{mr: 4}} primary={bookmark.title} secondary={bookmark.url}/>
                        </ListItem>
                    ))
                }
            </List>
        </Container>
    );
}
